"use client";

import { MonitorIcon, Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const colorModes = [
  { value: "system", label: "System", icon: MonitorIcon },
  { value: "light", label: "Light", icon: Sun03Icon },
  { value: "dark", label: "Dark", icon: Moon02Icon },
] as const;

const subscribe = (onStoreChange: () => void): (() => void) => {
  onStoreChange();
  return () => {
    onStoreChange();
  };
};

export const ColorModeToggle = () => {
  const { theme, setTheme } = useTheme();
  // The saved color mode is only known in the browser. Show no selection until
  // after hydration so the server and client render the same markup.
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  return (
    <ToggleGroup
      aria-label="Color mode"
      spacing={0.5}
      className="bg-muted rounded-full p-0.5"
      value={hydrated && theme !== undefined && theme.length > 0 ? [theme] : []}
      onValueChange={([value]) => {
        if (value !== undefined && value.length > 0) {
          setTheme(value);
        }
      }}
    >
      {colorModes.map(({ value, label, icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label}
          title={label}
          className="text-muted-foreground hover:text-foreground aria-pressed:border-border aria-pressed:bg-background aria-pressed:text-foreground size-8 rounded-full border border-transparent p-0 hover:bg-transparent"
        >
          <HugeiconsIcon
            icon={icon as IconSvgElement}
            strokeWidth={2}
            className="size-3.5"
            aria-hidden="true"
          />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
