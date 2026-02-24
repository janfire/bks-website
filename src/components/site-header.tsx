"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        {!isLoginPage && (
          <Link href="/" className="group inline-flex items-baseline gap-2">
            <span className="text-sm font-semibold tracking-[0.18em] text-foreground/60">
              BKS
            </span>
            <span className="text-base font-semibold tracking-tight">
              Kitchens & Cupboards
            </span>
          </Link>
        )}

        {!isLoginPage && (
          <>
            <nav className="hidden items-center gap-1 md:flex">
              {navigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm transition hover:bg-foreground/5",
                      active && "bg-foreground/5 text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <Button asChild variant="outline" className="rounded-full">
                <a href="tel:+27621047480">
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </Button>
              <Button asChild className="rounded-full">
                <a href="/contact">Get a Quote</a>
              </Button>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {!isLoginPage && (
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden"
            >
              <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur" />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="fixed right-0 top-0 z-50 h-dvh w-[86%] max-w-sm border-l border-foreground/10 bg-background"
              >
                <div className="flex items-center justify-between px-4 py-4">
                  <span className="text-sm font-semibold tracking-tight">
                    Menu
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex flex-col gap-1 px-2 py-2">
                  {navigation.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "rounded-2xl px-4 py-3 text-base transition hover:bg-foreground/5",
                          active && "bg-foreground/5",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-auto px-4 pb-6 pt-2">
                  <div className="grid gap-2">
                    <Button asChild variant="outline">
                      <a href="tel:+27621047480">
                        <Phone className="h-4 w-4" />
                        Call +27 62 104 7480
                      </a>
                    </Button>
                    <Button asChild>
                      <a href="/contact">Request a Quote</a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}
    </header>
  );
}
