"use client";

import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { Link } from "@/i18n/navigation";
import { internalPathToLinkHref } from "@/lib/i18n/appHref";
import { urlFor } from "@/lib/sanity/image";

function servicePortableComponents(serviceTitle: string): PortableTextComponents {
  return {
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const src = urlFor(value as any).width(1400).height(1050).quality(90).url();
        const alt =
          (typeof value.alt === "string" && value.alt.trim()) ||
          `${serviceTitle} — professional home services Tallinn & Harjumaa`;
        const caption = typeof value.caption === "string" ? value.caption.trim() : "";

        return (
          <figure className="my-8 w-full md:float-right md:ml-8 md:mb-4 md:max-w-[min(100%,420px)]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#E8EFFE] bg-[#F0F4FF] shadow-sm">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 460px"
              />
            </div>
            {caption ? (
              <figcaption className="mt-2 text-center text-sm text-[#6B7280] font-medium">
                {caption}
              </figcaption>
            ) : null}
          </figure>
        );
      },
    },
    block: {
      h2: ({ children }) => (
        <h2 className="clear-both text-xl md:text-2xl font-extrabold text-[#2B5CE6] mt-10 mb-4 first:mt-0 scroll-mt-28">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="clear-both text-lg md:text-xl font-extrabold text-[#2B5CE6] mt-8 mb-3">
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="clear-both border-l-4 border-[#3B6CF4] pl-5 my-6 text-base md:text-lg text-[#374151] font-medium italic bg-[#F0F4FF] py-3 pr-4 rounded-r-xl">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className="mb-5 text-base md:text-[1.0625rem] text-[#374151] font-medium leading-relaxed">
          {children}
        </p>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        const href = (value?.href as string) || "#";
        const isTel = href.startsWith("tel:");
        const isMail = href.startsWith("mailto:");
        const isHttp = href.startsWith("http://") || href.startsWith("https://");
        const pill =
          "inline-flex items-center justify-center gap-2 font-bold transition-all rounded-xl px-4 py-2.5 text-sm md:text-base shadow-sm my-1 break-words max-w-full";

        if (isTel) {
          return (
            <a
              href={href}
              className={`${pill} bg-[#E8354A] text-white hover:bg-[#C8283C] border border-black/5`}
            >
              {children}
            </a>
          );
        }
        if (isMail) {
          return (
            <a
              href={href}
              className={`${pill} bg-[#3B6CF4] text-white hover:bg-[#2B5CE6] border border-black/10`}
            >
              {children}
            </a>
          );
        }
        if (isHttp) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${pill} bg-white text-[#3B6CF4] border-2 border-[#E8EFFE] hover:border-[#3B6CF4]`}
            >
              {children}
            </a>
          );
        }
        return (
          <Link
            href={internalPathToLinkHref(href)}
            className={`${pill} bg-white text-[#3B6CF4] border-2 border-[#E8EFFE] hover:border-[#3B6CF4]`}
          >
            {children}
          </Link>
        );
      },
      strong: ({ children }) => (
        <strong className="font-extrabold text-[#2B5CE6]">{children}</strong>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-6 clear-both space-y-2.5 text-base md:text-[1.0625rem] text-[#374151]">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="my-6 clear-both space-y-2.5 text-base md:text-[1.0625rem] text-[#374151] list-none [counter-reset:list-counter]">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="flex items-start gap-3 leading-relaxed">
          <span className="mt-2 w-2 h-2 rounded-full bg-[#3B6CF4] shrink-0" />
          <span>{children}</span>
        </li>
      ),
      number: ({ children }) => (
        <li className="flex items-start gap-3 leading-relaxed [counter-increment:list-counter] before:content-[counter(list-counter)] before:shrink-0 before:w-6 before:h-6 before:rounded-full before:bg-[#E8EFFE] before:text-[#3B6CF4] before:text-xs before:font-bold before:flex before:items-center before:justify-center before:mt-0.5">
          <span>{children}</span>
        </li>
      ),
    },
  };
}

type Props = {
  value: PortableTextBlock[];
  serviceTitle: string;
};

export default function ServicePortableText({ value, serviceTitle }: Props) {
  return (
    <div className="flow-root">
      <PortableText value={value} components={servicePortableComponents(serviceTitle)} />
    </div>
  );
}
