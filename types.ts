
export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: 'MODS' | 'SPEEDRUN' | 'LORE' | 'COMMUNITY' | 'POLITICS';
  imageUrl: string;
}

export interface CharacterStats {
  name: string;
  respect: number;
  stamina: number;
  muscle: number;
  fat: number;
  sexAppeal: number;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}
