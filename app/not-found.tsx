import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[100svh] flex-col items-center justify-center px-6 pt-[var(--header-h)]">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="label text-carmine">Error 404</span>
        <h1
          className="font-display font-extrabold uppercase leading-none tracking-tighter text-ink/[0.07]"
          style={{ fontSize: "min(30vw, 20rem)" }}
        >
          404
        </h1>
        <p className="-mt-16 max-w-md text-pretty text-sm leading-relaxed text-ink-dim md:-mt-24 md:text-base">
          That route does not exist — or it was never meant to be found. The
          rest of the work is one click away.
        </p>
        <Link
          href="/"
          data-cursor="hover"
          className="group relative mt-4 inline-flex items-center overflow-hidden bg-carmine px-7 py-4 text-white"
        >
          <span className="relative z-10 font-mono text-[0.7rem] uppercase tracking-[0.18em]">
            Back to home
          </span>
        </Link>
      </div>
    </main>
  );
}
