
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse the webhook payload
    const payload = await req.json();
    console.log("Received webhook payload:", payload);

    // Identify the webhook source
    const webhookSource = req.headers.get("x-webhook-source") || "unknown";
    console.log("Webhook source:", webhookSource);

    // Store the data in the database
    // For N8N data specifically - assuming it matches your 'documents' table structure
    if (webhookSource === "n8n" && payload.documents) {
      // Option 1: Store in documents table
      for (const doc of payload.documents) {
        const { data, error } = await supabase
          .from("documents")
          .insert({
            content: doc.content,
            metadata: doc.metadata || {},
            // Note: embedding field is excluded as it likely requires special handling
          });
          
        if (error) {
          console.error("Error inserting document:", error);
        }
      }
      
      return new Response(
        JSON.stringify({ success: true, message: "Documents stored successfully" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200 
        }
      );
    }
    
    // General webhook data
    const { data, error } = await supabase
      .from("n8n")
      .insert({
        id: Date.now(), // Use timestamp as ID
        // This uses the entire payload as the data
      });
      
    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Webhook data processed" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
