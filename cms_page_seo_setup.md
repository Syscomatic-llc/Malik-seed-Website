# CMS Page SEO Import Data Guide

Below is the copyable JSON data for all the fields required by the `/api/v1/page-seo/{page_path}` CMS endpoint, excluding the `og_image` field. You can use these values to populate the entries in your CMS database.

---

## 1. Primary Site Pages

### Home Page
```json
{
  "page_path": "/",
  "title": "Home",
  "meta_title": "Malik Seeds - Helping Farmers Grow with Confidence Since 1969",
  "meta_description": "Discover our high-yield hybrid seed varieties, success stories, and agricultural innovations empowering farmers since 1969.",
  "meta_keywords": "Malik Seeds, hybrid seeds, high-yield seeds, agriculture Bangladesh, farming innovations, seed company",
  "og_title": "Malik Seeds - Helping Farmers Grow with Confidence Since 1969",
  "og_description": "Discover our high-yield hybrid seed varieties, success stories, and agricultural innovations empowering farmers since 1969."
}
```

### About Page (Our Story)
```json
{
  "page_path": "/about",
  "title": "Our Story",
  "meta_title": "Our Story - Malik Seeds",
  "meta_description": "Discover the historical journey of A.R. Malik, our mission, core brand values, and agricultural milestones from 1962 to today.",
  "meta_keywords": "A.R. Malik, Malik Seeds, agricultural history, core values, agriculture Bangladesh, seed milestones",
  "og_title": "Our Story - Malik Seeds",
  "og_description": "Discover the historical journey of A.R. Malik, our mission, core brand values, and agricultural milestones from 1962 to today."
}
```

### Careers Page
```json
{
  "page_path": "/careers",
  "title": "Careers",
  "meta_title": "Careers - Malik Seeds",
  "meta_description": "Join Malik Seeds and help build the future of agriculture in Bangladesh. Explore open positions and apply to join our team.",
  "meta_keywords": "Malik Seeds careers, jobs in agriculture, agriculture vacancies, join Malik Seeds, work in Bangladesh",
  "og_title": "Careers at Malik Seeds",
  "og_description": "We are assembling a team of builders with high agency. Explore our open roles and drop your CV."
}
```

### Open Positions Page
```json
{
  "page_path": "/careers/open-positions",
  "title": "Open Positions",
  "meta_title": "Open Positions - Malik Seeds",
  "meta_description": "Explore open roles and career opportunities at Malik Seeds. Join our team and shape the future of agriculture.",
  "meta_keywords": "job openings, active vacancies, careers in agriculture, agronomy jobs, seed company recruitment",
  "og_title": "Open Positions - Malik Seeds",
  "og_description": "Explore open roles and career opportunities at Malik Seeds. Join our team and shape the future of agriculture."
}
```

### Contact Page
```json
{
  "page_path": "  ",
  "title": "Contact Us",
  "meta_title": "Contact Us - Malik Seeds",
  "meta_description": "Get in touch with Malik Seeds. Have questions, inquiries or partnership proposals? Reach out to our head office or send us a message.",
  "meta_keywords": "contact Malik Seeds, head office address, email seed company, phone number, customer support agriculture",
  "og_title": "Contact Us - Malik Seeds",
  "og_description": "Get in touch with Malik Seeds. Have questions, inquiries or partnership proposals? Reach out to our head office or send us a message."
}
```

### News Page
```json
{
  "page_path": "/news",
  "title": "News & Updates",
  "meta_title": "News & Updates | Malik Seed",
  "meta_description": "Stay up to date with the latest research, farmer stories, partnerships, and innovations from Malik Seed.",
  "meta_keywords": "agriculture news, farming updates, seed research, agricultural innovations, farmer success stories Bangladesh",
  "og_title": "News & Updates | Malik Seed",
  "og_description": "Stay up to date with the latest research, farmer stories, partnerships, and innovations from Malik Seed."
}
```

### Our Brands Page
```json
{
  "page_path": "/our-brands",
  "title": "Our Brands",
  "meta_title": "Our Brands - Malik Seeds",
  "meta_description": "We are committed to delivering high-performance hybrid seed varieties. Discover our six major brands and their missions.",
  "meta_keywords": "agricultural brands, hybrid seed brands, vegetable seeds, potato seeds, flower seeds, farming solutions",
  "og_title": "Our Brands - Malik Seeds",
  "og_description": "We are committed to delivering high-performance hybrid seed varieties. Discover our six major brands and their missions."
}
```

### Our Gallery Page
```json
{
  "page_path": "/our-gallery",
  "title": "Our Gallery",
  "meta_title": "Our Gallery - Malik Seeds",
  "meta_description": "Explore the visual journey of Malik Seeds. Browse photos of our field activities, research and development, farmer training programs, and product showcase.",
  "meta_keywords": "agriculture photo gallery, farming photos, seed research images, farmer training events, field activities gallery",
  "og_title": "Our Gallery - Malik Seeds",
  "og_description": "Explore the visual journey of Malik Seeds. Browse photos of our field activities, research and development, farmer training programs, and product showcase."
}
```

