export default function TextEditor({ content, setContent }) {
  return (
    <textarea
      placeholder="Paste your notes here..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
      rows={12}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        fontSize: "16px",
      }}
    />
  );
}
