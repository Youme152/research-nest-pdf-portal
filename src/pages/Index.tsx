
import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import ResearchModes from '@/components/ResearchModes';
import Chat from '@/components/Chat';
import ChatInput from '@/components/ChatInput';
import { Message, ResearchMode, PDFDocument } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

const MOCK_PDFS: PDFDocument[] = [
  {
    id: '1',
    title: 'Advances in Artificial Intelligence and Machine Learning',
    source: 'Journal of AI Research',
    publishedDate: 'Jan 2023',
    abstract: 'This paper reviews recent advances in artificial intelligence and machine learning, with a focus on deep learning techniques and their applications across various domains.',
    authors: ['Jane Smith', 'John Doe'],
    url: '#',
    pages: 24
  },
  {
    id: '2',
    title: 'The Future of Natural Language Processing',
    source: 'IEEE Transactions',
    publishedDate: 'Mar 2023',
    abstract: 'A comprehensive overview of current trends and future directions in natural language processing, including transformers, large language models, and multimodal approaches.',
    authors: ['Alex Johnson', 'Maria Garcia'],
    url: '#',
    pages: 18
  },
  {
    id: '3',
    title: 'Ethical Considerations in AI Development',
    source: 'AI Ethics Journal',
    publishedDate: 'May 2023',
    abstract: 'This paper discusses the ethical implications of artificial intelligence development and deployment, focusing on fairness, accountability, transparency, and potential societal impacts.',
    authors: ['Robert Chen', 'Sarah Williams'],
    url: '#',
    pages: 32
  },
  {
    id: '4',
    title: 'Quantum Computing: State of the Art and Future Prospects',
    source: 'Quantum Computing Review',
    publishedDate: 'Feb 2023',
    abstract: 'An in-depth analysis of the current state of quantum computing technology, recent breakthroughs, and projections for future development and applications.',
    authors: ['David Miller', 'Priya Patel'],
    url: '#',
    pages: 28
  }
];

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || '/api/research';
const SUPABASE_ENDPOINT = "https://zwwofphqttojlgoefhzz.functions.supabase.co/webhook-receiver";

