
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Download, FileText } from 'lucide-react';
import { PDFDocument } from '@/lib/types';

interface PDFViewerProps {
  document: PDFDocument;
  onClose: () => void;
}

const PDFViewer = ({ document, onClose }: PDFViewerProps) => {
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
  // For now, we'll simulate it with placeholder content
  const getPageContent = () => {
    return (
      <div className="prose prose-invert max-w-none">
        <h2>Page {currentPage} of PDF Content</h2>
        <p>
          This is a simulated view of page {currentPage} from the document titled "{document.title}".
          In a real implementation, this would be actual HTML content rendered from the PDF.
        </p>
        <p>
          {document.abstract}
        </p>
        <p>
          <strong>Authors:</strong> {document.authors.join(', ')}
        </p>
        <p>
          <strong>Published:</strong> {document.publishedDate}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6">
      <Card className="bg-grok-muted border-grok-border" style={{ boxShadow: 'none' }}>
        <div className="flex items-center justify-between p-4 border-b border-grok-border">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-400" />
            <h3 className="font-semibold truncate">{document.title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => window.open(document.url, '_blank')}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent hover:bg-transparent" 
              size="sm" 
              onClick={() => window.open(document.url, '_blank')}
              style={{ transition: 'none' }}
            >
              Download PDF
            </Button>
          </div>
        </div>
        
        <CardContent className="p-6 min-h-[400px]">
          {getPageContent()}
        </CardContent>
        
        <div className="flex items-center justify-between p-4 border-t border-grok-border">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{ transition: 'none' }}
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
            style={{ transition: 'none' }}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PDFViewer;
