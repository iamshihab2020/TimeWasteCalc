"use client";
import { SunSticker } from "@/components/stickers";
import { WifiOff, RotateCw } from "lucide-react";

export default function OfflinePage() {
  return (
    <main className="relative z-10 mx-auto max-w-md min-h-[100dvh] flex flex-col items-center justify-center px-6 py-10 text-center">
      <SunSticker className="w-16 h-16 mb-5" />
      <div className="sticker p-6 sm:p-8 w-full">
        <div className="flex items-center justify-center gap-2 mb-3 text-ink-soft">
          <WifiOff size={18} />
          <span className="font-mono text-xs uppercase tracking-wider">Offline</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight mb-3">
          You're offline.
        </h1>
        <p className="text-ink-soft mb-6 leading-relaxed">
          The calculator still works — everything runs in your browser, no
          server needed. Reload when you're back online to share your number.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn btn-hot w-full"
        >
          <RotateCw size={16} /> Try again
        </button>
      </div>
      <p className="mt-6 text-xs text-ink-soft">
        Already opened the app once? Just navigate back home — it's cached.
      </p>
    </main>
  );
}
