"use client";

import React from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import {
  Briefcase,
  Target,
  MapPin,
  Rocket,
  Sprout,
  HeartPulse,
  ShieldCheck,
  GraduationCap,
  Home,
  Laptop,
  Calendar,
  Utensils,
  PiggyBank,
  Award,
  Sparkles,
  Coins,
  Globe,
  Users,
  Compass,
  Smile,
  Zap,
} from "lucide-react";
import { cn, resolveImageUrl } from "@/lib/utils";

export interface BenefitBadgeProps {
  text: string;
  icon?: string;
  className?: string;
}

/**
 * Returns a dynamic Lucide Icon component matching the benefit text keyword
 */
function resolveBenefitLucideIcon(text: string): React.ComponentType<{ className?: string }> {
  const t = text.toLowerCase();

  // Salary, Compensation, Pay
  if (t.includes("salary") || t.includes("pay") || t.includes("compensation") || t.includes("wage") || t.includes("earnings")) {
    return Coins;
  }
  // Bonus, Incentive, Target, Performance
  if (t.includes("incentive") || t.includes("bonus") || t.includes("commission") || t.includes("target") || t.includes("performance") || t.includes("reward")) {
    return Target;
  }
  // Travel, Transport, Location, Allowance
  if (t.includes("travel") || t.includes("allowance") || t.includes("transport") || t.includes("fuel") || t.includes("commute") || t.includes("location")) {
    return MapPin;
  }
  // Growth, Learning, Development, Training, Career
  if (t.includes("development") || t.includes("growth") || t.includes("training") || t.includes("learn") || t.includes("skill") || t.includes("career")) {
    return Rocket;
  }
  // Health, Medical, Insurance, Wellness
  if (t.includes("health") || t.includes("medical") || t.includes("insurance") || t.includes("doctor") || t.includes("wellness")) {
    return HeartPulse;
  }
  // Pension, Provident fund, Retirement, Savings
  if (t.includes("provident") || t.includes("pension") || t.includes("retirement") || t.includes("fund") || t.includes("savings")) {
    return PiggyBank;
  }
  // Remote, Flex, Home, Work-from-home
  if (t.includes("remote") || t.includes("flex") || t.includes("home") || t.includes("hybrid")) {
    return Home;
  }
  // Laptop, Equipment, Gadgets, Tech
  if (t.includes("laptop") || t.includes("equipment") || t.includes("macbook") || t.includes("device")) {
    return Laptop;
  }
  // Leave, Vacation, Holidays, Paid time off
  if (t.includes("leave") || t.includes("vacation") || t.includes("holiday") || t.includes("time off")) {
    return Calendar;
  }
  // Food, Meals, Lunch, Snacks
  if (t.includes("food") || t.includes("meal") || t.includes("lunch") || t.includes("snack") || t.includes("tea")) {
    return Utensils;
  }
  // Culture, Workplace, Team, Environment, Plant, Agriculture
  if (t.includes("workplace") || t.includes("culture") || t.includes("team") || t.includes("supportive") || t.includes("environment")) {
    return Users;
  }
  if (t.includes("plant") || t.includes("agri") || t.includes("green") || t.includes("seed")) {
    return Sprout;
  }

  // Default fallback
  return Briefcase;
}

export function BenefitBadge({ text, icon, className }: BenefitBadgeProps) {
  const LucideIcon = resolveBenefitLucideIcon(text);

  // Check if a direct backend icon path or URL is provided
  const iconUrl = icon ? resolveImageUrl(icon) : null;

  return (
    <div
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-[40px] border border-[#E4E7EC] bg-[#F9FAFB] px-4 py-2 text-[#0D1A14] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#195236]/40 hover:bg-[#DCF3C7]/60 hover:shadow-xs",
        className
      )}
    >
      <span className="font-inter text-[14px] leading-[21px] font-medium text-[#0D1A14] lg:text-[16px] lg:leading-[24px]">
        {text}
      </span>
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#195236]/10 text-[#195236] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#195236]/20">
        {iconUrl ? (
          <img
            src={iconUrl}
            alt=""
            className="h-3.5 w-3.5 shrink-0 object-contain lg:h-4 lg:w-4"
          />
        ) : (
          <LucideIcon className="h-3.5 w-3.5 lg:h-4 lg:w-4 stroke-[2]" />
        )}
      </div>
    </div>
  );
}

export default BenefitBadge;
