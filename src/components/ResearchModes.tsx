
import { Search, Brain, FileSearch, BarChart2, Image, Code } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  },
  {
    id: 'think',
    name: 'Think',
    icon: 'Brain',
    description: 'Complex problem solving with step-by-step reasoning'
  },
  {
    id: 'analyze',
    name: 'Analyze',
    icon: 'BarChart2',
    description: 'Detailed data analysis and interpretation'
  },
  {
    id: 'create-images',
    name: 'Create images',
    icon: 'Image',
    description: 'Generate images based on text descriptions'
  },
  {
    id: 'code',
    name: 'Code',
    icon: 'Code',
    description: 'Write, explain, and debug code'
  },
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'FileSearch': return <FileSearch className="h-5 w-5" />;
    case 'Search': return <Search className="h-5 w-5" />;
    case 'Brain': return <Brain className="h-5 w-5" />;
    case 'BarChart2': return <BarChart2 className="h-5 w-5" />;
    case 'Image': return <Image className="h-5 w-5" />;
    case 'Code': return <Code className="h-5 w-5" />;
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
              ? 'bg-grok-selected text-white' 
              : 'bg-transparent text-grok-muted-foreground hover:text-white'
          }`}
          title={mode.description}
        >
          <span className="mr-2">{getIcon(mode.icon)}</span>
          <span>{mode.name}</span>
        </button>
      ))}
    </div>
  );
};

export default ResearchModes;
