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
      tr: "Renkler, kes-yapıştır çalışmaları ve çocuklara özel yaratıcı bir hafta sonu.",
      en: "Colors, hands-on crafts and a creative weekend activity for children.",
    },
    detailDescription: {
      tr: "Çocuk Sanat Atölyesi, çocukların kendi küçük çalışmalarını hazırlayabileceği renkli bir etkinliktir. Eğitmen eşliğinde ilerleyen atölyede malzemeler çocukların yaratıcılığını destekleyecek şekilde hazırlanır.",
      en: "Kids Art Workshop is a colorful activity where children can create their own small artworks. The guided session uses materials designed to support creativity and hands-on discovery.",
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
      tr: "Ana atriumda canlı müzik ve yaz akşamına yakışan keyifli bir buluşma.",
      en: "Live music in the main atrium for an easygoing summer evening.",
    },
    detailDescription: {
      tr: "Yaz Müzik Akşamı, CityMall Cyprus ziyaretine canlı müzik eşlik eden sıcak bir akşam atmosferi katar. Alışveriş sonrası kısa bir mola vermek veya akşamı müzikle tamamlamak isteyen tüm ziyaretçilere açıktır.",
      en: "Summer Music Evening adds a live music atmosphere to your CityMall Cyprus visit. It is open to all visitors who want to take a short break after shopping or end the evening with music.",
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
      tr: "Masa oyunları, mini yarışmalar ve ailece vakit geçirilecek aktiviteler.",
      en: "Board games, mini competitions and activities for families to enjoy together.",
    },
    detailDescription: {
      tr: "Aile Oyun Günü, ailelerin birlikte katılabileceği masa oyunları, kısa yarışmalar ve eğlenceli aktivitelerden oluşur. Çocuklarla CityMall ziyaretine hareketli bir ara eklemek isteyenler için planlanır.",
      en: "Family Game Day brings together board games, short competitions and fun activities for families. It is planned for visitors who want to add an active break to their CityMall visit with children.",
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
      tr: "Seçili mağazalardan sezon parçaları ve kısa podyum sunumu.",
      en: "Seasonal pieces from selected stores with a short runway presentation.",
    },
    detailDescription: {
      tr: "Sezon Moda Gösterisi, CityMall Cyprus’taki seçili moda mağazalarının yeni sezon parçalarını ziyaretçilerle buluşturur. Kısa podyum sunumu, sezon renkleri ve kombin fikirleriyle alışverişe ilham verir.",
      en: "Season Fashion Showcase introduces new-season pieces from selected fashion stores at CityMall Cyprus. The short runway presentation highlights seasonal colors and outfit ideas for visitors.",
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
      tr: "Çocuklar ve gençler için hareketli oyunlar, parkur ve mini yarışmalar.",
      en: "Active games, a small course and mini competitions for kids and young visitors.",
    },
    detailDescription: {
      tr: "Mini Spor Challenge, çocuklar ve genç ziyaretçiler için kısa, hareketli ve güvenli aktivitelerden oluşur. Denge parkuru, küçük yarışmalar ve spor oyunlarıyla enerjik bir AVM molası sunar.",
      en: "Mini Sports Challenge includes short, active and safe activities for kids and young visitors. A balance course, small competitions and sports games turn the mall visit into an energetic break.",
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
      tr: "Yeme-içme alanından seçili tatlar ve keyifli bir tadım molası.",
      en: "Selected tastes from the dining area and an enjoyable tasting break.",
    },
    detailDescription: {
      tr: "Lezzet Tadım Festivali, CityMall Cyprus yeme-içme noktalarından seçili ürünleri ziyaretçilerle buluşturur. Alışveriş arasında farklı tatları denemek isteyenler için keyifli bir mola alanı oluşturur.",
      en: "Food Tasting Festival brings selected products from CityMall Cyprus dining spots to visitors. It creates a pleasant break for those who want to try different tastes between shopping.",
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
      tr: "Ailelere özel film gösterimi ve seans öncesi kısa etkinlik.",
      en: "A family-friendly screening with a short pre-show activity.",
    },
    detailDescription: {
      tr: "Sinema Özel Gösterimi, ailelere yönelik seçili film seansını kısa bir ön etkinlikle birleştirir. Cinemall ziyareti öncesinde çocuklar ve aileler için daha keyifli bir başlangıç sunar.",
      en: "Cinema Special Screening combines a selected family-friendly movie session with a short pre-show activity. It creates a more enjoyable start for children and families before the Cinemall visit.",
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
      tr: "Kısa dans performanslarıyla hafta sonuna enerjik bir ara.",
      en: "Short dance performances for an energetic weekend break.",
    },
    detailDescription: {
      tr: "Hafta Sonu Dans Gösterisi, ana atriumda kısa ve enerjik performanslarla ziyaretçilere hareketli bir atmosfer sunar. Alışveriş arasında durup izlenebilecek keyifli bir hafta sonu etkinliğidir.",
      en: "Weekend Dance Show brings short and energetic performances to the main atrium. It is an enjoyable weekend event visitors can stop and watch between shopping.",
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
      tr: "Kitap, kültür ve sohbet etrafında samimi bir buluşma.",
      en: "A friendly gathering around books, culture and conversation.",
    },
    detailDescription: {
      tr: "Söyleşi ve İmza Günü, kitap ve kültür meraklılarını CityMall Cyprus içinde samimi bir etkinlikte bir araya getirir. Kısa söyleşi sonrasında imza ve sohbet bölümüyle devam eder.",
      en: "Talk and Signing Day brings book and culture enthusiasts together at CityMall Cyprus. After a short talk, the event continues with signing and conversation.",
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
      tr: "Yeni dönem öncesi çocuklar için oyunlar, yarışmalar ve yaratıcı etkinlikler.",
      en: "Games, competitions and creative activities before the new school season.",
    },
    detailDescription: {
      tr: "Okula Dönüş Eğlencesi, yeni okul dönemi başlamadan önce çocuklara keyifli bir gün sunar. Oyunlar, küçük yarışmalar ve yaratıcı aktivitelerle ailelerin CityMall ziyaretine eğlenceli bir durak ekler.",
      en: "Back to School Fun gives children an enjoyable day before the new school season begins. Games, small competitions and creative activities add a fun stop to the family visit at CityMall.",
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