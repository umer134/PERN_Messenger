import * as styles from './input.css';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = (props: Props) => {
  return <input className={styles.input} {...props} />
}