// Sample categories for demo purposes
const SAMPLE_CATEGORIES = [
  ['zero-waste', 'low-impact', 'biodegradable'],
  ['women-owned', 'black-owned', 'indigenous-owned'],
  ['lgbtq-owned', 'give-back', 'ethical'],
  ['vegan', 'cruelty-free', 'recycled']
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [selectedMode, setSelectedMode] = useState<ResearchMode>({
    id: 'deep-search',
    name: 'DeepSearch',
    icon: 'Search',
    description: 'In-depth analysis of specific topics with PDF results'
  });
  const [pdfResults, setPdfResults] = useState<PDFDocument[]>([]);
  const [selectedPDF, setSelectedPDF] = useState<PDFDocument | null>(null);
  const [isConversationStarted, setIsConversationStarted] = useState(false);

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
  }, [isSearching]);

  const handleSearch = async (query: string, mode: string) => {
    if (!isConversationStarted) {
      setIsConversationStarted(true);
    }
    
    const userMessage: Message = {
      id: uuidv4(),
      content: query,
      role: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    setIsSearching(true);
    setPdfResults([]);
    setSelectedPDF(null);
    setSearchProgress(0);
    
    if (mode === 'deep-search') {
      toast({
        title: "Deep Research",
        description: "Analyzing the most relevant information...",
      });
    }

    try {
      let progressInterval = setInterval(() => {
        setSearchProgress(prev => Math.min(prev + 5, 90));
      }, 300);

      let apiResponse;
      try {
        apiResponse = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            mode,
          }),
        });
      } catch (error) {
        console.log("Primary API unavailable, falling back to Supabase:", error);
        apiResponse = await fetch(SUPABASE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-webhook-source': 'research-ui',
          },
          body: JSON.stringify({
            query,
            mode,
            requestTime: new Date().toISOString()
          }),
        });
      }

      clearInterval(progressInterval);
      setSearchProgress(95);

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        
        setTimeout(() => {
          setSearchProgress(100);
          
          // Add random categories for demo purposes
          const randomCategorySet = SAMPLE_CATEGORIES[Math.floor(Math.random() * SAMPLE_CATEGORIES.length)];
          
          const response: Message = {
            id: uuidv4(),
            content: data.content || "I couldn't find specific information on that topic.",
            role: 'assistant',
            timestamp: new Date(),
            categories: randomCategorySet
          };
          
          setMessages(prev => [...prev, response]);
          setIsSearching(false);
          
          if (mode === 'deep-search' && data.documents) {
            setPdfResults(data.documents);
          } else if (mode === 'deep-search') {
            setPdfResults(MOCK_PDFS);
          }
        }, 500);
      } else {
        throw new Error('Failed to get response from API');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Connection Error",
        description: "Couldn't connect to the research API. Using fallback data instead.",
        variant: "destructive",
      });
      
      setTimeout(() => {
        setSearchProgress(100);
        
        setTimeout(() => {
          // Add random categories for demo purposes
          const randomCategorySet = SAMPLE_CATEGORIES[Math.floor(Math.random() * SAMPLE_CATEGORIES.length)];
          
          const response: Message = {
            id: uuidv4(),
            content: generateMockResponse(query, mode),
            role: 'assistant',
            timestamp: new Date(),
            categories: randomCategorySet
          };
          
          setMessages(prev => [...prev, response]);
          setIsSearching(false);
          
          if (mode === 'deep-search') {
            setPdfResults(MOCK_PDFS);
          }
        }, 500);
      }, 1500);
    }
  };

  const generateMockResponse = (query: string, mode: string) => {
    switch (mode) {
      case 'deep-search':
        return `Based on my in-depth research on "${query}", I've found several relevant academic papers. These papers provide comprehensive information on your query, including recent developments, methodologies, and key findings. I've attached the most relevant documents below for your reference.`;
      
      case 'think':
        return `Let me think through "${query}" step by step:\n\n1. First, we need to understand the core concepts involved.\n2. The main factors to consider are X, Y, and Z.\n3. Analyzing the relationships between these factors...\n4. Based on this analysis, we can conclude that...`;
      
      case 'research':
        return `Here's what I found about "${query}":\n\nAccording to recent studies, this topic has gained significant attention in the field. Researchers have identified several key aspects that are worth noting...`;
      
      default:
        return `Here's information about "${query}". Let me know if you'd like to explore any specific aspect in more detail.`;
    }
  };

  const handleSendMessage = (message: string) => {
    handleSearch(message, selectedMode.id);
  };

  const handleSelectPDF = (pdf: PDFDocument | null) => {
    setSelectedPDF(pdf);
  };

  return (
    <div className="min-h-screen flex flex-col bg-grok text-grok-foreground">
      <main className="flex-1 h-full">
        <div className="h-full">
          {!isConversationStarted && (
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
          )}
          
          {isSearching && isConversationStarted && (
            <div className="w-full max-w-[650px] mx-auto mt-6 px-4 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-grok-muted-foreground">
                  {selectedMode.name === 'DeepSearch' ? 'Searching research databases...' : 'Analyzing information...'}
                </p>
                <span className="text-sm text-grok-muted-foreground">{Math.round(searchProgress)}%</span>
              </div>
              <Progress value={searchProgress} className="h-1 bg-grok-border" />
            </div>
          )}
          
          <div className="pb-24">
            <Chat 
              messages={messages}
              pdfResults={pdfResults}
              isLoading={isSearching}
              selectedPDF={selectedPDF}
              onSelectPDF={handleSelectPDF}
              onSendMessage={handleSendMessage}
            />
          </div>

          {isConversationStarted && (
            <ChatInput 
              onSendMessage={handleSendMessage} 
              isLoading={isSearching} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
