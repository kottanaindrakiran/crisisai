import { useState, useEffect } from "react";

export function useDemoMode() {
  const [isDemo, setIsDemo] = useState(
    () => localStorage.getItem("demoMode") === "true" || false
  );

  useEffect(() => {
    const handleStorage = () => setIsDemo(localStorage.getItem("demoMode") === "true");
    window.addEventListener("demoModeChange", handleStorage);
    return () => window.removeEventListener("demoModeChange", handleStorage);
  }, []);

  const toggleDemo = () => {
    const newVal = !isDemo;
    localStorage.setItem("demoMode", String(newVal));
    setIsDemo(newVal);
    window.dispatchEvent(new Event("demoModeChange"));
  };

  return { isDemo, toggleDemo };
}
