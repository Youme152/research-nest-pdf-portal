
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Paperclip, ArrowUp } from 'lucide-react';
import { ResearchMode } from '@/lib/types';

interface SearchBarProps {
  onSearch: (query: string, mode: string) => void;
  selectedMode: ResearchMode;
}

const SearchBar = ({ onSearch, selectedMode }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, selectedMode.id);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full mx-auto search-appear"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-yoga-sage/10 to-yoga-peach/10 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        
        <div className="relative flex items-center bg-white rounded-xl p-3 border border-grok-border transition-all shadow-sm">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to know?"
            className="flex-1 bg-transparent border-none outline-none text-grok-foreground placeholder:text-grok-muted-foreground text-lg font-sans"
          />
          
          <div className="flex items-center space-x-2 pl-2">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="text-grok-muted-foreground hover:text-grok-foreground hover:bg-grok-accent"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yoga-peach/10 text-yoga-peach rounded-lg mr-1">
              <span className="text-sm font-medium">{selectedMode.name}</span>
            </div>
            
            <Button 
              type="submit" 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-yoga-peach hover:bg-yoga-terracotta flex items-center justify-center text-white"
              disabled={!query.trim()}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
