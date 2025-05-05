
import React from 'react';
import { Github, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Spinny Wheel</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <nav className="flex flex-col gap-2">
                    <Link to="/" className="px-4 py-2 hover:bg-secondary rounded-md">Home</Link>
                    <Link to="/about" className="px-4 py-2 hover:bg-secondary rounded-md">About</Link>
                    <Link to="/support" className="px-4 py-2 hover:bg-secondary rounded-md">Support</Link>
                    <Link to="/contact" className="px-4 py-2 hover:bg-secondary rounded-md">Contact</Link>
                    <Link to="/privacy" className="px-4 py-2 hover:bg-secondary rounded-md">Privacy Policy</Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-wheel-red via-wheel-blue to-wheel-purple bg-clip-text text-transparent">
                Spinny Wheel
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary/80">Home</Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary/80">About</Link>
            <Link to="/support" className="text-sm font-medium hover:text-primary/80">Support</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary/80">Contact</Link>
          </nav>
          
          <div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center text-sm font-medium transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="container px-4 py-8">
          {children}
        </div>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Spinny Wheel. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-sm font-medium text-muted-foreground hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="text-sm font-medium text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
