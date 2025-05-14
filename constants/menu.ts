
export interface MenuItem {
  title: string;
  data: MenuItem[];
  id:  string;
  name: string;
  description: string;
  price: number;
  image: string;
  customizations?: string[];
}

export interface MenuSection {
  title: string;
  data: MenuItem[];
}

// Update sample data to match categories


export const menuData: MenuSection[] = [
  /*...*/
  
];

      
