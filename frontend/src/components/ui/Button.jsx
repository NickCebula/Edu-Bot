export default function Button({ children, variant = "default", onClick }) {
  const base = "px-4 py-2 rounded-xl font-bold shadow transition";

  const variants = {
    default: "bg-brandBlue text-white hover:bg-blue-400",
    correct: "bg-correct text-white hover:bg-green-500",
    wrong: "bg-wrong text-white hover:bg-red-500",
    shop: "bg-brandPink text-white hover:bg-pink-400",
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
}
