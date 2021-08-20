import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/layout.module.css'

const Layout = (props) => {

    const { title, description, url, image, type, children } = props
    const siteTitle = 'サンプルブログ'

    const [isSticky, setIsSticky] = React.useState(false)
    useEffect(() => {
        const scrollAction = () => {
            if (150 > window.scrollY) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        };
        document.addEventListener('scroll', scrollAction, {
            capture: false,
            passive: true,
        });
        scrollAction()

        return () => {
            document.removeEventListener('scroll', scrollAction)
        }
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>{title ? `${title} - ${siteTitle}` : siteTitle}</title>

                <meta name="description" content={description} />
                <meta property="og:title" content={title ? `${title}` : siteTitle} />
                <meta property="og:site_name" content={siteTitle} />
                <meta property="og:url" content={url} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="og:image:secure_url" content={image} />
                <meta property="og:type" content={type} />
            </Head>

            <div className={isSticky ? '' : 'isSticky'}>
                <header className={styles.header}>
                    <h1 className={styles.siteTitle}>
                        <Link href="/">{siteTitle}</Link>
                    </h1>
                </header>
            </div>

            <main>
                <div className={styles.main}>
                    {children}
                </div>
            </main>

            <footer>
                <div className={styles.footer}>
                    <div className={styles.copyright}>
                        <p><small>Sample blog</small></p>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Layout