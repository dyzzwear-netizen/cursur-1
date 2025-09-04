import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Finance App',
  description: 'Track salaries and fixed amounts',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <nav className="border-b">
            <div className="mx-auto max-w-6xl px-4 py-3 flex gap-6 items-center">
              <a className="font-semibold" href="/">Dashboard</a>
              <a className="text-gray-700 hover:text-black" href="/employees">Employees</a>
              <a className="text-gray-700 hover:text-black" href="/fixed-expenses">Fixed Expenses</a>
            </div>
          </nav>
          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
