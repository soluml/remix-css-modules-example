import styles, { href } from "~/.css/component/header.module";

export function links() {
  return [{ rel: "stylesheet", href }];
}

export default function Header() {
  return <header className={styles.header}>This is a blue header!</header>;
}
