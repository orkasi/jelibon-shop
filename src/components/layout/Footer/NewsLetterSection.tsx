"use client";

import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

const NewsLetterSection = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage(t("invalidEmail"));
      return;
    }

    setMessage(t("newsletterSuccess"));
    setEmail("");
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 py-9 md:py-11 px-6 md:px-16 max-w-frame mx-auto bg-[#ff3d8b] rounded-[20px]">
      <p
        className={cn([
          integralCF.className,
          "font-bold text-[32px] md:text-[40px] text-white mb-9 md:mb-0",
        ])}
      >
        {t("newsletter")}
      </p>
      <div className="flex items-center">
        <form className="flex flex-col w-full max-w-[349px] mx-auto" onSubmit={handleSubmit}>
          <InputGroup className="flex bg-white mb-[14px]">
            <InputGroup.Text>
              <Image
                priority
                src="/icons/envelope.svg"
                height={20}
                width={20}
                alt="email"
                className="min-w-5 min-h-5"
              />
            </InputGroup.Text>
            <InputGroup.Input
              type="email"
              name="email"
              placeholder={t("emailPlaceholder")}
              className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </InputGroup>
          <Button
            variant="secondary"
            className="text-sm sm:text-base font-medium bg-white hover:bg-black hover:text-white h-12 rounded-full px-4 py-3"
            aria-label={t("subscribeNewsletter")}
            type="submit"
          >
            {t("subscribeNewsletter")}
          </Button>
          {message && (
            <span className="mt-3 text-center text-sm font-medium text-white">
              {message}
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewsLetterSection;
