
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import getPrismicClient from '../../services/prismic';
import styles from'./styles.module.scss';

export default function Posts() {
    return(
        <>
        <Head>
            <title>Posts | Ignews</title>    
        </Head>
        <main className={styles.container}>
            <div className={styles.posts}>
                <a href="">
                    <time>12 de outubro de 2022</time>
                    <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Sapiente quidem deleniti nisi aspernatur repudiandae explicabo aliquam enim quae, 
                        ducimus ratione est alias asperiores sit, nostrum similique velit exercitationem voluptatibus natus.
                    </p>
                </a>
                <a href="#">
                    <time>12 de outubro de 2022</time>
                    <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Sapiente quidem deleniti nisi aspernatur repudiandae explicabo aliquam enim quae, 
                        ducimus ratione est alias asperiores sit, nostrum similique velit exercitationem voluptatibus natus.
                    </p>
                </a>
                <a href="">
                    <time>12 de outubro de 2022</time>
                    <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Sapiente quidem deleniti nisi aspernatur repudiandae explicabo aliquam enim quae, 
                        ducimus ratione est alias asperiores sit, nostrum similique velit exercitationem voluptatibus natus.
                    </p>
                </a>
            </div>
        </main>
        
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'publication')
    ], {
        fetch: ['publication.title', 'publication.content'],
        pageSize: 10,
    })

    console.log(JSON.stringify(response, null, 2))

    return {
        props: { response }
    }
}