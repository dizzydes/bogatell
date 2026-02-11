'use client';

import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  navItems: { label: string; href: string }[];
}

export default function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden relative z-[101]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-white transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-24 px-8",
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-6 text-center">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-2xl font-display font-medium text-foreground hover:text-primary transition-colors relative w-fit mx-auto"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
              {item.label === "Deal Sourcing" && (
                <span className="absolute -top-3 -right-8 rounded-[2px] bg-[#53D9B5] px-1 py-[1px] text-[8px] font-bold leading-none text-black">
                  NEW
                </span>
              )}
            </a>
          ))}
          <a
            href="/book"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-accent px-8 py-4 font-body text-lg font-semibold text-accent-foreground hover:bg-accent/90 w-full max-w-xs mx-auto"
            onClick={() => setIsOpen(false)}
          >
            Book a Call
          </a>
        </nav>
      </div>
    </>
  );
}
