"use client";

import { 
  Wrench, Bath, Flame, Sparkles, BrickWall, Hammer, Droplets, 
  Warehouse, ThermometerSnowflake, PenTool, Home, Zap, Unplug, 
  DoorOpen, Building2, Thermometer, HandHelping, Grid3x3, 
  ShieldCheck, Snowflake, PhoneCall, Cable, Link2, Waves, 
  Paintbrush, Microwave, ArrowUpFromLine, Gauge, House, 
  Video, Toilet, CircleDot, ThermometerSun
} from "lucide-react";
import { resolveServiceIcon } from "@/lib/serviceIcons";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Wrench, Bath, Flame, Sparkles, BrickWall, Hammer, Droplets,
  Warehouse, ThermometerSnowflake, PenTool, Home, Zap, Unplug,
  DoorOpen, Building2, Thermometer, HandHelping, Grid3x3,
  ShieldCheck, Snowflake, PhoneCall, Cable, Link2, Waves,
  Paintbrush, Microwave, ArrowUpFromLine, Gauge, House,
  Video, Toilet, CircleDot, ThermometerSun
};

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
  const Cmp = ICON_MAP[name] ?? Wrench;
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} aria-hidden />;
}
