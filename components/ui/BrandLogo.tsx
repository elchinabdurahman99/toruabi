"use client";

import Image from "next/image";
import clsx from "clsx";

type Props = {
  className?: string;
  variant?: "nav" | "footer" | "drawer";
  logoUrl?: string;
};

export default function BrandLogo({ className, variant = "nav", logoUrl }: Props) {
  // Dimensions match the Sanity logo's natural 300×110 ratio (2.727:1) to satisfy image-aspect-ratio audit
  const size =
    variant === "footer"
      ? { width: 180, height: 66 }
      : variant === "drawer"
        ? { width: 161, height: 59 }
        : { width: 131, height: 48 };
  return (
    <span
      className={clsx(
        "relative inline-flex items-center select-none",
        className,
      )}
    >
      <Image
        src={logoUrl || "/toru.png"}
        alt="TorudeAbi24"
        width={size.width}
        height={size.height}
        className="object-contain w-auto"
        style={{ maxHeight: size.height }}
        sizes="164px"
      />
    </span>
  );
}
