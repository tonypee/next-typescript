import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { MaxWidthIsland } from '../core/layout'
import { getStyles, style } from 'typestyle'

export default class Layout extends React.Component<{ title: string }> {

  render() {
    let {children, title} = this.props

    title = title || 'This is the default title';
    
    return (
      <MaxWidthIsland style={{ background: '#e2e2e2'}}>
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
            <header  style={{ paddingBottom: 50 }}>
              <p>
                <img src="/static/logo.png" />
              </p>
              <nav>
                <LinkItem href="/" label="Home"></LinkItem> | 
                <LinkItem href="/about" label="About"></LinkItem> | 
                <LinkItem href="/contact" label="Contact"></LinkItem> |
                <LinkItem href="/todos" label="Todos"></LinkItem>
              </nav>
            </header>
          </div>
          {children}
        </div>
      </MaxWidthIsland>  
    )
  }
}

const linkStyle = style({
  padding: 10
});

const LinkItem = ({href, label}) => 
  <Link href={href}><a className={linkStyle}>{label}</a></Link>
