import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; // Importe sua config do Firebase
import { Link } from 'react-router-dom'; // Se tiver páginas de detalhes

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const projectsCollectionRef = collection(db, 'projects');
        // Ordenar por data de criação, por exemplo (mais recente primeiro)
        const q = query(projectsCollectionRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
      } catch (err) {
        console.error("Erro ao buscar projetos:", err);
        setError("Não foi possível carregar os projetos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // Executa apenas uma vez na montagem do componente

  if (loading) return <div className="text-center p-10">Carregando projetos...</div>;
  if (error) return <div className="text-center p-10 text-danger">{error}</div>; // Use a cor 'danger' da sua paleta

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-dark">Projetos Atuais</h1> {/* Cor 'dark' */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p>Nenhum projeto encontrado.</p>
        ) : (
          projects.map(project => (
            <div key={project.id} className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow">
              {/* Exemplo de imagem da galeria (a primeira) */}
              {project.imageGallery && project.imageGallery.length > 0 && (
                <img
                    src={project.imageGallery[0]}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    loading="lazy" // Otimização de carregamento
                 />
              )}
              <h2 className="text-xl font-semibold mb-2 text-primary">{project.title}</h2> {/* Cor 'primary' */}
              <p className="text-gray-700 mb-3">{project.description.substring(0, 100)}...</p> {/* Limitar descrição */}
              {/* Adicionar indicador de progresso se aplicável */}
              {project.progress !== undefined && (
                 <div className="w-full bg-secondary rounded-full h-2.5 mb-4"> {/* Cor 'secondary' */}
                    <div
                        className="bg-accent h-2.5 rounded-full" // Cor 'accent'
                        style={{ width: `${project.progress}%` }}>
                    </div>
                 </div>
              )}
               {/* Link para detalhes (se houver) */}
               {/* <Link to={`/projetos/${project.id}`} className="text-accent hover:underline">Ver detalhes</Link> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Projects;