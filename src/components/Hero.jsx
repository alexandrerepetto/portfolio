// src/components/Hero.jsx
import Button from './Button.jsx'; // <--- 1. IMPORTAMOS O ÁTOMO

function Hero() {
  return (
    <section style={{ 
      padding: '80px 20px', 
      textAlign: 'center',
      background: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)' 
    }}>
      
      <h1 style={{ fontSize: '3.5rem', margin: '0 0 10px 0' }}>
        Alexandre Repetto
      </h1>

      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '400', 
        color: '#aaa',
        marginBottom: '30px'
      }}>
        UX/UI Designer & Creative Developer
      </h2>

      {/* 2. USAMOS O COMPONENTE PASSANDO AS "PROPS" */}
      <Button 
        label="Ver Meus Projetos" 
        link="#projetos" 
      />

    </section>
  );
}

export default Hero;