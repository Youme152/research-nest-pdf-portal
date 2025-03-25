
import { Menu, Bell, Settings } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { open, setOpen, toggleSidebar } = useSidebar();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-6 bg-grok/90 backdrop-blur-sm border-b border-grok-border">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-4 text-grok-foreground hover:bg-grok-accent"
          onClick={toggleSidebar}
          aria-label={open ? "Close sidebar" : "Open sidebar"}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-medium font-playfair tracking-tight text-yoga-charcoal">
          ORA<span className="text-yoga-peach">-1</span>
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-grok-foreground hover:bg-grok-accent">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-grok-foreground hover:bg-grok-accent">
          <Settings className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8 transition-all hover:ring-2 hover:ring-yoga-peach/20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-yoga-peach text-white">CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
