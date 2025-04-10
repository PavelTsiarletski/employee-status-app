import { Button } from '@components/Button/Button';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h2 className={styles.title}>Employees</h2>
      </div>

      <div className={styles.right}>
        <Button variant="outline">Log Out</Button>
      </div>
    </header>
  );
};
