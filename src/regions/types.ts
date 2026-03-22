export interface RegionConfig {
  regionName: string;
  subtitle: string;
  targetDate: string;
  heroImage: string;
  location: {
    venue: string;
    city: string;
  };
  registration: {
    status: string;
    url: string;
  };
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  userGroups: Array<{ name: string; url: string }>;
  contact: {
    email: string;
    website: string;
  };
}

export interface Organizer {
  name: string;
  photo: string;
  linkedin: string;
}

export interface Speaker {
  name: string;
  photo: string;
  title: string;
  company: string;
  talk: string;
  bio: string;
  keynote?: boolean;
  social?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface ScheduleItem {
  time: string;
  title: string;
  speaker: string;
  track: string;
}

export interface Sponsor {
  name: string;
  logo: string;
  url: string;
  tier: "diamond" | "gold" | "silver" | "bronze" | "community";
}
