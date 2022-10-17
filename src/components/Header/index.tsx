import styles from './styles.module.scss';
import Image from 'next/image';
import { SingInButton } from '../SignInButton';
import { useRouter } from 'next/router';
import { ActiveLink } from '../ActiveLink';


export function Header () {
    const { asPath } = useRouter()

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image 
                src="/images/logo.svg" 
                alt="ig.news" 
                width="110" 
                height="31" />
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href='/posts'>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SingInButton />
            </div>
        </header>
    );
}