'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { logout } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-rich-black text-flash-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="text-2xl font-bold hover:text-hooker-green transition-colors">
            Product Management
          </Link>
          <div className="relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="focus:outline-none">
                <FaUserCircle className="w-10 h-10 text-flash-white rounded-full border-2 border-transparent hover:border-hooker-green hover:text-hooker-green transition-all duration-300" />
              </button>
            ) : (
              <Link href="/login">
                <FaUserCircle className="w-10 h-10 text-flash-white rounded-full border-2 border-transparent hover:border-hooker-green hover:text-hooker-green transition-all duration-300" />
              </Link>
            )}
            {isDropdownOpen && isAuthenticated && (
              <div className="absolute right-0 mt-3 w-48 bg-rich-black rounded-md shadow-xl z-10 animate-fade-in-fast ring-1 ring-hooker-green">
                <div className="py-1">
                  <Link href="/dashboard" className="block px-4 py-2 text-sm text-flash-white hover:bg-hooker-green" onClick={() => setIsDropdownOpen(false)}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-flash-white hover:bg-hooker-green hover:text-chestnut-red">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
