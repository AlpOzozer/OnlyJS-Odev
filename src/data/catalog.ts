export const categories = [
  { id: "protein", name: "Protein", menu: "Proteinler", card: "PROTEİN" },
  { id: "vitamin", name: "Vitamin", menu: "Vitamin", card: "VİTAMİNLER" },
  { id: "saglik", name: "Sağlık", menu: "Sağlık", card: "SAĞLIK" },
  { id: "spor-gidalari", name: "Spor Gıdaları", menu: "Spor Gıdaları", card: "SPOR GIDALARI" },
  { id: "gida", name: "Gıda", menu: "Gıda", card: "GIDA" },
] as const

export type CategoryId = (typeof categories)[number]["id"]

export type Flavor = {
  id: string
  name: string
  color: string
}

export type SizeOption = {
  id: string
  label: string
  price: number
  oldPrice?: number
  servings: string
}

export type Product = {
  id: string
  slug: string
  name: string
  shortLabel: string
  category: CategoryId
  shortDescription: string
  description: string
  rating: number
  reviewCount: number
  flavors: Flavor[]
  sizes: SizeOption[]
  bestseller?: boolean
  benefits: string[]
  nutrition: { label: string; value: string }[]
  usage: string
}

export const products: Product[] = [
  {
    id: "whey-protein",
    slug: "whey-protein",
    name: "Whey Protein",
    shortLabel: "WHEY",
    category: "protein",
    shortDescription: "Antrenman sonrası toparlanmayı destekleyen yüksek proteinli whey karışımı.",
    description:
      "OJS Whey Protein, her serviste yüksek kaliteli whey protein konsantresi sunar. Çikolata, vanilya, çilek ve muz aromalarıyla günlük protein ihtiyacını pratik şekilde tamamlamak için geliştirildi. Su veya sütle kolay karışır, antrenman sonrası öğünlere eklenebilir.",
    rating: 4.8,
    reviewCount: 1864,
    bestseller: true,
    flavors: [
      { id: "cikolata", name: "Çikolata", color: "#4a2c1a" },
      { id: "vanilya", name: "Vanilya", color: "#c4a574" },
      { id: "cilek", name: "Çilek", color: "#be123c" },
      { id: "muz", name: "Muz", color: "#ca8a04" },
    ],
    sizes: [
      { id: "400", label: "400 g", price: 749, servings: "16 servis" },
      { id: "1000", label: "1000 g", price: 1499, oldPrice: 1799, servings: "40 servis" },
      { id: "2000", label: "2000 g", price: 2499, oldPrice: 2999, servings: "80 servis" },
    ],
    benefits: ["Servis başı 24 g protein", "Düşük şeker", "Kolay karışım", "4 aroma seçeneği"],
    nutrition: [
      { label: "Enerji", value: "118 kcal" },
      { label: "Protein", value: "24 g" },
      { label: "Karbonhidrat", value: "3 g" },
      { label: "Yağ", value: "1,5 g" },
    ],
    usage: "1 ölçek (25 g) ürünü 200 ml su veya süt ile çalkalayın. Antrenman sonrasında tüketebilirsiniz.",
  },
  {
    id: "creatine",
    slug: "creatine",
    name: "Creatine Monohydrate",
    shortLabel: "CREATINE",
    category: "spor-gidalari",
    shortDescription: "Kısa ve yoğun antrenmanlarda performansı destekleyen mikronize kreatin.",
    description:
      "OJS Creatine, mikronize kreatin monohidrat formundadır. Günlük 3 g kullanımla güç antrenmanlarını desteklemek isteyenler için sade ve meyveli seçenekler sunar. İçeceklere kolayca karışır.",
    rating: 4.9,
    reviewCount: 2402,
    bestseller: true,
    flavors: [
      { id: "naturel", name: "Naturel", color: "#16324f" },
      { id: "limon", name: "Limon", color: "#65a30d" },
      { id: "portakal", name: "Portakal", color: "#ea580c" },
    ],
    sizes: [
      { id: "150", label: "150 g", price: 349, servings: "30 servis" },
      { id: "300", label: "300 g", price: 599, oldPrice: 699, servings: "60 servis" },
      { id: "500", label: "500 g", price: 899, oldPrice: 1099, servings: "100 servis" },
    ],
    benefits: ["Servis başı 3 g kreatin", "Mikronize form", "Şekersiz naturel seçenek", "Günlük kullanım"],
    nutrition: [
      { label: "Kreatin", value: "3 g" },
      { label: "Enerji", value: "0 kcal" },
      { label: "Protein", value: "0 g" },
      { label: "Şeker", value: "0 g" },
    ],
    usage: "1 ölçek (3 g) ürünü 200 ml suya karıştırın. Her gün aynı saatte tüketebilirsiniz.",
  },
  {
    id: "bcaa",
    slug: "bcaa",
    name: "BCAA+",
    shortLabel: "BCAA+",
    category: "spor-gidalari",
    shortDescription: "2:1:1 oranında dallı zincirli amino asit ve ferah aromalar.",
    description:
      "OJS BCAA+, antrenman sırasında içilebilen ferah aromalı bir amino asit içeceğidir. Lösin, izolösin ve valin dengesini 2:1:1 oranında sunar. Egzersiz boyunca sıvı desteğini pratikleştirir.",
    rating: 4.6,
    reviewCount: 980,
    bestseller: true,
    flavors: [
      { id: "mango", name: "Mango", color: "#f59e0b" },
      { id: "orman", name: "Orman Meyvesi", color: "#6d28d9" },
      { id: "limonata", name: "Limonata", color: "#84cc16" },
    ],
    sizes: [
      { id: "300", label: "300 g", price: 529, servings: "30 servis" },
      { id: "500", label: "500 g", price: 799, oldPrice: 929, servings: "50 servis" },
    ],
    benefits: ["2:1:1 BCAA oranı", "Antrenman içi kullanım", "Ferah aromalar", "Şeker ilavesiz"],
    nutrition: [
      { label: "BCAA", value: "5 g" },
      { label: "Lösin", value: "2,5 g" },
      { label: "Enerji", value: "10 kcal" },
      { label: "Şeker", value: "0 g" },
    ],
    usage: "1 ölçek ürünü 350 ml soğuk su ile karıştırın. Antrenman sırasında yudumlayın.",
  },
  {
    id: "pre-workout",
    slug: "pre-workout",
    name: "Pre-Workout",
    shortLabel: "PRE",
    category: "spor-gidalari",
    shortDescription: "Antrenman öncesi odak ve enerji hissini destekleyen formül.",
    description:
      "OJS Pre-Workout, antrenmandan önce tüketilmek üzere kafein, beta-alanin ve sitrülin içeren bir karışımdır. Karpuz, yaban mersini ve şeftali aromalarıyla hazırlanır. Akşam antrenmanlarından önce kullanım saatine dikkat edin.",
    rating: 4.7,
    reviewCount: 1320,
    bestseller: true,
    flavors: [
      { id: "karpuz", name: "Karpuz", color: "#e11d48" },
      { id: "blue", name: "Blue Raspberry", color: "#2563eb" },
      { id: "seftali", name: "Şeftali", color: "#fb7185" },
    ],
    sizes: [
      { id: "300", label: "300 g", price: 649, oldPrice: 749, servings: "30 servis" },
      { id: "400", label: "400 g", price: 799, servings: "40 servis" },
    ],
    benefits: ["Antrenman öncesi", "150 mg kafein", "Beta-alanin", "Citrulline"],
    nutrition: [
      { label: "Kafein", value: "150 mg" },
      { label: "Beta-alanin", value: "1,6 g" },
      { label: "Citrulline", value: "3 g" },
      { label: "Enerji", value: "15 kcal" },
    ],
    usage: "Antrenmandan 20-30 dakika önce 1 ölçek ürünü 250 ml su ile karıştırın.",
  },
  {
    id: "glutamine",
    slug: "glutamine",
    name: "Glutamine",
    shortLabel: "GLUTAMINE",
    category: "spor-gidalari",
    shortDescription: "Saf L-glutamin. İçeceklere ve protein shake'lerine eklenebilir.",
    description:
      "OJS Glutamine, katkı içermeyen L-glutamin tozudur. Protein tozuna veya suya eklenerek gün içinde kullanılabilir. Naturel tadı diğer aromaları değiştirmez.",
    rating: 4.5,
    reviewCount: 640,
    flavors: [{ id: "naturel", name: "Naturel", color: "#1e3a5f" }],
    sizes: [
      { id: "300", label: "300 g", price: 429, servings: "60 servis" },
      { id: "500", label: "500 g", price: 629, oldPrice: 729, servings: "100 servis" },
    ],
    benefits: ["Saf L-glutamin", "Tatsız formül", "Shake'e eklenebilir", "Günlük 5 g"],
    nutrition: [
      { label: "L-Glutamin", value: "5 g" },
      { label: "Enerji", value: "20 kcal" },
      { label: "Protein", value: "5 g" },
      { label: "Şeker", value: "0 g" },
    ],
    usage: "1 ölçek (5 g) ürünü suya veya protein shake'inize ekleyin.",
  },
  {
    id: "l-citrulline",
    slug: "l-citrulline",
    name: "L-Citrulline",
    shortLabel: "L-CITRULLINE",
    category: "spor-gidalari",
    shortDescription: "Antrenman öncesi içeceklere eklenen saf L-sitrülin.",
    description:
      "OJS L-Citrulline, antrenman öncesi rutinine eklenebilen saf bir amino asit tozudur. Pre-workout karışımlarına veya suya katılarak kullanılır.",
    rating: 4.4,
    reviewCount: 410,
    flavors: [{ id: "naturel", name: "Naturel", color: "#0f3d5e" }],
    sizes: [
      { id: "150", label: "150 g", price: 389, servings: "30 servis" },
      { id: "300", label: "300 g", price: 649, oldPrice: 749, servings: "60 servis" },
    ],
    benefits: ["Saf L-sitrülin", "Antrenman öncesi", "Tatsız", "Kolay doz"],
    nutrition: [
      { label: "L-Citrulline", value: "5 g" },
      { label: "Enerji", value: "0 kcal" },
      { label: "Şeker", value: "0 g" },
      { label: "Sodyum", value: "0 mg" },
    ],
    usage: "Antrenmandan önce 1 ölçek (5 g) ürünü 250 ml suya karıştırın.",
  },
  {
    id: "collagen",
    slug: "collagen",
    name: "Collagen",
    shortLabel: "COLLAGEN",
    category: "saglik",
    shortDescription: "Hidrolize kolajen peptitleri. Su, kahve veya smoothie içine karışır.",
    description:
      "OJS Collagen, hidrolize tip 1 ve tip 3 kolajen peptitleri içerir. Naturel hali içeceklerin tadını bozmaz, çilek aroması ise tek başına içilebilir. Günlük cilt, saç ve eklem bakım rutinine eklenebilir.",
    rating: 4.7,
    reviewCount: 1104,
    bestseller: true,
    flavors: [
      { id: "naturel", name: "Naturel", color: "#9a3412" },
      { id: "cilek", name: "Çilek", color: "#e11d48" },
    ],
    sizes: [
      { id: "300", label: "300 g", price: 579, servings: "30 servis" },
      { id: "450", label: "450 g", price: 799, oldPrice: 899, servings: "45 servis" },
    ],
    benefits: ["Hidrolize peptit", "Tip 1 ve 3", "Günlük 10 g", "İçeceğe karışır"],
    nutrition: [
      { label: "Kolajen", value: "10 g" },
      { label: "Protein", value: "9 g" },
      { label: "Enerji", value: "36 kcal" },
      { label: "Şeker", value: "0 g" },
    ],
    usage: "1 ölçek (10 g) ürünü su, kahve veya smoothie içine karıştırın.",
  },
  {
    id: "zma",
    slug: "zma",
    name: "ZMA",
    shortLabel: "ZMA",
    category: "saglik",
    shortDescription: "Çinko, magnezyum ve B6 vitamini içeren gece takviyesi.",
    description:
      "OJS ZMA, çinko, magnezyum ve B6 vitaminini bir araya getiren kapsül formunda bir takviyedir. Akşam rutinine eklenmek üzere hazırlanmıştır.",
    rating: 4.6,
    reviewCount: 733,
    flavors: [{ id: "kapsul", name: "Kapsül", color: "#334155" }],
    sizes: [
      { id: "90", label: "90 kapsül", price: 449, servings: "30 gün" },
      { id: "180", label: "180 kapsül", price: 749, oldPrice: 899, servings: "60 gün" },
    ],
    benefits: ["Çinko", "Magnezyum", "B6 vitamini", "Kapsül form"],
    nutrition: [
      { label: "Çinko", value: "30 mg" },
      { label: "Magnezyum", value: "450 mg" },
      { label: "B6", value: "10 mg" },
      { label: "Servis", value: "3 kapsül" },
    ],
    usage: "Akşam yatmadan önce, aç karnına 3 kapsül su ile alın.",
  },
  {
    id: "selenium",
    slug: "selenium",
    name: "Selenium",
    shortLabel: "SELENIUM",
    category: "saglik",
    shortDescription: "Günlük selenyum ihtiyacını destekleyen pratik tablet.",
    description:
      "OJS Selenium, günlük selenyum alımını desteklemek için hazırlanmış küçük bir tablettir. Sabah rutinine eklenebilir.",
    rating: 4.3,
    reviewCount: 286,
    flavors: [{ id: "tablet", name: "Tablet", color: "#44403c" }],
    sizes: [
      { id: "60", label: "60 tablet", price: 249, servings: "60 gün" },
      { id: "120", label: "120 tablet", price: 399, oldPrice: 469, servings: "120 gün" },
    ],
    benefits: ["Günlük 1 tablet", "Selenyum", "Küçük form", "Uzun kullanım"],
    nutrition: [
      { label: "Selenyum", value: "100 mcg" },
      { label: "Servis", value: "1 tablet" },
      { label: "Şeker", value: "0 g" },
      { label: "Kalori", value: "1 kcal" },
    ],
    usage: "Günde 1 tablet, yemekle birlikte su ile alın.",
  },
  {
    id: "ginseng",
    slug: "ginseng",
    name: "Panax Ginseng",
    shortLabel: "GINSENG",
    category: "saglik",
    shortDescription: "Panax ginseng ekstresi içeren günlük kapsül.",
    description:
      "OJS Panax Ginseng, standardize ginseng ekstresi içeren bir kapsüldür. Günün erken saatlerinde, enerji rutininize eklemek için uygundur.",
    rating: 4.4,
    reviewCount: 352,
    flavors: [{ id: "kapsul", name: "Kapsül", color: "#14532d" }],
    sizes: [
      { id: "60", label: "60 kapsül", price: 329, servings: "30 gün" },
      { id: "120", label: "120 kapsül", price: 549, oldPrice: 629, servings: "60 gün" },
    ],
    benefits: ["Panax ginseng", "Sabah kullanımı", "Kapsül", "Standart doz"],
    nutrition: [
      { label: "Ginseng ekstresi", value: "200 mg" },
      { label: "Servis", value: "2 kapsül" },
      { label: "Kafein", value: "0 mg" },
      { label: "Şeker", value: "0 g" },
    ],
    usage: "Sabah 2 kapsülü su ile alın. Akşam saatlerinde kullanmayın.",
  },
  {
    id: "vitamin-d",
    slug: "vitamin-d",
    name: "Vitamin D3 + K2",
    shortLabel: "D3 + K2",
    category: "vitamin",
    shortDescription: "D3 ve K2 vitaminlerini bir arada sunan yumuşak kapsül.",
    description:
      "OJS Vitamin D3 + K2, günlük D vitamini rutini için zeytinyağı içinde çözünmüş D3 ve K2 içerir. Yemekle birlikte alınması önerilir.",
    rating: 4.8,
    reviewCount: 1540,
    bestseller: true,
    flavors: [{ id: "softgel", name: "Softgel", color: "#1d4ed8" }],
    sizes: [
      { id: "60", label: "60 kapsül", price: 299, servings: "60 gün" },
      { id: "120", label: "120 kapsül", price: 499, oldPrice: 579, servings: "120 gün" },
    ],
    benefits: ["D3 vitamini", "K2 vitamini", "Yumuşak kapsül", "Günde 1 adet"],
    nutrition: [
      { label: "D3", value: "2000 IU" },
      { label: "K2", value: "100 mcg" },
      { label: "Servis", value: "1 kapsül" },
      { label: "Taşıyıcı", value: "Zeytinyağı" },
    ],
    usage: "Günde 1 kapsülü yağ içeren bir öğünle birlikte alın.",
  },
  {
    id: "omega",
    slug: "omega",
    name: "Omega-3",
    shortLabel: "OMEGA-3",
    category: "vitamin",
    shortDescription: "EPA ve DHA içeren balık yağı softgel kapsülleri.",
    description:
      "OJS Omega-3, konsantre balık yağından elde edilen EPA ve DHA sunar. Günlük yağ asidi alımını desteklemek için yemekle birlikte kullanılır.",
    rating: 4.7,
    reviewCount: 1211,
    bestseller: true,
    flavors: [{ id: "limon", name: "Limon", color: "#0369a1" }],
    sizes: [
      { id: "90", label: "90 kapsül", price: 379, servings: "30 gün" },
      { id: "180", label: "180 kapsül", price: 649, oldPrice: 749, servings: "60 gün" },
    ],
    benefits: ["EPA ve DHA", "Limon aromalı", "Moleküler distilasyon", "Yemekle kullanım"],
    nutrition: [
      { label: "Balık yağı", value: "1000 mg" },
      { label: "EPA", value: "360 mg" },
      { label: "DHA", value: "240 mg" },
      { label: "Servis", value: "3 kapsül" },
    ],
    usage: "Günde 3 kapsülü yemek sırasında su ile alın.",
  },
  {
    id: "multivitamin",
    slug: "multivitamin",
    name: "Günlük Multivitamin",
    shortLabel: "MULTI",
    category: "vitamin",
    shortDescription: "Vitamin ve mineral kompleksini tek tablette birleştirir.",
    description:
      "OJS Günlük Multivitamin, yoğun tempoda vitamin ve mineral alımını sadeleştirmek isteyenler için hazırlanmıştır. Sabah kahvaltısıyla birlikte bir tablet yeterlidir.",
    rating: 4.5,
    reviewCount: 804,
    flavors: [{ id: "tablet", name: "Tablet", color: "#7c3aed" }],
    sizes: [
      { id: "30", label: "30 tablet", price: 279, servings: "30 gün" },
      { id: "90", label: "90 tablet", price: 699, oldPrice: 799, servings: "90 gün" },
    ],
    benefits: ["Geniş vitamin profili", "Mineral desteği", "Günde 1 tablet", "Sabah kullanımı"],
    nutrition: [
      { label: "C vitamini", value: "80 mg" },
      { label: "D vitamini", value: "10 mcg" },
      { label: "B12", value: "2,5 mcg" },
      { label: "Çinko", value: "10 mg" },
    ],
    usage: "Kahvaltıdan sonra 1 tableti su ile alın.",
  },
  {
    id: "cream-of-rice",
    slug: "cream-of-rice",
    name: "Cream of Rice",
    shortLabel: "RICE",
    category: "gida",
    shortDescription: "Hızlı hazırlanan, sade pirinç kreması. Öğünlere karbonhidrat ekler.",
    description:
      "OJS Cream of Rice, ince öğütülmüş pirinçten yapılan bir karbonhidrat kaynağıdır. Su veya sütle dakikalar içinde hazırlanır. Protein tozu ile karıştırılarak doyurucu bir öğüne dönüşebilir.",
    rating: 4.6,
    reviewCount: 690,
    bestseller: true,
    flavors: [
      { id: "naturel", name: "Naturel", color: "#a16207" },
      { id: "cikolata", name: "Çikolata", color: "#78350f" },
      { id: "vanilya", name: "Vanilya", color: "#d6b07a" },
    ],
    sizes: [
      { id: "1000", label: "1000 g", price: 349, servings: "20 servis" },
      { id: "2000", label: "2000 g", price: 599, oldPrice: 699, servings: "40 servis" },
    ],
    benefits: ["Hızlı hazırlık", "Sindirimi kolay", "Öğünlere eklenir", "3 aroma"],
    nutrition: [
      { label: "Enerji", value: "180 kcal" },
      { label: "Karbonhidrat", value: "40 g" },
      { label: "Protein", value: "3 g" },
      { label: "Yağ", value: "0,5 g" },
    ],
    usage: "50 g ürünü 200 ml sıcak su veya süt ile karıştırıp 1 dakika bekletin.",
  },
]

export function getCategory(id: string) {
  return categories.find((category) => category.id === id)
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function startingSize(product: Product) {
  return product.sizes.reduce((lowest, size) => (size.price < lowest.price ? size : lowest))
}

export function bestsellers() {
  return products.filter((product) => product.bestseller)
}

export function relatedProducts(product: Product) {
  return products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)
}

export const popularProducts = [
  "whey-protein",
  "cream-of-rice",
  "creatine",
  "bcaa",
  "pre-workout",
  "collagen",
  "zma",
]
  .map((slug) => getProduct(slug))
  .filter((product): product is Product => Boolean(product))
