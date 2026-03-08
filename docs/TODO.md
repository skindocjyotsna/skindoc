# SkinDoc – Backend & WhatsApp Appointment Integration Roadmap

---

## Phase 1 — Quick Win: WhatsApp Pre-fill (No Backend) ✅ DONE
> Zero setup. Form data sent directly via WhatsApp link.

- [x] On form submit, build a `wa.me` URL with form data (name, phone, service, date, time) URL-encoded as message
- [x] Open WhatsApp in new tab with pre-filled message
- [x] Success message shown as fallback with direct WhatsApp link

**How it works:**
```
https://wa.me/9921358563?text=Name: John%0AService: Acne Treatment%0ADate: 2025-06-01%0ATime: 11AM
```

**Files to edit:** `script.js` → `initForm()` submit handler

---

## Phase 2 — Google Sheets Backend (No Server Needed)
> Free, serverless. Appointments saved directly to a Google Sheet. Takes ~1 hour to set up.

- [ ] Create a Google Sheet to store appointments
- [ ] Set up Google Apps Script as a Web App (POST endpoint)
- [ ] Update `script.js` to POST form data to the Apps Script URL
- [ ] Auto-send WhatsApp notification to clinic number via Apps Script + CallMeBot API
- [ ] Send confirmation email to patient via Apps Script `MailApp`

**Stack:** Google Sheets + Google Apps Script + CallMeBot (free WhatsApp API)

**Sheet columns:**
```
Timestamp | Name | Phone | Email | Service | Date | Time | Notes | Status
```

**Files to edit:** `script.js` → replace mock submit with `fetch()` POST

---

## Phase 3 — Proper Backend (Node.js + Express)
> Full control. Recommended when patient volume grows.

### 3a. Project Setup
- [ ] Initialize Node.js project (`npm init`)
- [ ] Install dependencies: `express`, `cors`, `dotenv`, `twilio` (or `whatsapp-web.js`)
- [ ] Create `backend/` folder in repo
- [ ] Set up `.env` for secrets (Twilio SID, Auth Token, WhatsApp number)
- [ ] Add `.env` to `.gitignore`

### 3b. API Endpoints
- [ ] `POST /api/appointment` — receive form data, validate, save
- [ ] `GET /api/appointments` — list all (admin only, protected)
- [ ] `POST /api/appointment/:id/confirm` — mark as confirmed
- [ ] `POST /api/appointment/:id/cancel` — mark as cancelled

### 3c. Database
- [ ] Option A (Simple): JSON file store with `lowdb`
- [ ] Option B (Scalable): MongoDB Atlas (free tier) with `mongoose`
- [ ] Option C (Structured): PostgreSQL on Supabase (free tier)

**Recommended:** MongoDB Atlas — free, no server to manage, easy to scale

### 3d. WhatsApp Notification (Twilio)
- [ ] Sign up for Twilio, enable WhatsApp Sandbox
- [ ] On new appointment → send WhatsApp to `9921358563` with patient details
- [ ] On confirmation → send WhatsApp to patient confirming slot
- [ ] Templates:
  ```
  New Appointment at SkinDoc:
  Patient: {{name}}
  Phone: {{phone}}
  Service: {{service}}
  Date: {{date}} at {{time}}
  ```

### 3e. Email Notifications
- [ ] Use `nodemailer` + Gmail SMTP or Resend.com (free tier)
- [ ] Patient receives: appointment request received confirmation
- [ ] Clinic receives: new booking alert email

---

## Phase 4 — Admin Dashboard
> Simple UI to view, confirm, and manage appointments.

- [ ] Create `admin/index.html` — password-protected page
- [ ] Table view of all appointments (Name, Service, Date, Status)
- [ ] Confirm / Cancel buttons — trigger WhatsApp reply to patient
- [ ] Filter by date, service, status
- [ ] Export to CSV

**Stack:** Plain HTML + CSS + JS (same as frontend), fetching from backend API

---

## Phase 5 — Enhancements
> Nice-to-haves after the core system works.

- [ ] Google Calendar integration — auto-create calendar event on confirmation
- [ ] SMS fallback (Twilio SMS) for patients without WhatsApp
- [ ] Appointment reminder — WhatsApp message 24h before appointment
- [ ] Google Reviews widget on landing page
- [ ] Real before/after patient photos section
- [ ] Instagram feed embed (`@skindoc_jyotsna`)
- [ ] Online consultation booking (video link auto-generated)
- [ ] Multi-language support (English + Marathi)

---

## Deployment Options

| Option | Cost | Best For |
|---|---|---|
| GitHub Pages | Free | Static frontend only (Phase 1) |
| Netlify | Free | Static frontend + form handling |
| Railway.app | Free tier | Node.js backend (Phase 3) |
| Render.com | Free tier | Node.js backend (Phase 3) |
| AWS EC2 / Lightsail | ~$5/mo | Full control, production |
| Vercel | Free | Frontend + serverless API routes |

**Recommended path:**
1. Phase 1 → Deploy frontend on **Netlify** (free, drag & drop)
2. Phase 2 → Google Sheets backend (free, no server)
3. Phase 3+ → Move to **Railway** or **Render** when ready

---

## Priority Order

| # | Task | Effort | Impact |
|---|---|---|---|
| 1 | WhatsApp pre-fill on form submit | 30 min | High |
| 2 | Google Sheets + Apps Script backend | 1–2 hrs | High |
| 3 | CallMeBot WhatsApp notification | 30 min | High |
| 4 | Deploy frontend to Netlify | 15 min | High |
| 5 | Node.js backend with Twilio | 1–2 days | Medium |
| 6 | Admin dashboard | 1–2 days | Medium |
| 7 | Reminder & calendar integration | 2–3 days | Low |

---

## Current Status

- [x] Static landing page built (index.html, styles.css, script.js)
- [x] Appointment form with client-side validation
- [x] WhatsApp button linking to wa.me/9921358563
- [x] Doctor photo (drjo.jpg) and clinic photo (clinic.jpg) integrated
- [x] Form opens WhatsApp with pre-filled appointment message (Phase 1)
- [ ] Form submission connected to backend
- [ ] WhatsApp notification on new booking
- [ ] Appointment data storage
