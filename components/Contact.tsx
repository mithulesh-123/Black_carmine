"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Magnetic } from "@/components/ui/Magnetic";
import { SmartLink } from "@/components/ui/SmartLink";
import { SOCIALS } from "@/lib/data";

type FormState = {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
};

const SERVICES = [
  "Web development",
  "Mobile app",
  "SaaS platform",
  "UI / UX design",
  "Branding",
  "E-commerce",
  "AI solutions",
  "Automation",
  "Something else",
];

const BUDGETS = ["< 25k", "25 – 60k", "60 – 120k", "120k+", "Not sure yet"];

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const validate = (f: FormState) => {
    const e: Partial<FormState> = {};
    if (!f.name.trim()) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Valid email needed";
    if (!f.message.trim() || f.message.trim().length < 20)
      e.message = "A few more words, please (20+)";
    return e;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSent(true);
  };

  useGSAP(
    () => {
      if (!sent) return;
      const el = successRef.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => {
            const heading = el.querySelector("h3");
            if (heading) (heading as HTMLElement).focus();
          },
        },
      );
    },
    { dependencies: [sent] },
  );

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  return (
    <section id="contact" className="section relative overflow-hidden border-t border-line">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full opacity-40 blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--carmine-glow), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Left: invitation */}
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rotate-45 bg-carmine" />
              <span className="label text-carmine">Contact</span>
            </div>

            <h2 className="mt-6 display-lg text-balance">
              <AnimatedText as="span" className="block">
                Let&apos;s build
              </AnimatedText>
              <AnimatedText as="span" className="block text-carmine-gradient" delay={0.08}>
                something
              </AnimatedText>
              <AnimatedText as="span" className="block" delay={0.16}>
                unforgettable.
              </AnimatedText>
            </h2>

            <p className="mt-8 max-w-md text-pretty text-sm leading-relaxed text-ink-dim md:text-base">
              Tell us what you are building and what success looks like. We
              reply within two working days with a written point of view —
              including where we would push back.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <Magnetic as="div" strength={0.25}>
                <SmartLink
                  href="mailto:hello@blackcarmine.studio"
                  data-cursor="hover"
                  className="link-underline inline-flex max-w-full items-baseline gap-3 break-all font-display text-xl font-extrabold tracking-tight text-ink md:break-normal md:text-3xl"
                >
                  <span data-magnetic-inner>hello@blackcarmine.studio</span>
                </SmartLink>
              </Magnetic>

              <div className="flex flex-wrap gap-4">
                {SOCIALS.map((s) => (
                  <SmartLink
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="link-underline font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-ink"
                  >
                    {s.label}
                  </SmartLink>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form or success */}
          <div className="relative">
            {sent ? (
              <div
                ref={successRef}
                className="flex min-h-[420px] flex-col justify-center border border-line bg-surface p-8 md:p-12"
                style={{ opacity: 0 }}
              >
                <svg
                  className="h-14 w-14 text-carmine"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M14 24.5l6.5 6.5L34 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="mt-6 font-display text-2xl font-extrabold uppercase tracking-tight text-ink md:text-3xl">
                  Brief received
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-dim">
                  Thank you, {form.name.split(" ")[0] || "friend"}. We&apos;ll
                  review the brief and reply within two working days — usually
                  sooner.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", service: "", budget: "", message: "" });
                  }}
                  data-cursor="hover"
                  className="mt-8 self-start font-mono text-[0.65rem] uppercase tracking-[0.18em] text-carmine link-underline"
                >
                  Send another brief
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="flex flex-col gap-6 border border-line bg-surface p-6 md:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Your name"
                    error={errors.name}
                    errorId="name-error"
                    input={
                      <input
                        type="text"
                        value={form.name}
                        onChange={update("name")}
                        placeholder="Ada Vega"
                        className="form-input"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        autoComplete="name"
                      />
                    }
                  />
                  <Field
                    label="Email"
                    error={errors.email}
                    errorId="email-error"
                    input={
                      <input
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        placeholder="ada@company.com"
                        className="form-input"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        autoComplete="email"
                      />
                    }
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Project type"
                    error={undefined}
                    input={
                      <select
                        value={form.service}
                        onChange={update("service")}
                        className="form-input appearance-none"
                        autoComplete="off"
                      >
                        <option value="">Select a discipline</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    }
                  />
                  <Field
                    label="Budget range"
                    error={undefined}
                    input={
                      <select
                        value={form.budget}
                        onChange={update("budget")}
                        className="form-input appearance-none"
                        autoComplete="off"
                      >
                        <option value="">Select a range</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    }
                  />
                </div>

<Field
                    label="The brief"
                    error={errors.message}
                    errorId="message-error"
                    input={
                      <textarea
                        value={form.message}
                        onChange={update("message")}
                        rows={5}
                        placeholder="What are you building, and what does success look like?"
                        className="form-input resize-none"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                    }
                  />

                <button
                  type="submit"
                  data-cursor="hover"
                  className="group relative mt-2 flex items-center justify-center gap-3 overflow-hidden bg-carmine px-7 py-4 text-white"
                >
                  <span className="relative z-10 font-mono text-[0.7rem] uppercase tracking-[0.18em]">
                    Send brief
                  </span>
                  <svg
                    className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  errorId,
  input,
}: {
  label: string;
  error?: string;
  errorId?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="flex items-center justify-between">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
          {label}
        </span>
        {error ? (
          <span
            id={errorId}
            role="alert"
            className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-carmine"
          >
            {error}
          </span>
        ) : null}
      </span>
      {input}
    </label>
  );
}
