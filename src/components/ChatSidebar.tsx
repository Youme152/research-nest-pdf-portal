import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Trash, PanelLeftClose, PanelLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { Chat } from '@/lib/types';

export function ChatSidebar() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state, open, setOpen, toggleSidebar } = useSidebar();
  
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('last_used', { ascending: false });
      
      if (error) throw error;
      setChats(data || []);
    } catch (error) {
      console.error('Error fetching chats:', error);
      toast({
        title: 'Error',
        description: 'Failed to load chat history',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createNewChat = async () => {
    try {
      setIsLoading(true);
      const title = `New Chat ${new Date().toLocaleString()}`;
      
      const tempId = uuidv4();
      const tempChat: Chat = { 
        id: tempId, 
        title, 
        last_used: new Date().toISOString() 
      };
      
      setChats([tempChat, ...chats]);
      
      const { data, error } = await supabase
        .from('chats')
        .insert([{ 
          title, 
          last_used: new Date().toISOString() 
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      setChats(prev => [
        data as Chat,
        ...prev.filter(c => c.id !== tempId)
      ]);
      
      navigate('/');
      
      toast({
        title: 'Success',
        description: 'New chat created',
      });
    } catch (error) {
      console.error('Error creating new chat:', error);
      toast({
        title: 'Error',
        description: 'Failed to create new chat',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectChat = (chatId: string) => {
    supabase
      .from('chats')
      .update({ last_used: new Date().toISOString() })
      .eq('id', chatId)
      .then(() => {
        fetchChats();
      });
    
    navigate('/');
  };

  const deleteChat = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    try {
      await supabase
        .from('chats')
        .delete()
        .eq('id', chatId);
      
      setChats(chats.filter(chat => chat.id !== chatId));
      
      toast({
        title: 'Success',
        description: 'Chat deleted',
      });
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete chat',
        variant: 'destructive',
      });
    }
  };

  const handleAction = (action: () => void) => {
    action();
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">ResearchNest</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="md:hidden"
            title="Toggle sidebar"
          >
            {state === "expanded" ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <div className="p-3">
          <Button 
            onClick={() => handleAction(createNewChat)} 
            className="w-full mb-4 flex items-center justify-center"
            disabled={isLoading}
          >
            <Plus className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
          <SidebarMenu>
            {chats.length === 0 && !isLoading ? (
              <div className="text-sm text-center p-4 text-muted-foreground">
                No chats yet. Start a new conversation!
              </div>
            ) : (
              chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton 
                    onClick={() => handleAction(() => selectChat(chat.id))}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      <span className="truncate">{chat.title}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(() => deleteChat(e, chat.id));
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            ResearchNest v1.0
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="hidden md:flex"
            title={state === "expanded" ? "Collapse sidebar" : "Expand sidebar"}
          >
            {state === "expanded" ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
}
