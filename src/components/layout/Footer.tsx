import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const navigateLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "About Purpose Space", href: "/about" },
];

const workWithUsLinks = [
  { label: "List Your Property", href: "/list-property" },
  { label: "Property Management", href: "/services" },
  { label: "Sales & Letting", href: "/services" },
  { label: "Request a Valuation", href: "/contact" },
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
      className="absolute inset-0 h-full w-full text-brand-gold"
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
    <footer className="relative overflow-hidden bg-brand-green text-brand-ivory">
      <HexPattern />
      <div className="container-fluid relative py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2.2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/">
              <Image
                src="/brand/footer-logo.svg"
                alt="Purpose Space Realtors"
                width={230}
                height={70}
              />
            </Link>
            <h2 className="mt-8 font-heading text-3xl leading-tight text-brand-ivory sm:text-4xl">
              Considered real estate guidance,
              <br />
              rooted in Kenya.
            </h2>
            <p className="mt-6 text-xs font-medium tracking-widest text-brand-gold uppercase">
              Nairobi, Kenya
            </p>
          </div>

          <FooterColumn title="Navigate">
            {navigateLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="hover:text-brand-gold">
                  {label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Work With Us">
            {workWithUsLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="hover:text-brand-gold">
                  {label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Connect">
            {connectLinks.map(({ label, icon, href }) => (
              <li key={label}>
                {href.startsWith("mailto:") ? (
                  <a href={href} className="flex items-center gap-2 hover:text-brand-gold">
                    <Icon icon={icon} className="text-lg text-brand-gold" />
                    {label}
                  </a>
                ) : (
                  <Link href={href} className="flex items-center gap-2 hover:text-brand-gold">
                    <Icon icon={icon} className="text-lg text-brand-gold" />
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-brand-gold/40 pt-6 text-xs tracking-wide text-brand-ivory/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="uppercase">
            &copy; {new Date().getFullYear()} Purpose Space Realtors
          </p>
          <div className="flex gap-6">
            <Link href="#" className="uppercase hover:text-brand-gold">
              Privacy Policy
            </Link>
            <Link href="#" className="uppercase hover:text-brand-gold">
              Terms of Use
            </Link>
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
      <h3 className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm text-brand-ivory/90">{children}</ul>
    </div>
  );
}
