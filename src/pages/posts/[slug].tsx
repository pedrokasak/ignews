import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import styles from './post.module.scss';

interface PostsProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
        text:string;
    }
}

export default function Post({ post }: PostsProps) {
    return(
        <>
        <Head>
            <title>{post.title} | Ignews</title>
        </Head>

        <main className={styles.content}>
            <article className={styles.post}>
                <h1>{post.title}</h1>
                <time>{post.updatedAt}</time>
                <div className={styles.postContent}>
                    { post.content }
                </div>
            </article>
        </main>

        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session  = await getSession({ req })
    const { slug }  = params;

    // if (!session) {

    // }

    const prismic = getPrismicClient(req)
    const response  = await prismic.getByUID('posts', String(slug), {})

    const post = {
        slug,
        title: response.data.title,
        content: response.data.content[0].text,
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