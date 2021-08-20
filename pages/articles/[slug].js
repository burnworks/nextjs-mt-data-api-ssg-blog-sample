import Link from 'next/link'
import Layout from '../../components/Layout'
import styles from '../../styles/posts.module.css'
import { getAllPosts } from '../../lib/api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export const getStaticPaths = async () => {
    const allPosts = await getAllPosts()
    return {
        paths: allPosts.items.map((post) => ({
            params: {
                slug: post.basename
            }
        })),
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const allPosts = await getAllPosts()
    const slug = params.slug
    const result = allPosts.items.find((v) => v.basename === slug)
    return {
        props: {
            post: result
        }
    }
}

const Slug = (post) => {
    return (
        <Layout
            title={post.post.title}
            description={post.post.excerpt}
            url={post.post.permalink}
            image={post.post.customFields[0].value}
            type="article"
        >
            <div className={styles.title}>
                <h2>{post.post.title}</h2>
            </div>
            <div className={styles.excerpt}>
                <p>{post.post.excerpt}</p>
            </div>
            <div className={styles.entryBody}>
                <div className={styles.body}
                    dangerouslySetInnerHTML={{ __html: post.post.body }}
                />
                <div className={styles.more}
                    dangerouslySetInnerHTML={{ __html: post.post.more }}
                />
            </div>
            <div className={styles.backHome}>
                <FontAwesomeIcon icon={faAngleLeft} />
                <Link href="/">Back</Link>
            </div>
        </Layout>
    )
}
export default Slug