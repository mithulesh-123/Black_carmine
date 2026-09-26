"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS } from "@/lib/data";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { scrollTo } = useSmoothScroll();
  const router = useRouter();
  const pathname = usePathname();

  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      // Only re-render when the threshold actually flips — otherwise the whole
      // header tree re-renders on every scroll frame.
      setScrolled((prev) => (y > 40 !== prev ? y > 40 : prev));

      if (y > 160 && y > lastY + 8) {
        gsap.to(header, { yPercent: -100, duration: 0.5, ease: "power3.out" });
      } else if (y < lastY - 8 || y < 120) {
        gsap.to(header, { yPercent: 0, duration: 0.5, ease: "power3.out" });
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which home section is in view so nav links can reflect it
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const onScroll = () => {
      const line = window.scrollY + window.innerHeight * 0.34;
      let current = "";
      for (const s of sections) {
        if (s.offsetTop <= line) current = s.id;
      }
      setActiveSection(pathname === "/" ? current : "");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const onNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    // Allow nav from other routes back to the home anchor
    if (window.location.pathname !== "/") {
      router.push(`/${href}`, { scroll: false });
      return;
    }
    scrollTo(href, { offset: -10 });
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-[9990] will-change-transform"
      >
        <div
          className={`transition-colors duration-500 ${
            scrolled || menuOpen
              ? "bg-bg/80 backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-[var(--header-h)] max-w-[1600px] items-center justify-between px-6 md:px-10">
            <a
              href="#top"
              onClick={(e) => onNavClick(e, "#top")}
              className="group flex items-center gap-3"
              data-cursor="hover"
              aria-label="BLACKCARMINE — home"
            >
              <Monogram className="h-8 w-8 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:rotate-90" />
              <span className="font-display text-sm font-extrabold uppercase tracking-[0.2em] md:text-base">
                Black
                <span className="text-carmine">Carmine</span>
              </span>
            </a>

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
              {NAV_LINKS.map((link) => {
                const id = link.href.slice(1);
                const isCurrent = activeSection === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => onNavClick(e, link.href)}
                    aria-current={isCurrent ? "true" : undefined}
                    className={`link-underline font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-ink ${
                      isCurrent ? "text-ink" : "text-ink-dim"
                    }`}
                    data-cursor="hover"
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => onNavClick(e, "#contact")}
                className="group relative hidden overflow-hidden border border-carmine px-5 py-2.5 sm:inline-flex"
                data-cursor="hover"
              >
                <span className="relative z-10 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink transition-colors duration-300 group-hover:text-white">
                  Start a project
                </span>
                <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-carmine transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-y-100" />
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center lg:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                data-cursor="hover"
              >
                <div className="relative h-4 w-6">
                  <span
                    className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      menuOpen ? "translate-y-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-px w-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-carmine transition-opacity duration-300 ${
                      menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onNavigate={onNavClick} />
    </>
  );
}

function MobileMenu({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus trap + Escape-to-close while the menu is open
  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const focusables = () =>
      [
        ...overlay.querySelectorAll<HTMLAnchorElement>("a[href]"),
      ].filter((a) => getComputedStyle(a).visibility !== "hidden");

    // Move focus into the menu on open
    const first = focusables()[0];
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        document
          .querySelector<HTMLButtonElement>("header button[aria-expanded]")
          ?.click();
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusables();
      if (list.length === 0) return;
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const items = overlay.querySelectorAll("[data-menu-item]");

      if (open) {
        gsap.set(overlay, { autoAlpha: 1 });
        gsap.fromTo(
          overlay,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.7,
            ease: "expo.inOut",
          },
        );
        gsap.fromTo(
          items,
          { yPercent: 120, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
            delay: 0.25,
          },
        );
      } else {
        gsap.to(items, {
          yPercent: 120,
          autoAlpha: 0,
          duration: 0.35,
          ease: "power2.in",
          stagger: 0.04,
        });
        gsap.to(overlay, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.5,
          ease: "expo.inOut",
          delay: 0.05,
          onComplete: () => gsap.set(overlay, { autoAlpha: 0 }),
        });
      }
    },
    { dependencies: [open] },
  );

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9989] flex flex-col justify-between bg-bg px-6 pb-10 pt-[calc(var(--header-h)+2rem)] opacity-0 lg:hidden"
      style={{ visibility: "hidden" }}
      aria-hidden={!open}
      inert={!open}
    >
      <nav className="flex flex-col gap-3" aria-label="Mobile">
        {NAV_LINKS.map((link, i) => (
          <div key={link.href} className="overflow-hidden">
            <a
              href={link.href}
              data-menu-item
              tabIndex={open ? 0 : -1}
              onClick={(e) => onNavigate(e, link.href)}
              className="flex items-baseline gap-4 font-display text-4xl font-extrabold uppercase tracking-tight text-ink"
            >
              <span className="font-mono text-xs font-normal tracking-[0.2em] text-carmine">
                0{i + 1}
              </span>
              {link.label}
            </a>
          </div>
        ))}
      </nav>
      <div
        data-menu-item
        className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted"
      >
        hello@blackcarmine.studio
      </div>
    </div>
  );
}

function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="8"
        y="8"
        width="104"
        height="104"
        stroke="var(--carmine)"
        strokeWidth="4"
      />
      <text
        x="60"
        y="64"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--ink)"
        style={{ font: "800 48px var(--font-display)" }}
      >
        BC
      </text>
    </svg>
  );
}
