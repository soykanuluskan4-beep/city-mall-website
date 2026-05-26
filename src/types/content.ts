export type Locale = "tr" | "en";

export type LocalizedString = {
  tr: string;
  en: string;
};

export type StoreCategory =
  | "fashion"
  | "electronics"
  | "home"
  | "beauty"
  | "sports"
  | "books"
  | "services"
  | "kids"
  | "other";

export type DiningCategory =
  | "restaurant"
  | "cafe"
  | "fast-food"
  | "dessert"
  | "coffee"
  | "other";

export type CampaignStatus = "active" | "upcoming" | "expired";

export type EventStatus = "upcoming" | "ongoing" | "past";

export type MovieGenre =
  | "action"
  | "animation"
  | "comedy"
  | "drama"
  | "family"
  | "thriller"
  | "adventure"
  | "other";

export type Floor = "ground" | "first" | "second" | "food-court" | "cinema";

export type BaseContentItem = {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  image?: string;
  featured?: boolean;
};

export type Store = {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  category: StoreCategory;
  floor: Floor;
  logo?: string;
  coverImage?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  featured?: boolean;
  isNew?: boolean;
isComingSoon?: boolean;
};

export type DiningPlace = {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  category: DiningCategory;
  floor: Floor;
  logo?: string;
  coverImage?: string;
  cuisine?: LocalizedString;
  phone?: string;
  website?: string;
  featured?: boolean;
};

export type Campaign = BaseContentItem & {
  storeName?: LocalizedString;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  badge?: LocalizedString;
};

export type Event = BaseContentItem & {
  date: string;
  endDate?: string;
  location: LocalizedString;
  status: EventStatus;
  audience?: LocalizedString;
};

export type MovieShowtime = {
  date: string;
  times: string[];
};

export type Movie = {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  genre: MovieGenre;
  durationMinutes: number;
  ageRating?: string;
  posterImage?: string;
  trailerUrl?: string;
  showtimes: MovieShowtime[];
  featured?: boolean;
};

export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type OpeningHourDay = {
  day: DayKey;
  label: LocalizedString;
  open: string;
  close: string;
  isClosed?: boolean;
};

export type OpeningHours = {
  mall: OpeningHourDay[];
  cinema?: OpeningHourDay[];
  dining?: OpeningHourDay[];
  specialNotes?: LocalizedString[];
};

export type NavigationItem = {
  href: string;
  label: LocalizedString;
  external?: boolean;
};

export type ContactInfo = {
  phone?: string;
  email?: string;
  address: LocalizedString;
  mapUrl?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
};