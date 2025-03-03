
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Download, ExternalLink, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { PDFDocument } from '@/lib/types';

// Mock PDF documents (same as in Index.tsx for this demo)
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

const PDFView = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<PDFDocument | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch the PDF data from an API
    const foundDoc = MOCK_PDFS.find(doc => doc.id === id);
    
    // Simulate loading delay
    setTimeout(() => {
      setDocument(foundDoc || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleNextPage = () => {
    if (document && currentPage < document.pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-grok text-grok-foreground">
        <Header />
        <main className="flex-1 pt-24 pb-8 px-4 flex items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="flex space-x-2 justify-center">
              <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></div>
              <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse delay-100"></div>
              <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse delay-200"></div>
            </div>
            <p className="text-grok-muted-foreground">Loading document...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen flex flex-col bg-grok text-grok-foreground">
        <Header />
        <main className="flex-1 pt-24 pb-8 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Document Not Found</h2>
            <p className="text-grok-muted-foreground mb-6">The document you requested could not be found.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // This would normally render actual PDF content as HTML
  // For this demo, we'll use placeholder content
  const getPageContent = () => {
    return (
      <div className="prose prose-invert max-w-none">
        <h1 className="text-2xl font-bold">{document.title}</h1>
        <div className="flex flex-wrap gap-2 my-4">
          {document.authors.map((author, idx) => (
            <span key={idx} className="px-2 py-1 bg-grok-accent rounded-full text-sm">
              {author}
            </span>
          ))}
        </div>
        
        <div className="flex items-center text-sm text-grok-muted-foreground mb-6">
          <span>{document.source}</span>
          <span className="mx-2">•</span>
          <span>{document.publishedDate}</span>
        </div>
        
        <h2>Abstract</h2>
        <p className="text-grok-muted-foreground">{document.abstract}</p>
        
        <h2>Page {currentPage} Content</h2>
        <p>
          This is a simulated view of page {currentPage} from the document.
          In a real implementation, this would be actual HTML content rendered from the PDF.
        </p>
        
        {/* Simulated content */}
        <h3>Section {currentPage}.1</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
          nisi vel consectetur euismod, nisi nisl consectetur nisi, euismod nisi vel 
          consectetur euismod, nisi nisl consectetur nisi, euismod nisi vel consectetur.
        </p>
        
        <h3>Section {currentPage}.2</h3>
        <p>
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac 
          turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor 
          sit amet, ante. Donec eu libero sit amet quam egestas semper.
        </p>
        
        <h3>Section {currentPage}.3</h3>
        <p>
          Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est 
          et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, 
          ornare sit amet, wisi.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-grok text-grok-foreground">
      <Header />
      
      <main className="flex-1 pt-24 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" /> Open External
              </Button>
            </div>
          </div>
          
          <div className="bg-grok-muted border border-grok-border rounded-lg overflow-hidden shadow-xl pdf-appear">
            <div className="p-8">
              {getPageContent()}
            </div>
            
            <div className="flex items-center justify-between p-4 border-t border-grok-border">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= document.pages) {
                      setCurrentPage(page);
                    }
                  }}
                  className="w-12 bg-grok-accent border border-grok-border rounded text-center"
                  min={1}
                  max={document.pages}
                />
                <span className="text-sm text-grok-muted-foreground">
                  of {document.pages}
                </span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleNextPage}
                disabled={currentPage === document.pages}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PDFView;
