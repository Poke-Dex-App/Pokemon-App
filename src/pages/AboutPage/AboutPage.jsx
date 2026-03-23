import "./AboutPage.css"

function About() {
  return (
    <div className="about">
      <h1>POKEMON APP</h1>

      <p>
        Pokémon App es una aplicación web desarrollada en equipo por dos
        desarrolladores como proyecto para practicar y demostrar habilidades en
        desarrollo frontend moderno utilizando React.
      </p>

      <h2>👨‍💻 El equipo</h2>

      <p>
        Este proyecto ha sido desarrollado de forma colaborativa, dividiendo
        responsabilidades y trabajando en conjunto en el diseño, lógica y
        experiencia de usuario.
      </p>

      <ul>
        <li>👤 Armando Granados — Frontend Developer</li>
        <li>👤 Bryan Paucarima Franco — Frontend Developer</li>
      </ul>

      <h2>🚀 Funcionalidades principales</h2>

      <ul>
        <li>📱 Homepage con listado de Pokémon y diseño responsive</li>
        <li>🔍 Buscador en tiempo real</li>
        <li>🧾 Página de detalles con información completa</li>
        <li>➕ Crear Pokémon personalizados (Firebase)</li>
        <li>✏️ Editar y 🗑️ eliminar Pokémon añadidos</li>
      </ul>

      <h2>⚙️ Tecnologías utilizadas</h2>

      <ul>
        <li>React</li>
        <li>React Router</li>
        <li>Firebase</li>
        <li>CSS / Responsive Design</li>
        <li>PokéAPI</li>
      </ul>

      <h2>✨ Características extra</h2>

      <ul>
        <li>Filtros avanzados</li>
        <li>Modo oscuro / claro</li>
        <li>Favoritos con autenticación</li>
        <li>Skeleton loaders</li>
      </ul>

      <h2>🎯 Objetivo del proyecto</h2>

      <p>
        El objetivo de este proyecto es reforzar el trabajo en equipo, la
        organización del código y la construcción de aplicaciones completas
        utilizando tecnologías modernas del ecosistema frontend.
      </p>
    </div>
  );
}

export default About