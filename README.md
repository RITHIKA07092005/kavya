# Genoid Tech — Full Stack Website

Premium dark-themed company site: React + Tailwind + Framer Motion frontend,
Node.js + Express + MongoDB Atlas backend, JWT admin auth.

## What's included

**Backend (fully built, all APIs from spec):**
- 9 Mongoose models: Admin, Contact, ProjectRequest, CareerApplication,
  Notification, Blog, Service, Project, Testimonial
- Controllers + routes for every endpoint in the spec (contact, project
  requests with file upload, careers with resume upload, notifications,
  blog CRUD, dashboard stats, public services/projects/testimonials)
- JWT auth middleware protecting all admin routes
- Auto-generated request IDs (`GEN-1001`, `GEN-1002`, ...)
- Auto-created notifications on every contact/project/career submission

**Frontend (fully built pages):**
- Home — hero, stats counter, services, why-choose-us, testimonials, FAQ, contact CTA
- Contact — full form, POSTs to MongoDB, success popup
- Request a Project — 4-step form with file upload, generates Request ID, success animation
- Admin Login — JWT login
- Admin Dashboard — stats cards, tabs for Contacts / Project Requests / Applications /
  Notifications, CSV export, delete, mark-as-completed, mark-notification-read

- About, Services, Portfolio, Pricing, Careers, Blog — functional pages wired to the
  backend, ready for you to drop in your real copy, images, and pricing

**Shared:** glassmorphism navbar/footer, scroll progress bar, WhatsApp/email floating
buttons, gradient design system (purple → blue → cyan on near-black).

---

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
MONGODB_URI=your MongoDB Atlas connection string
JWT_SECRET=any long random string
PORT=5000
```

Create your first admin account (only needs to be run once):
```bash
node seedAdmin.js
```
This creates `admin@genoidtech.com` / `Admin@123` — **change the password after first login** (or edit `seedAdmin.js` before running it).

Start the server:
```bash
npm run dev
```
Backend runs at `http://localhost:5000`.

## 2. Frontend setup

```bash
cd frontend
npm install
```

Optional: create `frontend/.env` if your backend isn't on localhost:5000:
```
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:
```bash
npm run dev
```
Frontend runs at `http://localhost:5173`.

## 3. Log into admin

Go to `http://localhost:5173/admin-login`, sign in with the seeded credentials,
and you'll land on `/admin-dashboard`.

---

## Next steps to finish the build

1. **Content:** Replace placeholder text/images in About, Services, Portfolio,
   Pricing, Careers with your real copy — the components are already wired to
   render from the backend where relevant (Services/Portfolio/Testimonials pull
   from `/api/services`, `/api/projects`, `/api/testimonials` if you seed them).
2. **Seed real services/projects/testimonials:** either add documents directly
   in MongoDB Atlas, or add an admin CRUD screen for them (Contact, Project
   Request, Career, Blog CRUD and Notifications are already fully wired in
   the dashboard — Services/Projects/Testimonials management can follow the
   same pattern).
3. **Blog admin UI:** the API (`POST/PUT/DELETE /api/blogs`) is ready; add a
   simple form in the dashboard to create/edit posts.
4. **File storage:** uploaded resumes/reference files currently save to
   `backend/uploads/`. For production, swap to S3/Cloudinary so files survive
   redeploys.
5. **Deploy:** backend → Render/Railway, frontend → Vercel/Netlify, DB →
   MongoDB Atlas (already assumed). Set `VITE_API_URL` on the frontend to your
   deployed backend URL, and update `MONGODB_URI`/`JWT_SECRET` in your host's
   environment variables.
