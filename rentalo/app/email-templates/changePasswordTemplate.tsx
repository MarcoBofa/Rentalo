import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  resetLink: string;
}

export const changePasswordTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  resetLink,
}) => (
  <div style={styles.container}>
    <h1 style={styles.header}>Richiesta modifica password</h1>
    <p style={styles.text}>Ciao {firstName},</p>
    <p style={styles.text}>
      Abbiamo ricevuto una richiesta per modificare la tua password. Se non hai
      effettuato tu questa richiesta, ignora semplicemente questa email.
      Altrimenti, puoi modificare la tua password utilizzando questo link:
    </p>
    <a href={resetLink} style={styles.resetLink}>
      Modifica Password
    </a>
    <p style={styles.text}>
      Se non riesci a visuallizzare il form per la modifica della password
      significa che il link è scaduto. In tal caso, puoi richiedere un nuovo
      link di modifica password.
    </p>
  </div>
);

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  header: {
    color: "#333",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  text: {
    color: "#555",
    lineHeight: "1.5",
    fontSize: "16px",
    marginBottom: "15px",
  },
  resetLink: {
    display: "inline-block",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    textDecoration: "none",
    marginBottom: "15px",
  },
  footerText: {
    fontSize: "14px",
    color: "#666",
    marginTop: "20px",
  },
};
