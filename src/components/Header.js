import React from "react";

function Header() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>HYEONI × SIYOUNG</h2>
    </div>
  );
}

const styles = {
  container: {
    padding: "14px",
    borderBottom: "1px solid #ddd",
    textAlign: "center"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600"
  }
};

export default Header;
