import { Store } from '@/utils/store';
import Head from 'next/head';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import React, { useContext, useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [CartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce((a, c) => {
        return a + c.quantity;
      }, 0)
    );
  }, [cart.cartItems]);

  const logoutClickedHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link legacyBehavior href="/">
              <a className="text-lg font-bold">amazona</a>
            </Link>
            <div className="">
              <Link legacyBehavior href="/cart">
                <a className="p-2">
                  Cart
                  {CartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white ">
                      {CartItemsCount}
                    </span>
                  )}
                </a>
              </Link>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    <Menu.Item>
                      <DropdownLink href="/profile" className="dropdown-link">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        href="/order-history"
                        className="dropdown-link"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        href="#"
                        className="dropdown-link"
                        onClick={logoutClickedHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link legacyBehavior href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4 ">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          <p>Copyright ?? 2022 Amazona </p>
        </footer>
      </div>
    </>
  );
}
