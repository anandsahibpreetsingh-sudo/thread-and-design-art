// Add or edit products here. `images` are files in /public/images.
// Add a photo by dropping it in public/images and listing its file name.
export const SHOP_URL = "https://www.etsy.com/shop/ThreadAndDesignArt";
export const listingUrl = (id) => `https://www.etsy.com/listing/${id}`;

export const CATEGORIES = ["All", "Rugs", "Cushion covers", "Pashmina"];

export const PRODUCTS = [
  { id: "4342135795", category: "Rugs", title: "Navy Medallion Runner", subtitle: "Hand-embroidered wool runner, 2.5 x 8 ft", size: "2.5 x 8 ft (75 x 240 cm)", use: "Hallway, entryway, galley kitchen", badge: "In stock", images: ["navy-hallway.jpg", "navy-real.jpg", "navy-kitchen.jpg"], note: "The rug photo is real. Room scenes are AI-generated for styling." },
  { id: "4354550139", category: "Rugs", title: "Orange Floral Runner", subtitle: "Aubusson-style chain stitch runner, 2.5 x 8 ft", size: "2.5 x 8 ft (75 x 240 cm)", use: "Hallway, kitchen, bedside", badge: "In stock", images: ["orange-hallway.jpg", "orange-real.jpg"], note: "The rug photo is real. The room scene is AI-generated for styling." },
  { id: "4338456978", category: "Rugs", title: "Red and Blue Area Rug", subtitle: "Hand-embroidered wool area rug, 6 x 9 ft", size: "6 x 9 ft (180 x 270 cm)", use: "Living room, dining room, bedroom", badge: "In stock", images: ["redblue-real.jpg"] },
  { id: "4338424780", category: "Rugs", title: "Rising Swan Design Rug", subtitle: "Chain stitch, wool and silk", use: "Statement piece for living spaces", images: [] },
  { id: "4331608121", category: "Rugs", title: "Aubusson Chain Stitch Rug", subtitle: "Handmade wool and silk, 4 x 6 ft", size: "4 x 6 ft (120 x 180 cm)", use: "Bedroom, study, entryway", images: [] },
  { id: "4332018119", category: "Rugs", title: "Floral Suzani Area Rug", subtitle: "Wool embroidered, 4 x 6 ft", size: "4 x 6 ft (120 x 180 cm)", use: "Bedroom, reading nook", images: [] },
  { id: "4411348850", category: "Rugs", title: "Teal and Black Medallion Rug", subtitle: "Handmade floral medallion, 8 x 11 ft", size: "8 x 11 ft (240 x 335 cm)", use: "Large living or dining room", images: [] },
  { id: "4361883392", category: "Rugs", title: "Kandinsky Art Rug", subtitle: "Modern chain stitch wool, 2 x 3 ft", size: "2 x 3 ft (60 x 90 cm)", use: "Entry mat, wall hanging, bath", images: [] },
  { id: "4361892195", category: "Rugs", title: "Mustard Lotus Rug", subtitle: "Chain stitch floral, 2 x 3 ft", size: "2 x 3 ft (60 x 90 cm)", use: "Entry mat, wall hanging, bath", images: [] },
  { id: "4485082590", category: "Rugs", title: "ABC Nursery Rug", subtitle: "Silk chain stitch, educational design", use: "Nursery, playroom", images: [] },
  { id: "4508913109", category: "Cushion covers", title: "Crane Floral Silk Cushion Cover", subtitle: "Silk chain stitch, 20 x 20 in", size: "20 x 20 in (50 x 50 cm)", use: "Sofa, bed, reading chair", images: [] },
  { id: "4495914846", category: "Cushion covers", title: "Abstract Love Cushion Cover", subtitle: "Silk chain stitch, 18 x 18 in", size: "18 x 18 in (45 x 45 cm)", use: "Sofa, bed, accent chair", images: [] },
  { id: "4495912228", category: "Cushion covers", title: "Tree of Life Cushion Cover", subtitle: "Silk chain stitch, 18 x 18 in", size: "18 x 18 in (45 x 45 cm)", use: "Sofa, bed, accent chair", images: [] },
  { id: "4486232059", category: "Pashmina", title: "Midnight Zari Paisley Shawl", subtitle: "Black pashmina wrap with golden zari", use: "Evening wrap, winter layer", images: [] },
  { id: "4479508801", category: "Pashmina", title: "Pure Pashmina Scarf", subtitle: "100% soft wool, handmade", use: "Everyday scarf, gift", images: [] },
];
