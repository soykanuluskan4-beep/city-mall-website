# CityMall Cinematic Redesign Brief

Bu dosya CityMall Cyprus mevcut sitesine yapılacak cinematic redesign çalışmasının ana tasarım briefidir.

## Çalışma Kuralı

Bu brief içindeki her şey tek seferde uygulanmayacak.

Uygulama sırası:
1. Önce mevcut proje analiz edilecek.
2. Sonra sadece /redesign-preview route oluşturulacak.
3. Sonra redesign bölümleri tek tek eklenecek.
4. Mevcut canlı anasayfa, navbar ve footer ilk aşamada değiştirilmeyecek.
5. Footer planı varsa önce preview içinde ayrı component olarak denenecek.
6. Yeni npm dependency eklenmeyecek.
7. Three.js, GSAP ve WebGL ilk aşamada kullanılmayacak.

## Preview Route

/tr/redesign-preview  
/en/redesign-preview

## DOCX Planı

Aşağıya DOCX içindeki metin planı yapıştırılmıştır.

## 1. Genel Redesign Hedefi

CityMall Cyprus sitesi mevcut halinden daha cinematic, modern, premium ve büyük AVM sitesi hissi veren bir yapıya dönüştürülecek.

Referans hissiyat:

* Aventura Mall tarzı modern AVM deneyimi
* K11 Musea tarzı cinematic, luxury, editorial web deneyimi
* Büyük görseller
* Premium motion
* Yavaş, kontrollü, abartısız animasyonlar
* Minimal ama etkileyici kompozisyon
* Fazla template hissi vermeyen özel tasarım dili

Bu redesign mevcut canlı siteye direkt uygulanmayacak. Önce `/redesign-preview` route üzerinde test edilecek.

---

## 2. İlk Aşama Teknik Kuralı

Bu brief içindeki bütün fikirler tek seferde uygulanmayacak.

Claude Code uygulama sırasında şu kurallara uymalı:

* Mevcut anasayfa bozulmayacak.
* Mevcut Navbar ilk aşamada değiştirilmeyecek.
* Mevcut Footer ilk aşamada değiştirilmeyecek.
* Önce sadece `/tr/redesign-preview` ve `/en/redesign-preview` route oluşturulacak.
* Yeni npm dependency eklenmeyecek.
* Three.js, GSAP ve WebGL ilk aşamada kullanılmayacak.
* İlk aşamada CSS, Tailwind, React state, keyframes ve gerekirse IntersectionObserver kullanılacak.
* Motion efektleri subtle olacak.
* Her section ayrı ayrı yapılacak.
* Her aşamadan sonra build ve lint kontrol edilecek.

---

## 3. Hero Section Ana Fikri

Hero section modern, videolu/cinematic hissi olan bir AVM giriş deneyimi gibi tasarlanacak.

Referans his:

* aventuramall.com tarzı büyük görsel/video kullanımı
* k11musea.com tarzı cinematic luxury atmosfer
* Premium fashion/lifestyle odaklı açılış
* Büyük typography
* Dark overlay
* Modern grid composition

İlk aşamada gerçek video kullanmak zorunlu değil. Güvenli olması için önce cinematic image ile yapılabilir. Daha sonra video eklenebilir.

---

## 4. Hero Bento Grid Mantığı

Hero alanı klasik tek görsel hero değil, bento grid mantığında olmalı.

### Büyük Sol Alan

Büyük sol alan ilk odak noktası olacak.

Tema:

* Fashion / Luxury

İçerik hissi:

* Slow motion fashion clip hissi
* Cinematic crop
* Dark overlay
* Büyük typography
* Editorial premium görünüm

Hover davranışı:

* Hafif zoom
* Image scale yaklaşık 1.04–1.05
* Overlay blur/opacity hafif azalır
* Text hafif yukarı çıkar
* Mouse hareketine çok hafif parallax
* Border/glow subtle şekilde belirir

