export type Lang = "es" | "en";

export const detectDefaultLanguage = (): Lang => {

  const saved = localStorage.getItem("lang");
  if (saved === "es" || saved === "en") return saved;

  const nav = (navigator.language || "").toLowerCase();
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("en")) return "en";

  return "es";
};
