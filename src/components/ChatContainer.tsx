
import React from 'react';
import Chat from '@/components/Chat';
import ChatInput from '@/components/ChatInput';
import { useResearch } from '@/contexts/ResearchContext';

const ChatContainer = () => {
  const { 
    messages, 
    pdfResults, 
    isSearching, 
    selectedPDF, 
    handleSelectPDF, 
    handleSendMessage 
  } = useResearch();

  return (
    <div className="pb-24">
      <Chat 
        messages={messages}
        pdfResults={pdfResults}
        isLoading={isSearching}
        selectedPDF={selectedPDF}
        onSelectPDF={handleSelectPDF}
        onSendMessage={handleSendMessage}
      />
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={isSearching} 
      />
    </div>
  );
};

export default ChatContainer;
