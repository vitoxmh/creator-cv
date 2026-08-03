import { useCallback, useEffect, useRef, useState } from 'react'
import CVForm from '../components/CVForm'
import CVPreview from '../components/CVPreview'
import Toolbar from '../components/Toolbar'
import api, { extractError } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { initialData } from '../data/sampleData'

import cvBaseCss from '../styles/cv/cv-base.scss?inline'
import classicCss from '../styles/cv/classic.scss?inline'
import modernCss from '../styles/cv/modern.scss?inline'
import minimalCss from '../styles/cv/minimal.scss?inline'
import elegantCss from '../styles/cv/elegant.scss?inline'
import creativeCss from '../styles/cv/creative.scss?inline'

const ALL_CV_CSS = `${cvBaseCss}\n${classicCss}\n${modernCss}\n${minimalCss}\n${elegantCss}\n${creativeCss}`
const TEMPLATE_CSS = {
  classic: classicCss,
  modern: modernCss,
  minimal: minimalCss,
  elegant: elegantCss,
  creative: creativeCss
}

export default function Workspace() {
  const { user, logout } = useAuth()
  const [data, setData] = useState(initialData)
  const [template, setTemplate] = useState('classic')
  const [accent, setAccent] = useState('#2c5f8a')
  const [cvList, setCvList] = useState([])
  const [currentCvId, setCurrentCvId] = useState(null)
  const [cvTitle, setCvTitle] = useState('Mi CV')
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const previewRef = useRef(null)

  const update = (section, value) => setData((d) => ({ ...d, [section]: value }))

  const refreshList = useCallback(async () => {
    try {
      const { data } = await api.get('/cvs')
      setCvList(data.cvs)
    } catch (err) {
      setStatus(extractError(err))
    }
  }, [])

  useEffect(() => {
    refreshList()
  }, [refreshList])

  const handleSave = async () => {
    setSaving(true)
    setStatus('')
    try {
      const payload = { title: cvTitle, data, template, accentColor: accent }
      if (currentCvId) {
        await api.put(`/cvs/${currentCvId}`, payload)
      } else {
        const { data: res } = await api.post('/cvs', payload)
        setCurrentCvId(res.cv.id)
      }
      setStatus('CV guardado correctamente')
      refreshList()
    } catch (err) {
      setStatus(extractError(err))
    } finally {
      setSaving(false)
    }
  }

  const handleNew = () => {
    setData(initialData)
    setTemplate('classic')
    setAccent('#2c5f8a')
    setCurrentCvId(null)
    setCvTitle('Mi CV')
    setStatus('')
  }

  const handleLoad = async (id) => {
    if (!id) return
    try {
      const { data } = await api.get(`/cvs/${id}`)
      setData(data.cv.data)
      setTemplate(data.cv.template)
      setAccent(data.cv.accentColor)
      setCvTitle(data.cv.title)
      setCurrentCvId(id)
      setStatus('')
    } catch (err) {
      setStatus(extractError(err))
    }
  }

  const handleDelete = async (id) => {
    if (!id) return
    if (!window.confirm('¿Seguro que quieres eliminar este CV?')) return
    try {
      await api.delete(`/cvs/${id}`)
      if (id === currentCvId) handleNew()
      refreshList()
      setStatus('CV eliminado')
    } catch (err) {
      setStatus(extractError(err))
    }
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
    <div className="app">
      <style dangerouslySetInnerHTML={{ __html: ALL_CV_CSS }} />

      <header className="app__header">
        <h1>CV Generator</h1>
        <p>Crea y guarda tus currículums con plantillas profesionales.</p>
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
            onNew={handleNew}
            onSave={handleSave}
            saving={saving}
            status={status}
            cvTitle={cvTitle}
            setCvTitle={setCvTitle}
            cvList={cvList}
            currentCvId={currentCvId}
            onLoad={handleLoad}
            onDelete={handleDelete}
            user={user}
            onLogout={logout}
          />

          <div className="preview-stage">
            <CVPreview ref={previewRef} data={data} template={template} accent={accent} />
          </div>
          <p className="preview-hint">Consejo: para el PDF elige «Guardar como PDF» como destino en el diálogo de impresión.</p>
        </section>
      </main>
    </div>
  )
}
