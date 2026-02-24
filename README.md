# 🚨 CrisisAI — Real-Time Disaster Intelligence Platform

CrisisAI is an AI-powered disaster response and coordination platform that helps victims, responders, and authorities share real-time emergency information.  
It converts scattered distress messages into a live, intelligent crisis dashboard.

Built for the **TerraCode Convergence Hackathon**.

<img width="1809" height="933" alt="image" src="https://github.com/user-attachments/assets/e84d3f74-ddc2-4003-8711-f7a91f2b8744" />

<img width="1743" height="962" alt="image" src="https://github.com/user-attachments/assets/75f500fa-1985-47dc-80df-277841666900" />


---

## 🌍 Problem

During disasters such as floods, fires, or earthquakes:

- Victims don’t know what to do or where to go  
- Responders don’t know who needs help first  
- Information is scattered across calls, social media, and local alerts  

This delay costs lives.

---

## 💡 Solution

CrisisAI provides a real-time emergency reporting and coordination system:

### 👤 For Victims
- Submit emergency reports via web interface  
- AI analyzes urgency automatically  
- Report becomes instantly visible on live map  

### 🚑 For Responders
- View real-time crisis map  
- Identify high-priority zones  
- Track incidents as they appear  

### 🏢 For Command Centers
- Monitor dashboard with live statistics  
- See AI-generated situation summary  
- Allocate resources based on insights  

---

## 🧠 Key Features

- ⚡ AI-powered urgency classification (Gemini API)
- 🗺️ Live crisis map with color-coded incidents
- 📊 Command dashboard with statistics and timeline
- 🔄 Real-time updates using Supabase subscriptions
- 🧪 Demo Mode for showcasing simulated disaster scenarios
- 🛡️ Failsafe logic for AI/network issues
- 📱 Responsive UI for desktop and mobile

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- TailwindCSS
- Leaflet Map

**Backend / Data**
- Supabase (Database + Realtime)

**AI**
- Google Gemini API

**Deployment**
- Vercel

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/kottanaindrakiran/crisisai.git
cd crisisai
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_GEMINI_API_KEY=your_gemini_key
```

### 4️⃣ Run locally

```bash
npm run dev
```

---

## 🗄️ Database Setup (Supabase)

Run this SQL in Supabase SQL Editor:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text,
  urgency text,
  summary text,
  advice text,
  lat float,
  lng float,
  created_at timestamp DEFAULT now()
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous INSERT into reports" ON public.reports;
DROP POLICY IF EXISTS "Allow anonymous SELECT from reports" ON public.reports;

CREATE POLICY "Allow anonymous INSERT into reports"
ON public.reports FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous SELECT from reports"
ON public.reports FOR SELECT TO anon USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.reports;
```

---

## 🎬 Demo Flow

1. Submit emergency report
2. AI classifies urgency
3. Report appears instantly on map
4. Dashboard updates in real time

---

## 🚀 Future Improvements

* SMS/WhatsApp reporting integration
* Multi-language voice input
* Predictive disaster analytics
* Role-based responder dashboards
* Mobile app version

---

## 👨‍💻 Author

**Indrakiran Kottana**
Built for TerraCode Convergence Hackathon

