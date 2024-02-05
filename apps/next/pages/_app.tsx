import 'raf/polyfill'
import 'setimmediate'

import { Provider } from 'app/provider'
import Navbar from 'app/components/Navbar'
import Footer from 'app/components/Footer'
import Head from 'next/head'
import React from 'react'
import { Toaster } from 'burnt/web'

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
        <Toaster
          expand
          richColors
          position="bottom-center"
          style={{ textAlign: 'center', margin: '0 auto' }}
        />
        <Footer />
      </Provider>
    </>
  )
}

export default MyApp
