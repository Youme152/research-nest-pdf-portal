
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Download, ExternalLink, FileText } from 'lucide-react';
import { PDFDocument } from '@/lib/types';
import { Link } from 'react-router-dom';

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
      <div className="prose max-w-none text-gray-200">
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
    <div className="w-full max-w-4xl mx-auto my-6 pdf-appear">
      <Card className="bg-gray-900 border-gray-700 overflow-hidden shadow-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-400" />
            <h3 className="font-semibold truncate text-gray-200">{document.title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:bg-gray-800" onClick={() => window.open(document.url, '_blank')}>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:bg-gray-800">
              <Download className="h-4 w-4" />
            </Button>
            <Link to={`/pdf/${document.id}`}>
              <Button variant="secondary" size="sm" className="bg-gray-800 text-gray-200 hover:bg-gray-700">Open Full View</Button>
            </Link>
          </div>
        </div>
        
        <CardContent className="p-6 min-h-[400px] bg-gray-900">
          {getPageContent()}
        </CardContent>
        
        <div className="flex items-center justify-between p-4 border-t border-gray-700 bg-gray-800">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="text-gray-300 hover:bg-gray-700"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          
          <span className="text-sm text-gray-400">
            Page {currentPage} of {document.pages}
          </span>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleNextPage}
            disabled={currentPage === document.pages}
            className="text-gray-300 hover:bg-gray-700"
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PDFViewer;
