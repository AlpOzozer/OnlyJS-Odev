export type Review = {
  id: string
  title: string
  body: string
  author: string
  date: string
  rating: number
  productId?: string
}

export const storeReviews: Review[] = [
  {
    id: "r1",
    title: "Beğendim gayet güzeldi",
    body: "Ürün gayet güzel, aroması da beklediğim gibiydi. Karışımı kolay, tekrar alırım.",
    author: "Elif K.",
    date: "03/05/2024",
    rating: 5,
  },
  {
    id: "r2",
    title: "Mükemmel kalite",
    body: "Aldığım protein tozu gerçekten kaliteli. Özellikle antrenman sonrası rutinime iyi oturdu.",
    author: "Mert A.",
    date: "15/04/2024",
    rating: 5,
  },
  {
    id: "r3",
    title: "Hızlı kargo",
    body: "Siparişimin ertesi günü kapımdaydı. Paketleme de sağlamdı.",
    author: "Zeynep T.",
    date: "28/04/2024",
    rating: 5,
  },
  {
    id: "r4",
    title: "Etkili ürün",
    body: "BCAA kullanmaya başladıktan sonra antrenmanlarımı daha rahat tamamlıyorum.",
    author: "Can D.",
    date: "20/04/2024",
    rating: 4,
  },
  {
    id: "r5",
    title: "Güvenilir satıcı",
    body: "OJS Nutrition vitaminlerini düzenli kullanıyorum. Sipariş süreci sorunsuz.",
    author: "Ayşe Y.",
    date: "12/05/2024",
    rating: 5,
  },
  {
    id: "r6",
    title: "Lezzet mükemmel",
    body: "Whey proteinin çikolata aroması su ile bile çok iyi içiliyor.",
    author: "Burak S.",
    date: "07/05/2024",
    rating: 5,
  },
]

export const faqs = [
  {
    question: "Kargo ne kadar sürede gelir?",
    answer: "Saat 16:00'a kadar verilen siparişler aynı gün kargoya verilir. Teslimat şehre göre 1-3 iş günüdür.",
  },
  {
    question: "Ücretsiz kargo limiti nedir?",
    answer: "100 TL ve üzeri alışverişlerde standart kargo ücretsizdir. Aynı gün teslimat ayrıca ücretlendirilir.",
  },
  {
    question: "Ürün aromasını nasıl seçerim?",
    answer: "Ürün detayında aroma ve gramaj seçtikten sonra fiyat güncellenir. Sepete seçtiğiniz varyant eklenir.",
  },
  {
    question: "İade koşulları nelerdir?",
    answer: "Açılmamış ürünleri 14 gün içinde iade edebilirsiniz. Memnun kalmazsanız destek ekibimiz yardımcı olur.",
  },
]
