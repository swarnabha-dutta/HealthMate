
# 🏥 **HealthMate**  

*Modern Healthcare Consultation Platform*

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232a?logo=react&logoColor=61dafb" alt="React" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Neon-008cff?logo=postgresql&logoColor=white" alt="Neon" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Lucide-000?logo=lucide&logoColor=white" alt="Lucide Icons" />
</p>

---

## 🚀 **Overview**

**HealthMate** is a next-generation healthcare consultation platform designed for transparency, accessibility, and ease of use. Built with industry-leading technologies including Next.js, React, Prisma, Neon (Postgres), and Tailwind CSS, HealthMate empowers users to explore clear pricing, connect with support, and book consultations seamlessly.

---

## 🗂️ **Project Structure**

| Path                                       |  Responsibility                                                                               |
|--------------------------------------------|-----------------------------------------------------------------------------------------------|
| `app/(main)/pricing/page.jsx`              | Main pricing page: includes pricing table, FAQ, contact form, and navigation.                 |
| `components/pricing/`                      | Modular components for pricing table UI and logic.                                            |
| `components/ui/badge.jsx`                  | Badge component for visual highlights (e.g., "Affordable Healthcare").                        |
| `components/ui/ContactForm.jsx`            | Handles user input and form submission for contacting support.                                |
| `prisma/schema.prisma`                     | Database schema for users, consultations, and related entities.                               |
| `lib/db.js`                                | Prisma client setup and Neon Postgres database connection.                                    |
| `public/`                                  | Static assets: images, icons, and more.                                                       |
| `README.md`                                | Comprehensive documentation, setup, and contribution guidelines.                              |

---

## 🛠️ **Technology Stack**

- **Next.js** – Advanced React framework for SSR, routing, and API endpoints.
- **React** – Component-based UI library for dynamic, interactive interfaces.
- **Prisma** – Type-safe ORM for robust and scalable database access.
- **Neon** – Modern, serverless Postgres database for high availability.
- **Tailwind CSS** – Utility-first CSS framework for rapid, responsive UI development.
- **Node.js** – Reliable backend runtime environment.
- **Lucide Icons** – Elegant, consistent iconography for a polished user experience.

---

## ⚙️ **Platform Workflow**

### 1. **Landing & Navigation**

- Users arrive at the homepage and can easily navigate to the pricing page.
- The pricing page (`app/(main)/pricing/page.jsx`) features transparent consultation packages, FAQs, and a direct contact form.

### 2. **Transparent Pricing**

- Pricing tables are rendered via modular components in `components/pricing/`.
- Each package is clearly described—no hidden fees, no surprises.

### 3. **Contact & Support**

- Users can reach out through the contact form (`components/ui/ContactForm.jsx`), available on both pricing and contact pages.
- Submissions are processed and can be integrated with backend support workflows.

### 4. **Database & Backend**

- All user and consultation data is managed with Prisma ORM, with schemas defined in `prisma/schema.prisma`.
- Neon provides a scalable, serverless Postgres backend.
- Next.js and Node.js handle API routes and data fetching.

### 5. **Modern UI & Styling**

- Tailwind CSS ensures a clean, responsive, and modern interface.
- Lucide Icons deliver a professional, cohesive visual language.

---

## 🧑‍💻 How to Use / Local Development

### 1. Clone the Repository

git clone https://github.com/swarnabha-dutta/healthmate
cd healthmate 

```bash
### 2. Install Dependencies  
 npm install
# or
yarn install
 
 ### 3. Setup Environment Variables 
  
DATABASE_URL=your_neon_db_url
NEXT_PUBLIC_API_KEY=your_api_key_if_any


### 4. Push Prisma Schema  
 
 npx prisma db push
     

### 5. Run the Dev Server         

npm run dev
# or
yarn dev


## 📦 Deployment
This project is ready to be deployed to platforms like Vercel, Render, or Netlify.
Make sure to add your environment variables to the deployment platform as well.   
 
 ---

## 📬 Contact
Have questions or feedback?
Feel free to reach out: swarnabhadutta909@gmail.com

