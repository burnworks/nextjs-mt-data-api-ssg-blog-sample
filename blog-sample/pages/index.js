import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/top.module.css';

const ENDPOINT = process.env.NEXT_PUBLIC_MT_ENDPOINT_URL

export const getStaticProps = async () => {
    const res = await fetch(ENDPOINT)
    const json = await res.json()
    return {
        props: {
            posts: json.items
        }
    }
}

const Blog = (posts) => {
    return (
        <Layout
            title="トップページ"
            description="サンプルブログのトップページです。"
            url="https://example.com/"
            image="/img/ogp.png"
            type="website"
        >
            <div className={styles.pageHeader}>
                <h2>新着記事</h2>
            </div>
            <div className={styles.articleList}>
                <ul>
                    {posts.posts.map(post => (
                        <li key={post.id}>
                            <Link href={`/articles/${post.basename}`}>
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}

export default Blog