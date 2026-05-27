import Link from "next/link";
import { AlertCircle, ArrowRight, FileText, ShieldCheck } from "lucide-react";
import type { Locale } from "@/types/content";

type LegalPageProps = {
  locale: Locale;
  type: "privacy" | "terms";
};

const content = {
  tr: {
    privacy: {
      eyebrow: "Gizlilik ve Çerezler",
      title: "Gizlilik Politikası",
      description:
        "CityMall Cyprus web sitesinde ziyaretçi deneyimi, iletişim formları ve çerez kullanımı hakkında bilgilendirme.",
      updated: "Son güncelleme: 2026",
      note:
        "Bu metin taslak bilgilendirme niteliğindedir. Ticari yayına geçmeden önce KVKK ve yerel mevzuata uygun şekilde hukuk danışmanı tarafından kontrol edilmelidir.",
      sections: [
        {
          title: "Kapsam",
          text: "Bu politika, CityMall Cyprus web sitesini ziyaret eden kullanıcıların site kullanımı, iletişim formları ve dijital hizmetlerle ilişkili gizlilik bilgilendirmesini açıklar.",
        },
        {
          title: "Toplanan Bilgiler",
          text: "İletişim, kiralama, kariyer veya benzeri formlar üzerinden ad soyad, e-posta, telefon, mesaj içeriği ve başvuru bilgileri gibi kullanıcı tarafından sağlanan bilgiler alınabilir.",
        },
        {
          title: "İletişim Formları",
          text: "Formlar üzerinden iletilen bilgiler, kullanıcının talebini yanıtlamak, ilgili birime yönlendirmek ve hizmet kalitesini artırmak amacıyla kullanılabilir.",
        },
        {
          title: "Çerezler",
          text: "Web sitesi, kullanıcı deneyimini iyileştirmek, dil tercihini hatırlamak ve site performansını analiz etmek amacıyla çerezlerden yararlanabilir.",
        },
        {
          title: "Üçüncü Taraf Bağlantılar",
          text: "Sitede Google Maps, sosyal medya veya harici web sitelerine bağlantılar bulunabilir. Bu platformların gizlilik uygulamalarından CityMall Cyprus sorumlu değildir.",
        },
        {
          title: "Veri Güvenliği",
          text: "Kişisel verilerin yetkisiz erişime karşı korunması için makul teknik ve idari önlemler alınmalıdır. Gerçek yayında güvenlik süreçleri ayrıca yapılandırılmalıdır.",
        },
        {
          title: "Haklarınız",
          text: "Kullanıcılar, kendileriyle ilgili kişisel veriler hakkında bilgi talep edebilir, düzeltme veya silme taleplerini ilgili iletişim kanalları üzerinden iletebilir.",
        },
      ],
    },
    terms: {
      eyebrow: "Kullanım Koşulları",
      title: "Web Sitesi Kullanım Koşulları",
      description:
        "CityMall Cyprus web sitesini kullanırken geçerli temel kurallar, içerik bilgilendirmeleri ve sorumluluk sınırları.",
      updated: "Son güncelleme: 2026",
      note:
        "Bu metin taslak kullanım koşullarıdır. Ticari yayına geçmeden önce hukuk danışmanı tarafından gerçek şirket bilgileri ve yerel mevzuata göre düzenlenmelidir.",
      sections: [
        {
          title: "Site Kullanımı",
          text: "Bu web sitesi, CityMall Cyprus ziyaretçilerine mağazalar, yeme-içme alanları, Cinemall, etkinlikler, hizmetler ve ziyaret planlama bilgileri sunmak amacıyla hazırlanmıştır.",
        },
        {
          title: "İçerik Doğruluğu",
          text: "Çalışma saatleri, kampanyalar, etkinlikler, film seansları, hizmetler ve mağaza bilgileri dönemsel olarak değişebilir. Güncel bilgiler ilgili işletme veya CityMall yönetimi tarafından doğrulanmalıdır.",
        },
        {
          title: "Demo ve Konsept Alanlar",
          text: "Bu proje kapsamında bazı formlar, satın alma akışları, indirme butonları ve hizmet bilgileri demo veya konsept amaçlı olabilir. Gerçek yayında ilgili sistemlerle entegrasyon yapılmalıdır.",
        },
        {
          title: "Fikri Mülkiyet",
          text: "Sitedeki metinler, tasarım öğeleri, marka kullanımları ve görsel alanlar CityMall Cyprus kurumsal iletişimi kapsamında değerlendirilmelidir. Gerçek marka dosyaları teslim sürecinde güncellenmelidir.",
        },
        {
          title: "Üçüncü Taraf Hizmetler",
          text: "Google Maps, sosyal medya bağlantıları veya harici web siteleri gibi üçüncü taraf hizmetlere yönlendirmeler olabilir. Bu hizmetlerin içerik ve kullanım koşulları kendi sağlayıcılarına aittir.",
        },
        {
          title: "Sorumluluk Sınırı",
          text: "Web sitesindeki bilgiler kullanıcıya kolaylık sağlamak amacıyla sunulur. Bilgilerdeki geçici değişiklikler, teknik aksaklıklar veya üçüncü taraf hizmetlerden kaynaklanan sorunlar için sorumluluk sınırlı olabilir.",
        },
        {
          title: "Değişiklikler",
          text: "CityMall Cyprus, web sitesindeki içerikleri, koşulları, bağlantıları ve hizmet bilgilerini güncelleme hakkını saklı tutar.",
        },
      ],
    },
    contactCta: "İletişime Geç",
    backHome: "Ana Sayfa",
  },
  en: {
    privacy: {
      eyebrow: "Privacy & Cookies",
      title: "Privacy Policy",
      description:
        "Information about visitor experience, contact forms and cookie usage on the CityMall Cyprus website.",
      updated: "Last updated: 2026",
      note:
        "This text is a draft information notice. Before commercial launch, it should be reviewed by legal counsel for data protection and local regulatory compliance.",
      sections: [
        {
          title: "Scope",
          text: "This policy explains privacy information related to website usage, contact forms and digital services for visitors of the CityMall Cyprus website.",
        },
        {
          title: "Information Collected",
          text: "Information provided by users through contact, leasing, careers or similar forms may include full name, email, phone, message content and application details.",
        },
        {
          title: "Contact Forms",
          text: "Information submitted through forms may be used to respond to user requests, forward them to relevant teams and improve service quality.",
        },
        {
          title: "Cookies",
          text: "The website may use cookies to improve user experience, remember language preferences and analyze site performance.",
        },
        {
          title: "Third-Party Links",
          text: "The website may include links to Google Maps, social media or external websites. CityMall Cyprus is not responsible for the privacy practices of these platforms.",
        },
        {
          title: "Data Security",
          text: "Reasonable technical and administrative measures should be taken to protect personal data against unauthorized access. Security processes should be configured for real launch.",
        },
        {
          title: "Your Rights",
          text: "Users may request information about their personal data and submit correction or deletion requests through the relevant contact channels.",
        },
      ],
    },
    terms: {
      eyebrow: "Terms of Use",
      title: "Website Terms of Use",
      description:
        "Basic rules, content information and liability boundaries for using the CityMall Cyprus website.",
      updated: "Last updated: 2026",
      note:
        "This text is a draft terms of use document. Before commercial launch, it should be updated by legal counsel with real company details and local regulations.",
      sections: [
        {
          title: "Website Use",
          text: "This website is prepared to provide CityMall Cyprus visitors with information about stores, dining areas, Cinemall, events, services and visit planning.",
        },
        {
          title: "Content Accuracy",
          text: "Opening hours, campaigns, events, movie showtimes, services and store information may change periodically. Current information should be verified by the relevant business or CityMall management.",
        },
        {
          title: "Demo and Concept Areas",
          text: "Some forms, purchase flows, download buttons and service information in this project may be for demo or concept purposes. Real integrations should be completed for commercial launch.",
        },
        {
          title: "Intellectual Property",
          text: "Texts, design elements, brand usage and visual areas on the website should be evaluated within CityMall Cyprus corporate communication. Real brand files should be updated during handoff.",
        },
        {
          title: "Third-Party Services",
          text: "The website may redirect to third-party services such as Google Maps, social media links or external websites. Their content and terms belong to their own providers.",
        },
        {
          title: "Limitation of Liability",
          text: "Information on the website is provided for visitor convenience. Liability may be limited for temporary changes, technical issues or third-party service problems.",
        },
        {
          title: "Changes",
          text: "CityMall Cyprus reserves the right to update website content, terms, links and service information.",
        },
      ],
    },
    contactCta: "Contact Us",
    backHome: "Home",
  },
};

