const docs = import.meta.glob('../docs_grocat/*.md', { as: 'raw', eager: true })

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/)
  const output = []
  let inList = false

  const flushList = () => {
    if (inList) {
      output.push('</ul>')
      inList = false
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      flushList()
      continue
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
    if (headingMatch) {
      flushList()
      const level = headingMatch[1].length
      const text = headingMatch[2]
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      output.push(`<h${level}>${text}</h${level}>`)
      continue
    }

    const listMatch = line.match(/^[-*+]\s+(.*)$/)
    if (listMatch) {
      if (!inList) {
        output.push('<ul>')
        inList = true
      }
      const item = listMatch[1]
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      output.push(`<li>${item}</li>`)
      continue
    }

    flushList()
    const paragraph = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    output.push(`<p>${paragraph}</p>`)
  }

  flushList()
  return output.join('\n')
}

function getTitleFromMarkdown(content, filename) {
  const firstHeading = content.split(/\r?\n/).find(line => /^#+\s+/.test(line))
  if (firstHeading) {
    return firstHeading.replace(/^#+\s+/, '')
  }
  return filename
}

const sortedDocs = Object.entries(docs)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, content]) => {
    const filename = path.replace(/^.*\\|^.*\//, '')
    return {
      id: filename.replace(/\.[^.]+$/, ''),
      title: getTitleFromMarkdown(content, filename),
      html: markdownToHtml(content),
    }
  })

function InformeGrocat() {
  return (
    <main className="pagina">
      <header className="hero-section">
        <div>
          <p className="eyebrow">Informe Grocat</p>
          <h1>Contenido desde docs_grocat</h1>
          <p className="hero-copy">
            Esta página presenta directamente los documentos de la carpeta <strong>docs_grocat</strong>.
          </p>
        </div>
      </header>

      <nav className="page-nav" aria-label="Navegación del informe">
        {sortedDocs.length > 0 ? (
          sortedDocs.map(doc => (
            <a key={doc.id} href={`#${doc.id}`}>
              {doc.title}
            </a>
          ))
        ) : (
          <span>No se encontraron documentos en docs_grocat.</span>
        )}
      </nav>

      {sortedDocs.length > 0 ? (
        sortedDocs.map(doc => (
          <section key={doc.id} id={doc.id} className="card section">
            <div dangerouslySetInnerHTML={{ __html: doc.html }} />
          </section>
        ))
      ) : (
        <section className="card section">
          <h2>Diagnóstico</h2>
          <p>Revisa que la carpeta <code>docs_grocat</code> exista y contenga archivos <code>.md</code>.</p>
        </section>
      )}

      <footer className="page-footer">
        <p>Los textos se cargan desde los archivos Markdown en <code>docs_grocat</code>.</p>
      </footer>
    </main>
  )
}

export default InformeGrocat;
