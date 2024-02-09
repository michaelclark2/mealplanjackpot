import React from 'react'
import { AppRegistry } from 'react-native'

import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    AppRegistry.registerComponent('Main', () => Main)
    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication('Main')
    const styles = [getStyleElement()]

    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps, styles: React.Children.toArray(styles) }
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {/* Apple Touch */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          {/* Microsoft Tiles */}
          <meta name="msapplication-config" content="browserconfig.xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
