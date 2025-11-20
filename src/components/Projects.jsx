// src/components/Projects.jsx

import { useState, useEffect } from 'react'; // Importar os hooks do React
import { supabase } from '../supabaseClient.js'; // <--- Importa a conexão
import Button from './Button.jsx'; 

function Projects() {
  
  // 1. Onde os dados virão
  const [projetos, setProjetos] = useState([]); 
  const [loading, setLoading] = useState(true); // Para mostrar algo enquanto carrega

  // 2. A função que busca no Supabase
  useEffect(() => {
    async function fetchProjetos() {
      // Busca TUDO na tabela 'projetos'
      const { data, error } = await supabase
        .from('projetos') 
        .select('*');

      if (error) {
        console.error('Erro ao buscar projetos:', error);
      } else {
        setProjetos(data);
      }
      setLoading(false);
    }

    fetchProjetos();
  }, []); // O array vazio significa: rodar APENAS na primeira vez que o componente é montado.

  // 3. Renderiza a mensagem de loading
  if (loading) {
    return <h2 style={{ textAlign: 'center', padding: '50px' }}>Carregando projetos...</h2>;
  }
  
  // O restante do seu componente continua aqui...
  return (
    <section id="projetos" style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>
        Meus Trabalhos Selecionados
      </h2>

      {/* AQUI COMEÇA O GRID (LAYOUT) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px' 
      }}>
        
        {/* O LOOP agora usa a variável 'projetos' do Supabase! */}
        {projetos.map((projeto) => ( 
          
          <div key={projeto.id} style={{ 
            border: '1px solid #333', 
            borderRadius: '12px', 
            padding: '20px',
            backgroundColor: '#1e1e1e'
          }}>
            <img 
              src={projeto.imagem} 
              alt={projeto.titulo} 
              style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }}
            />
            <h3 style={{ margin: '0 0 10px 0' }}>{projeto.titulo}</h3>
            <p style={{ color: '#aaa', marginBottom: '20px' }}>{projeto.descricao}</p>
            
            <Button label="Ver Detalhes" link="#" />
          </div>

        ))}

      </div>
    </section>
  );
}

export default Projects;