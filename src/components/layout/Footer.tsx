import { Icon } from "@iconify/react";
import Image from "next/image";

const navigateLinks = ["Properties", "Services", "About Purpose Space"];

const workWithUsLinks = [
  "List Your Property",
  "Property Management",
  "Sales & Letting",
  "Request a Valuation",
];

const connectLinks = [
  { label: "Contact", icon: "mdi:email-outline", href: "mailto:hello@purposespace.com" },
  { label: "Instagram", icon: "mdi:instagram", href: "#" },
  { label: "LinkedIn", icon: "mdi:linkedin", href: "#" },
];

function HexPattern() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full text-brand"
      style={{
        maskImage: "linear-gradient(to right, transparent, transparent 45%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, transparent 45%, black 100%)",
      }}
    >
      <defs>
        <pattern
          id="footer-hex"
          width="56"
          height="97"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.4)"
        >
          <path
            d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
          <path
            d="M28 32 L56 48 L56 80 L28 96 L0 80 L0 48 Z"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#footer-hex)" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-dark text-brand-cream">
      <HexPattern />
      <div className="container-fluid relative py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2.2fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/footer-logo.svg"
              alt="Purpose Space Realtors"
              width={230}
              height={70}
            />
            <h2 className="mt-8 font-heading text-3xl leading-tight text-brand-cream sm:text-4xl">
              Considered real estate guidance,
              <br />
              rooted in Kenya.
            </h2>
            <p className="mt-6 text-xs font-medium tracking-widest text-brand uppercase">
              Nairobi, Kenya
            </p>
          </div>

          <FooterColumn title="Navigate">
            {navigateLinks.map((label) => (
              <li key={label}>
                <a href="#" className="hover:text-brand">
                  {label}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Work With Us">
            {workWithUsLinks.map((label) => (
              <li key={label}>
                <a href="#" className="hover:text-brand">
                  {label}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Connect">
            {connectLinks.map(({ label, icon, href }) => (
              <li key={label}>
                <a href={href} className="flex items-center gap-2 hover:text-brand">
                  <Icon icon={icon} className="text-lg text-brand" />
                  {label}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-brand/40 pt-6 text-xs tracking-wide text-brand-cream/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="uppercase">
            &copy; {new Date().getFullYear()} Purpose Space Realtors
          </p>
          <div className="flex gap-6">
            <a href="#" className="uppercase hover:text-brand">
              Privacy Policy
            </a>
            <a href="#" className="uppercase hover:text-brand">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-widest text-brand uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm text-brand-cream/90">{children}</ul>
    </div>
  );
}
