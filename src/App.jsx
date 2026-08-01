import { useRef, useState } from 'react'
import CVForm from './components/CVForm'
import CVPreview from './components/CVPreview'
import Toolbar from './components/Toolbar'
import { initialData } from './data/sampleData'

import cvBaseCss from './styles/cv/cv-base.scss?inline'
import classicCss from './styles/cv/classic.scss?inline'
import modernCss from './styles/cv/modern.scss?inline'
import minimalCss from './styles/cv/minimal.scss?inline'

const ALL_CV_CSS = `${cvBaseCss}\n${classicCss}\n${modernCss}\n${minimalCss}`
const TEMPLATE_CSS = { classic: classicCss, modern: modernCss, minimal: minimalCss }

function App() {
  const [data, setData] = useState(initialData)
  const [template, setTemplate] = useState('classic')
  const [accent, setAccent] = useState('#2c5f8a')
  const previewRef = useRef(null)

  const update = (section, value) => setData((d) => ({ ...d, [section]: value }))
  const reset = () => {
    setData(initialData)
    setTemplate('classic')
    setAccent('#2c5f8a')
  }

  const handleDownloadPDF = () => window.print()

  const handleDownloadHTML = () => {
    const node = previewRef.current
    if (!node) return
    const css = `${cvBaseCss}\n${TEMPLATE_CSS[template] || classicCss}`
    const doc = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${data.personal.fullName || 'Curriculum Vitae'}</title>
  <style>body{margin:0;background:#e5e7eb;padding:24px;}${css}</style>
</head>
<body>
  ${node.innerHTML}
</body>
</html>`
    const blob = new Blob([doc], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(data.personal.fullName || 'curriculum_vitae').replace(/\s+/g, '_')}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ALL_CV_CSS }} />
      <div className="app">
        <header className="app__header">
          <h1>CV Generator</h1>
          <p>Crea tu currículum con plantillas profesionales y descárgalo en PDF o HTML.</p>
        </header>

        <main className="app__main">
          <aside className="app__editor">
            <CVForm data={data} update={update} />
          </aside>

          <section className="app__preview">
            <Toolbar
              template={template}
              setTemplate={setTemplate}
              accent={accent}
              setAccent={setAccent}
              onPDF={handleDownloadPDF}
              onHTML={handleDownloadHTML}
              onReset={reset}
            />
            <div className="preview-stage">
              <CVPreview ref={previewRef} data={data} template={template} accent={accent} />
            </div>
            <p className="preview-hint">Consejo: para el PDF elige «Guardar como PDF» como destino en el diálogo de impresión.</p>
          </section>
        </main>
      </div>
    </>
  )
}

export default App
