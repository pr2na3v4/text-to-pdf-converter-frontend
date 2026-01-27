export default function GenerateButton({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 20px",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}
