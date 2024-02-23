import 'raf/polyfill'
import 'setimmediate'

import { Provider } from 'app/provider'
import Navbar from 'app/components/Navbar'
import Footer from 'app/components/Footer'
import Head from 'next/head'
import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'burnt/web'

import '../global.css'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Meal Plan Jackpot</title>
        <meta
          name="description"
          content="Meal planning with a spin! Create a meal plan quickly with a large variety of delicious recipes in minutes."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://mealplanjackpot.com" />
      </Head>
      <Provider>
        <Navbar />
        <Component {...pageProps} />
        <Analytics />
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
