
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Download, FileText, X } from 'lucide-react';
import { PDFDocument } from '@/lib/types';

interface PDFViewerProps {
  document: PDFDocument;
  onClose: () => void;
  embedded?: boolean;
}

const PDFViewer = ({ document, onClose, embedded = false }: PDFViewerProps) => {
  const [currentPage, setCurrentPage] = useState(1);

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

  // This would normally be HTML content rendered from a PDF
  const getPageContent = () => {
    return (
      <div className="prose max-w-none">
        <h2 className="text-yoga-charcoal text-2xl font-medium mb-6 font-playfair">Page {currentPage} of PDF Content</h2>
        <p className="text-yoga-charcoal text-lg mb-8 font-sans">
          This is a simulated view of page {currentPage} from the document titled "{document.title}".
          In a real implementation, this would be actual HTML content rendered from the PDF.
        </p>
        <p className="text-yoga-charcoal text-lg mb-8 font-sans">
          {document.abstract}
        </p>
        <p className="text-yoga-charcoal text-lg mb-2 font-sans">
          <strong>Authors:</strong> {document.authors.join(', ')}
        </p>
        <p className="text-yoga-charcoal text-lg font-sans">
          <strong>Published:</strong> {document.publishedDate}
        </p>
      </div>
    );
  };

  const maxWidth = embedded ? 'w-full' : 'max-w-3xl';
  const maxHeight = embedded ? 'max-h-[300px]' : 'max-h-[400px]';

  return (
    <div className={`${maxWidth} mx-auto rounded-xl overflow-hidden border border-grok-border shadow-md bg-white`}>
      {/* Header with title and download button */}
      <div className="flex items-center justify-between py-3 px-4 border-b border-grok-border bg-grok-accent">
        <div className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-yoga-peach" />
          <h3 className="font-medium text-base truncate text-yoga-charcoal font-playfair">{document.title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-grok-muted-foreground hover:text-grok-foreground"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white text-yoga-charcoal hover:bg-grok-muted border-grok-border rounded-lg" 
            onClick={() => window.open(document.url, '_blank')}
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>
      
      {/* PDF Content area */}
      <div className={`${maxHeight} overflow-y-auto p-6 bg-white`}>
        {getPageContent()}
      </div>
      
      {/* Footer with page navigation */}
      <div className="flex items-center justify-between py-2 px-4 border-t border-grok-border bg-grok-accent">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="text-yoga-charcoal hover:bg-white/50"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        
        <span className="text-sm text-yoga-charcoal">
          Page {currentPage} of {document.pages}
        </span>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleNextPage}
          disabled={currentPage === document.pages}
          className="text-yoga-charcoal hover:bg-white/50"
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
