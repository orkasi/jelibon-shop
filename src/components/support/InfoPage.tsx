"use client";

import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";

type InfoSection = {
  title: string;
  titleTr: string;
  body: string;
  bodyTr: string;
};

export type InfoPageContent = {
  eyebrow: string;
  eyebrowTr: string;
  title: string;
  titleTr: string;
  intro: string;
  introTr: string;
  sections: InfoSection[];
};

const InfoPage = ({ content }: { content: InfoPageContent }) => {
  const { language } = useLanguage();
  const isTurkish = language === "tr";

  return (
    <main className="bg-[#F2F0F1] pb-20 pt-10 md:pt-16">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <section className="rounded-[32px] bg-white px-6 py-10 shadow-sm md:px-10 md:py-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3d8b]">
            {isTurkish ? content.eyebrowTr : content.eyebrow}
          </p>
          <h1
            className={cn([
              integralCF.className,
              "max-w-3xl text-3xl leading-tight text-black md:text-5xl",
            ])}
          >
            {isTurkish ? content.titleTr : content.title}
          </h1>
          <p className="mt-5 w-full text-base leading-8 text-black/60 md:text-lg">
            {isTurkish ? content.introTr : content.intro}
          </p>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          {content.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[28px] bg-white px-6 py-7 shadow-sm"
            >
              <h2 className="text-xl font-bold text-black">
                {isTurkish ? section.titleTr : section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-black/60 md:text-base">
                {isTurkish ? section.bodyTr : section.body}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default InfoPage;
