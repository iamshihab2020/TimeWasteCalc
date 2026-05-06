"use client";
import * as RS from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

export type SelectOption = { value: string; label: string; emoji?: string };

export function Select({
  value,
  onChange,
  options,
  placeholder,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
  ariaLabel?: string;
}) {
  return (
    <RS.Root value={value} onValueChange={onChange}>
      <RS.Trigger
        aria-label={ariaLabel}
        className="input flex items-center justify-between gap-2 cursor-pointer outline-none data-[state=open]:shadow-[3px_3px_0_var(--accent-hot)] group transition-shadow"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}
      >
        <RS.Value placeholder={placeholder} />
        <RS.Icon asChild>
          <ChevronDown
            size={16}
            strokeWidth={2.5}
            className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[state=open]:rotate-180"
          />
        </RS.Icon>
      </RS.Trigger>
      <RS.Portal>
        <RS.Content
          position="popper"
          sideOffset={8}
          align="start"
          className="select-content z-50 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-select-content-transform-origin)]"
          style={{
            background: "var(--card)",
            border: "2px solid var(--ink)",
            borderRadius: "var(--radius-md)",
            boxShadow: "4px 4px 0 var(--ink)",
            minWidth: "var(--radix-select-trigger-width)",
            fontFamily: "var(--font-sans)",
          }}
        >
          <RS.Viewport className="p-1.5">
            {options.map((opt, i) => (
              <RS.Item
                key={opt.value}
                value={opt.value}
                style={{ ["--i" as string]: i }}
                className="select-item relative flex items-center justify-between gap-3 rounded-[8px] px-3 py-2 text-sm font-semibold cursor-pointer outline-none select-none transition-colors data-[highlighted]:bg-[var(--accent-sun)] data-[highlighted]:text-[var(--ink)] data-[state=checked]:bg-[var(--accent-hot)] data-[state=checked]:text-white"
              >
                <span className="flex items-center gap-2">
                  {opt.emoji && <span aria-hidden>{opt.emoji}</span>}
                  <RS.ItemText>{opt.label}</RS.ItemText>
                </span>
                <RS.ItemIndicator>
                  <Check size={14} strokeWidth={3} className="select-check" />
                </RS.ItemIndicator>
              </RS.Item>
            ))}
          </RS.Viewport>
        </RS.Content>
      </RS.Portal>
    </RS.Root>
  );
}
