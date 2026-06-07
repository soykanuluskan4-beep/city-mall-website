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

export type StoreOccasion =
  | "birthday"
  | "mothers-day"
  | "fathers-day"
  | "valentines"
  | "anniversary"
  | "back-to-school"
  | "graduation"
  | "eid"
  | "new-year"
  | "summer"
  | "kids"
  | "baby-newborn"
  | "new-home";

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
  | "romance"
  | "fantasy"
  | "other";

export type Floor =
  | "basement"
  | "ground"
  | "first"
  | "second"
  | "food-court"
  | "cinema";

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
  occasions?: StoreOccasion[];
  logo?: string;
  coverImage?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  featured?: boolean;
  isNew?: boolean;
  isComingSoon?: boolean;
};

export type DiningCuisineType =
  | "fast-food"
  | "turkish"
  | "italian"
  | "world"
  | "cafe"
  | "dessert"
  | "snack"
  | "coffee"
  | "chicken"
  | "bistro"
  | "restaurant"
  | "pide"
  | "meatballs"
  | "pizza"
  | "asian"
  | "burger";

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
  cuisineType?: DiningCuisineType;
  cuisineTags?: DiningCuisineType[];
  priceRange?: "₺" | "₺₺" | "₺₺₺";
  workingHours?: LocalizedString;
  menuUrl?: string;
  reservationPhone?: string;
  phone?: string;
  website?: string;
  featured?: boolean;
};

export type ServiceCategory =
  | "comfort"
  | "family"
  | "accessibility"
  | "safety"
  | "finance"
  | "parking"
  | "guest-services";

export type ServiceStatus = "available" | "ask-info" | "seasonal";

export type MallService = {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  location: LocalizedString;
  category: ServiceCategory;
  status: ServiceStatus;
};

export type Campaign = BaseContentItem & {
  storeName?: LocalizedString;
  detailDescription?: LocalizedString;
  category?: string;
  storeCount?: number;
  participatingStores?: string[];
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  badge?: LocalizedString;
};

export type Event = BaseContentItem & {
  detailDescription?: LocalizedString;
  image: string;
  date: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  duration?: LocalizedString;
  location: LocalizedString;
  category?: string;
  status: EventStatus;
  audience?: LocalizedString;
  featured?: boolean;
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
  heroImage?: string;
  director?: string;
  cast?: string[];
  language?: LocalizedString;
  status?: "nowShowing" | "comingSoon";
  releaseDate?: string;
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