Bu alan kullanıcı siteye girince ilk dikkat çeken alan olmalı.

---

## 5. Hero Sağ Kartlar

Hero grid içinde sağ tarafta daha küçük kartlar olacak.

### Sağ Üst Kartlar

1. Dining

   * Warm amber tones
   * Sıcak ışık
   * Restaurant / cafe hissi

2. Cinema

   * Dark neon
   * Sinematik, koyu, parlak detaylı
   * Cinemall hissi

3. Events

   * Dynamic poster/video hissi
   * Daha hareketli ve canlı görünüm

### Sağdaki Uzun Dikey Alan

Tema:

* Explore Mall

İçerik:

* Interactive map preview
* AVM keşif hissi
* Mini map / floor guide hissi

Hover:

* Küçük glowing border
* Hafif pulse
* Map pin animasyonu
* Subtle glow

---

## 6. Genel Tasarım Dili

### Border Radius

* 18px–28px arası kullanılmalı.
* Çok keskin köşeler kullanılmamalı.
* Premium kartlarda 24px–28px iyi çalışır.

### Gap / Spacing

* Grid aralıkları 8px–16px arası olabilir.
* Luxury hissi için spacing çok önemli.
* Kartlar birbirine çok sıkışmamalı.
* Sectionlar nefes almalı.

### Shadow

Ağır shadow kullanılmamalı.

Kullanılacak shadow hissi:

* Soft ambient shadow
* Blur shadow
* Subtle glow
* Hafif bloom

Ama hiçbir yerde ucuz, ağır, template gibi shadow kullanılmamalı.

---

## 7. Sayfa Açılış ve Scroll Animasyonları

Sayfa ilk açıldığında animasyonlar agresif olmayacak.

Hero’dan aşağı scroll edilince grid veya sectionlar hafif aşağıdan gelmeli.

Animasyon mantığı:

* opacity 0 → 1
* translateY 24px–40px → 0
* duration 0.6s–0.9s
* easing premium ve yumuşak olmalı
* bounce kullanılmamalı

Önerilen easing:
`cubic-bezier(0.22, 1, 0.36, 1)`

---

## 8. Kart Hover Efektleri

Kart hover efektlerinde şu kombinasyon kullanılabilir:

* Card scale: 1.01–1.02
* Image zoom: 1.04–1.05
* Overlay opacity değişimi
* Text reveal / text yukarı hareketi
* Border glow
* Cursor parallax

Ama hepsi subtle olmalı.

Önemli:

* Animasyon abartılırsa premium değil ucuz görünür.
* Luxury hissi minimal motion’dan gelir.
* Her kartta aynı motion dili korunmalı.

---

## 9. Image Style

Stock AVM fotoğrafı gibi düz ve sıradan görseller kullanılmamalı.

Daha premium görsel stili:

* Cinematic photography
* Low exposure
* Luxury lighting
* Shallow depth of field
* Moody tones
* Dark / warm gradient atmosfer
* Editorial crop

Unsplash geçici görsel olarak kullanılabilir ama seçilen görseller premium hissi vermeli.

---

## 10. Overlay Kullanımı

Kartların üzerinde gradient overlay olmalı.

Overlay mantığı:

* Üst taraf daha hafif
* Alt taraf daha koyu
* Text okunur olmalı
* Cinematic durmalı

Örnek his:

* Alt bölgede dark gradient
* Text beyaz veya off-white
* Overlay hover’da hafif açılabilir

---

## 11. Typography

Başlık font hissi şu tarza yakın olmalı:

* Neue Montreal
* General Sans
* Satoshi
* Clash Display

Projede bu fontlar yoksa yeni font eklemek zorunlu değil. Mevcut font sistemiyle benzer editorial his verilmeli.

Başlıklar:

* Çok fazla ALL CAPS kullanılmamalı.
* Minimal editorial style tercih edilmeli.
* Büyük ama zarif typography kullanılmalı.

Örnek:
“Dining Experience” yerine:

