
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PDFDocument } from '@/lib/types';
import PDFViewer from './PDFViewer';
import { FileText, ThumbsUp, ThumbsDown, RefreshCw, Copy } from 'lucide-react';
import ChatInput from './ChatInput';

interface ChatProps {
  messages: Message[];
  pdfResults?: PDFDocument[];
  isLoading?: boolean;
  selectedPDF?: PDFDocument | null;
  onSelectPDF: (pdf: PDFDocument | null) => void;
  onSendMessage?: (message: string) => void;
}

const Chat = ({ 
  messages, 
  pdfResults = [], 
  isLoading = false, 
  selectedPDF, 
  onSelectPDF,
  onSendMessage 
}: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedPDF]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Check if this is the initial greeting message or if there are multiple messages
  const isConversationStarted = messages.length > 0 && (messages.length > 1 || messages[0]?.role === 'user');

  return (
    <div className="flex flex-col h-full w-full max-w-[650px] mx-auto">
      <div className={`flex-1 overflow-y-auto px-4 pt-4 pb-20 ${isConversationStarted ? '' : ''}`}>
        {messages.length === 0 && !isLoading ? (
          <div className="h-full"></div>
        ) : (
          <div className="space-y-10 animate-fade-in w-full">
            {messages.map((message) => (
              <div key={message.id} className="w-full">
                <div className="flex items-start space-x-4">
                  {message.role === 'user' && (
                    <div className="rounded-full w-8 h-8 mt-1 flex items-center justify-center bg-slate-700 text-white">
                      Hi
                    </div>
                  )}
                  
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="/lovable-uploads/426621a3-cb25-4284-b6e6-781a1d6a0456.png" />
                      <AvatarFallback className="bg-grok-accent">AI</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="flex-1 space-y-2">
                    <div className="prose prose-invert max-w-none">
                      {message.content}
                    </div>
                    
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mt-3">
                        <button className="p-1 rounded-full hover:bg-gray-800">
                          <RefreshCw size={16} />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-800">
                          <Copy size={16} />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-800">
                          <ThumbsUp size={16} />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-800">
                          <ThumbsDown size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* PDF Results */}
                {message.role === 'assistant' && pdfResults.length > 0 && (
                  <div className="mt-6 ml-12">
                    <h4 className="text-sm font-medium mb-3">Research Documents</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pdfResults.map((pdf) => (
                        <div 
                          key={pdf.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedPDF?.id === pdf.id 
                              ? 'border-blue-500 bg-blue-500/10' 
                              : 'border-grok-border hover:border-grok-muted-foreground'
                          }`}
                          onClick={() => onSelectPDF(pdf)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-10 h-14 bg-grok-accent rounded overflow-hidden">
                              {pdf.thumbnailUrl ? (
                                <img 
                                  src={pdf.thumbnailUrl} 
                                  alt="PDF thumbnail" 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <FileText className="h-5 w-5 text-grok-muted-foreground" />
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-sm truncate">{pdf.title}</h5>
                              <p className="text-xs text-grok-muted-foreground truncate">
                                {pdf.authors.join(', ')}
                              </p>
                              <p className="text-xs text-grok-muted-foreground mt-1">
                                {pdf.publishedDate} • {pdf.pages} pages
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-4">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="/lovable-uploads/426621a3-cb25-4284-b6e6-781a1d6a0456.png" />
                  <AvatarFallback className="bg-grok-accent">AI</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse delay-100"></div>
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* PDF Viewer inline */}
            {selectedPDF && (
              <div className="mt-6 mb-8 w-full">
                <PDFViewer 
                  document={selectedPDF} 
                  onClose={() => onSelectPDF(null)} 
                  embedded={true}
                />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
