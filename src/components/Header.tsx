
import { Menu, Bell, Settings } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-6 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-4 text-gray-800 hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
          ORA -1
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-gray-800 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-800 hover:bg-gray-100">
          <Settings className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8 transition-all hover:ring-2 hover:ring-gray-300">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-gray-200 text-gray-800">CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
