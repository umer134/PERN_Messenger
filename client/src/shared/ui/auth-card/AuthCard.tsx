import * as styles from './card.css';

type props = {
  children: React.ReactNode;
};

export const AuthCard: React.FC<props> = ({ children }: props) => {
  return <div className={styles.card}>{children}</div>
};
