# skindoc
skindoc landing page

# Dr. Jyotsna's SkinDoc Clinic — Landing Page

A modern, fully responsive static landing page for Dr. Jyotsna's SkinDoc Clinic, Ravet, PCMC.

---

## Clinic Details

| Field | Info |
|---|---|
| Clinic Name | Dr. Jyotsna's SkinDoc Clinic |
| Doctor | Dr. Jyotsna |
| Qualifications | BHMS, PGDCC (Post Graduate Diploma in Clinical Cosmetology) |
| Specialization | Cosmetologist |
| Experience | 7+ Years |
| Phone / WhatsApp | 9921358563 |
| Instagram | @skindoc_jyotsna |
| Address | 102, Near ICICI Bank, 75 Westgate, Ravet Hwy, Vikas Nagar, Ravet, PCMC, Pimpri-Chinchwad, Maharashtra 412101 |
| Timings | Mon – Sun: Morning 10:00 AM – 2:00 PM / Evening 4:00 PM – 8:00 PM |

---

## Project Files

```
SKINDOC/
├── index.html              # Main landing page
├── styles.css              # All styles & responsive layout
├── script.js               # Tabs, slider, form validation, animations
├── assets/
│   └── images/
│       ├── drjo.jpg        # Doctor photo (Dr. Jyotsna)
│       └── clinic.jpg      # Clinic exterior/interior photo
├── data/
│   └── services.txt        # Full services data (source reference)
├── docs/
│   ├── TODO.md             # Backend & WhatsApp integration roadmap
│   └── README.md           # (this file — kept at root too)
└── README.md
```

---

## Tech Stack

- Pure HTML5, CSS3, Vanilla JavaScript
- No frameworks, no dependencies
- Google Fonts: Inter + Playfair Display
- Google Maps embed for location

---

## Page Sections

### 1. Hero
- Clinic name & tagline
- Doctor photo (`drjo.jpg`)
- Book Appointment + WhatsApp buttons
- Stats: 7+ years, 20+ treatments, 4.9 rating

### 2. About Doctor
- Doctor photo (`drjo.jpg`) — `object-position: center`
- Qualifications: BHMS, PGDCC
- Experience: 7+ years in skin, hair & cosmetics
- Book Consultation + WhatsApp buttons

### 3. Services (Tabbed — 4 Categories)

**Skin Treatments**
- Chemical Peels
- Carbon Laser Facial (Hollywood Facial)
- Oxy Hydra Facial
- Oxygeneo Facial
- Medi Facial
- Exosome Medi Facial
- Microneedling
- Scar Reduction Treatment
- Acne Treatment
- Anti-Aging Treatment

**Hair Treatments**
- GFC – Growth Factor Concentrate
- PRP – Platelet Rich Plasma
- Mesotherapy with Exosomes
- Hair Regrowth & Hair Fall Treatment

**Laser Treatments**
- Laser Hair Reduction
- Laser Facial
- Laser Tattoo Removal
- Birthmark Removal

**Other Treatments**
- Mole, Wart & Skin Tag Removal
- Earlobe Repair
- IV Glutathione Drips

### 4. Why Choose Us
- Modern Equipment
- 7+ Years Experience (skin, hair, cosmetics)
- Safe Procedures (medical standards)
- Personalized Treatment

### 5. Before / After Results
- 3 result cards (Acne & Scars, Hair Regrowth, Pigmentation)
- Photo placeholders — replace with real patient photos

### 6. Patient Testimonials (Auto-sliding)
- CA Dnyaneshwar Gopale
- Er. Avadhut Talbar (Engineer)
- KhakhaFoods (Food Influencer)
- Priya Deshmukh
- Sneha Kulkarni (Instagram Creator)

### 7. Clinic Location
- Clinic photo (`clinic.jpg`)
- Full address with Google Maps embed
- Phone, WhatsApp, Instagram, Timings

### 8. Appointment Booking Form
- Full name, phone, email
- All 21 treatments in grouped dropdown
- Date picker (min: today) + time slot selector (morning/evening)
- WhatsApp & call fallback buttons

### 9. Footer
- Instagram: @skindoc_jyotsna
- WhatsApp: wa.me/9921358563
- Contact: 9921358563
- Timings: Mon–Sun, 10AM–2PM & 4PM–8PM

---

## Design

| Property | Value |
|---|---|
| Primary Color | Teal `#0d9488` |
| Background | White `#ffffff` / Off-white `#f8fafc` |
| Accent | Light teal `#ccfbf1` |
| Heading Font | Playfair Display |
| Body Font | Inter |
| Animations | Custom scroll-triggered (no library) |
| Slider | Auto-play + touch/swipe support |

---

## Pending / To Do

- [ ] Add real Before/After patient photos
- [ ] Add tagline in Hero section
- [ ] Add more Instagram influencer testimonials
- [ ] Add Google Reviews widget

> Full backend & WhatsApp integration roadmap: [`docs/TODO.md`](docs/TODO.md)

---

## Social & Contact

- Instagram: [@skindoc_jyotsna](https://www.instagram.com/skindoc_jyotsna)
- WhatsApp: [wa.me/9921358563](https://wa.me/9921358563)
- Phone: 9921358563
- Google Maps: [Dr. Jyotsna's SKINDOC](https://maps.app.goo.gl/skindoc)
