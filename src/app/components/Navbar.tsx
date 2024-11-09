import React from 'react';
import Link from 'next/link';

interface NavItem {
    href: string;
    text: string;
}

const navItems: NavItem[] = [
    { href: '/pages/login', text: 'Login' },
    { href: '/pages/submit', text: 'Submit' },
    { href: '/pages/cars', text: 'Cars' },
    { href: '/pages/toDo', text: 'To do' },
    { href: '/pages/books', text: 'Books' },
];

const NavBar: React.FC = () => {
    return (
        <nav className='flex justify-between p-5 bg-blue-700 text-white text-xl'>
            <Link href='/'>My Website</Link>
            <div className="flex space-x-4">
            {navItems.map((item, index) => (
                <Link key={index} href={item.href}>{item.text}</Link>
            ))}
        </div>
      </nav >
    );
  };

export default NavBar;
