
import { PDFDocument } from '@/lib/types';

interface PDFContentProps {
  document: PDFDocument;
  currentPage: number;
}

const PDFContent = ({ document, currentPage }: PDFContentProps) => {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-2xl font-bold">{document.title}</h1>
      <div className="flex flex-wrap gap-2 my-4">
        {document.authors.map((author, idx) => (
          <span key={idx} className="px-2 py-1 bg-grok-accent rounded-full text-sm">
            {author}
          </span>
        ))}
      </div>
      
      <div className="flex items-center text-sm text-grok-muted-foreground mb-6">
        <span>{document.source}</span>
        <span className="mx-2">•</span>
        <span>{document.publishedDate}</span>
      </div>
      
      <h2>Abstract</h2>
      <p className="text-grok-muted-foreground">{document.abstract}</p>
      
      <h2>Page {currentPage} Content</h2>
      <p>
        This is a simulated view of page {currentPage} from the document.
        In a real implementation, this would be actual HTML content rendered from the PDF.
      </p>
      
      {/* Simulated content */}
      <h3>Section {currentPage}.1</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
        nisi vel consectetur euismod, nisi nisl consectetur nisi, euismod nisi vel 
        consectetur euismod, nisi nisl consectetur nisi, euismod nisi vel consectetur.
      </p>
      
      <h3>Section {currentPage}.2</h3>
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac 
        turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor 
        sit amet, ante. Donec eu libero sit amet quam egestas semper.
      </p>
      
      <h3>Section {currentPage}.3</h3>
      <p>
        Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est 
        et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, 
        ornare sit amet, wisi.
      </p>
    </div>
  );
};

export default PDFContent;
