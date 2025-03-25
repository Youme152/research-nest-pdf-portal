
import React from 'react';
import SearchBar from '@/components/SearchBar';
import ResearchModes from '@/components/ResearchModes';
import { useResearch } from '@/contexts/ResearchContext';

const Welcome = () => {
  const { handleSearch, selectedMode, setSelectedMode } = useResearch();

  return (
    <>
      <div className="text-center pt-36 mb-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-playfair text-yoga-charcoal font-medium">
          Welcome to <span className="text-yoga-peach">ORA-1</span> Research
        </h1>
        <p className="mt-4 text-lg md:text-xl font-playfair text-yoga-charcoal italic">
          Use your <span className="font-semibold">purchasing power</span> for <span className="font-semibold">positive change</span>.
        </p>
      </div>
      
      <div className="max-w-[650px] mx-auto px-4">
        <SearchBar 
          onSearch={handleSearch} 
          selectedMode={selectedMode}
        />
        
        <div className="mt-8">
          <ResearchModes
            onSelectMode={setSelectedMode}
            selectedMode={selectedMode}
          />
        </div>
      </div>
    </>
  );
};

export default Welcome;
