"use client";

import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "href"> {
  href: string;
  className?: string;
  activeClassName?: string;
}

function NavLink({ className, activeClassName, href, ...props }: NavLinkCompatProps) {
  const pathname = usePathname();
  const targetPath = href.split("#")[0] || "/";
  const isActive = pathname === targetPath;

  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClassName)}
      {...props}
    />
  );
}

export { NavLink };
