// Edit business details, menu and gallery here.
import hero from "@/assets/hero-biryani.jpg";
import mutton from "@/assets/dish-mutton.jpg";
import veg from "@/assets/dish-veg.jpg";
import c65 from "@/assets/dish-chicken65.jpg";

export const SITE = {
  name: "B.TECH BIRYANI",
  phoneDisplay: "+91 73375 84872",
  phoneTel: "tel:+917337584872",
  smsLink: "sms:+917337584872",
  location: "Ambajipeta, Andhra Pradesh, India",
  instagram: "https://www.instagram.com/b.tech_biryanis/",
  mapsSearch:
    "https://www.google.com/maps/search/?api=1&query=BTech%20Biryani%20Ambajipeta%20Andhra%20Pradesh",
  mapEmbed: "https://www.google.com/maps?q=Ambajipeta,Andhra%20Pradesh&z=14&output=embed",
  // Set to true only once the number is confirmed to accept WhatsApp messages.
  whatsappEnabled: false,
  whatsapp: "https://wa.me/917337584872",
  // Fill in once confirmed, e.g. [{ days: "Mon–Sun", time: "11:00 AM – 10:30 PM" }]
  hours: [] as { days: string; time: string }[],
};

export type Category = "Biryani" | "Starters";
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  portion: string;
  price: number;
  veg: boolean;
  available: boolean;
  category: Category;
  image: string;
  featured?: boolean;
};

// DEMO CONTENT — names, prices and portions are placeholders pending confirmation.
export const MENU_IS_DEMO = true;
export const MENU: MenuItem[] = [
  { id: "chicken-dum", name: "Chicken Dum Biryani", description: "Sample dish — description to be confirmed by the restaurant.", portion: "Single (to confirm)", price: 0, veg: false, available: true, category: "Biryani", image: hero, featured: true },
  { id: "mutton", name: "Mutton Biryani", description: "Sample dish — description to be confirmed by the restaurant.", portion: "Single (to confirm)", price: 0, veg: false, available: true, category: "Biryani", image: mutton, featured: true },
  { id: "veg", name: "Veg Biryani", description: "Sample dish — description to be confirmed by the restaurant.", portion: "Single (to confirm)", price: 0, veg: true, available: true, category: "Biryani", image: veg, featured: true },
  { id: "c65", name: "Chicken 65", description: "Sample dish — description to be confirmed by the restaurant.", portion: "Plate (to confirm)", price: 0, veg: false, available: true, category: "Starters", image: c65 },
  { id: "chicken-fry", name: "Chicken Fry Piece Biryani", description: "Sample dish — description to be confirmed by the restaurant.", portion: "Single (to confirm)", price: 0, veg: false, available: true, category: "Biryani", image: hero },
  { id: "paneer", name: "Paneer Biryani", description: "Sample dish — description to be confirmed by the restaurant.", portion: "Single (to confirm)", price: 0, veg: true, available: true, category: "Biryani", image: veg },
];

// Illustrative images — replace with approved photos of the restaurant.
export const GALLERY = [
  { src: hero, alt: "Illustrative photo: chicken biryani in a copper pot" },
  { src: mutton, alt: "Illustrative photo: mutton biryani with raita and egg" },
  { src: c65, alt: "Illustrative photo: chicken 65 starter" },
  { src: veg, alt: "Illustrative photo: vegetable paneer biryani" },
];

export const priceLabel = (p: number) => (p > 0 ? `₹${p}` : "Price on request");
