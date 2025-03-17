
import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
  const getPageContent = () => {
    return (
      <div className="prose max-w-none">
        <h2 className="text-white text-2xl font-medium mb-6">Page {currentPage} of PDF Content</h2>
        <p className="text-white text-lg mb-8">
          This is a simulated view of page {currentPage} from the document titled "{document.title}".
          In a real implementation, this would be actual HTML content rendered from the PDF.
        </p>
        <p className="text-white text-lg mb-8">
          {document.abstract}
        </p>
        <p className="text-white text-lg mb-2">
          <strong>Authors:</strong> {document.authors.join(', ')}
        </p>
        <p className="text-white text-lg">
          <strong>Published:</strong> {document.publishedDate}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto my-0 fixed bottom-0 left-0 right-0 top-16 bg-black/80 backdrop-blur-sm z-50">
      <div className="w-full h-full max-w-5xl mx-auto flex flex-col">
        {/* Header with title and download button */}
        <div className="flex items-center justify-between py-4 px-6 border-b border-gray-800">
          <div className="flex items-center">
            <FileText className="h-6 w-6 mr-3 text-blue-400" />
            <h3 className="font-medium text-xl truncate text-white">{document.title}</h3>
          </div>
          <div>
            <Button 
              variant="outline" 
              className="bg-[#101010] text-white hover:bg-gray-900 border-gray-700 rounded-full px-6" 
              onClick={() => window.open(document.url, '_blank')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
        
        {/* PDF Content area */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#121212]">
          {getPageContent()}
        </div>
        
        {/* Footer with page navigation */}
        <div className="flex items-center justify-between py-3 px-6 border-t border-gray-800 bg-[#121212]">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{ boxShadow: 'none', transition: 'none' }}
            className="text-white hover:bg-gray-800"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          
          <span className="text-sm text-white">
            Page {currentPage} of {document.pages}
          </span>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleNextPage}
            disabled={currentPage === document.pages}
            style={{ boxShadow: 'none', transition: 'none' }}
            className="text-white hover:bg-gray-800"
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
