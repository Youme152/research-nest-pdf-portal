
import Header from '@/components/Header';

const PDFLoadingState = () => {
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
};

export default PDFLoadingState;
