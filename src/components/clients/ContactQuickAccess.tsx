'use client';

import { Mail } from 'lucide-react';
import { toast } from 'sonner';
import ExitIntentPopup from '@/components/ExitIntentPopup';

export default function ContactQuickAccess({ injectExitIntent = false }: { injectExitIntent?: boolean }) {
  return (
    <>
      {injectExitIntent && <ExitIntentPopup />}
      <div className="flex flex-wrap items-center justify-center gap-6">
        <button
          onClick={() => {
            // navigator.clipboard.writeText('contact@bogatell.io');
            // toast.success('Email copied to clipboard');
          }}
          className="flex items-center gap-3 font-body text-muted-foreground transition-colors hover:text-foreground"
        >
          <Mail className="h-5 w-5" />
          {/*<span>contact@bogatell.io</span>*/}
        </button>
        <a
          href="https://www.linkedin.com/in/technical-due-diligence/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 font-body text-muted-foreground transition-colors hover:text-foreground"
        >
          <img src="/assets/linkedin-icon.webp" alt="LinkedIn" className="h-5 w-5 grayscale" />
          <span>LinkedIn</span>
        </a>
      </div>
    </>
  );
}