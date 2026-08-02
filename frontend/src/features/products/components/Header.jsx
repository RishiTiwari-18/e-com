import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, ShoppingBag, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const avatarSrc = user?.avatar || "";
  const userName = user?.fullname || "User";
  const userInitial = userName.trim().charAt(0).toUpperCase();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  console.log("hello")

  return (
    <header className="sticky top-0 z-20 border-b border-border/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 md:px-8">
        <Link to="/" className="font-newsreader text-primary text-xl  ">
          <svg
            width="3.375em"
            height="1.5em"
            rotate={90}
            viewBox="0 0 54 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left Plus */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              transform="rotate(45 12 12)"
              d="M15.9249 8H23.6113C23.7638 8 23.8873 8.12341 23.8873 8.27564V15.7244C23.8873 15.8766 23.7638 16 23.6113 16H15.9249V23.7244C15.9249 23.8766 15.8013 24 15.6489 24H8.23848C8.08603 24 7.96245 23.8766 7.96245 23.7244V16H0.27603C0.123583 16 0 15.8766 0 15.7244V8.27564C0 8.12341 0.123583 8 0.27603 8H7.96245V0.275638C7.96245 0.123407 8.08603 0 8.23848 0H15.6489C15.8013 0 15.9249 0.123407 15.9249 0.275638V8Z"
            />

            {/* Right Circle */}
            <circle cx="41.5" cy="12" r="10" fill="currentColor" />
          </svg>
        </Link>

        <nav className="flex items-center gap-2 md:gap-4">
          <Link
            to="/collections"
            className={`text-xl font-medium ${location.pathname === "/collections" && "underline"} text-primary duration-300 mr-4`}
          >
            Shop
          </Link>

          {user && user.role === "buyer" && (
            <Link to="/bag">
              <ShoppingBag className="size-5 hover:text-muted-foreground" />
            </Link>
          )}

          <Button
            variant="icon"
            size="icon"
            className=" hover:text-muted-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>

          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Avatar size="lg" className="border border-border/70">
                        <AvatarImage src={avatarSrc} alt={userName} />
                        <AvatarFallback>{userInitial || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
                <DropdownMenuContent className="w-42 mt-1">
                  {user.role === "seller" && (
                    <DropdownMenuGroup>
                      <Link to="/seller/dashboard">
                        <DropdownMenuItem>Dashboard</DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                  )}
                  {/* <DropdownMenuSeparator /> */}
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="text-destructive-foreground! mt-2"
                      variant="destructive"
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="rounded-full px-5">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full px-5">
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