Dining
Experience

iki satır daha premium durabilir.

---

## 12. Mobile Version Kuralları

Mobil çok kritik.

Desktop grid mobilde sadece küçültülmemeli.

Mobilde:

* Stacked layout
* Dominant kart en üstte
* Full-width cards
* Swipe hissi
* Büyük dokunma alanları
* Taşma olmamalı

Desktop bento yapısı mobilde birebir sıkıştırılmayacak.

Mobil hover olmadığı için tap interaction kullanılabilir:

* ripple glow
* slight scale
* blur transition
* kısa ve hafif motion

Mobilde motion offsetleri daha küçük olmalı:

* Desktop 40px ise mobil 20px civarı yeterli.

---

## 13. Glassmorphism Kullanımı

Tam glassmorphism bütün siteye uygulanmamalı.

Glass etkisi sadece küçük UI elementlerinde kullanılmalı:

* Navbar benzeri floating elements
* Floating buttons
* Small cards
* Explore section içindeki utility kartlar

Aşırı glass kullanılırsa site 2023 template gibi görünebilir.

---

## 14. Background Renk Mantığı

Pure white kullanılmamalı.

Önerilen background hissi:

* #F5F5F3
* Warm gray
* Soft cream
* Ultra dark charcoal bazı bölümlerde

Luxury hissi için arka plan çok önemli.

Sectionlar arasında çok sert renk kopuşu olmamalı.

---

## 15. Section Geçişleri

Sectionlar düz kesilmemeli.

Geçiş hissi:

* Slight gradient transition
* Cinematic fade
* Layered overlap
* Soft divider glow
* Büyük whitespace

Ama bunlar çok subtle olmalı.

---

## 16. Extra Premium Detay: Hover’da Video Hissi

Kart hover’da arkadaki görsel veya video hafif canlanabilir.

İlk aşamada gerçek video şart değil.

Efekt hissi:

* Static image sanılır
* Hover’da hafif hareket/zoom/parallax başlar
* Kullanıcı premium bir canlılık hisseder

---

## 17. İkinci Bento Section: Experience Cards

Hero’dan sonra başka bir bento/experience section olacak.

Kartlar:

1. What’s Happening
2. Gift Card
3. FunLab / Kids
4. Next Experience

Yerleşim:

* Sol üst: What’s Happening
* Sağ üst: Gift Card
* Sol alt: FunLab / Kids
* Sağ alt: Next Experience

Bu kartlar farklı yönlerden gelmeli ama agresif olmamalı.

---

## 18. Experience Bento Entrance Motion

Kartlar section ekrana girince farklı yönlerden gelsin.

Başlangıç değerleri:

* Sol üst: x: -40, y: -40
* Sağ üst: x: +40, y: -40
* Sol alt: x: -40, y: +40
* Sağ alt: x: +40, y: +40

Animasyon:

* Opacity: 0 → 1
* Scale: 0.96 → 1
* Duration: 0.8s–1s
* Easing: cubic-bezier(0.22, 1, 0.36, 1)

Hepsi aynı anda gelmemeli.

Stagger:

* Sol üst
* Sağ üst
* Sol alt
* Sağ alt
* Aralar: 0.08s–0.12s

Bu cinematic görünür.

Mobilde offset daha kısa olmalı:

* Yaklaşık 20px

---

## 19. Experience Bento Scroll Effect

Section ekrana girerken arka planda ultra hafif gradient movement olabilir.

Bu efekt çok subtle olmalı.

Amaç:

* Kullanıcı fark etmeyecek kadar hafif
* “Canlı premium UI” hissi vermek

---

## 20. Experience Bento Hover Efektleri

Tüm kartlarda aynı temel motion dili olmalı.

Hover:

* translateY(-4px)
* image scale(1.04)
* overlay opacity değişimi
* soft shadow bloom
* text reveal

Her kart aynı sistemle çalışmalı ki site unified hissettirsin.

---

