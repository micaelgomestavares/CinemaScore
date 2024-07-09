import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button variant="outline" size="icon" className="relative">
      <Sun 
        onClick={() => setTheme("dark")} 
        className="absolute inset-0 h-[1.2rem] w-[1.2rem] m-auto transition-all dark:-rotate-90 dark:scale-0" 
      />
      <Moon 
        onClick={() => setTheme("light")} 
        className="absolute inset-0 h-[1.2rem] w-[1.2rem] m-auto rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
      />
    </Button>
  );
}
