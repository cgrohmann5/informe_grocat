export default function ResumenGrocat() {
  return (
    <main className="pagina">
      <header className="hero-section">
        <div>
          <p className="eyebrow">Informe Grocat</p>
          <h1>Bienvenido a tu página</h1>
          <p className="hero-copy">
            Este es el resumen del informe Grocat, presentado como una página moderna en JavaScript.
          </p>
        </div>
      </header>

      <nav className="page-nav" aria-label="Navegación del informe">
        <a href="#resumen">Resumen</a>
        <a href="#marco">Marco</a>
        <a href="#delitos">Delitos</a>
        <a href="#comparacion">Comparación</a>
        <a href="#responsabilidades">Responsabilidades</a>
        <a href="#datos">Datos</a>
        <a href="#conclusiones">Conclusiones</a>
      </nav>

      <section id="resumen" className="card section">
        <h2>Resumen ejecutivo</h2>
        <p>
          El informe Grocat presenta el análisis principal, destacando las conclusiones y las acciones recomendadas.
        </p>
      </section>

      <section id="marco" className="card section">
        <h2>Marco teórico y legal</h2>
        <p>
          Se explica el contexto jurídico y el marco teórico que sirve de base para el análisis.
        </p>
      </section>

      <section id="delitos" className="card section">
        <h2>Delitos</h2>
        <p>
          Aquí se describe el tipo de delitos implicados y los elementos clave de la investigación.
        </p>
      </section>

      <section id="comparacion" className="card section">
        <h2>Comparación</h2>
        <p>
          Se comparan casos de referencia y se muestran las diferencias más importantes.
        </p>
      </section>

      <section id="responsabilidades" className="card section">
        <h2>Responsabilidades</h2>
        <p>
          Se detallan las obligaciones de las partes y la atribución de responsabilidades.
        </p>
      </section>

      <section id="datos" className="card section">
        <h2>Datos clave</h2>
        <p>
          Se muestran los datos más relevantes que sustentan el informe.
        </p>
      </section>

      <section id="conclusiones" className="card section">
        <h2>Conclusiones</h2>
        <p>
          Se cierra el informe con las ideas principales y las recomendaciones finales.
        </p>
      </section>

      <footer className="page-footer">
        <p>Diseñado y generado en JavaScript para tu proyecto Grocat.</p>
      </footer>
    </main>
  )
}
