import { useState } from "react";
import axios from "axios";
import TextEditor from "../components/TextEditor";
import GenerateButton from "../components/GenerateButton";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!title || !content) {
      alert("Please enter title and content");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://text-to-pdf-converter-1.onrender.com/generate-pdf",
        { title, content },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "SmartPDF.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Failed to generate PDF");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="container">
    <h1 className="title">SmartPDF</h1>
    <p className="subtitle">
      Convert your study notes into professional PDF
    </p>

    <input
      className="input-title"
      type="text"
      placeholder="Enter document title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <textarea
      className="textarea"
      placeholder="Paste your notes here..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />

    <button
      className="generate-btn"
      onClick={handleGenerate}
      disabled={loading}
    >
      {loading ? "Generating PDF..." : "Generate PDF"}
    </button>

    <div className="footer">
      Generated using SmartPDF
    </div>
  </div>
);

}
