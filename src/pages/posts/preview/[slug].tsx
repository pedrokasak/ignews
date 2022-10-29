import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";
import styles from '../post.module.scss';

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
        text:string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      if  (session?.activeSubscription) {
        router.push(`/posts/${post.slug}`)
      }
    }, [session])

    return(
        <>
        <Head>
            <title>{post.title} | Ignews</title>
        </Head>

        <main className={styles.content}>
            <article className={styles.post}>
                <h1>{post.title}</h1>
                <time>{post.updatedAt}</time>
                <div className={`${styles.postContent} ${styles.previewContent}`}>
                    { post.content }
                </div>
                <div className={styles.continueReading}>
                    Wanna continue reading?
                    <Link href="/">
                    <a href="">Subscribe now 😁</a>
                    </Link>
                </div>
            </article>
        </main>

        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug }  = params;

    // console.log(JSON.stringify(session, null, 2))

    const prismic = getPrismicClient()
    const response  = await prismic.getByUID('posts', String(slug), {})

    const post = {
        slug,
        title: response.data.title,
        content: response.data.content[0].text.splice(0,3),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    };
    return {
        props: {
            post,
        }
    }
}