## 21. Kartlara Küçük Özel Detaylar

Her karta küçük özel detay eklenebilir.

What’s Happening:

* Image hafif canlansın
* Video hissi olabilir

Gift Card:

* Light reflection sweep
* Hafif ışık geçişi

Featured Event / Next Experience:

* Parallax crop movement
* Ambient glow
* Animated gradient border
* Hafif pulse

Kids:

* Soft floating particles
* Light movement
* Oyuncu ama premium atmosfer

Abartı olmayacak.

---

## 22. Bento’dan Sonra Arka Plan Geçişi

Bento section bittikten sonra arka plan direkt değişmemeli.

Öneri:

* Soft gradient transition zone
* White → warm gray fade
* Çok subtle

Bu sectionların kopmasını engeller.

---

## 23. Bento Kart Şekilleri

Tüm kartlarda benzer radius kullanılmalı:

* 24px–28px

Yükseklikleri hafif farklı olabilir.

Bu editorial ve özel tasarım hissi verir.

---

## 24. Typography Motion

Başlıklar direkt ekrana pat diye çıkmamalı.

Öneri:

* Başlık önce maskelenmiş olsun
* Sonra yukarı reveal ile gelsin
* Luxury brand sitelerinin kullandığı sakin reveal mantığı

Örnek:
“Plan Your Visit” başlığı yukarı doğru mask reveal ile açılabilir.

---

## 25. Next Experience Kartı

Next Experience kartı daha canlı olabilir.

Mantık:

* En yakın event’i otomatik çeker
* Countdown yapar
* Dynamic badge gösterir

Badge örnekleri:

* 5 günden fazla varsa: Upcoming
* 3 gün kaldıysa: This Week
* Bugünse: Happening Today

Efekt:

* Ambient glow
* Animated gradient border
* Hafif pulse

Ama çok subtle.

Bu kart, diğer kartlara göre biraz daha “alive” hissedebilir.

---

## 26. Full Events Section Mantığı

Next Experience kartı sadece teaser olacak.

Sonrasında gelen full Events section:

* Tüm etkinlikleri gösterebilir
* Slider/carousel olabilir
* Filtreler olabilir
* Categories olabilir
* Festival cards olabilir

Bu bölüm tam experience alanı gibi çalışmalı.

---

## 27. Live Events & Festivals Section

Live Events & Festivals bölümü cinematic auto-moving carousel gibi tasarlanacak.

Hareket:

* Marquee gibi hızlı değil
* Çok yavaş
* Çok smooth
* 5–8 saniyede hafif kayıyor gibi
* Kullanıcı hareketi hemen fark etmeyebilir

Bu ultra premium hissettirir.

---

## 28. Events Carousel Hareket Mantığı

Default:

* Kartlar sağdan sola yavaşça akar.

Hover:

* Carousel durur veya çok yavaşlar.
* Kullanıcı okuyabilmeli.

Mouse çıkınca:

* Smooth şekilde tekrar devam eder.

Touch interaction:

* Basılı tutunca tamamen durur.
* Bırakınca smooth devam eder.

Bu çok premium his verir.

---

## 29. Events Carousel Scroll Hissi

Kesinlikle olmaması gereken:

* Sert linear ticker
* Hızlı sonsuz banner
* Ucuz marquee hissi

Olması gereken:

* Cinematic inertia motion
* Doğal kayma
* Slow floating movement

---

## 30. Infinite Seamless Loop

Events carousel seamless loop olmalı.

Yani:

* Son karttan sonra boşluk görünmemeli.
* Başlangıç/bitiş hissedilmemeli.
* Track duplicate edilerek akmalı.

Bu premium görünüm için çok önemli.

---

## 31. Events Kart Boyutları

Kartların hepsi aynı olmak zorunda değil.

Öneri:

* Bir featured card daha büyük
* Diğerleri normal
* Editorial collage hissi

Ama abartılmamalı.

---

## 32. Section Background Stratejisi

