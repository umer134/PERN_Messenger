import * as styles from './auth-layout.css';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.layout}>{children}</div>;
};
