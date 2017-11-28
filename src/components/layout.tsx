import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { MaxWidthIsland } from '../core/layout'
import { getStyles } from 'typestyle'

export default class Layout extends React.Component<{ title: string }> {

  render() {
    let {children, title} = this.props

    title = title || 'This is the default title';
    
    return (
      <MaxWidthIsland>
        <style>
          {getStyles()}
        </style>
        <div id="container">
          <div style={{ textAlign: 'center '}}>
            <Head>
              <title>{title}</title>
              <meta charSet="utf-8" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header>
              <p>
                <img src="/static/logo.png" />
              </p>
              <nav>
                <Link href="/"><a>Home</a></Link>|
                <Link href="/about"><a>About</a></Link>|
                <Link href="/contact"><a>Contact</a></Link>
                <Link href="/todos"><a>Todos</a></Link>
              </nav>
            </header>
          </div>
          {children}
        </div>
      </MaxWidthIsland>  
    )
  }
}