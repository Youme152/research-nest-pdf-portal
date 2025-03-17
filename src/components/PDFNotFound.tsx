
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PDFNotFound = () => {
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
};

export default PDFNotFound;
