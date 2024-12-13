import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sobre Nós</h1>
      <p style={styles.description}>
        O nosso objegivo com este site é fazer um projeto para a disciplina de Projeto Integrado 3, a pedido do porofessor António Godinho.
      </p>
      <p style={styles.description}>
        O nosso grupo é composto por dois estudantes (Rafael Travanca, Rafael Ambrósio), estudamos na Escola Superior de Gestão e Tecnologias de Santarém (Politécnico de Santarém) e que trabalham todos os dias para fazer deste projeto um bom projeto.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '40px auto',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '20px',
  }
}

export default About;
