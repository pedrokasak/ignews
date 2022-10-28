import Head from 'next/head';
import styles from'./styles.module.scss';
import { getPrismicClient } from '../../services/prismic';
import Link from 'next/link';

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}
interface PostsProps {
    posts: Post[]
}


export default function Posts({ posts }: PostsProps) {
    return(
        <>
        <Head>
            <title>Posts | Ignews</title>    
        </Head>
        <main className={styles.container}>
            <div className={styles.posts}>
                { posts.map(post =>(
                    // eslint-disable-next-line react/jsx-key
                    <Link href={`/posts/${post.slug}`}>
                        <a key={post.slug}>
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>
                    </Link>
                ))}
                
            </div>
        </main>
        
        </>
    );
}

export async function getServerSideProps() {
    const prismic = getPrismicClient()

    const response = await prismic.getByType("posts", {
        pageSize: 10,
      });

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: post.data.title,
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    });

    return {
        props: { posts }
    }
}
