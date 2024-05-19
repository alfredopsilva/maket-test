"use client";
import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const [userId, setUserId] = useState(true);

  const handleLogout = () => {
    router.push("/login");
    setUserId(false);
  };
  return (
    <header className="w-screen flex justify-end p-4 gap-4 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* NOTE: After the button is clicked, check from where another bother / outiline is comming from. */}
          <Button
            variant="outline"
            size="icon"
            className="border dark:border-accentColor"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon
              color="#B99868"
              className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
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
      {userId && (
        <Button variant={"destructive"} onClick={handleLogout}>
          Logout
        </Button>
      )}
    </header>
  );
};

export default NavBar;
