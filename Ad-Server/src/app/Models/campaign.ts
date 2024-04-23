export interface Campaign {
    name: string;
    description: string;
    category: string;
    target: string;
    demography: string;
    budget: number;
    mediaType: 'video' | 'photo';
    adSpaceType: 'banner' | 'sidebar' | 'fullscreen';
    file: File;
  }
  