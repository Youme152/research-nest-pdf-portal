
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PDFDocument } from '@/lib/types';
import PDFViewer from './PDFViewer';
import { FileText } from 'lucide-react';

interface ChatProps {
  messages: Message[];
  pdfResults?: PDFDocument[];
  isLoading?: boolean;
  selectedPDF?: PDFDocument | null;
  onSelectPDF: (pdf: PDFDocument | null) => void;
}

const Chat = ({ 
  messages, 
  pdfResults = [], 
  isLoading = false, 
  selectedPDF, 
  onSelectPDF 
}: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0 && !isLoading) {
    return null;
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-fade-in">
      <div className="space-y-8">
        {messages.map((message) => (
          <div key={message.id} className="w-full">
            <div className="flex items-start space-x-4">
              <Avatar className="h-10 w-10 mt-1">
                {message.role === 'assistant' ? (
                  <>
                    <AvatarImage src="/lovable-uploads/426621a3-cb25-4284-b6e6-781a1d6a0456.png" />
                    <AvatarFallback className="bg-grok-accent">AI</AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-blue-600">You</AvatarFallback>
                  </>
                )}
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center">
                  <span className="font-medium text-sm">
                    {message.role === 'assistant' ? 'ResearchNest' : 'You'}
                  </span>
                  <span className="ml-2 text-xs text-grok-muted-foreground">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  {message.content}
                </div>
              </div>
            </div>
            
            {/* PDF Results */}
            {message.role === 'assistant' && pdfResults.length > 0 && (
              <div className="mt-6 ml-14">
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
                        <div className="flex-shrink-0 w-12 h-16 bg-grok-accent rounded overflow-hidden">
                          {pdf.thumbnailUrl ? (
                            <img 
                              src={pdf.thumbnailUrl} 
                              alt="PDF thumbnail" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <FileText className="h-6 w-6 text-grok-muted-foreground" />
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
            <Avatar className="h-10 w-10 mt-1">
              <AvatarImage src="/lovable-uploads/426621a3-cb25-4284-b6e6-781a1d6a0456.png" />
              <AvatarFallback className="bg-grok-accent">AI</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-medium text-sm">ResearchNest</span>
              </div>
              <div className="flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse delay-100"></div>
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {selectedPDF && (
        <PDFViewer 
          document={selectedPDF} 
          onClose={() => onSelectPDF(null)} 
        />
      )}
    </div>
  );
};

export default Chat;
