"use client";
import { useEffect, useState } from "react";
import * as RD from "@radix-ui/react-dialog";
import { Download, X, Share, Plus } from "lucide-react";

const DISMISS_KEY = "twc:install-dismissed";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}
function isIOS() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
}

export function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [iosOpen, setIosOpen] = useState(false);
  const [hidden, setHidden] = useState(true); // start hidden to avoid SSR flash

  useEffect(() => {
    if (isStandalone()) return; // already installed
    if (localStorage.getItem(DISMISS_KEY) === "1") return;

    if (isIOS()) {
      setHidden(false);
      return;
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      setHidden(false);
    };
    const onInstalled = () => {
      setHidden(true);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (hidden) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setHidden(true);
  };

  if (isIOS()) {
    return (
      <>
        <button
          type="button"
          onClick={() => setIosOpen(true)}
          className="btn btn-sun"
          aria-label="How to install on iOS"
          style={{ minHeight: 36, padding: "0.375rem 0.75rem" }}
        >
          <Download size={14} /> Install
        </button>
        <RD.Root open={iosOpen} onOpenChange={setIosOpen}>
          <RD.Portal>
            <RD.Overlay className="fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <RD.Content
              className="fixed z-50 inset-x-0 bottom-0 sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:-translate-x-1/2 sm:-translate-y-1/2 sm:inset-x-auto w-full sm:w-[min(440px,calc(100vw-1.5rem))] max-h-[92vh] overflow-y-auto p-5 sm:p-6 rounded-t-[24px] sm:rounded-[16px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-bottom-full sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom-full sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=closed]:zoom-out-95"
              style={{
                background: "var(--card)",
                border: "2px solid var(--ink)",
                boxShadow: "6px 6px 0 var(--shadow-ink)",
                paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))",
              }}
            >
              <div className="sm:hidden flex justify-center mb-3">
                <span className="block w-12 h-1.5 rounded-full bg-ink/20" />
              </div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <RD.Title className="font-display font-extrabold text-2xl leading-tight">
                  Add to your home screen
                </RD.Title>
                <RD.Close className="btn btn-ghost p-1.5 text-ink-soft hover:text-ink" aria-label="Close">
                  <X size={20} />
                </RD.Close>
              </div>
              <RD.Description className="text-sm text-ink-soft mb-5">
                On iOS, you'll add it through Safari's share menu — takes 3 taps.
              </RD.Description>
              <ol className="space-y-3 mb-5">
                <Step n={1} icon={<Share size={16} />}>
                  Tap the <b>Share</b> button at the bottom of Safari.
                </Step>
                <Step n={2} icon={<Plus size={16} />}>
                  Scroll down and tap <b>Add to Home Screen</b>.
                </Step>
                <Step n={3}>Tap <b>Add</b>. Done — open it from your home screen like an app.</Step>
              </ol>
              <button type="button" onClick={dismiss} className="btn btn-ghost w-full border border-ink/20">
                Don't show again
              </button>
            </RD.Content>
          </RD.Portal>
        </RD.Root>
      </>
    );
  }

  return (
    <button
      type="button"
      onClick={async () => {
        if (!installEvent) return;
        await installEvent.prompt();
        const choice = await installEvent.userChoice;
        if (choice.outcome === "dismissed") dismiss();
        else setHidden(true);
        setInstallEvent(null);
      }}
      className="btn btn-sun"
      style={{ minHeight: 36, padding: "0.375rem 0.75rem" }}
    >
      <Download size={14} /> Install app
    </button>
  );
}

function Step({ n, icon, children }: { n: number; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="font-display font-extrabold tabular w-7 h-7 flex items-center justify-center rounded-full border-2 border-ink shrink-0"
        style={{ background: "var(--accent-sun)", color: "var(--ink)" }}
      >
        {n}
      </span>
      <span className="leading-snug pt-0.5 text-sm">
        {icon && <span className="inline-flex align-text-bottom mr-1">{icon}</span>}
        {children}
      </span>
    </li>
  );
}
