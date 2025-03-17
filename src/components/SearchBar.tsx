
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
      className="w-full max-w-2xl mx-auto search-appear"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-gray-700/20 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        
        <div className="relative flex items-center bg-[#222222] rounded-xl p-3 border border-grok-border transition-all shadow-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to know?"
            className="flex-1 bg-transparent border-none outline-none text-grok-foreground placeholder:text-grok-muted-foreground text-lg"
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
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#333333] rounded-lg mr-1">
              <span className="text-sm font-medium">DeepSearch</span>
            </div>
            
            <Button 
              type="submit" 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-[#333333] hover:bg-[#444444] flex items-center justify-center"
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
