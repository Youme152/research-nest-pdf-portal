
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Recycle, Leaf, Heart, BarChart, Globe, Award, 
  ShieldCheck, Users, Sparkles
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
      icon: <Recycle className="h-3 w-3 mr-1" />,
      label: 'ZERO WASTE PRODUCT',
      color: 'bg-[#F8C1B8] text-black hover:bg-[#F8C1B8]/90'
    },
    'low-impact': { 
      icon: <BarChart className="h-3 w-3 mr-1" />,
      label: 'LOW IMPACT',
      color: 'bg-[#B5EAE4] text-black hover:bg-[#B5EAE4]/90'
    },
    'biodegradable': { 
      icon: <Leaf className="h-3 w-3 mr-1" />,
      label: 'BIODEGRADABLE',
      color: 'bg-[#BEDA86] text-black hover:bg-[#BEDA86]/90'
    },
    'recycled': { 
      icon: <Recycle className="h-3 w-3 mr-1" />,
      label: 'RECYCLED PRODUCT',
      color: 'bg-[#FFC876] text-black hover:bg-[#FFC876]/90'
    },
    'women-owned': { 
      icon: <Users className="h-3 w-3 mr-1" />,
      label: 'WOMEN OWNED',
      color: 'bg-[#FF95A8] text-black hover:bg-[#FF95A8]/90'
    },
    'black-owned': { 
      icon: <Users className="h-3 w-3 mr-1" />,
      label: 'BLACK OWNED',
      color: 'bg-[#FFA064] text-black hover:bg-[#FFA064]/90'
    },
    'indigenous-owned': { 
      icon: <Globe className="h-3 w-3 mr-1" />,
      label: 'INDIGENOUS OWNED',
      color: 'bg-[#5CE1D0] text-black hover:bg-[#5CE1D0]/90'
    },
    'bipoc-owned': { 
      icon: <Users className="h-3 w-3 mr-1" />,
      label: 'BIPOC OWNED',
      color: 'bg-[#94BDFF] text-black hover:bg-[#94BDFF]/90'
    },
    'latinx-owned': { 
      icon: <Globe className="h-3 w-3 mr-1" />,
      label: 'LATINX OWNED',
      color: 'bg-[#8FC7FF] text-black hover:bg-[#8FC7FF]/90'
    },
    'lgbtq-owned': { 
      icon: <Heart className="h-3 w-3 mr-1" />,
      label: 'LGBTQ+ OWNED',
      color: 'bg-[#D6ABFF] text-black hover:bg-[#D6ABFF]/90'
    },
    'give-back': { 
      icon: <Heart className="h-3 w-3 mr-1" />,
      label: 'GIVE BACK',
      color: 'bg-[#FFA6DB] text-black hover:bg-[#FFA6DB]/90'
    },
    'ethical': { 
      icon: <ShieldCheck className="h-3 w-3 mr-1" />,
      label: 'CERTIFIED ETHICAL',
      color: 'bg-[#FFBE7D] text-black hover:bg-[#FFBE7D]/90'
    },
    'vegan': { 
      icon: <Leaf className="h-3 w-3 mr-1" />,
      label: 'VEGAN',
      color: 'bg-[#C2F87A] text-black hover:bg-[#C2F87A]/90'
    },
    'cruelty-free': { 
      icon: <Leaf className="h-3 w-3 mr-1" />,
      label: 'CRUELTY-FREE',
      color: 'bg-[#FFE079] text-black hover:bg-[#FFE079]/90'
    }
  };

  return configs[category] || {
    icon: <Sparkles className="h-3 w-3 mr-1" />,
    label: category.toUpperCase().replace(/-/g, ' '),
    color: 'bg-[#E5DEFF] text-black hover:bg-[#E5DEFF]/90'
  };
};

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { icon, label, color } = getCategoryConfig(category);

  return (
    <Badge 
      className={`rounded-full px-3 py-1 text-xs font-medium flex items-center whitespace-nowrap ${color}`}
      variant="outline"
    >
      {icon}
      {label}
    </Badge>
  );
};

export default CategoryBadge;
