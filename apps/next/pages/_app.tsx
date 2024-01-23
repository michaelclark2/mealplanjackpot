import 'raf/polyfill'
import 'setimmediate'

import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'

import '../global.css'
import { AppProps } from 'next/app'
import Link from 'next/link'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  console.log(router.pathname)
  return (
    <>
      <Head>
        <title>Meal Plan Jackpot</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <nav className="mb-2 flex w-full justify-between bg-orange-500 p-2 px-8 text-white shadow">
          <div>
            <h1 className="cursor-default text-lg font-bold">
              Meal Plan Jackpot
            </h1>
          </div>
          <div className="">
            <ul className="flex space-x-12">
              <li>
                <Link
                  href="/"
                  className={router.pathname == '/' ? 'font-bold' : ''}
                >
                  Spin
                </Link>
              </li>
              <li>
                <Link
                  href="/user/plans"
                  className={
                    router.pathname.startsWith('/user/') ? 'font-bold' : ''
                  }
                >
                  Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/user/login"
                  className="rounded bg-green-500 p-1.5 px-3"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Component {...pageProps} />
        <footer className="flex justify-center">
          <p className="p-2 text-xs">
            Created with 💖 by Michael Clark. Recipes provided by Spoonacular.
          </p>
        </footer>
      </Provider>
    </>
  )
}

export default MyApp
