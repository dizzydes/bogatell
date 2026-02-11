'use client';

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown this session
    const alreadyShown = sessionStorage.getItem("exitIntentShown");
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves toward top of page
      if (e.clientY < 10 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    document.addEventListener("mouseout", handleMouseLeave);
    return () => document.removeEventListener("mouseout", handleMouseLeave);
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-background border border-border rounded-lg max-w-md w-full p-8 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="font-display text-2xl font-bold text-foreground mb-3">Before you go...</h2>
        <p className="font-body text-muted-foreground mb-6">Book a free, no-commitment due diligence consultation or chat with our team.</p>

        <Button asChild className="w-full font-semibold">
          <a href="/book" onClick={handleClose}>
            Book a Free Call
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          className="w-full mt-1.5 font-semibold"
        >
          <a href="#" onClick={(e) => { e.preventDefault(); handleClose(); if (window.$crisp) window.$crisp.push(['do', 'chat:open']); }}>
            Text Us A Question
          </a>
        </Button>

        <button
          onClick={handleClose}
          className="w-full mt-3 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          No thanks, I'll pass
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
