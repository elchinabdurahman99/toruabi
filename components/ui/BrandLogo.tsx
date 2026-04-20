"use client";

import Image from "next/image";
import clsx from "clsx";

type Props = {
  className?: string;
  variant?: "nav" | "footer" | "drawer";
};

export default function BrandLogo({ className, variant = "nav" }: Props) {
  const size =
    variant === "footer"
      ? { width: 180, height: 60 }
      : variant === "drawer"
        ? { width: 160, height: 54 }
        : { width: 140, height: 48 };

  return (
    <span className={clsx("inline-flex items-center select-none", className)}>
      <Image
        src="/toru.png"
        alt="TorudeAbi24"
        width={size.width}
        height={size.height}
        className="object-contain w-auto"
        style={{ maxHeight: size.height }}
        priority
      />
    </span>
  );
}
