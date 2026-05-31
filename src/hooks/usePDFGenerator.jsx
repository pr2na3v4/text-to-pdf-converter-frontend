import { useState, useCallback } from "react";
import { generateSimplePDF, generateAdvancedPDF } from "../services/api";

const usePDFGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const downloadBlob = (blob, filename = "SmartPDF.pdf") => {
    const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link.remove();
    }, 100);
  };

  const generateSimple = useCallback(async (title, content) => {
    if (!title.trim() || !content.trim()) {
      setError("Please enter both title and content");
      return false;
    }

    setLoading(true);
    setError(null);
    setProgress(25);

    try {
      setProgress(60);
      const blob = await generateSimplePDF(title, content);
      setProgress(90);
      
      const safeName = title.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "document";
      downloadBlob(blob, `${safeName}.pdf`);
      
      setProgress(100);
      return true;
    } catch (err) {
      setError(err.message || "Failed to generate PDF. Please try again.");
      return false;
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  }, []);

  const generateAdvanced = useCallback(async (payload) => {
    if (!payload.title?.trim() || !payload.content?.trim()) {
      setError("Please enter both title and content");
      return false;
    }

    setLoading(true);
    setError(null);
    setProgress(30);

    try {
      setProgress(70);
      const blob = await generateAdvancedPDF(payload);
      setProgress(90);
      
      const filename = payload.filename || `${payload.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`;
      downloadBlob(blob, filename);
      
      setProgress(100);
      return true;
    } catch (err) {
      setError(err.message || "Failed to generate advanced PDF.");
      return false;
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  }, []);

  return {
    loading,
    error,
    progress,
    generateSimple,
    generateAdvanced,
    clearError: () => setError(null),
  };
};

export default usePDFGenerator;