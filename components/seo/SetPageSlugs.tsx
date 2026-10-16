"use client";

import { useEffect } from "react";

interface Props {
  et: string;
  en: string;
  ru: string;
}

export default function SetPageSlugs({ et, en, ru }: Props) {
  useEffect(() => {
    const el = document.documentElement;
    el.dataset.slugEt = et;
    el.dataset.slugEn = en;
    el.dataset.slugRu = ru;
    return () => {
      delete el.dataset.slugEt;
      delete el.dataset.slugEn;
      delete el.dataset.slugRu;
    };
  }, [et, en, ru]);
  return null;
}
