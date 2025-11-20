// src/components/Button.jsx

// Aqui estamos dizendo: "Esse componente aceita um Texto (label) e um Link"
function Button({ label, link }) {
  
  // Estilos do botão (parecido com o painel de design do Figma)
  const buttonStyle = {
    padding: '12px 30px',
    fontSize: '1rem',
    textDecoration: 'none', // Tira o sublinhado do link
    backgroundColor: '#646cff',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 'bold',
    display: 'inline-block',
    transition: 'transform 0.2s', // Uma micro interação de CSS
    cursor: 'pointer'
  };

  return (
    <a href={link} style={buttonStyle}>
      {label}
    </a>
  );
}

export default Button;