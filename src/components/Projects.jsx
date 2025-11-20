import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';
import Button from './Button.jsx';
import './Projects.css'; 

function Projects() {
  
  // 1. Estado para dados e loading
  const [projetos, setProjetos] = useState([]); 
  const [loading, setLoading] = useState(true);

  // 2. Função para buscar dados e construir URLs de imagem (Lógica Supabase)
  useEffect(() => {
    async function fetchProjetos() {
      
      // Busca dados da tabela 'projetos'
      const { data, error } = await supabase
        .from('projetos') 
        .select('*');

      if (error) {
        console.error('Erro ao buscar projetos:', error);
        setLoading(false);
        return;
      }
      
      // Processa os dados para obter a URL pública de cada imagem
      const projetosComUrl = data.map(projeto => {
        if (projeto.imagem) {
            const { data: publicUrlData } = supabase
                .storage
                .from('imagens-portfolio') // Nome do seu bucket
                .getPublicUrl(projeto.imagem);

            return {
                ...projeto,
                imageUrl: publicUrlData.publicUrl // Adiciona a URL completa
            };
        }
        return projeto;
      });

      setProjetos(projetosComUrl);
      setLoading(false);
    }

    fetchProjetos();
  }, []); 

  // 3. Renderiza o estado de Loading
  if (loading) {
    return <h2 className="loading-message">Carregando projetos...</h2>;
  }
  
  // 4. Renderiza o conteúdo (usando as novas classes CSS)
  return (
    <section id="projetos" className="projects-section">
      
      <h2 className="section-title">
        Meus Trabalhos Selecionados
      </h2>

      <div className="projects-grid">
        
        {projetos.map((projeto) => ( 
          
          <div key={projeto.id} className="project-card">
            {/* Container para a imagem (para controle de tamanho e overflow) */}
            <div className="project-image-container">
              {projeto.imageUrl && (
                <img 
                  src={projeto.imageUrl} // URL Pública
                  alt={projeto.titulo} 
                  className="project-image"
                />
              )}
              {/* REMOVIDO: div.project-overlay não é mais necessária */}
            </div>

            <div className="project-details">
              <h3 className="project-title">{projeto.titulo}</h3>
              <p className="project-description">{projeto.descricao}</p>
            
              <Button label="Ver Detalhes" link="#" />
            </div>
          </div>

        ))}

      </div>
    </section>
  );
}

export default Projects;