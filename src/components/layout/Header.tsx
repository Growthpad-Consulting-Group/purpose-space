import Image from "next/image";

const navLinks = ["Properties", "Services", "About", "Contact"];

export function Header() {
  return (
    <header className="border-b border-brand-dark/10 bg-brand-cream">
      <div className="container-fluid flex h-20 items-center justify-between">
        <Image
          src="/brand/logo.svg"
          alt="Purpose Space Realtors"
          width={131}
          height={36}
          priority
        />
        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 text-sm font-medium text-brand-dark md:flex">
            {navLinks.map((label) => (
              <a key={label} href="#" className="hover:text-brand">
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#"
            className="rounded-md border border-brand px-5 py-2.5 text-sm font-medium text-brand-dark transition-colors hover:bg-brand hover:text-brand-cream"
          >
            List your property
          </a>
        </div>
      </div>
    </header>
  );
}
