import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'md' | 'lg';
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], styles[size], className)}
      {...props}
    />
  );
};
