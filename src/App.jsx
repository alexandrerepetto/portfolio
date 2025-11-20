import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx'; // <--- 1. Importar

function App() {
  return (
    <div className="portfolio-container">
      <Header />
      <Hero />
      <Projects /> {/* <--- 2. Adicionar na tela */}

      <main style={{ padding: '20px 50px', maxWidth: '1200px', margin: '0 auto' }}>
         {/* Pode apagar aquele H2 antigo se quiser */}
      </main>
    </div>
  )
}

export default App