export function LegalPage({ locale, type }: LegalPageProps) {
  const copy = content[locale][type];

  return (
    <main className="overflow-x-hidden bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_38%),linear-gradient(135deg,rgba(17,24,39,1),rgba(42,49,63,1))]" />

        <div className="container py-16 md:py-24">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 max-w-[13ch] text-[clamp(2.75rem,11vw,4.25rem)] font-semibold leading-[0.95] tracking-tight text-white md:max-w-5xl md:text-7xl md:leading-[0.95]">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-white/78 md:text-xl md:leading-8">
              {copy.description}
            </p>

            <p className="mt-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/72 backdrop-blur">
              {copy.updated}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border-default bg-surface-muted/45 py-8">
        <div className="container">
          <div className="rounded-[2rem] border border-amber-100 bg-amber-50 p-5 text-amber-900 shadow-card">
            <div className="flex gap-3">
              <AlertCircle className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="text-sm leading-6">{copy.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="h-fit rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card lg:sticky lg:top-28">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
              {type === "privacy" ? (
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              ) : (
                <FileText className="h-5 w-5" aria-hidden="true" />
              )}
            </div>

            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">
              {copy.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              {copy.description}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:opacity-90"
              >
                {content[locale].contactCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href={`/${locale}`}
                className="inline-flex items-center justify-center rounded-full border border-border-default bg-surface-muted px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
              >
                {content[locale].backHome}
              </Link>
            </div>
          </aside>

          <div className="grid gap-5">
            {copy.sections.map((section, index) => (
              <article
                key={section.title}
                className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card md:p-8"
              >
                <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-muted">
                  0{index + 1}
                </span>

                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
                  {section.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary md:text-base">
                  {section.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}