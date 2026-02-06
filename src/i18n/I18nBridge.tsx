import { useEffect } from "react";
import { useSelector } from "react-redux";
import i18n from "./index";
import type { RootState } from "../store";

export const I18nBridge = () => {
  const lang = useSelector((state: RootState) => state.ui.lang);

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return null;
};
