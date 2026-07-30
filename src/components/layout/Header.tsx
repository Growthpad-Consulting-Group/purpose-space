import { Icon } from "@iconify/react";

export function Header() {
  return (
    <header className="border-b border-brand-dark/10 bg-brand-cream dark:border-white/10 dark:bg-brand-dark">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-heading text-lg text-brand-dark dark:text-brand-cream">
          <Icon icon="mdi:home-city" className="text-2xl text-brand" />
          Purpose Space Realtors
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-brand-dark dark:text-brand-cream">
          <a href="#">Listings</a>
          <a href="#">Agents</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  );
}
