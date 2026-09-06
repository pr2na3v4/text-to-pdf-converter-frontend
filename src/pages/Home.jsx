import { useState } from "react";
import usePDFGenerator from "../hooks/usePDFGenerator";
import "./Home.css";

export default function Home() {
  const [mode, setMode] = useState("simple");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [organization, setOrganization] = useState("");
  const [includeCover, setIncludeCover] = useState(true);
  const [includeToc, setIncludeToc] = useState(false);
  const [extraInstructions, setExtraInstructions] = useState("");

  const { loading, error, progress, generateSimple, generateAdvanced, generateAI, clearError } = usePDFGenerator();

  const isValid =
    mode === "ai"
      ? content.trim().length > 0
      : title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    let success;

    if (mode === "simple") {
      success = await generateSimple(title, content);
    } else if (mode === "advanced") {
      const payload = {
        title,
        subtitle,
        content,
        author,
        organization,
        include_cover: includeCover,
        include_toc: includeToc,
        filename: `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`,
      };
      success = await generateAdvanced(payload);
    } else {
      // ai mode — title is optional here, only used to pick a nicer filename
      const safeName = title.trim()
        ? title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
        : "ai-document";

      const payload = {
        raw_text: content,
        extra_instructions: extraInstructions || null,
        author,
        organization,
        include_cover: includeCover,
        filename: `${safeName}.pdf`,
      };
      success = await generateAI(payload);
    }

    if (success) {
      // Optional: reset form after success
      // setTitle(""); setContent(""); ...
    }
  };

  const appName = import.meta.env.VITE_APP_NAME || "SmartPDF";

  return (
    <div className="home-page">
      <div className="home-container">
        
        {/* Header */}
        <header className="home-header">
          <h1 className="home-title">{appName}</h1>
          <p className="home-lead">
            Convert your notes into professional, industry-standard PDFs
          </p>
        </header>

        {/* Mode Toggle */}
        <div className="mode-toggle" role="tablist" aria-label="PDF generation mode">
          <button
            role="tab"
            aria-selected={mode === "simple"}
            className={`mode-btn ${mode === "simple" ? "active" : ""}`}
            onClick={() => setMode("simple")}
            type="button"
          >
            Simple
          </button>
          <button
            role="tab"
            aria-selected={mode === "advanced"}
            className={`mode-btn ${mode === "advanced" ? "active" : ""}`}
            onClick={() => setMode("advanced")}
            type="button"
          >
            Advanced
          </button>
          <button
            role="tab"
            aria-selected={mode === "ai"}
            className={`mode-btn ${mode === "ai" ? "active" : ""}`}
            onClick={() => setMode("ai")}
            type="button"
          >
            AI-Powered
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="pdf-form" noValidate>

          {/* Title — required for simple/advanced, optional (filename hint) for ai */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              {mode === "ai" ? (
                "Document Name (optional)"
              ) : (
                <>Document Title <span className="required">*</span></>
              )}
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                mode === "ai"
                  ? "Used only for the downloaded filename — the AI decides the actual title"
                  : "e.g., Quarterly Business Report Q4 2024"
              }
              className="form-input"
              required={mode !== "ai"}
            />
          </div>

          {/* Advanced-only fields */}
          {mode === "advanced" && (
            <div className="advanced-fields">
              <div className="form-group">
                <label htmlFor="subtitle" className="form-label">Subtitle</label>
                <input
                  id="subtitle"
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Optional subtitle"
                  className="form-input"
                />
              </div>
            </div>
          )}

          {/* Fields shared by Advanced and AI modes */}
          {(mode === "advanced" || mode === "ai") && (
            <div className="advanced-fields">
              {mode === "ai" && (
                <div className="form-group">
                  <label htmlFor="extraInstructions" className="form-label">
                    Extra instructions (optional)
                  </label>
                  <input
                    id="extraInstructions"
                    type="text"
                    value={extraInstructions}
                    onChange={(e) => setExtraInstructions(e.target.value)}
                    placeholder="e.g., keep it formal, focus on the cost-saving angle"
                    className="form-input"
                  />
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="author" className="form-label">Author</label>
                  <input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Your name"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="organization" className="form-label">Organization</label>
                  <input
                    id="organization"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Company or school"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={includeCover}
                    onChange={(e) => setIncludeCover(e.target.checked)}
                  />
                  <span>Include cover page</span>
                </label>
                {mode === "advanced" && (
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={includeToc}
                      onChange={(e) => setIncludeToc(e.target.checked)}
                    />
                    <span>Include table of contents</span>
                  </label>
                )}
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              {mode === "ai" ? (
                <>Raw Text to Analyze <span className="required">*</span></>
              ) : (
                <>Content <span className="required">*</span></>
              )}
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                mode === "ai"
                  ? "Paste messy notes, a transcript, an email thread — anything unstructured. The AI will organize it into a clean document."
                  : "Paste your notes here..."
              }
              rows={8}
              className="form-textarea"
              required
            />
            <p className="form-hint">
              {mode === "ai"
                ? "The AI will pick the title, headings, bullet points, and tables automatically."
                : <>HTML formatting supported: &lt;b&gt;bold&lt;/b&gt;, &lt;i&gt;italic&lt;/i&gt;, &lt;br/&gt;</>}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-error" role="alert">
              <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
          )}

          {/* Progress */}
          {loading && progress > 0 && (
            <div className="progress-block">
              <div className="progress-header">
                <span>{mode === "ai" ? "Analyzing & generating PDF..." : "Generating PDF..."}</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !isValid}
            className={`submit-btn ${loading || !isValid ? "disabled" : ""}`}
          >
            {loading ? (
              <span className="btn-content">
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {mode === "ai" ? "Analyzing & Generating..." : "Generating PDF..."}
              </span>
            ) : (
              mode === "ai" ? "Analyze & Generate PDF" : "Generate PDF"
            )}
          </button>
        </form>

        {/* Footer */}
        <footer className="home-footer">
          Generated using {appName} • Professional PDF Engine
        </footer>
      </div>
    </div>
  );
}