# IELTS Course Product Page – 10 Minute School

This project is a Next.js-based product landing page for the IELTS course offered by 10 Minute School. It closely follows the layout and functionality of the original product page: [https://10minuteschool.com/product/ielts-course](https://10minuteschool.com/product/ielts-course)

## 🌐 Live Preview
- Live Link: https://10minutetaskui.vercel.app/ 

---

## 🚀 Features

- ✅ Server-side rendering (SSR) with Next.js
- ✅ Data fetching from a public API
- ✅ Tailwind CSS for styling
- ✅ Dynamic product trailer (YouTube embed)
- ✅ Course description with HTML rendering
- ✅ Instructor section
- ✅ CTA (Call-To-Action) with custom text
- ✅ Localization support (`en` / `bn`)

---

## 📦 Tech Stack

- **Next.js** – React framework for SSR
- **TypeScript** – Type safety
- **Tailwind CSS** – Utility-first CSS framework
- **react-player** – Embed YouTube video trailers

---

## 📄 API Integration

### Endpoint:
GET https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course
### Query Params:
- `lang=en` or `lang=bn`

### Required Headers:
- X-TENMS-SOURCE-PLATFORM: web
- accept: application/json

---

## 🛠️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sopnilali/10minutetask.git
   cd 10minutetask

1. **Install Dependencies**
    ```bash
    npm install


3. **Run Locally**
    ```bash
    npm run dev

4. **View in Browser**
   ## Open http://localhost:3000?lang=en
