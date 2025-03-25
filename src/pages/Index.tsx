import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ResearchModes from '@/components/ResearchModes';
import Chat from '@/components/Chat';
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

const WELCOME_MESSAGE: Message = {
  id: uuidv4(),
  content: 'Good evening. How can I help you today?',
  role: 'assistant',
  timestamp: new Date()
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
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
  const [greeting, setGreeting] = useState('Good evening');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

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
    const userMessage: Message = {
      id: uuidv4(),
      content: query,
      role: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    
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
    
    setTimeout(() => {
      setSearchProgress(100);
      
      setTimeout(() => {
        const response: Message = {
          id: uuidv4(),
          content: generateMockResponse(query, mode),
          role: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, response]);
        setIsSearching(false);
        
        if (mode === 'deep-search') {
          setPdfResults(MOCK_PDFS);
        }
      }, 500);
    }, 1500);
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

  return (
    <div className="min-h-screen flex flex-col bg-grok text-grok-foreground">
      <Header />
      
      <main className="flex-1 pt-16 pb-8 px-4">
        <div className="max-w-5xl mx-auto pt-20 pb-10 flex flex-col items-center">
          {messages.length === 1 && (
            <div className="text-center mb-10 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-3">{greeting}.</h2>
              <p className="text-xl text-grok-muted-foreground">How can I help you today?</p>
            </div>
          )}
          
          <SearchBar 
            onSearch={handleSearch} 
            selectedMode={selectedMode}
          />
          
          <ResearchModes
            onSelectMode={setSelectedMode}
            selectedMode={selectedMode}
          />
          
          {isSearching && (
            <div className="w-full max-w-3xl mt-6 px-4 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-grok-muted-foreground">
                  {selectedMode.name === 'DeepSearch' ? 'Searching research databases...' : 'Analyzing information...'}
                </p>
                <span className="text-sm text-grok-muted-foreground">{Math.round(searchProgress)}%</span>
              </div>
              <Progress value={searchProgress} className="h-1 bg-grok-border" />
            </div>
          )}
          
          <Chat 
            messages={messages.slice(messages.length > 1 ? 1 : 0)}
            pdfResults={pdfResults}
            isLoading={isSearching}
            selectedPDF={selectedPDF}
            onSelectPDF={setSelectedPDF}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
