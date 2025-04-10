import { PropsWithChildren } from 'react';
import styles from './Wrapper.module.css';

export const Wrapper = ({ children }: PropsWithChildren) => {
  return <div className={styles.wrapper}>{children}</div>;
};
