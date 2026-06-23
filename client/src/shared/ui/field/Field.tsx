import * as styles from './field.css';

type Props = {
  label?: string;
  error?: string;
  children: React.ReactNode;
};

export const Field = ({ label, error, children }: Props) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
