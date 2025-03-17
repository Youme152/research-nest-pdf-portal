
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PDFPageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PDFPageNavigation = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PDFPageNavigationProps) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
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
            if (page >= 1 && page <= totalPages) {
              onPageChange(page);
            }
          }}
          className="w-12 bg-grok-accent border border-grok-border rounded text-center"
          min={1}
          max={totalPages}
        />
        <span className="text-sm text-grok-muted-foreground">
          of {totalPages}
        </span>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default PDFPageNavigation;
