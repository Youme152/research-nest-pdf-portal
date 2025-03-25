
import React, { useEffect } from 'react';
import Welcome from '@/components/Welcome';
import SearchProgressIndicator from '@/components/SearchProgressIndicator';
import ChatContainer from '@/components/ChatContainer';
import { ResearchProvider, useResearch } from '@/contexts/ResearchContext';

const IndexContent = () => {
  const { isConversationStarted, isSearching, searchProgress, setSearchProgress } = useResearch();
  
  useEffect(() => {
    if (isSearching) {
      const interval = setInterval(() => {
        setSearchProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 300);
      
      return () => clearInterval(interval);
    } else {
      setSearchProgress(0);
    }
  }, [isSearching, setSearchProgress]);

  return (
    <div className="min-h-screen flex flex-col bg-grok text-grok-foreground">
      <main className="flex-1 h-full">
        <div className="h-full">
          {!isConversationStarted && <Welcome />}
          
          {isSearching && isConversationStarted && <SearchProgressIndicator />}
          
          {isConversationStarted && <ChatContainer />}
        </div>
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <ResearchProvider>
      <IndexContent />
    </ResearchProvider>
  );
};

export default Index;
