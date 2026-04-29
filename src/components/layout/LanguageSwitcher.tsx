"use client";

import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-black/10 bg-white p-1 text-xs font-medium">
      {(["en", "tr"] as const).map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={language === item}
          className={cn([
            "h-7 rounded-full px-2.5 uppercase transition",
            language === item ? "bg-black text-white" : "text-black/60",
          ])}
          onClick={() => setLanguage(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
