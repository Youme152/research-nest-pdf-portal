
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, ArrowUp, Eye } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSendMessage, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-grok via-grok">
      <div className="relative max-w-[650px] mx-auto">
        <div className="relative flex items-center bg-[#222222] rounded-xl p-2 border border-grok-border transition-all shadow-lg">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="text-grok-muted-foreground hover:text-grok-foreground hover:bg-grok-accent"
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="How can I assist with ethical shopping today?"
            className="flex-1 bg-transparent border-none resize-none outline-none text-grok-foreground placeholder:text-grok-muted-foreground min-h-[20px] max-h-[200px]"
            rows={1}
            disabled={isLoading}
          />

          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#333333] rounded-lg mr-1">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">DeepSearch</span>
            </div>
            
            <Button 
              type="submit" 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-[#333333] hover:bg-[#444444] flex items-center justify-center"
              disabled={!message.trim() || isLoading}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