Site minimal luxury çizgide olduğu için her section farklı background’a ihtiyaç duymayabilir.

Ayrımı şu unsurlarla yapmak daha modern:

* Spacing
* Motion
* Composition
* Subtle divider glow

---

## 33. Section Ayrımı Nasıl Yapılacak?

1. Büyük whitespace

   * Section aralarında 120px–180px spacing olabilir.

2. İnce divider glow

   * Çok hafif gradient line
   * Neredeyse görünmez

3. Motion değişimi

   * Bento: stagger grid
   * Plan Visit / Explore City Mall: directional reveal
   * Events: cinematic horizontal motion

Bu yeterince ayrım yaratır.

---

## 34. Events Section Ekstra Premium Detay

Kartlarda çok hafif rotate olabilir.

Örnek:

* -1deg
* +1deg

Bu editorial collage hissi verir.

Ama çok minimal olmalı.

Başlık önerisi:
Live Events
& Festivals

Altında küçük muted text.

Mobilde auto-scroll daha yavaş olmalı çünkü fazla motion yorucu olabilir.

---

## 35. Store / Brand Carousel Section

Stores section’da sağdan sola ve soldan sağa kayan marka/store carousel olabilir.

Row mantığı:

* Row 1: sağ → sol
* Row 2: sol → sağ

Hareket:

* Çok yavaş
* Ultra smooth
* Almost floating
* Apple tarzı ambient motion hissi

Sakın hızlı yapılmamalı.

---

## 36. Store Carousel Interaction

Interaction:

* Hover → yavaşlar
* Mouse hold / touch hold → tamamen durur
* Bırakınca smooth devam eder

Loop:

* Infinite seamless loop
* Başlangıç/bitiş görünmemeli
* Track duplicate edilmeli

Bu, static grid yerine interactive ambient system hissi verir.

---

## 37. Store Card Efektleri

Normal durumda:

* Hafif dark overlay
* Logo veya store initial beyaz
* Cinematic image veya gradient
* Minimal premium görünüm

Hover’da:

* Image çok hafif zoom
* Overlay biraz açılır
* Logo daha netleşir
* Card hafif yükselir
* Shadow artar

Ama:

* Çok fazla animation yok
* Luxury hissi minimal motion’dan gelir

---

## 38. Store Card Radius ve Spacing

Border radius:

* 24px–28px iyi gider.

Spacing:

* Kartlar birbirine çok yakın olmayacak.
* Nefes alan yapı kullanılacak.

Background:

* Site background’u aynı kalabilir.
* Section kendi görselleri ve motion’uyla ayrışır.
* Ekstra gradient abartılmamalı.

---

## 39. Store Section Başlık Alternatifleri

Bu section için başlık önerileri:

* Discover Brands
* Explore Our Stores
* Fashion • Dining • Lifestyle

Başlık editorial ve premium hissettirmeli.

---

## 40. Store Carousel’den Sonra Explore City Mall

Store carousel bittikten sonra aşağı scroll edince dev boş beyaz alan gelmemeli.

Bunun yerine:

* Hafif spacing
* Sonra Explore City Mall section başlamalı.

Explore City Mall section:

* services
* kat planı
* opening hours
* mini map

hepsini tek premium section içinde toplamalı.

Bu çok önemli çünkü site fazla uzun hissettirmemeli.

---

## 41. Explore City Mall Section Genel Mantığı

Bu bölüm, AVM’nin utility tarafını premium şekilde sunacak.

Amaç:

* Sadece güzel tasarım değil, gerçek ziyaretçi kullanım alanı vermek
* Profesyonel corporate mall hissi
* Az yer kaplayan ama fonksiyonel section

Arka plan:

* Aynı kırık beyaz / krem ton
* Siteyle uyumlu

Section içinde:

* Hafif glassmorphism kartlar
* Blur
* İnce border
* Çok hafif shadow

Apple + luxury mall hissi.

---

