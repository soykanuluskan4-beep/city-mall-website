import type { MallService } from "@/types/content";

export const mallServices: MallService[] = [
  {
    id: "service-001",
    slug: "free-wifi",
    title: {
      tr: "Ücretsiz Wi-Fi",
      en: "Free Wi-Fi",
    },
    description: {
      tr: "Ortak alanlarda ziyaretçiler için kablosuz internet bağlantısı. Güncel bağlantı bilgileri için danışma noktasından destek alabilirsiniz.",
      en: "Wireless internet access for visitors in common areas. Please contact the information desk for current connection details.",
    },
    location: {
      tr: "Ortak alanlar",
      en: "Common areas",
    },
    category: "comfort",
    status: "available",
  },
  {
    id: "service-002",
    slug: "baby-stroller",
    title: {
      tr: "Bebek Arabası",
      en: "Baby Stroller",
    },
    description: {
      tr: "Ailelerin ziyaretini kolaylaştırmak için bebek arabası desteği hakkında danışma noktasından bilgi alınabilir.",
      en: "Visitors can ask the information desk about stroller support for a more comfortable family visit.",
    },
    location: {
      tr: "Müşteri hizmetleri / danışma noktası",
      en: "Guest services / information desk",
    },
    category: "family",
    status: "ask-info",
  },
  {
    id: "service-003",
    slug: "accessible-access",
    title: {
      tr: "Engelli Erişimi",
      en: "Accessible Access",
    },
    description: {
      tr: "AVM içerisinde engelli ziyaretçiler için erişimi kolaylaştıran giriş, asansör ve ortak alan yönlendirmeleri bulunur.",
      en: "The mall includes entrances, elevators and common-area guidance designed to support accessible visits.",
    },
    location: {
      tr: "Girişler, asansörler ve ortak alanlar",
      en: "Entrances, elevators and common areas",
    },
    category: "accessibility",
    status: "available",
  },
  {
    id: "service-004",
    slug: "wheelchair-support",
    title: {
      tr: "Tekerlekli Sandalye Desteği",
      en: "Wheelchair Support",
    },
    description: {
      tr: "Tekerlekli sandalye uygunluğu ve kullanım bilgisi için müşteri hizmetleri noktasından destek alınabilir.",
      en: "Visitors can contact guest services for wheelchair availability and usage information.",
    },
    location: {
      tr: "Müşteri hizmetleri / danışma noktası",
      en: "Guest services / information desk",
    },
    category: "accessibility",
    status: "ask-info",
  },
  {
    id: "service-005",
    slug: "lost-and-found",
    title: {
      tr: "Kayıp Eşya",
      en: "Lost & Found",
    },
    description: {
      tr: "AVM içerisinde kaybolan eşyalar için danışma veya müşteri hizmetleri noktasından yardım alabilirsiniz.",
      en: "For lost items inside the mall, visitors can get support from the information or guest services desk.",
    },
    location: {
      tr: "Müşteri hizmetleri / danışma noktası",
      en: "Guest services / information desk",
    },
    category: "guest-services",
    status: "available",
  },
  {
    id: "service-006",
    slug: "atm",
    title: {
      tr: "ATM Noktaları",
      en: "ATM Locations",
    },
    description: {
      tr: "Nakit çekim ve bankacılık işlemleri için ATM noktalarının güncel konumlarını danışma noktasından öğrenebilirsiniz.",
      en: "Visitors can ask the information desk for current ATM locations for cash withdrawal and banking services.",
    },
    location: {
      tr: "Ortak alanlar / danışma yönlendirmesi",
      en: "Common areas / information desk guidance",
    },
    category: "finance",
    status: "ask-info",
  },
  {
    id: "service-007",
    slug: "currency-exchange",
    title: {
      tr: "Para Değiştirme",
      en: "Currency Exchange",
    },
    description: {
      tr: "Döviz ve para değiştirme hizmetlerinin güncel uygunluğu için danışma noktasından bilgi alınmalıdır.",
      en: "Please ask the information desk for current availability of currency exchange services.",
    },
    location: {
      tr: "Bilgi için danışma noktası",
      en: "Information desk for details",
    },
    category: "finance",
    status: "ask-info",
  },
  {
    id: "service-008",
    slug: "storage-lockers",
    title: {
      tr: "Emanet",
      en: "Storage / Lockers",
    },
    description: {
      tr: "Emanet veya geçici eşya bırakma imkanları için güncel bilgi müşteri hizmetlerinden alınabilir.",
      en: "Current information about storage or temporary item drop-off options can be requested from guest services.",
    },
    location: {
      tr: "Müşteri hizmetleri / danışma noktası",
      en: "Guest services / information desk",
    },
    category: "comfort",
    status: "ask-info",
  },
  {
    id: "service-009",
    slug: "gift-wrapping",
    title: {
      tr: "Hediye Paketleme",
      en: "Gift Wrapping",
    },
    description: {
      tr: "Hediye paketleme hizmeti dönemsel kampanya veya özel günlerde sunulabilir. Güncel bilgi için danışma noktasına başvurun.",
      en: "Gift wrapping may be available during seasonal campaigns or special days. Please contact the information desk for current details.",
    },
    location: {
      tr: "Danışma noktası / etkinlik alanı",
      en: "Information desk / event area",
    },
    category: "guest-services",
    status: "seasonal",
  },
  {
    id: "service-010",
    slug: "first-aid",
    title: {
      tr: "İlk Yardım Noktası",
      en: "First Aid Point",
    },
    description: {
      tr: "Acil durumlarda güvenlik ve danışma ekiplerinden ilk yardım noktası hakkında destek alınabilir.",
      en: "In emergencies, visitors can ask security and information teams for first aid support.",
    },
    location: {
      tr: "Güvenlik / danışma yönlendirmesi",
      en: "Security / information desk guidance",
    },
    category: "safety",
    status: "available",
  },
  {
    id: "service-011",
    slug: "guest-services-desk",
    title: {
      tr: "Müşteri Hizmetleri Masası",
      en: "Guest Services Desk",
    },
    description: {
      tr: "Ziyaretçi yönlendirmeleri, kayıp eşya, hizmet bilgileri ve genel destek için danışma noktasına başvurabilirsiniz.",
      en: "Visitors can contact the guest services desk for directions, lost items, service information and general support.",
    },
    location: {
      tr: "Ana giriş / danışma alanı",
      en: "Main entrance / information area",
    },
    category: "guest-services",
    status: "available",
  },
  {
    id: "service-012",
    slug: "valet-parking",
    title: {
      tr: "Valet Parking",
      en: "Valet Parking",
    },
    description: {
      tr: "Valet hizmetinin güncel uygunluğu için ziyaret öncesinde danışma veya müşteri hizmetlerinden bilgi alınmalıdır.",
      en: "Please check with the information desk or guest services for current valet parking availability before your visit.",
    },
    location: {
      tr: "Ana giriş / otopark alanı bilgisi",
      en: "Main entrance / parking area information",
    },
    category: "parking",
    status: "ask-info",
  },
  {
    id: "service-013",
    slug: "prayer-room",
    title: {
      tr: "Prayer Room",
      en: "Prayer Room",
    },
    description: {
      tr: "İbadet alanı konumu ve kullanım bilgisi için danışma noktasından güncel yönlendirme alınabilir.",
      en: "Visitors can ask the information desk for current directions and usage information for the prayer room.",
    },
    location: {
      tr: "Bilgi için danışma noktası",
      en: "Information desk for directions",
    },
    category: "comfort",
    status: "ask-info",
  },
  {
    id: "service-014",
    slug: "ev-charging",
    title: {
      tr: "EV Şarj İstasyonu",
      en: "EV Charging Station",
    },
    description: {
      tr: "Elektrikli araç şarj noktalarının güncel uygunluğu ve konumu için otopark veya danışma yönlendirmesini kontrol edin.",
      en: "Please check parking or information desk guidance for current EV charging availability and location.",
    },
    location: {
      tr: "Otopark alanı / bilgi için danışma",
      en: "Parking area / information desk for details",
    },
    category: "parking",
    status: "ask-info",
  },
];