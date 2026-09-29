import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Text } from "@fluentui/react-components";
import { APP_NAME } from "@/global/constants/app";
import { APP_ROUTES } from "@/global/constants/routes";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: "1px solid #e1dfdd",
  },
  link: {
    color: "#242424",
    textDecoration: "none",
  },
});

export const Navbar: React.FC = () => {
  const styles = useStyles();
  return (
    <header className={styles.root}>
      <Text weight="semibold" size={500}>
        {APP_NAME}
      </Text>
      <Link className={styles.link} to={APP_ROUTES.home}>
        Home
      </Link>
      <Link className={styles.link} to={APP_ROUTES.documentEditor}>
        Document Editor
      </Link>
    </header>
  );
};
