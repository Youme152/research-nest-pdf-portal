
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, ArrowUp } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="border-t border-grok-border p-4">
      <div className="relative flex items-center bg-grok-search rounded-xl p-2 border border-grok-border transition-all shadow-lg">
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
          placeholder="Ask anything..."
          className="flex-1 bg-transparent border-none resize-none outline-none text-grok-foreground placeholder:text-grok-muted-foreground min-h-[20px] max-h-[200px]"
          rows={1}
          disabled={isLoading}
        />

        <Button 
          type="submit" 
          variant="ghost" 
          size="icon" 
          className={`rounded-full ${message.trim() ? 'bg-white text-black hover:bg-gray-200' : 'text-grok-muted-foreground hover:bg-grok-accent'}`}
          disabled={!message.trim() || isLoading}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