## 42. Explore City Mall Layout

Section tam ortalı olacak.

Üst başlık:
EXPLORE CITY MALL

Alt metin:
Everything you need in one destination.

Altında 3 parçalı layout:

1. Sol büyük alan:

   * Floor Navigator

2. Sağ üst kart:

   * Opening Hours

3. Sağ alt kart:

   * Services

---

## 43. Sol Taraf: Floor Navigator

Floor Navigator en dikkat çeken alanlardan biri olacak.

Ama gerçek dev AVM haritası gibi olmayacak.

Boyut:

* Genişlik yaklaşık %55
* Yükseklik yaklaşık 420px

Kart içinde:

* Başlık: Interactive Floor Guide
* Kat seçiciler:

  * [-1]
  * [Ground]
  * [1st]
  * [2nd]

Kullanıcı hangi kata basarsa ortadaki mini kuş bakışı map değişir.

Map gerçek detaylı AVM haritası olmayacak.

Stylized minimalist map olacak:

* Renkli mağaza kutuları
* Koridor çizgileri
* Escalator icon
* Food court icon
* Cinema icon
* Kids icon
* Modern çizim hissi

Aşırı detay yok.
Premium görünüm var.

---

## 44. Floor Map Animasyonu

Kat değişince:

* Eski kat hafif blur olup fade out
* Yeni kat aşağıdan yumuşak gelir
* Transition yaklaşık 0.45s

Hover:

* Mağaza blokları hafif glow
* İlgili kategori highlight olabilir

---

## 45. Sağ Üst Kart: Opening Hours

Opening Hours kartı sağ tarafta ince yatay rectangle gibi duracak.

İçerik:

* TODAY
* OPEN NOW
* 10:00 — 22:00
* Friday hours may vary.

Altta:

* Canlı yeşil nokta
* Currently Open

Eğer kapalıysa:

* Kırmızı/gri state
* Closed • Opens at 10:00

Saat gerçek saate göre otomatik değişebilirse premium hissettirir.

Mevcut projede opening status utility varsa kullanılmalı.

---

## 46. Sağ Alt Kart: Services

Services kartı icon grid içerecek.

Servis örnekleri:

* Valet
* Free Wi-Fi
* Baby Room
* Accessibility
* Charging Station
* Parking
* ATM
* Gift Card

Hover:

* Icon hafif büyür
* Arka plan hafif parlar
* Kart mouse’a doğru çok hafif tilt olabilir

Ama abartı yok.

---

## 47. Explore City Mall Section Geçişi

Stores section’dan sonra:

* Explore section alttan hafif opacity ile çıkar
* translateY: 40px → 0
* Aşırı efekt yok

Sebep:

* Events kısmında motion var
* Store kısmında sürekli motion var
* Explore kısmı nefes aldırmalı

Bu UI/UX dengesi için önemli.

---

## 48. Explore City Mall’dan Sonra Footer

Explore section bittikten sonra:

* İnce divider line
* Sonra footer

Footer’dan önce ekstra section koyma.

Çünkü site zaten çok dolu, premium ve cinematic olacak.

Bir şey daha eklenirse luxury hissi yerine template hissi verebilir.

---

## 49. Footer Genel Görünüm

Footer arka plan:

* Çok koyu charcoal siyah
* Öneri: #0f0f10
* Saf siyah değil

Üstte:

* İnce gradient divider
* Belki çok hafif blur glow

Footer bir anda başlamamalı.
Yumuşak geçiş hissi olmalı.

---

## 50. Footer Layout

Footer 4 kolonlu olacak.

Sıkışık değil, bol boşluklu.

### Sol Taraf

En büyük alan.

İçerik:

* City Mall logosu
* Kısa slogan:
  Where shopping, dining & experiences come together.
* Social icons:

  * Instagram
  * TikTok
  * YouTube
  * Facebook

Hover:

* Icon hafif büyür
* Glow verir

### 2. Kolon: Explore

Linkler:

