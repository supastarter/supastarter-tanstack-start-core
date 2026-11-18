"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const colorModes = [
  { value: "system", label: "System", icon: MonitorIcon },
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
] as const;

const subscribe = () => () => {};

export function ColorModeToggle() {
  const { theme, setTheme } = useTheme();
  // The saved color mode is only known in the browser. Show no selection until
  // after hydration so the server and client render the same markup.
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return (
    <ToggleGroup
      aria-label="Color mode"
      spacing={0.5}
      className="bg-muted rounded-full p-0.5"
      value={hydrated && theme ? [theme] : []}
      onValueChange={([value]) => {
        if (value) {
          setTheme(value);
        }
      }}
    >
      {colorModes.map(({ value, label, icon: Icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label}
          title={label}
          className="text-muted-foreground hover:text-foreground aria-pressed:border-border aria-pressed:bg-background aria-pressed:text-foreground size-8 rounded-full border border-transparent p-0 hover:bg-transparent"
        >
          <Icon className="size-3.5" aria-hidden="true" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
