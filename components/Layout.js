import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link legacyBehavior href="/">
              <a className="text-lg font-bold">amazona</a>
            </Link>
            <div className="">
              <Link legacyBehavior href="/cart">
                <a className="p-2">Cart</a>
              </Link>
              <Link legacyBehavior href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4 ">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          <p>Copyright © 2022 Amazona </p>
        </footer>
      </div>
    </>
  );
}