* Stores
* Dining
* Events
* Cinema
* Kids
* Gift Cards

### 3. Kolon: Visit

Linkler:

* Opening Hours
* Parking
* Services
* Mall Map
* Contact

### 4. Kolon: Newsletter

İçerik:

* Stay updated with events & offers
* Minimal email input
* Alt metin:
  Get weekly updates from City Mall.

Newsletter dev değil, minimal olacak.

---

## 51. Footer Üstü Moving Text

Footer başlamadan hemen önce çok ince horizontal moving text olabilir.

Metin:
CITY MALL • FASHION • EVENTS • FOOD • CINEMA • LIFESTYLE

Hareket:

* Çok yavaş
* Sağdan sola
* Çok transparan
* Çok subtle

Bu luxury hissi verir.

---

## 52. Footer Animasyonları

Footer’da hiçbir şey zıplamamalı.

Agresif animasyon yok.

Sadece:

* Fade
* Glow
* Hover lift
* Underline grow

Sakin premium motion kullanılacak.

---

## 53. Mobile Footer

Mobilde footer accordion olabilir.

Örnek:

* Explore +
* Visit +
* Services +

Açılır kapanır yapı modern his verir.

Ama ilk preview aşamasında accordion şart değil. Basit stacked mobile yapı da kabul edilebilir.

---

## 54. Footer’ın Rolü

Site cinematic, motion-heavy ve modern luxury bir yapıya gidiyor.

Footer’ın görevi:

* Sakin kapanış yapmak
* Kullanıcıyı yormamak
* Corporate güven hissi vermek

Bu yüzden footer:

* Çok büyük mega footer değil
* Çok sade corporate footer da değil
* İkisinin ortasında premium ve sakin olmalı

---

## 55. Uygulama Sırası

Claude Code bu brief’i okuyunca hepsini tek seferde yapmayacak.

Uygulama adımları:

1. Projeyi analiz et.
2. `/[locale]/redesign-preview` route planını çıkar.
3. Kod yazmadan önce dosya planı ver.
4. Onaydan sonra sadece preview route oluştur.
5. Sonra Cinematic Hero Bento yap.
6. Sonra Experience Bento yap.
7. Sonra Live Events & Festivals yap.
8. Sonra Discover Brands Motion yap.
9. Sonra Explore City Mall yap.
10. Sonra Preview Luxury Footer yap.
11. Her aşamadan sonra build/lint kontrolü yapılacak.

---

## 56. Canlı Siteyi Koruma Kuralları

Şimdilik dokunulmayacak dosyalar:

* Mevcut home page
* Mevcut Navbar
* Mevcut Footer
* Mevcut stores/events/dining sayfaları
* Mevcut global design system
* package.json dependency listesi

Yeni deneme componentleri `src/components/redesign/` altında yapılmalı.

Yeni route:

* `src/app/[locale]/redesign-preview/page.tsx`

---

## 57. Motion Güvenlik Kuralları

Motion premium olmalı ama performansı bozmayacak.

Kurallar:

* No GSAP in first phase
* No Three.js in first phase
* No WebGL in first phase
* No heavy video first phase
* CSS keyframes kullanılabilir
* Tailwind transition kullanılabilir
* React state kullanılabilir
* IntersectionObserver gerekirse kullanılabilir
* prefers-reduced-motion desteklenmeli
* Mobilde motion daha yavaş ve daha az olmalı

---

## 58. Genel Kalite Kontrol

Her section sonrası kontrol edilecek:

* Desktop görünüm premium mu?
* Mobilde taşma var mı?
* Text okunuyor mu?
* Hover abartılı mı?
* Motion çok hızlı mı?
* Existing site bozuldu mu?
* `/tr` hâlâ çalışıyor mu?
* `/tr/redesign-preview` çalışıyor mu?
* `/en/redesign-preview` çalışıyor mu?
* `npm run build` temiz mi?
* `npm run lint` temiz mi?
