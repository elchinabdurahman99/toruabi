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
          `${serviceTitle} — professional home services Tallinn & Harjumaa | Ajsan.ee`;
        const caption = typeof value.caption === "string" ? value.caption.trim() : "";

        return (
          <figure className="my-8 w-full md:float-right md:ml-8 md:mb-4 md:max-w-[min(100%,420px)]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/8 bg-[#EEECE8] shadow-lg">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 460px"
              />
            </div>
            {caption ? (
              <figcaption className="mt-2 text-center text-sm text-[#94A3B8] font-medium">{caption}</figcaption>
            ) : null}
          </figure>
        );
      },
    },
    block: {
      h2: ({ children }) => (
        <h2 className="clear-both text-xl md:text-2xl font-extrabold text-white mt-10 mb-4 first:mt-0 scroll-mt-28">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="clear-both text-lg md:text-xl font-extrabold text-white mt-8 mb-3">{children}</h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="clear-both border-l-4 border-[#EF4444] pl-5 my-6 text-base md:text-lg text-[#3d3d38] font-medium italic">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className="mb-5 text-base md:text-[1.0625rem] text-[#3d3d38] font-medium leading-relaxed">{children}</p>
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
            <a href={href} className={`${pill} bg-[#EF4444] text-white hover:bg-red-400 border border-black/5`}>
              {children}
            </a>
          );
        }
        if (isMail) {
          return (
            <a href={href} className={`${pill} bg-[#EF4444] text-white hover:bg-black border border-black/10`}>
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
              className={`${pill} bg-white text-white border-2 border-white/8 hover:border-[#EF4444]`}
            >
              {children}
            </a>
          );
        }
        return (
          <Link
            href={internalPathToLinkHref(href)}
            className={`${pill} bg-white text-white border-2 border-white/8 hover:border-[#EF4444]`}
          >
            {children}
          </Link>
        );
      },
      strong: ({ children }) => <strong className="font-extrabold text-white">{children}</strong>,
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-6 clear-both list-disc pl-6 md:pl-7 space-y-2 text-base md:text-[1.0625rem] text-[#3d3d38] marker:text-white">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="my-6 clear-both list-decimal pl-6 md:pl-7 space-y-2 text-base md:text-[1.0625rem] text-[#3d3d38]">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
      number: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
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
