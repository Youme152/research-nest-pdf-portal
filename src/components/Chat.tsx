
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PDFDocument } from '@/lib/types';
import PDFViewer from './PDFViewer';
import { FileText, MessageSquare } from 'lucide-react';

interface ChatProps {
  messages: Message[];
  pdfResults?: PDFDocument[];
  isLoading?: boolean;
  selectedPDF?: PDFDocument | null;
  onSelectPDF: (pdf: PDFDocument | null) => void;
}

const YOUTUBE_ANALYTICS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Analytics Report</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f9f9f7;
            font-family: 'Montserrat', sans-serif;
            color: #333;
            line-height: 1.6;
            max-width: 1920px;
            height: 1080px;
            overflow-x: hidden;
        }
        
        .container {
            width: 90%;
            max-width: 1800px;
            margin: 0 auto;
            padding: 20px 0;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 1px solid #e6e6e2;
            padding-bottom: 15px;
        }
        
        .header h1 {
            font-size: 42px;
            margin-bottom: 10px;
            color: #333;
            font-weight: 600;
        }
        
        .header h1 span {
            font-family: 'Playfair Display', serif;
            font-style: italic;
            color: #333;
        }
        
        .subtitle {
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 18px;
            margin-bottom: 30px;
            color: #777;
            font-weight: 500;
        }
        
        .content-wrapper {
            display: flex;
            justify-content: space-between;
            gap: 30px;
        }
        
        .left-content {
            flex: 0 0 58%;
        }
        
        .right-content {
            flex: 0 0 38%;
        }
        
        .section-title {
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 22px;
            font-weight: 600;
            margin-top: 30px;
            margin-bottom: 15px;
            border-left: 6px solid #bdb8a7;
            padding-left: 15px;
            color: #333;
        }
        
        .section-description {
            font-size: 16px;
            color: #666;
            margin-bottom: 20px;
            line-height: 1.5;
            font-weight: 400;
        }
        
        .video-list {
            margin-bottom: 30px;
        }
        
        .video {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            transition: transform 0.3s ease;
        }
        
        .video:hover {
            transform: scale(1.02);
        }
        
        .video-thumb {
            width: 280px;
            height: 157px;
            background-color: #e6e6e2;
            margin-right: 20px;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .video-info {
            flex-grow: 1;
        }
        
        .video-title {
            font-weight: 600;
            font-size: 20px;
            margin-bottom: 10px;
            color: #2c3e50;
        }
        
        .video-meta {
            font-size: 16px;
            color: #666;
            font-weight: 400;
        }
        
        .views-highlight {
            display: inline-flex;
            align-items: center;
            font-weight: 600;
            color: #2ECC71;
        }
        
        .views-circle {
            width: 10px;
            height: 10px;
            background-color: #2ECC71;
            border-radius: 50%;
            margin-right: 6px;
        }
        
        .keywords-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .keyword {
            background-color: #FFFDF0;
            border: 2px solid #FFD700;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            font-size: 18px;
            font-weight: 600;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            transition: transform 0.3s ease;
        }
        
        .keyword:hover {
            transform: scale(1.05);
        }
        
        .topics-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
        }
        
        .topic {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            transition: transform 0.3s ease;
        }
        
        .topic:hover {
            transform: scale(1.03);
        }
        
        .topic-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .topic-name {
            font-weight: 600;
            font-size: 20px;
            color: #2c3e50;
        }
        
        .topic-views {
            border: 1px solid #2ECC71;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
            white-space: nowrap;
            color: #2ECC71;
            font-weight: 500;
        }
        
        .topic-desc {
            font-size: 16px;
            color: #666;
            margin-bottom: 15px;
            font-weight: 400;
        }
        
        .bar-bg {
            height: 8px;
            background-color: #ecf0f1;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .bar-fill {
            height: 100%;
            background-color: #2ECC71;
            border-radius: 4px;
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #999;
            font-size: 14px;
            padding-top: 15px;
            border-top: 1px solid #e6e6e2;
            font-weight: 400;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>YouTube <span>Viral</span> Analytics</h1>
        </div>
        
        <div class="subtitle">
            Content Trend Analysis • March 2025
        </div>
        
        <div class="content-wrapper">
            <div class="left-content">
                <div class="section-title">Top Performing Videos</div>
                <div class="section-description">
                    The following videos have achieved the highest view counts across YouTube in the analyzed dataset, ranked by total views.
                </div>
                
                <div class="video-list">
                    <div class="video">
                        <img class="video-thumb" src="https://i.ytimg.com/vi/80LDW55HF9s/maxresdefault.jpg" alt="Thumbnail">
                        <div class="video-info">
                            <div class="video-title">1. JD Vance is cooking</div>
                            <div class="video-meta">
                                <span class="views-highlight">
                                    <span class="views-circle"></span>
                                    674.9K views
                                </span> • Asmongold TV
                            </div>
                        </div>
                    </div>

                    <div class="video">
                        <img class="video-thumb" src="https://i.ytimg.com/vi/7QVpXP0YZAI/maxresdefault.jpg" alt="Thumbnail">
                        <div class="video-info">
                            <div class="video-title">2. Couples Cooking Challenge ft. Azlan & Warisha</div>
                            <div class="video-meta">
                                <span class="views-highlight">
                                    <span class="views-circle"></span>
                                    117.5K views
                                </span> • Shahveer Jafry
                            </div>
                        </div>
                    </div>

                    <div class="video">
                        <img class="video-thumb" src="https://i.ytimg.com/vi/8zIhtn0MMWs/maxresdefault.jpg" alt="Thumbnail">
                        <div class="video-info">
                            <div class="video-title">3. Everyone's Favorite Authentic ENCHILADAS ROJAS | Red Enchiladas</div>
                            <div class="video-meta">
                                <span class="views-highlight">
                                    <span class="views-circle"></span>
                                    41K views
                                </span> • Cooking Con Claudia
                            </div>
                        </div>
                    </div>

                    <div class="video">
                        <img class="video-thumb" src="https://i.ytimg.com/vi/wEayNBBar-0/maxresdefault.jpg" alt="Thumbnail">
                        <div class="video-info">
                            <div class="video-title">4. Cooking While Handcuffed 😧</div>
                            <div class="video-meta">
                                <span class="views-highlight">
                                    <span class="views-circle"></span>
                                    35.5K views
                                </span> • Jayla and Aydah
                            </div>
                        </div>
                    </div>

                    <div class="video">
                        <img class="video-thumb" src="https://i.ytimg.com/vi/sxtjLIcLegA/maxresdefault.jpg" alt="Thumbnail">
                        <div class="video-info">
                            <div class="video-title">5. COOKING ALL OF EGAL ARSENAL EXCUSES!</div>
                            <div class="video-meta">
                                <span class="views-highlight">
                                    <span class="views-circle"></span>
                                    29.1K views
                                </span> • Don Husam
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="right-content">
                <div class="section-title">Trending Keywords</div>
                <div class="section-description">
                    These keywords appeared most frequently in viral YouTube content, showing strong correlation with high engagement metrics.
                </div>
                
                <div class="keywords-grid">
                    <div class="keyword">1. cooking</div>
                    <div class="keyword">2. recipe</div>
                    <div class="keyword">3. food</div>
                    <div class="keyword">4. challenge</div>
                    <div class="keyword">5. authentic</div>
                    <div class="keyword">6. enchiladas</div>
                    <div class="keyword">7. handcuffed</div>
                    <div class="keyword">8. couples</div>
                    <div class="keyword">9. arsenal</div>
                </div>

                <div class="section-title">Content Topics</div>
                <div class="section-description">
                    These broader content categories show consistent performance across YouTube.
                </div>
                
                <div class="topics-grid">
                    <div class="topic">
                        <div class="topic-header">
                            <div class="topic-name">1. Entertainment</div>
                            <div class="topic-views">827.5K views</div>
                        </div>
                        <div class="topic-desc">Diverse content ranging from cooking challenges to sports commentary.</div>
                        <div class="bar-bg">
                            <div class="bar-fill" style="width: 100%;"></div>
                        </div>
                    </div>

                    <div class="topic">
                        <div class="topic-header">
                            <div class="topic-name">2. Cooking</div>
                            <div class="topic-views">194K views</div>
                        </div>
                        <div class="topic-desc">Authentic recipes and creative cooking challenges.</div>
                        <div class="bar-bg">
                            <div class="bar-fill" style="width: 23.4%;"></div>
                        </div>
                    </div>

                    <div class="topic">
                        <div class="topic-header">
                            <div class="topic-name">3. Lifestyle</div>
                            <div class="topic-views">153K views</div>
                        </div>
                        <div class="topic-desc">Couple challenges and unique cooking setups.</div>
                        <div class="bar-bg">
                            <div class="bar-fill" style="width: 18.5%;"></div>
                        </div>
                    </div>

                    <div class="topic">
                        <div class="topic-header">
                            <div class="topic-name">4. Sports Commentary</div>
                            <div class="topic-views">29.1K views</div>
                        </div>
                        <div class="topic-desc">Analysis of sports events and commentary.</div>
                        <div class="bar-bg">
                            <div class="bar-fill" style="width: 3.5%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            Generated by Behind Agency • March 2025
        </div>
    </div>
</body>
</html>`;

const Chat = ({ 
  messages, 
  pdfResults = [], 
  isLoading = false, 
  selectedPDF, 
  onSelectPDF 
}: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0 && !isLoading) {
    return null;
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to detect if content is HTML
  const isHTML = (content: string) => {
    return content.trim().startsWith('<!DOCTYPE html>') || 
           content.trim().startsWith('<html') || 
           (content.includes('<') && content.includes('>') && 
            (content.includes('<div') || content.includes('<p') || 
             content.includes('<span') || content.includes('<h')));
  };

  // Function to render content based on role and type
  const renderContent = (content: string, role: 'user' | 'assistant', messageId: string) => {
    // If a message is selected and it's this message, replace with HTML demo
    if (selectedMessage === messageId) {
      return (
        <div className="w-full overflow-auto border border-gray-200 rounded-lg">
          <iframe
            title="HTML Content"
            srcDoc={YOUTUBE_ANALYTICS_HTML}
            className="w-full h-[600px] border-0"
            sandbox="allow-scripts"
          />
        </div>
      );
    }
    
    // Only render HTML for assistant messages
    if (role === 'assistant' && isHTML(content)) {
      return (
        <div className="w-full overflow-auto border border-gray-200 rounded-lg">
          <iframe
            title="HTML Content"
            srcDoc={content}
            className="w-full h-[600px] border-0"
            sandbox="allow-scripts"
          />
        </div>
      );
    }
    
    // For user messages or non-HTML assistant messages
    return <div className="prose prose-invert max-w-none whitespace-pre-wrap">{content}</div>;
  };

  // Handle clicking on a message
  const handleMessageClick = (messageId: string) => {
    if (selectedMessage === messageId) {
      setSelectedMessage(null);
    } else {
      setSelectedMessage(messageId);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-fade-in">
      <div className="space-y-8">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className="w-full"
          >
            <div 
              className={`flex items-start space-x-4 ${message.role === 'user' ? '' : 'cursor-pointer hover:bg-gray-800/10 p-2 rounded-lg transition-colors'}`}
              onClick={message.role === 'user' ? undefined : () => handleMessageClick(message.id)}
            >
              <Avatar className="h-10 w-10 mt-1">
                {message.role === 'assistant' ? (
                  <>
                    <AvatarImage src="/lovable-uploads/426621a3-cb25-4284-b6e6-781a1d6a0456.png" />
                    <AvatarFallback className="bg-grok-accent">AI</AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-blue-600">You</AvatarFallback>
                  </>
                )}
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center">
                  <span className="font-medium text-sm">
                    {message.role === 'assistant' ? 'ResearchNest' : 'You'}
                  </span>
                  <span className="ml-2 text-xs text-grok-muted-foreground">
                    {formatTime(message.timestamp)}
                  </span>
                  {message.role === 'assistant' && (
                    <span className="ml-auto flex items-center text-xs text-grok-muted-foreground">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Click to view demo
                    </span>
                  )}
                </div>
                
                {renderContent(message.content, message.role, message.id)}
              </div>
            </div>
            
            {/* PDF Results */}
            {message.role === 'assistant' && pdfResults.length > 0 && (
              <div className="mt-6 ml-14">
                <h4 className="text-sm font-medium mb-3">Research Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pdfResults.map((pdf) => (
                    <div 
                      key={pdf.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedPDF?.id === pdf.id 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-grok-border hover:border-grok-muted-foreground'
                      }`}
                      onClick={() => onSelectPDF(pdf)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-12 h-16 bg-grok-accent rounded overflow-hidden">
                          {pdf.thumbnailUrl ? (
                            <img 
                              src={pdf.thumbnailUrl} 
                              alt="PDF thumbnail" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <FileText className="h-6 w-6 text-grok-muted-foreground" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-sm truncate">{pdf.title}</h5>
                          <p className="text-xs text-grok-muted-foreground truncate">
                            {pdf.authors.join(', ')}
                          </p>
                          <p className="text-xs text-grok-muted-foreground mt-1">
                            {pdf.publishedDate} • {pdf.pages} pages
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start space-x-4">
            <Avatar className="h-10 w-10 mt-1">
              <AvatarImage src="/lovable-uploads/426621a3-cb25-4284-b6e6-781a1d6a0456.png" />
              <AvatarFallback className="bg-grok-accent">AI</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-medium text-sm">ResearchNest</span>
              </div>
              <div className="flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse delay-100"></div>
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {selectedPDF && (
        <PDFViewer 
          document={selectedPDF} 
          onClose={() => onSelectPDF(null)} 
        />
      )}
    </div>
  );
};

export default Chat;
