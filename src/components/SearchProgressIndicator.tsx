
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useResearch } from '@/contexts/ResearchContext';

const SearchProgressIndicator = () => {
  const { searchProgress, selectedMode } = useResearch();

  return (
    <div className="w-full max-w-[650px] mx-auto mt-6 px-4 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-grok-muted-foreground">
          {selectedMode.name === 'DeepSearch' ? 'Searching research databases...' : 'Analyzing information...'}
        </p>
        <span className="text-sm text-grok-muted-foreground">{Math.round(searchProgress)}%</span>
      </div>
      <Progress value={searchProgress} className="h-1 bg-grok-border" />
    </div>
  );
};

export default SearchProgressIndicator;
