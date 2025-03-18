
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Recycle, Leaf, Heart, BarChart, Globe, Award, 
  ShieldCheck, Users, Sparkles, Paw 
} from 'lucide-react';

type CategoryType = 
  | 'zero-waste' 
  | 'low-impact' 
  | 'biodegradable' 
  | 'recycled' 
  | 'women-owned' 
  | 'black-owned' 
  | 'indigenous-owned' 
  | 'bipoc-owned' 
  | 'latinx-owned' 
  | 'lgbtq-owned' 
  | 'give-back' 
  | 'ethical' 
  | 'vegan' 
  | 'cruelty-free'
  | string;

interface CategoryBadgeProps {
  category: CategoryType;
}

const getCategoryConfig = (category: CategoryType) => {
  const configs = {
    'zero-waste': { 
      icon: <Recycle className="h-3.5 w-3.5 mr-1" />,
      label: 'ZERO WASTE PRODUCT',
      color: 'bg-[#F8C1B8] text-[#5A201C] hover:bg-[#F8C1B8]/90'
    },
    'low-impact': { 
      icon: <BarChart className="h-3.5 w-3.5 mr-1" />,
      label: 'LOW IMPACT',
      color: 'bg-[#B5EAE4] text-[#1A4D47] hover:bg-[#B5EAE4]/90'
    },
    'biodegradable': { 
      icon: <Leaf className="h-3.5 w-3.5 mr-1" />,
      label: 'BIODEGRADABLE',
      color: 'bg-[#BEDA86] text-[#374716] hover:bg-[#BEDA86]/90'
    },
    'recycled': { 
      icon: <Recycle className="h-3.5 w-3.5 mr-1" />,
      label: 'RECYCLED PRODUCT',
      color: 'bg-[#FFC876] text-[#784A0D] hover:bg-[#FFC876]/90'
    },
    'women-owned': { 
      icon: <Users className="h-3.5 w-3.5 mr-1" />,
      label: 'WOMEN OWNED',
      color: 'bg-[#FF95A8] text-[#761A2C] hover:bg-[#FF95A8]/90'
    },
    'black-owned': { 
      icon: <Users className="h-3.5 w-3.5 mr-1" />,
      label: 'BLACK OWNED',
      color: 'bg-[#FFA064] text-[#7A3812] hover:bg-[#FFA064]/90'
    },
    'indigenous-owned': { 
      icon: <Globe className="h-3.5 w-3.5 mr-1" />,
      label: 'INDIGENOUS OWNED',
      color: 'bg-[#5CE1D0] text-[#0B4C44] hover:bg-[#5CE1D0]/90'
    },
    'bipoc-owned': { 
      icon: <Users className="h-3.5 w-3.5 mr-1" />,
      label: 'BIPOC OWNED',
      color: 'bg-[#94BDFF] text-[#0A3B8C] hover:bg-[#94BDFF]/90'
    },
    'latinx-owned': { 
      icon: <Globe className="h-3.5 w-3.5 mr-1" />,
      label: 'LATINX OWNED',
      color: 'bg-[#8FC7FF] text-[#0E487A] hover:bg-[#8FC7FF]/90'
    },
    'lgbtq-owned': { 
      icon: <Heart className="h-3.5 w-3.5 mr-1" />,
      label: 'LGBTQ+ OWNED',
      color: 'bg-[#D6ABFF] text-[#442160] hover:bg-[#D6ABFF]/90'
    },
    'give-back': { 
      icon: <Heart className="h-3.5 w-3.5 mr-1" />,
      label: 'GIVE BACK',
      color: 'bg-[#FFA6DB] text-[#7C1451] hover:bg-[#FFA6DB]/90'
    },
    'ethical': { 
      icon: <ShieldCheck className="h-3.5 w-3.5 mr-1" />,
      label: 'CERTIFIED ETHICAL',
      color: 'bg-[#FFBE7D] text-[#7A450F] hover:bg-[#FFBE7D]/90'
    },
    'vegan': { 
      icon: <Leaf className="h-3.5 w-3.5 mr-1" />,
      label: 'VEGAN',
      color: 'bg-[#C2F87A] text-[#365811] hover:bg-[#C2F87A]/90'
    },
    'cruelty-free': { 
      icon: <Paw className="h-3.5 w-3.5 mr-1" />,
      label: 'CRUELTY-FREE',
      color: 'bg-[#FFE079] text-[#7A5908] hover:bg-[#FFE079]/90'
    }
  };

  return configs[category] || {
    icon: <Sparkles className="h-3.5 w-3.5 mr-1" />,
    label: category.toUpperCase().replace(/-/g, ' '),
    color: 'bg-[#E5DEFF] text-[#3B2A7E] hover:bg-[#E5DEFF]/90'
  };
};

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { icon, label, color } = getCategoryConfig(category);

  return (
    <Badge 
      className={`rounded-full px-3 py-1 text-xs font-medium flex items-center whitespace-nowrap ${color}`}
    >
      {icon}
      {label}
    </Badge>
  );
};

export default CategoryBadge;
