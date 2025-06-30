import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              Real Estate Leads
            </span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
