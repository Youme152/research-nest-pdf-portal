export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bot_insights: {
        Row: {
          bot_id: string | null
          content: Json
          created_at: string
          id: string
          insight_type: string
          relevance_score: number | null
        }
        Insert: {
          bot_id?: string | null
          content: Json
          created_at?: string
          id?: string
          insight_type: string
          relevance_score?: number | null
        }
        Update: {
          bot_id?: string | null
          content?: Json
          created_at?: string
          id?: string
          insight_type?: string
          relevance_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bot_insights_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_sources: {
        Row: {
          added_at: string
          bot_id: string | null
          id: string
          source_name: string | null
          source_type: string
          source_url: string
        }
        Insert: {
          added_at?: string
          bot_id?: string | null
          id?: string
          source_name?: string | null
          source_type: string
          source_url: string
        }
        Update: {
          added_at?: string
          bot_id?: string | null
          id?: string
          source_name?: string | null
          source_type?: string
          source_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "bot_sources_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
        ]
      }
      bots: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          last_processed: string | null
          name: string
          settings: Json
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_processed?: string | null
          name: string
          settings?: Json
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_processed?: string | null
          name?: string
          settings?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      "Brookhaven RP": {
        Row: {
          channelName: string | null
          channelUrl: string | null
          date: string | null
          duration: string | null
          id: string | null
          likes: string | null
          MAIN: string
          numberOfSubscribers: string | null
          title: string
          url: string | null
          viewCount: string | null
        }
        Insert: {
          channelName?: string | null
          channelUrl?: string | null
          date?: string | null
          duration?: string | null
          id?: string | null
          likes?: string | null
          MAIN: string
          numberOfSubscribers?: string | null
          title: string
          url?: string | null
          viewCount?: string | null
        }
        Update: {
          channelName?: string | null
          channelUrl?: string | null
          date?: string | null
          duration?: string | null
          id?: string | null
          likes?: string | null
          MAIN?: string
          numberOfSubscribers?: string | null
          title?: string
          url?: string | null
          viewCount?: string | null
        }
        Relationships: []
      }
      "Brookhaven RPP": {
        Row: {
          channelId: string | null
          channelName: string | null
          channelUrl: string | null
          channelUsername: string | null
          comments: string | null
          commentsCount: number | null
          commentsTurnedOff: boolean | null
          date: string | null
          "descriptionLinks/0/text": string | null
          "descriptionLinks/0/url": string | null
          "descriptionLinks/1/text": string | null
          "descriptionLinks/1/url": string | null
          "descriptionLinks/10/text": string | null
          "descriptionLinks/10/url": string | null
          "descriptionLinks/11/text": string | null
          "descriptionLinks/11/url": string | null
          "descriptionLinks/12/text": string | null
          "descriptionLinks/12/url": string | null
          "descriptionLinks/13/text": string | null
          "descriptionLinks/13/url": string | null
          "descriptionLinks/14/text": string | null
          "descriptionLinks/14/url": string | null
          "descriptionLinks/15/text": string | null
          "descriptionLinks/15/url": string | null
          "descriptionLinks/16/text": string | null
          "descriptionLinks/16/url": string | null
          "descriptionLinks/17/text": string | null
          "descriptionLinks/17/url": string | null
          "descriptionLinks/18/text": string | null
          "descriptionLinks/18/url": string | null
          "descriptionLinks/19/text": string | null
          "descriptionLinks/19/url": string | null
          "descriptionLinks/2/text": string | null
          "descriptionLinks/2/url": string | null
          "descriptionLinks/20/text": string | null
          "descriptionLinks/20/url": string | null
          "descriptionLinks/21/text": string | null
          "descriptionLinks/21/url": string | null
          "descriptionLinks/22/text": string | null
          "descriptionLinks/22/url": string | null
          "descriptionLinks/23/text": string | null
          "descriptionLinks/23/url": string | null
          "descriptionLinks/24/text": string | null
          "descriptionLinks/24/url": string | null
          "descriptionLinks/25/text": string | null
          "descriptionLinks/3/text": string | null
          "descriptionLinks/3/url": string | null
          "descriptionLinks/4/text": string | null
          "descriptionLinks/4/url": string | null
          "descriptionLinks/5/text": string | null
          "descriptionLinks/5/url": string | null
          "descriptionLinks/6/text": string | null
          "descriptionLinks/6/url": string | null
          "descriptionLinks/7/text": string | null
          "descriptionLinks/7/url": string | null
          "descriptionLinks/8/text": string | null
          "descriptionLinks/8/url": string | null
          "descriptionLinks/9/text": string | null
          "descriptionLinks/9/url": string | null
        }
        Insert: {
          channelId?: string | null
          channelName?: string | null
          channelUrl?: string | null
          channelUsername?: string | null
          comments?: string | null
          commentsCount?: number | null
          commentsTurnedOff?: boolean | null
          date?: string | null
          "descriptionLinks/0/text"?: string | null
          "descriptionLinks/0/url"?: string | null
          "descriptionLinks/1/text"?: string | null
          "descriptionLinks/1/url"?: string | null
          "descriptionLinks/10/text"?: string | null
          "descriptionLinks/10/url"?: string | null
          "descriptionLinks/11/text"?: string | null
          "descriptionLinks/11/url"?: string | null
          "descriptionLinks/12/text"?: string | null
          "descriptionLinks/12/url"?: string | null
          "descriptionLinks/13/text"?: string | null
          "descriptionLinks/13/url"?: string | null
          "descriptionLinks/14/text"?: string | null
          "descriptionLinks/14/url"?: string | null
          "descriptionLinks/15/text"?: string | null
          "descriptionLinks/15/url"?: string | null
          "descriptionLinks/16/text"?: string | null
          "descriptionLinks/16/url"?: string | null
          "descriptionLinks/17/text"?: string | null
          "descriptionLinks/17/url"?: string | null
          "descriptionLinks/18/text"?: string | null
          "descriptionLinks/18/url"?: string | null
          "descriptionLinks/19/text"?: string | null
          "descriptionLinks/19/url"?: string | null
          "descriptionLinks/2/text"?: string | null
          "descriptionLinks/2/url"?: string | null
          "descriptionLinks/20/text"?: string | null
          "descriptionLinks/20/url"?: string | null
          "descriptionLinks/21/text"?: string | null
          "descriptionLinks/21/url"?: string | null
          "descriptionLinks/22/text"?: string | null
          "descriptionLinks/22/url"?: string | null
          "descriptionLinks/23/text"?: string | null
          "descriptionLinks/23/url"?: string | null
          "descriptionLinks/24/text"?: string | null
          "descriptionLinks/24/url"?: string | null
          "descriptionLinks/25/text"?: string | null
          "descriptionLinks/3/text"?: string | null
          "descriptionLinks/3/url"?: string | null
          "descriptionLinks/4/text"?: string | null
          "descriptionLinks/4/url"?: string | null
          "descriptionLinks/5/text"?: string | null
          "descriptionLinks/5/url"?: string | null
          "descriptionLinks/6/text"?: string | null
          "descriptionLinks/6/url"?: string | null
          "descriptionLinks/7/text"?: string | null
          "descriptionLinks/7/url"?: string | null
          "descriptionLinks/8/text"?: string | null
          "descriptionLinks/8/url"?: string | null
          "descriptionLinks/9/text"?: string | null
          "descriptionLinks/9/url"?: string | null
        }
        Update: {
          channelId?: string | null
          channelName?: string | null
          channelUrl?: string | null
          channelUsername?: string | null
          comments?: string | null
          commentsCount?: number | null
          commentsTurnedOff?: boolean | null
          date?: string | null
          "descriptionLinks/0/text"?: string | null
          "descriptionLinks/0/url"?: string | null
          "descriptionLinks/1/text"?: string | null
          "descriptionLinks/1/url"?: string | null
          "descriptionLinks/10/text"?: string | null
          "descriptionLinks/10/url"?: string | null
          "descriptionLinks/11/text"?: string | null
          "descriptionLinks/11/url"?: string | null
          "descriptionLinks/12/text"?: string | null
          "descriptionLinks/12/url"?: string | null
          "descriptionLinks/13/text"?: string | null
          "descriptionLinks/13/url"?: string | null
          "descriptionLinks/14/text"?: string | null
          "descriptionLinks/14/url"?: string | null
          "descriptionLinks/15/text"?: string | null
          "descriptionLinks/15/url"?: string | null
          "descriptionLinks/16/text"?: string | null
          "descriptionLinks/16/url"?: string | null
          "descriptionLinks/17/text"?: string | null
          "descriptionLinks/17/url"?: string | null
          "descriptionLinks/18/text"?: string | null
          "descriptionLinks/18/url"?: string | null
          "descriptionLinks/19/text"?: string | null
          "descriptionLinks/19/url"?: string | null
          "descriptionLinks/2/text"?: string | null
          "descriptionLinks/2/url"?: string | null
          "descriptionLinks/20/text"?: string | null
          "descriptionLinks/20/url"?: string | null
          "descriptionLinks/21/text"?: string | null
          "descriptionLinks/21/url"?: string | null
          "descriptionLinks/22/text"?: string | null
          "descriptionLinks/22/url"?: string | null
          "descriptionLinks/23/text"?: string | null
          "descriptionLinks/23/url"?: string | null
          "descriptionLinks/24/text"?: string | null
          "descriptionLinks/24/url"?: string | null
          "descriptionLinks/25/text"?: string | null
          "descriptionLinks/3/text"?: string | null
          "descriptionLinks/3/url"?: string | null
          "descriptionLinks/4/text"?: string | null
          "descriptionLinks/4/url"?: string | null
          "descriptionLinks/5/text"?: string | null
          "descriptionLinks/5/url"?: string | null
          "descriptionLinks/6/text"?: string | null
          "descriptionLinks/6/url"?: string | null
          "descriptionLinks/7/text"?: string | null
          "descriptionLinks/7/url"?: string | null
          "descriptionLinks/8/text"?: string | null
          "descriptionLinks/8/url"?: string | null
          "descriptionLinks/9/text"?: string | null
          "descriptionLinks/9/url"?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      n8n: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      n8n_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      "SCRAPPER DATA": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      video_ideas: {
        Row: {
          bot_id: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          scheduled_date: string
          title: string
        }
        Insert: {
          bot_id: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          scheduled_date: string
          title: string
        }
        Update: {
          bot_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          scheduled_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_ideas_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
        ]
      }
      video_processing: {
        Row: {
          created_at: string
          id: string
          results: Json | null
          search_word: string
          status: string
          updated_at: string
          user_id: string | null
          video_url: string
        }
        Insert: {
          created_at?: string
          id?: string
          results?: Json | null
          search_word: string
          status?: string
          updated_at?: string
          user_id?: string | null
          video_url: string
        }
        Update: {
          created_at?: string
          id?: string
          results?: Json | null
          search_word?: string
          status?: string
          updated_at?: string
          user_id?: string | null
          video_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      match_documents: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
