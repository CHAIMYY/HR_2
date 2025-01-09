'use client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold">
              Job Board
            </Link>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                {isLoggedIn && (
                  <li>
                    <Link href="/applications" className="hover:underline">
                      My Applications
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <li>
                    <Link href="/admin/applications" className="hover:underline">
                      Manage Applications
                    </Link>
                  </li>
                )}
                {isLoggedIn ? (
                  <li>
                    <button onClick={handleLogout} className="hover:underline">
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link href="/login" className="hover:underline">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link href="/register" className="hover:underline">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto px-4 text-center">
          © 2023 Job Board. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

