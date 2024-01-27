import 'raf/polyfill'
import 'setimmediate'

import { Provider } from 'app/provider'
import Navbar from 'app/components/Navbar'
import Head from 'next/head'
import React from 'react'

import '../global.css'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Meal Plan Jackpot</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <Navbar />
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
