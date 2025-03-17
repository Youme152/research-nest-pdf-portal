
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';

interface PDFActionsProps {
  documentUrl: string;
}

const PDFActions = ({ documentUrl }: PDFActionsProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" /> Download
      </Button>
      <Button variant="outline" size="sm">
        <ExternalLink className="mr-2 h-4 w-4" /> Open External
      </Button>
    </div>
  );
};

export default PDFActions;
