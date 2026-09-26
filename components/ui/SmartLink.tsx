"use client";

import { useRouter } from "next/navigation";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

type SmartLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  "data-cursor"?: string;
  "data-cursor-label"?: string;
  "aria-label"?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

/**
 * Anchor that smooth-scrolls to in-page hashes via Lenis, and navigates
 * back to the home section hash when on another route.
 */
export function SmartLink({
  href,
  children,
  className,
  ...rest
}: SmartLinkProps) {
  const { scrollTo } = useSmoothScroll();
  const router = useRouter();

  const isHash = href.startsWith("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    rest.onClick?.(e);
    if (!isHash) return;
    e.preventDefault();
    if (window.location.pathname !== "/") {
      // Hand off to the home route; HashHandler performs the smooth scroll.
      router.push(`/${href}`, { scroll: false });
      return;
    }
    scrollTo(href, { offset: -8 });
  };

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
