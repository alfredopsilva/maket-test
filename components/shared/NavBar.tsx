"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeProvider";

const NavBar = () => {
  const { theme, setTheme } = useTheme();

  const handleTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <header className="w-screen flex justify-end p-4 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default NavBar;
