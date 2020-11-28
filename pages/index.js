import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/top.module.css';
import { getAllPosts } from '../lib/api';

export const getStaticProps = async () => {
    const allPosts = await getAllPosts()
    return {
        props: {
            posts: allPosts.items
        }
    }
}

const Blog = (posts) => {
    return (
        <Layout
            title="トップページ"
            description="サンプルブログのトップページです。"
            url="https://example.com/"
            image="https://example.com/img/ogp.png"
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