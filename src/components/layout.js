import * as React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image'
import {
    content,
    footer,
    header,
    logo,
    heading,
    mainNav,
    navLinks,
    navLinkItem,
    siteTitle,
} from './layout.module.css'

const Layout = (props) => {
    // Extract properties passed into this component directly
    const children = props.children;   // React passes in any child elements
    const pageTitle = props.pageTitle; // custom property: page title

    // Get the site title (data from gatsby-config.js)
    const data = useStaticQuery(graphql`
        query {
        site {
            siteMetadata {
                title
            }
        }
        }
    `)

    // Return the Layout component
    return (
        <div className={content}>
            <header className={header}>
                <div className={logo}>
                    <StaticImage src="../images/map.png" height={100} alt="NPS logo"></StaticImage>
                </div>
                <h1 className={siteTitle}><Link to="/">{data.site.siteMetadata.title}</Link></h1>
                <nav className={mainNav}>
                    <ul className={navLinks}>
                        <li className={navLinkItem}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={navLinkItem}>
                            <Link to="/parks">All Parks</Link>
                        </li>
                        <li className={navLinkItem}>
                            <Link to="/states">State Parks</Link>
                        </li>
                        <li className={navLinkItem}>
                            <Link to="/search-local">Local Search</Link>
                        </li>
                        <li className={navLinkItem}>
                            <Link to="/search-js">js-search Search</Link>
                        </li>
                        <li className={navLinkItem}>
                            <Link to="/search-algolia">Algolia Search</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <h2 className={heading}>{pageTitle}</h2>
                {children}
            </main>
            <footer className={footer}>
                Example developed for CSCI E-114, Spring 2023.
            </footer>
        </div>
    )
}

export default Layout