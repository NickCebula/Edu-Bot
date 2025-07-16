import { useEffect } from "react";

const emoji = {
  happy: "😊",
  concerned: "😟",
  neutral: "🙂",
};

export default function AvatarAssistant({ message, emotion = "neutral" }) {
  useEffect(() => {
    if (message) {
      const utter = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utter);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", marginTop: "1rem" }}>
      <div style={{ fontSize: "2.5rem", marginRight: "0.5rem" }}>{emoji[emotion] || emoji.neutral}</div>
      <div style={{ background: "#f0f0f0", padding: "0.75rem 1rem", borderRadius: "8px" }}>
        {message}
      </div>
    </div>
  );
}
