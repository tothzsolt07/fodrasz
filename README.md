# Ujfalussy Milán - Fodrász Weboldal

Professzionális fodrász weboldal fekete-sárga témával, teljes foglalási rendszerrel és admin felülettel.

## 🎨 Design Rendszer

### Színek
- **Fő háttér**: `#0b0b0b` (Fekete)
- **Akcentus**: `#FFD400` (Sárga)
- **Kiegészítő sötét**: `#2b2b2b`
- **Szöveg**: `#FFFFFF` (Fehér)
- **Hibaszín**: `#E53935`

### Tipográfia
- **Címsorok**: Montserrat Bold
- **Törzsszöveg**: Inter Regular
- **Méretezés**: Reszponzív (desktop → tablet → mobil)

## 🚀 Funkciók

### 1. Főoldal
- ✅ Hero szekció animációval
- ✅ Bemutatkozás
- ✅ Szolgáltatások (3 kártya)
- ✅ Portfólió galéria (6 kép)
- ✅ Vélemények (3 testimonial)
- ✅ Gyors foglalás CTA
- ✅ Kapcsolat űrlap

### 2. Foglalási Rendszer (4 Lépéses Wizard)
- **Lépés 1**: Szolgáltatás választás
  - Férfi hajvágás (Ingyenes - bevezető)
  - Szakáll formázás (Hamarosan)
  - Kombó csomag (Hamarosan)
- **Lépés 2**: Dátum és időpont választás
  - Naptár picker
  - 30 perces időpontok 9:00-18:00 között
- **Lépés 3**: Személyes adatok
  - Név, Email, Telefon (kötelező)
  - Megjegyzés (opcionális)
- **Lépés 4**: Összesítés és megerősítés
  - Minden adat ellenőrzése
  - Foglalás küldése

### 3. Admin Felület
- 📊 Statisztikák (Függőben, Jóváhagyott, Összes)
- ✅ Függőben lévő foglalások kezelése
- ✅ Jóváhagyás/Elutasítás gombok
- 📧 Email értesítés szimuláció
- 📅 Google Calendar integráció placeholder
- 🔐 Titkos hozzáférés (Shield ikon jobb alsó sarokban)

### 4. GSAP Animációk
- **Hero**: Zoom be + fade in + CTA pulse
- **Szolgáltatás kártyák**: Stagger entrance + hover lift
- **Portfólió**: Fade in + drag hint
- **Foglalási wizard**: Smooth step transitions
- **Admin**: Toast + calendar pulse
- **Accessibility**: Focus state animations

## 🛠️ Technológiai Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Animációk**: GSAP 3.14 + ScrollTrigger
- **UI Komponensek**: Radix UI
- **Ikonok**: Lucide React
- **Toast értesítések**: Sonner
- **Képek**: Unsplash API

## 📦 Telepítés

```bash
# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev

# Build production verzióhoz
npm run build
```

## 📱 Reszponzív Breakpoint-ok

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎭 Animációs Részletek

### Hero Animációk
```javascript
// Hero kép zoom
gsap.from('.hero-image', {
  scale: 1.05,
  duration: 0.8,
  ease: 'power3.out'
});

// Cím fade in
gsap.from('.hero-title', {
  y: 30,
  opacity: 0,
  duration: 0.6,
  delay: 0.2
});

// CTA pulse
gsap.to('.cta-primary', {
  scale: 1.03,
  repeat: -1,
  yoyo: true,
  duration: 1.2
});
```

### Szolgáltatás Kártyák
```javascript
// Entrance
gsap.from('.service-card', {
  y: 40,
  opacity: 0,
  stagger: 0.12
});

// Hover
gsap.to(card, {
  y: -6,
  boxShadow: '0 10px 30px rgba(255,212,0,0.12)',
  duration: 0.25
});
```

### Wizard Átmenetek
```javascript
// Lépésváltás
gsap.to(fromEl, { x: -40, opacity: 0 });
gsap.fromTo(toEl, 
  { x: 40, opacity: 0 }, 
  { x: 0, opacity: 1 }
);
```

## 📧 EmailJS Integráció (Placeholder)

A foglalás jóváhagyásakor automatikusan email küldés történik:

**Sablon mezők**:
- `toname`: Vendég neve
- `toemail`: Vendég email címe
- `date`: Foglalás dátuma
- `time`: Foglalás időpontja
- `service`: Választott szolgáltatás
- `location`: Veszprém, Pápai utca 15

## 📅 Google Calendar Integráció (Placeholder)

**Esemény mezők**:
- `summary`: "Fodrász foglalás — Ujfalussy Milán"
- `description`: "Szolgáltatás: {service} — Megjegyzés: {note}"
- `location`: "Veszprém, Pápai utca 15"
- `start/end`: Foglalás időpontja

## 🎯 SEO Információk

**Meta címke javaslatok**:
```html
<title>Fodrász Veszprém — Ujfalussy Milán, férfi hajvágás</title>
<meta name="description" content="Fodrász tanuló Veszprémben. Férfi hajvágás, trendi vágások, online foglalás — Pápai utca 15.">
```

## ♿ Akadálymentesítés

- ✅ WCAG AA kontraszt arány
- ✅ 44x44px minimum érintési terület
- ✅ Alt szövegek minden képen
- ✅ Keyboard navigáció
- ✅ Focus state animációk
- ✅ Screen reader támogatás

## 🔒 Lemondási Politika

**24 órás lemondási határidő** - Vendégek minimum 24 órával korábban jelezhetnek lemondást.

## 📞 Kapcsolat

- **Cím**: Veszprém, Pápai utca 15
- **Telefon**: +36 XX XXX XXXX
- **Email**: milan@example.com
- **Nyitvatartás**:
  - Hétfő - Péntek: 9:00 - 18:00
  - Szombat: 9:00 - 14:00
  - Vasárnap: Zárva

## 👨‍💻 Fejlesztői Jegyzetek

### Mock Data
Az admin felület demo adatokat tartalmaz 3 példa foglalással. Éles környezetben ezt backend API-hoz kell kötni.

### Admin Hozzáférés
A Shield ikon a jobb alsó sarokban ad hozzáférést az admin felülethez. Éles környezetben ezt autentikációval kell védeni.

### Jövőbeli Fejlesztések
- [ ] Backend API (Node.js + Express vagy Supabase)
- [ ] Valós EmailJS integráció
- [ ] Google Calendar API integráció
- [ ] Admin autentikáció
- [ ] Vendég regisztráció/bejelentkezés
- [ ] Foglalás lemondás funkció
- [ ] SMS értesítések
- [ ] Nyitvatartás kezelés
- [ ] Szolgáltatás árak dinamikus kezelése

## 📄 Licenc

© 2026 Ujfalussy Milán. Minden jog fenntartva.
