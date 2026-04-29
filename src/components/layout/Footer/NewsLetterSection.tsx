"use client";

import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { useLanguage } from "@/lib/language";
import { publicPath } from "@/lib/paths";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

const NewsLetterSection = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage(t("invalidEmail"));
      return;
    }

    setMessage("");
    setIsSuccessOpen(true);
    setEmail("");
  };

  return (
    <Dialog.Root open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
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
                  src={publicPath("/icons/envelope.svg")}
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
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[28px] bg-white p-8 text-center shadow-2xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#ff3d8b]/10 text-[#ff3d8b]">
            <Image
              priority
              src={publicPath("/icons/envelope.svg")}
              height={28}
              width={28}
              alt="email confirmation"
              className="h-7 w-7"
            />
          </div>
          <Dialog.Title className="text-2xl font-bold text-black">
            {t("newsletterDemoTitle")}
          </Dialog.Title>
          <div className="mt-6 rounded-2xl bg-[#F6F6F6] px-4 py-3 text-sm font-medium text-black">
            {t("newsletterSuccess")}
          </div>
          <Dialog.Close asChild>
            <Button className="mt-6 h-12 w-full rounded-full bg-black hover:bg-[#ff3d8b]">
              {t("close")}
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewsLetterSection;
