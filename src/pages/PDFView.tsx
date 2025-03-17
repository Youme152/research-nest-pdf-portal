import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { PDFDocument } from '@/lib/types';
import PDFContent from '@/components/PDFContent';
import PDFPageNavigation from '@/components/PDFPageNavigation';
import PDFActions from '@/components/PDFActions';
import PDFLoadingState from '@/components/PDFLoadingState';
import PDFNotFound from '@/components/PDFNotFound';

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

  if (loading) {
    return <PDFLoadingState />;
  }

  if (!document) {
    return <PDFNotFound />;
  }

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
            
            <PDFActions documentUrl={document.url} />
          </div>
          
          <div className="bg-grok-muted border border-grok-border rounded-lg overflow-hidden shadow-xl pdf-appear">
            <div className="p-8">
              <PDFContent document={document} currentPage={currentPage} />
            </div>
            
            <PDFPageNavigation 
              currentPage={currentPage} 
              totalPages={document.pages} 
              onPageChange={setCurrentPage} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PDFView;