### Our Products Page
```json
{
  "page_path": "/our-products",
  "title": "Our Products",
  "meta_title": "Our Products - Malik Seeds",
  "meta_description": "Explore our high-performance hybrid vegetable, potato, and flower seeds.",
  "meta_keywords": "hybrid vegetable seeds, seed portfolio, hybrid potato seeds, flower seeds catalog, Malik Seeds products",
  "og_title": "Our Products - Malik Seeds",
  "og_description": "Explore our high-performance hybrid vegetable, potato, and flower seeds."
}
```

---

## 2. Brand Specific Pages

### Vegetable Seeds
```json
{
  "page_path": "/our-brands/vegetable-seeds",
  "title": "Vegetable Seeds",
  "meta_title": "Vegetable Seeds - A.R. Malik Seeds",
  "meta_description": "A.R. Malik vegetable seeds offer exceptional yield, high disease resistance, and excellent adaptability. Explore our hybrid seed portfolio.",
  "meta_keywords": "hybrid vegetable seeds, high-yield vegetable, disease resistant seeds, tomato seeds, chili seeds, cucumber seeds",
  "og_title": "Vegetable Seeds - A.R. Malik Seeds",
  "og_description": "A.R. Malik vegetable seeds offer exceptional yield, high disease resistance, and excellent adaptability. Explore our hybrid seed portfolio."
}
```

### Potato Seeds
```json
{
  "page_path": "/our-brands/potato-seeds",
  "title": "Potato Seeds",
  "meta_title": "Potato Seeds - A.R. Malik Seeds",
  "meta_description": "High-quality Dutch hybrid potato seeds from Malik Seeds. Superior yield, excellent storage quality, and disease resistance.",
  "meta_keywords": "hybrid potato seeds, Dutch potato seeds, high-yield potato, disease resistant potato, potato cultivation Bangladesh",
  "og_title": "Potato Seeds - A.R. Malik Seeds",
  "og_description": "High-quality Dutch hybrid potato seeds from Malik Seeds. Superior yield, excellent storage quality, and disease resistance."
}
```

### Origene
```json
{
  "page_path": "/our-brands/origene",
  "title": "Origene Seeds",
  "meta_title": "Origene Seeds - Malik Seeds",
  "meta_description": "Innovative hybrid vegetable and melon seeds from Origene Seeds. Adapting globally for maximum yield and quality.",
  "meta_keywords": "Origene Seeds, hybrid melon seeds, innovative vegetable seeds, global seed adaptibility, high-performance seeds",
  "og_title": "Origene Seeds - Malik Seeds",
  "og_description": "Innovative hybrid vegetable and melon seeds from Origene Seeds. Adapting globally for maximum yield and quality."
}
```

### Malik's Flower
```json
{
  "page_path": "/our-brands/maliks-flower",
  "title": "Malik's Flower",
  "meta_title": "Malik's Flower - A.R. Malik Seeds",
  "meta_description": "A.R. Malik Flower Seeds deliver premium hybrid flowers, landscape variety collections, and florist seedlings. Enhance your floriculture yield.",
  "meta_keywords": "hybrid flower seeds, floriculture, landscaping seeds, flower seedlings, premium flower varieties",
  "og_title": "Malik's Flower - A.R. Malik Seeds",
  "og_description": "A.R. Malik Flower Seeds deliver premium hybrid flowers, landscape variety collections, and florist seedlings. Enhance your floriculture yield."
}
```

### Malik's Farm
```json
{
  "page_path": "/our-brands/maliks-farm",
  "title": "Malik's Farm",
  "meta_title": "Malik's Farm - A.R. Malik Seeds",
  "meta_description": "Explore Malik's Farm - a certified Global GAP agricultural R&D facility. Discover trials, structured field tests, and agronomic training.",
  "meta_keywords": "R&D agricultural farm, Global GAP certified, field trials, agronomic training, seed research facility",
  "og_title": "Malik's Farm - A.R. Malik Seeds",
  "og_description": "Explore Malik's Farm - a certified Global GAP agricultural R&D facility. Discover trials, structured field tests, and agronomic training."
}
```

### Innovation & Development
```json
{
  "page_path": "/our-brands/innovation-development",
  "title": "Innovation & Development",
  "meta_title": "Innovation & Development - A.R. Malik Seeds",
  "meta_description": "A.R. Malik Innovation and Development unit leads research and trialling. Learn about our public-private agricultural partnerships.",
  "meta_keywords": "agricultural R&D, seed trialling, public-private partnerships, farming innovation, agricultural development",
  "og_title": "Innovation & Development - A.R. Malik Seeds",
  "og_description": "A.R. Malik Innovation and Development unit leads research and trialling. Learn about our public-private agricultural partnerships."
}
```
