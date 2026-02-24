import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="text-sm font-semibold tracking-tight">
            BKS Kitchens & Cupboards
          </div>
          <div className="mt-2 text-sm text-foreground/70">
            Premium kitchen and cupboard design, fabrication and installation.
          </div>
          <div className="mt-4 text-sm text-foreground/70">
            Pretoria North, South Africa
          </div>
        </div>

        <div className="grid gap-2 text-sm">
          <div className="text-xs font-semibold tracking-[0.18em] text-foreground/60">
            NAVIGATION
          </div>
          <Link className="text-foreground/80 hover:text-foreground" href="/">
            Home
          </Link>
          <Link
            className="text-foreground/80 hover:text-foreground"
            href="/gallery"
          >
            Gallery
          </Link>
          <Link
            className="text-foreground/80 hover:text-foreground"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-foreground/80 hover:text-foreground"
            href="/contact"
          >
            Contact
          </Link>
        </div>

        <div className="grid gap-2 text-sm">
          <div className="text-xs font-semibold tracking-[0.18em] text-foreground/60">
            CONTACT
          </div>
          <a
            className="text-foreground/80 hover:text-foreground"
            href="tel:+27621047480"
          >
            Calls: +27 62 104 7480
          </a>
          <a
            className="text-foreground/80 hover:text-foreground"
            href="https://wa.me/27603918486"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp: +27 60 391 8486
          </a>
        </div>
      </div>

      <div className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            © {new Date().getFullYear()} BKS Kitchens & Cupboards. All rights
            reserved.
          </div>
          <div>Built for performance & mobile-first browsing.</div>
        </div>
      </div>
    </footer>
  );
}
