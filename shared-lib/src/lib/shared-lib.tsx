import styles from './shared-lib.module.css';

/* eslint-disable-next-line */
export interface SharedLibProps {}

export function SharedLib(props: SharedLibProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SharedLib!</h1>
    </div>
  );
}

export default SharedLib;
