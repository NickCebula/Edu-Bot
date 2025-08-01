import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParent } from "../contexts/ParentContext";

const digits = ["1","2","3","4","5","6","7","8","9","0"];

export default function PinPad() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { setParentMode } = useParent();
  const navigate = useNavigate();

  const addDigit = d => pin.length < 4 && setPin(pin + d);
  const back    = () => setPin(pin.slice(0, -1));

  const submit  = async () => {
    try {
      const res = await fetch("/api/auth/parent-pin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (!res.ok) throw new Error("Invalid PIN");
      setParentMode(true);
      navigate("/parentview", { replace: true });
    } catch (e) {
      setError(e.message);
      setPin("");
    }
  };

  // Auto-submit once 4 digits entered
  if (pin.length === 4) submit();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-white shadow-xl p-6">
        <h2 className="text-center text-xl font-bold mb-4">Enter Parent PIN</h2>
        <div className="flex space-x-2 justify-center mb-4">
          {[0,1,2,3].map(i => (
            <div key={i} className="w-4 h-4 rounded-full border-2 border-primary">
              {i < pin.length && <div className="w-full h-full bg-primary rounded-full" />}
            </div>
          ))}
        </div>

        {error && <p className="text-error text-sm mb-2">{error}</p>}

        <div className="grid grid-cols-3 gap-3">
          {digits.map(d => (
            <button
              key={d}
              onClick={() => addDigit(d)}
              className="btn btn-primary btn-sm"
            >
              {d}
            </button>
          ))}
          <button onClick={back} className="btn btn-secondary col-span-3">
            Backspace
          </button>
        </div>
      </div>
    </div>
  );
}
