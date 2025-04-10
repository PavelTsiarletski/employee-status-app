import { PropsWithChildren } from 'react';
import { Header } from '@components/Header/Header';
import styles from './Layout.module.css';
import { Wrapper } from '@components/Wrapper/Wrapper';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Wrapper>{children}</Wrapper>
      </main>
    </div>
  );
};
