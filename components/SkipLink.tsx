import { SmartLink } from "@/components/ui/SmartLink";

/**
 * Skip-to-content link: invisible until focused, then jumps keyboard and
 * screen-matrix users straight to #main.
 */
export function SkipLink() {
  return (
    <SmartLink
      href="#main"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[10001] focus-visible:bg-carmine focus-visible:px-5 focus-visible:py-3 focus-visible:font-mono focus-visible:text-[0.65rem] focus-visible:uppercase focus-visible:tracking-[0.18em] focus-visible:text-white"
      data-cursor="hover"
    >
      Skip to content
    </SmartLink>
  );
}
