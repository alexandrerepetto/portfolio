import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';
import Button from './Button.jsx'; 

function Projects() {
  
  const [projetos, setProjetos] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjetos() {
      
      const { data, error } = await supabase
        .from('projetos') 
        .select('*');

      if (error) {
        console.error('Erro ao buscar projetos:', error);
        setLoading(false); // Parar o loading mesmo com erro
        return;
      }
      
      // --- INÍCIO DA MODIFICAÇÃO PARA IMAGENS ---
      // 1. Processa os dados para obter a URL pública de cada imagem
      const projetosComUrl = data.map(projeto => {
        // Verifica se o campo 'imagem' (o path) existe no projeto
        if (projeto.imagem) {
            // Usa a função do Supabase para obter a URL pública
            // 'imagens-portfolio' é o nome do seu bucket
            const { data: publicUrlData } = supabase
                .storage
                .from('imagens-portfolio') 
                .getPublicUrl(projeto.imagem); // 'projeto.imagem' é o path (ex: Projetos/bpx.png)

            return {
                ...projeto,
                imageUrl: publicUrlData.publicUrl // Adiciona a URL completa como 'imageUrl'
            };
        }
        return projeto;
      });

      setProjetos(projetosComUrl);
      // --- FIM DA MODIFICAÇÃO PARA IMAGENS ---

      setLoading(false);
    }

    fetchProjetos();
  }, []); 

  if (loading) {
    return <h2 style={{ textAlign: 'center', padding: '50px' }}>Carregando projetos...</h2>;
  }
  
  return (
    <section id="projetos" style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>
        Meus Trabalhos Selecionados
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px' 
      }}>
        
        {projetos.map((projeto) => ( 
          
          <div key={projeto.id} style={{ 
            border: '1px solid #333', 
            borderRadius: '12px', 
            padding: '20px',
            backgroundColor: '#1e1e1e'
          }}>
            {/* INÍCIO DA MODIFICAÇÃO NA IMAGEM */}
            {projeto.imageUrl && (
              <img 
                src={projeto.imageUrl} // AGORA USA A URL PÚBLICA CONSTRUÍDA
                alt={projeto.titulo} 
                style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }}
              />
            )}
            {/* FIM DA MODIFICAÇÃO NA IMAGEM */}
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