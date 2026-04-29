"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/language";

type FaqItem = {
  question: string;
  answer: string;
  questionTr: string;
  answerTr: string;
};

const faqsData: FaqItem[] = [
  {
    question: "What is the material of the t-shirt?",
    answer:
      "Provide details about the fabric type (e.g., cotton, polyester, blend), weight, and any specific features.",
    questionTr: "Tişörtün kumaşı nedir?",
    answerTr:
      "Kumaş türü, gramajı ve öne çıkan özellikler modele göre değişebilir. Ürün detaylarında pamuk, polyester veya karışımlı yapı bilgilerini kontrol edebilirsiniz.",
  },
  {
    question: "What are the care instructions for the t-shirt?",
    answer:
      "Outline recommended washing, drying, and ironing methods to maintain quality and longevity.",
    questionTr: "Tişört için bakım talimatları nelerdir?",
    answerTr:
      "Ürünün formunu ve baskısını korumak için benzer renklerle düşük sıcaklıkta yıkamanız, ağartıcı kullanmamanız ve mümkünse tersten ütülemeniz önerilir.",
  },
  {
    question: "What is the design or print on the t-shirt made of?",
    answer:
      "Explain the material used for the design (e.g., vinyl, screen print, embroidery) and its durability.",
    questionTr: "Tişörtteki tasarım veya baskı hangi malzemeden yapılmıştır?",
    answerTr:
      "Baskı veya tasarım uygulaması modele göre değişir. Ürünlerde genellikle dayanıklı baskı teknikleri veya nakış detayları kullanılır.",
  },
  {
    question: "Is the t-shirt unisex or designed for specific genders?",
    answer:
      "Indicate whether the shirt is suitable for both men and women or targeted towards a particular gender.",
    questionTr: "Tişört unisex mi, yoksa belirli bir cinsiyete göre mi tasarlandı?",
    answerTr:
      "Kalıba göre değişmekle birlikte birçok model unisex kullanıma uygundur. En doğru seçim için ürün başlığını, kalıp bilgisini ve beden seçeneklerini inceleyebilirsiniz.",
  },
  {
    question: "What are the shipping options and costs?",
    answer:
      "Provide information about shipping methods, estimated delivery times, and associated fees.",
    questionTr: "Kargo seçenekleri ve ücretleri nelerdir?",
    answerTr:
      "Teslimat süresi ve kargo ücreti sipariş adresine ve seçilen gönderim yöntemine göre değişir. Güncel bilgiler ödeme adımında gösterilir.",
  },
  {
    question: "What is the return policy for the t-shirt?",
    answer:
      "Outline the return window, conditions, and refund or exchange procedures.",
    questionTr: "Tişört için iade politikası nedir?",
    answerTr:
      "İade koşulları, süre sınırı ve değişim veya geri ödeme adımları mağaza politikasına göre uygulanır. Ürünün kullanılmamış ve orijinal durumunda olması genellikle gerekir.",
  },
];

const FaqContent = () => {
  const { t, language } = useLanguage();

  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        {t("frequentlyAsked")}
      </h3>
      <Accordion type="single" collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">
              {language === "tr" ? faq.questionTr : faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {language === "tr" ? faq.answerTr : faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;
