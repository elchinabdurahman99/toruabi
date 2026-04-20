"use client";

import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import * as Icons from "lucide-react";
import { resolveServiceIcon } from "@/lib/serviceIcons";

type Props = {
  slug: string;
  sanityIcon?: string | null;
  className?: string;
  size?: number;
  strokeWidth?: number;
};

export default function ServiceIcon({
  slug,
  sanityIcon,
  className,
  size = 24,
  strokeWidth = 1.75,
}: Props) {
  const name = resolveServiceIcon(slug, sanityIcon);
  const Cmp =
    (Icons as unknown as Record<string, ComponentType<LucideProps>>)[name] ?? Icons.Wrench;
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} aria-hidden />;
}
