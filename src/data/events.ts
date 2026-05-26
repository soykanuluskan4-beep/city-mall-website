import type { Event } from "@/types/content";

export const events: Event[] = [
  {
    id: "event-001",
    slug: "kids-art-workshop",
    title: {
      tr: "Çocuk Sanat Atölyesi",
      en: "Kids Art Workshop",
    },
    description: {
      tr: "Çocuklar için renkli, eğlenceli ve yaratıcı bir hafta sonu sanat etkinliği.",
      en: "A colorful, fun and creative weekend art activity for children.",
    },
    detailDescription: {
      tr: "Çocuk Sanat Atölyesi, çocukların yaratıcılığını destekleyen, renkli materyallerle hazırlanan eğlenceli bir etkinliktir. Katılımcılar, eğitmen eşliğinde kendi küçük sanat çalışmalarını oluşturabilir.",
      en: "Kids Art Workshop is a creative activity designed to support children's imagination with colorful materials. Participants can create their own small artworks with guidance.",
    },
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1800&q=85",
    date: "2026-06-07T14:00:00",
    endDate: "2026-06-07T16:00:00",
    startTime: "14:00",
    endTime: "16:00",
    duration: {
      tr: "2 saat",
      en: "2 hours",
    },
    location: {
      tr: "Çocuk Alanı",
      en: "Kids Area",
    },
    category: "kids",
    status: "upcoming",
    audience: {
      tr: "Çocuk",
      en: "Kids",
    },
    featured: true,
  },
  {
    id: "event-002",
    slug: "summer-music-evening",
    title: {
      tr: "Yaz Müzik Akşamı",
      en: "Summer Music Evening",
    },
    description: {
      tr: "AVM atmosferine eşlik eden canlı müzik performansı ve keyifli akşam buluşması.",
      en: "A live music performance and pleasant evening gathering accompanying the mall atmosphere.",
    },
    detailDescription: {
      tr: "Yaz Müzik Akşamı, CityMall Cyprus ziyaretçilerine keyifli bir akşam atmosferi sunmak için hazırlanan canlı müzik performansıdır. Etkinlik tüm ziyaretçilere açıktır.",
      en: "Summer Music Evening is a live music performance prepared to offer visitors a pleasant evening atmosphere at CityMall Cyprus. The event is open to all visitors.",
    },
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1800&q=85",
    date: "2026-06-14T19:30:00",
    endDate: "2026-06-14T21:00:00",
    startTime: "19:30",
    endTime: "21:00",
    duration: {
      tr: "1,5 saat",
      en: "1.5 hours",
    },
    location: {
      tr: "Ana Atrium",
      en: "Main Atrium",
    },
    category: "music",
    status: "upcoming",
    audience: {
      tr: "Genel",
      en: "General",
    },
    featured: true,
  },
  {
    id: "event-003",
    slug: "family-game-day",
    title: {
      tr: "Aile Oyun Günü",
      en: "Family Game Day",
    },
    description: {
      tr: "Aileler ve çocuklar için masa oyunları, mini yarışmalar ve eğlenceli aktiviteler.",
      en: "Board games, mini competitions and fun activities for families and children.",
    },
    detailDescription: {
      tr: "Aile Oyun Günü, ailelerin birlikte vakit geçirebileceği masa oyunları, mini yarışmalar ve kısa süreli eğlenceli aktivitelerden oluşur.",
      en: "Family Game Day includes board games, mini competitions and short fun activities where families can spend time together.",
    },
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1800&q=85",
    date: "2026-06-21T13:00:00",
    endDate: "2026-06-21T17:00:00",
    startTime: "13:00",
    endTime: "17:00",
    duration: {
      tr: "4 saat",
      en: "4 hours",
    },
    location: {
      tr: "Çocuk & Eğlence Alanı",
      en: "Kids & Entertainment Area",
    },
    category: "family",
    status: "upcoming",
    audience: {
      tr: "Aile",
      en: "Families",
    },
    featured: true,
  },
  {
    id: "event-004",
    slug: "fashion-showcase",
    title: {
      tr: "Sezon Moda Gösterisi",
      en: "Season Fashion Showcase",
    },
    description: {
      tr: "Sezon trendlerini öne çıkaran mağaza koleksiyonları ve kısa podyum sunumu.",
      en: "Store collections and a short runway presentation highlighting seasonal trends.",
    },
    detailDescription: {
      tr: "Sezon Moda Gösterisi, CityMall Cyprus içerisindeki seçili moda mağazalarının sezon ürünlerini tanıtan görsel bir sunumdur.",
      en: "Season Fashion Showcase is a visual presentation featuring seasonal products from selected fashion stores inside CityMall Cyprus.",
    },
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=85",
    date: "2026-06-28T18:00:00",
    endDate: "2026-06-28T19:00:00",
    startTime: "18:00",
    endTime: "19:00",
    duration: {
      tr: "1 saat",
      en: "1 hour",
    },
    location: {
      tr: "1. Kat Sahne",
      en: "1st Floor Stage",
    },
    category: "fashion",
    status: "upcoming",
    audience: {
      tr: "Genel",
      en: "General",
    },
  },
  {
    id: "event-005",
    slug: "mini-sports-challenge",
    title: {
      tr: "Mini Spor Challenge",
      en: "Mini Sports Challenge",
    },
    description: {
      tr: "Çocuklar ve gençler için küçük spor oyunları, denge parkuru ve mini yarışmalar.",
      en: "Small sports games, balance track and mini competitions for kids and young visitors.",
    },
    detailDescription: {
      tr: "Mini Spor Challenge, çocuklar ve genç ziyaretçiler için hareketli, güvenli ve eğlenceli kısa spor aktivitelerinden oluşur.",
      en: "Mini Sports Challenge consists of active, safe and fun short sports activities for kids and young visitors.",
    },
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1800&q=85",
    date: "2026-07-05T15:00:00",
    endDate: "2026-07-05T18:00:00",
    startTime: "15:00",
    endTime: "18:00",
    duration: {
      tr: "3 saat",
      en: "3 hours",
    },
    location: {
      tr: "Ana Atrium",
      en: "Main Atrium",
    },
    category: "sports",
    status: "upcoming",
    audience: {
      tr: "Çocuk & Genç",
      en: "Kids & Youth",
    },
  },
  {
    id: "event-006",
    slug: "food-tasting-festival",
    title: {
      tr: "Lezzet Tadım Festivali",
      en: "Food Tasting Festival",
    },
    description: {
      tr: "Yeme-içme alanlarından seçili lezzetlerin tanıtıldığı keyifli tadım etkinliği.",
      en: "A tasting event introducing selected flavors from the dining area.",
    },
    detailDescription: {
      tr: "Lezzet Tadım Festivali, CityMall Cyprus yeme-içme noktalarından seçili ürünlerin tanıtıldığı, ziyaretçilere keyifli bir mola sunan etkinliktir.",
      en: "Food Tasting Festival introduces selected products from CityMall Cyprus dining spots and offers visitors a pleasant break.",
    },
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=85",
    date: "2026-07-12T16:00:00",
    endDate: "2026-07-12T20:00:00",
    startTime: "16:00",
    endTime: "20:00",
    duration: {
      tr: "4 saat",
      en: "4 hours",
    },
    location: {
      tr: "Yeme-İçme Alanı",
      en: "Dining Area",
    },
    category: "food",
    status: "upcoming",
    audience: {
      tr: "Genel",
      en: "General",
    },
    featured: true,
  },
  {
    id: "event-007",
    slug: "cinema-special-screening",
    title: {
      tr: "Sinema Özel Gösterimi",
      en: "Cinema Special Screening",
    },
    description: {
      tr: "Ailelere yönelik özel film gösterimi ve sinema öncesi kısa etkinlik.",
      en: "A family-friendly special movie screening with a short pre-cinema activity.",
    },
    detailDescription: {
      tr: "Sinema Özel Gösterimi, ailelere yönelik seçili film deneyimini kısa bir ön etkinlikle birleştiren özel programdır.",
      en: "Cinema Special Screening is a special program combining a selected family-friendly movie experience with a short pre-event.",
    },
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=85",
    date: "2026-07-18T17:30:00",
    endDate: "2026-07-18T20:00:00",
    startTime: "17:30",
    endTime: "20:00",
    duration: {
      tr: "2,5 saat",
      en: "2.5 hours",
    },
    location: {
      tr: "Sinema Katı",
      en: "Cinema Floor",
    },
    category: "cinema",
    status: "upcoming",
    audience: {
      tr: "Aile",
      en: "Families",
    },
  },
  {
    id: "event-008",
    slug: "weekend-dance-show",
    title: {
      tr: "Hafta Sonu Dans Gösterisi",
      en: "Weekend Dance Show",
    },
    description: {
      tr: "AVM içinde kısa dans performansları ve enerjik hafta sonu atmosferi.",
      en: "Short dance performances and an energetic weekend atmosphere inside the mall.",
    },
    detailDescription: {
      tr: "Hafta Sonu Dans Gösterisi, ziyaretçilere kısa ve enerjik performanslarla AVM içinde keyifli bir atmosfer sunar.",
      en: "Weekend Dance Show offers visitors a pleasant atmosphere inside the mall with short and energetic performances.",
    },
    image:
      "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=1800&q=85",
    date: "2026-07-25T18:30:00",
    endDate: "2026-07-25T19:30:00",
    startTime: "18:30",
    endTime: "19:30",
    duration: {
      tr: "1 saat",
      en: "1 hour",
    },
    location: {
      tr: "Ana Atrium",
      en: "Main Atrium",
    },
    category: "general",
    status: "upcoming",
    audience: {
      tr: "Genel",
      en: "General",
    },
  },
  {
    id: "event-009",
    slug: "book-signing-talk",
    title: {
      tr: "Söyleşi ve İmza Günü",
      en: "Talk and Signing Day",
    },
    description: {
      tr: "Kitap, kültür ve sohbet odaklı kısa söyleşi ve imza buluşması.",
      en: "A short talk and signing meet-up focused on books, culture and conversation.",
    },
    detailDescription: {
      tr: "Söyleşi ve İmza Günü, kitap ve kültür meraklılarını AVM içinde samimi bir buluşmada bir araya getirir.",
      en: "Talk and Signing Day brings book and culture enthusiasts together in a friendly mall event.",
    },
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1800&q=85",
    date: "2026-08-02T15:00:00",
    endDate: "2026-08-02T16:30:00",
    startTime: "15:00",
    endTime: "16:30",
    duration: {
      tr: "1,5 saat",
      en: "1.5 hours",
    },
    location: {
      tr: "Kitap & Kırtasiye Alanı",
      en: "Books & Stationery Area",
    },
    category: "general",
    status: "upcoming",
    audience: {
      tr: "Genel",
      en: "General",
    },
  },
  {
    id: "event-010",
    slug: "back-to-school-fun",
    title: {
      tr: "Okula Dönüş Eğlencesi",
      en: "Back to School Fun",
    },
    description: {
      tr: "Yeni okul dönemi öncesi çocuklar için oyun, mini yarışma ve yaratıcı etkinlikler.",
      en: "Games, mini competitions and creative activities for children before the new school season.",
    },
    detailDescription: {
      tr: "Okula Dönüş Eğlencesi, yeni dönem öncesinde çocuklar için eğlenceli oyunlar, küçük yarışmalar ve yaratıcı aktiviteler sunar.",
      en: "Back to School Fun offers children fun games, small competitions and creative activities before the new school season.",
    },
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=85",
    date: "2026-08-30T14:00:00",
    endDate: "2026-08-30T17:00:00",
    startTime: "14:00",
    endTime: "17:00",
    duration: {
      tr: "3 saat",
      en: "3 hours",
    },
    location: {
      tr: "Çocuk Alanı",
      en: "Kids Area",
    },
    category: "kids",
    status: "upcoming",
    audience: {
      tr: "Çocuk",
      en: "Kids",
    },
  },
];