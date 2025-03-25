
import { Search, FileSearch } from 'lucide-react';
import { useEffect } from 'react';
import { ResearchMode } from '@/lib/types';

interface ResearchModesProps {
  onSelectMode: (mode: ResearchMode) => void;
  selectedMode: ResearchMode;
}

const RESEARCH_MODES: ResearchMode[] = [
  {
    id: 'research',
    name: 'Research',
    icon: 'FileSearch',
    description: 'General information lookup with cited sources'
  },
  {
    id: 'deep-search',
    name: 'DeepSearch',
    icon: 'Search',
    description: 'In-depth analysis of specific topics with PDF results'
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'FileSearch': return <FileSearch className="h-5 w-5" />;
    case 'Search': return <Search className="h-5 w-5" />;
    default: return <Search className="h-5 w-5" />;
  }
};

const ResearchModes = ({ onSelectMode, selectedMode }: ResearchModesProps) => {
  useEffect(() => {
    // Set default mode on first render
    if (!selectedMode) {
      onSelectMode(RESEARCH_MODES[0]);
    }
  }, [selectedMode, onSelectMode]);

  return (
    <div className="w-full max-w-3xl mx-auto flex justify-center space-x-4 mt-6 overflow-x-auto pb-2 scrollbar-thin animate-fade-in-up">
      {RESEARCH_MODES.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onSelectMode(mode)}
          className={`flex items-center px-4 py-2 rounded-full research-mode-transition ${
            selectedMode?.id === mode.id 
              ? 'bg-yoga-sage text-yoga-charcoal' 
              : 'bg-transparent text-grok-muted-foreground hover:text-yoga-charcoal'
          }`}
          title={mode.description}
        >
          <span className="mr-2">{getIcon(mode.icon)}</span>
          <span className="font-medium">{mode.name}</span>
        </button>
      ))}
    </div>
  );
};

export default ResearchModes;
