import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, Moon, ShoppingBag, Sun, User, X } from "lucide-react";
import { useTheme } from "next-themes";
import useAuth from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  selectCartItemCount,
  clearCart,
} from "@/features/cart/state/cart.slice";
import useCart from "@/features/cart/hooks/useCart";

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const cartItemCount = useSelector(selectCartItemCount);
  const { handleLogout: authLogout } = useAuth();
  const { handleSetCartItems } = useCart();
  const dispatch = useDispatch();
  const avatarSrc = user?.avatar || "";
  const userName = user?.fullname || "User";
  const userInitial = userName.trim().charAt(0).toUpperCase();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (user && user.role === "buyer") {
      handleSetCartItems().catch(() => {});
    }
  }, [user?.id, user?.role, handleSetCartItems]);

  const handleLogout = useCallback(async () => {
    try {
      await authLogout();
    } finally {
      dispatch(clearCart());
    }
  }, [authLogout, dispatch]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 md:h-16 w-full items-center justify-between px-4 md:px-8">
        {/* Left: Logo */}
        <Link to="/" className="font-newsreader text-primary text-xl shrink-0" onClick={closeMobileMenu}>
          <svg
            width="3.375em"
            height="1.5em"
            rotate={90}
            viewBox="0 0 54 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              transform="rotate(45 12 12)"
              d="M15.9249 8H23.6113C23.7638 8 23.8873 8.12341 23.8873 8.27564V15.7244C23.8873 15.8766 23.7638 16 23.6113 16H15.9249V23.7244C15.9249 23.8766 15.8013 24 15.6489 24H8.23848C8.08603 24 7.96245 23.8766 7.96245 23.7244V16H0.27603C0.123583 16 0 15.8766 0 15.7244V8.27564C0 8.12341 0.123583 8 0.27603 8H7.96245V0.275638C7.96245 0.123407 8.08603 0 8.23848 0H15.6489C15.8013 0 15.9249 0.123407 15.9249 0.275638V8Z"
            />
            <circle cx="41.5" cy="12" r="10" fill="currentColor" />
          </svg>
        </Link>

        {/* Right: Nav */}
        <nav className="flex items-center gap-1 md:gap-2 lg:gap-4">
          {/* Desktop: Shop Link */}
          <Link
            to="/collections"
            className={cn(
              "hidden md:block text-lg font-medium text-primary duration-300 mr-2 lg:mr-4",
              location.pathname === "/collections" && "underline"
            )}
          >
            Shop
          </Link>

          {/* Desktop: Shopping Bag */}
          {user && user.role === "buyer" && (
            <Link to="/bag"  className={cn(
              "hidden md:block text-lg font-medium text-primary duration-300 mr-2 lg:mr-4",
              location.pathname === "/bag" && "underline"
            )}>
              Bag ({cartItemCount})
            </Link>
          )}

          {/* Theme Toggle (Always visible, compact on mobile) */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="size-4 md:size-5" />
            ) : (
              <Moon className="size-4 md:size-5" />
            )}
          </Button>

          {/* Desktop: User / Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
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
                      <Link to="/seller/dashboard" onClick={closeMobileMenu}>
                        <DropdownMenuItem>Dashboard</DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                  )}
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="text-destructive-foreground! mt-2"
                      variant="destructive"
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" className="rounded-full px-3 lg:px-5">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="rounded-full px-3 lg:px-5">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile: Hamburger Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-14 z-30 border-b border-border/10 bg-background shadow-xs transition-all duration-300 ease-out overflow-hidden",
          mobileMenuOpen
            ? "max-h-[80vh] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="flex flex-col px-4 py-4 gap-1">
          {/* Shop */}
          <Link
            to="/collections"
            onClick={closeMobileMenu}
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-primary",
              location.pathname === "/collections" && "bg-muted"
            )}
          >
            Shop
          </Link>

          {/* Shopping Bag (buyer only) */}
          {user && user.role === "buyer" && (
            <Link
              to="/bag"
              onClick={closeMobileMenu}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-primary",
                location.pathname === "/bag" && "bg-muted"
              )}
            >
              Bag({cartItemCount})
            </Link>
          )}

          {/* Divider */}
          <div className="my-2 h-px bg-border/60" />

          {user ? (
            <>
              {/* Logged-in user section */}
              <div className="flex items-center gap-3 px-3 py-3 rounded-md ">
                <Avatar size="lg" className="border border-border/70 shrink-0">
                  <AvatarImage src={avatarSrc} alt={userName} />
                  <AvatarFallback>{userInitial || "U"}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-medium truncate text-foreground">{userName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.email}</p>
                </div>
              </div>

              {user.role === "seller" && (
                <Link
                  to="/seller/dashboard"
                  onClick={closeMobileMenu}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-primary",
                    location.pathname === "/seller/dashboard" && "bg-muted"
                  )}
                >
                  <User className="size-5 shrink-0" />
                  Seller Dashboard
                </Link>
              )}

              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-destructive-foreground! hover:bg-destructive/10 w-full text-left mt-1"
              >
                <LogOut className="size-5 shrink-0" />
                Log out
              </button>
            </>
          ) : (
            <>
              {/* Logged out: Auth buttons stacked */}
              <div className="flex flex-col gap-2 px-1 pt-1">
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link to="/login" onClick={closeMobileMenu}>
                    Log in
                  </Link>
                </Button>
                <Button asChild className="w-full rounded-full">
                  <Link to="/register" onClick={closeMobileMenu}>
                    Create account
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile overlay backdrop for menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-14 z-20 bg-black/20 backdrop-blur-[1px]"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
