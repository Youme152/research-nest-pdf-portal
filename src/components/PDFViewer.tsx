
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Download, ExternalLink, FileText, X, ZoomIn, ZoomOut } from 'lucide-react';
import { PDFDocument } from '@/lib/types';
import { Link } from 'react-router-dom';

interface PDFViewerProps {
  document: PDFDocument;
  onClose: () => void;
}

const PDFViewer = ({ document, onClose }: PDFViewerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate PDF loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [document.id]);

  const handleNextPage = () => {
    if (currentPage < document.pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  // This would normally be HTML content rendered from a PDF
  // For now, we'll simulate it with placeholder content
  const getPageContent = () => {
    return (
      <div className="prose prose-invert max-w-none" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', transition: 'transform 0.2s ease' }}>
        <h2 className="text-xl font-bold mb-4">Page {currentPage} of {document.title}</h2>
        
        <div className="bg-white/5 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Abstract</h3>
          <p className="text-sm text-grok-muted-foreground">
            {document.abstract}
          </p>
        </div>
        
        <div className="bg-white/5 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Section {currentPage}.1</h3>
          <p>
            This is simulated content for page {currentPage}. In a real implementation, this would be actual rendered PDF content. The content would vary based on the page number and document structure.
          </p>
        </div>
        
        <div className="bg-white/5 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Section {currentPage}.2</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur euismod, nisi nisl consectetur nisi, euismod nisi vel consectetur.
          </p>
        </div>
        
        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Section {currentPage}.3</h3>
          <p>
            Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae.
          </p>
        </div>
        
        <div className="flex items-center mt-6 space-x-2">
          <span className="text-sm text-grok-muted-foreground">Authors:</span>
          {document.authors.map((author, idx) => (
            <span key={idx} className="px-2 py-1 bg-grok-accent/30 rounded-full text-xs">
              {author}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 pdf-appear">
      <Card className="bg-grok-muted border-grok-border overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-grok-border">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-400" />
            <h3 className="font-semibold truncate">{document.title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(document.url, '_blank')}>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
            <Link to={`/pdf/${document.id}`}>
              <Button variant="secondary" size="sm">Open Full View</Button>
            </Link>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-6 min-h-[500px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[400px]">
              <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm text-grok-muted-foreground">Loading document...</p>
            </div>
          ) : (
            <div className="overflow-auto" style={{ maxHeight: '500px' }}>
              {getPageContent()}
            </div>
          )}
        </CardContent>
        
        <div className="flex items-center justify-between p-4 border-t border-grok-border">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            
            <span className="text-sm text-grok-muted-foreground">
              Page {currentPage} of {document.pages}
            </span>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleNextPage}
              disabled={currentPage === document.pages}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleZoomOut} disabled={zoomLevel <= 0.5}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs text-grok-muted-foreground">{Math.round(zoomLevel * 100)}%</span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn} disabled={zoomLevel >= 2}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PDFViewer;
