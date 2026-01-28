

---

# 📄 MadeMyPDF – Text to PDF Converter

A full-stack web application that converts user-provided text into a downloadable PDF file.
Built using **React** for the frontend and **FastAPI** with **ReportLab** for the backend.
Deployed live using **Netlify** (frontend) and **Render** (backend).

🔗 **Live Website:** [https://mademypdf.netlify.app/](https://mademypdf.netlify.app/)
🔗 **Backend API:** [https://text-to-pdf-converter-1.onrender.com](https://text-to-pdf-converter-1.onrender.com)

---

## 🚀 Features

* ✍️ Convert text into a professionally formatted PDF
* ⚡ Fast PDF generation using FastAPI
* 🌐 Fully deployed (Frontend + Backend)
* 📥 Download generated PDF instantly
* 🎨 Clean and responsive UI
* 🔄 Loader during PDF generation
* 🔐 CORS-enabled secure API communication

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* HTML5 & CSS3
* Axios
* Netlify (Deployment)

### Backend

* Python
* FastAPI
* ReportLab (PDF generation)
* Uvicorn
* Render (Deployment)

---

## 📁 Project Structure

```
text-to-pdf-converter/
│
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   ├── pdf_generator.py     # PDF generation logic
│   │   └── __init__.py
│   ├── requirements.txt
│   └── render.yaml
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── netlify.toml
│
└── README.md
```

---

## ⚙️ How It Works

1. User enters text in the React frontend
2. Frontend sends a POST request to the FastAPI backend
3. Backend generates a PDF using ReportLab
4. PDF is returned as a downloadable file
5. User downloads the generated PDF

---

## 🔗 API Endpoint

### Generate PDF

```
POST /generate-pdf
```

**Request Body (JSON):**

```json
{
  "title": "My PDF Title",
  "content": "This is the content of the PDF"
}
```

**Response:**

* PDF file download

---

## 🧪 Local Development

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🌍 Deployment

### Frontend

* Deployed on **Netlify**
* Auto-deploy from GitHub repository

### Backend

* Deployed on **Render**
* Uses `requirements.txt` and FastAPI production setup

---

## 🧠 Learnings & Outcomes

* Full-stack application development
* API integration between React and FastAPI
* PDF generation using Python
* CORS handling
* Real-world deployment experience
* Debugging production errors

---

## 📌 Future Improvements

* Custom PDF filename input
* PDF styling options
* Authentication system
* Save PDF history
* Dark mode UI
* Analytics & monitoring

---

## 👨‍💻 Author

**Pranav Kashid**
Diploma in Computer Engineering
GitHub: [https://github.com/pr2na3v4](https://github.com/pr2na3v4)

---

## ⭐ Acknowledgement

This project was built as a learning-focused full-stack application to understand real-world deployment, backend integration, and production debugging.

---

