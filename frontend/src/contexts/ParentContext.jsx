import { createContext, useContext, useState, useEffect } from "react";

const ParentContext = createContext(null);

export const ParentProvider = ({ children }) => {
  const [parentMode, setParentMode] = useState(
    localStorage.getItem("parentMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("parentMode", parentMode ? "true" : "false");
  }, [parentMode]);

  const exitParentMode = () => setParentMode(false);

  return (
    <ParentContext.Provider value={{ parentMode, setParentMode, exitParentMode }}>
      {children}
    </ParentContext.Provider>
  );
};

export const useParent = () => {
  const ctx = useContext(ParentContext);
  if (!ctx) throw new Error("useParent must be inside <ParentProvider>");
  return ctx;
};
