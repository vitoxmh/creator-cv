const TEMPLATES = [
  { id: 'classic', label: 'Clásico' },
  { id: 'modern', label: 'Moderno' },
  { id: 'minimal', label: 'Minimal' }
]

const ACCENTS = ['#2c5f8a', '#7c3aed', '#0f766e', '#be185d', '#b45309', '#1f2937']

export default function Toolbar({ template, setTemplate, accent, setAccent, onPDF, onHTML, onReset }) {
  return (
    <div className="template-toolbar panel">
      <div className="template-toolbar__group">
        <span className="template-toolbar__label">Plantilla</span>
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`template-btn ${template === t.id ? 'template-btn--active' : ''}`}
            onClick={() => setTemplate(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="template-toolbar__group">
        <span className="template-toolbar__label">Color</span>
        {ACCENTS.map((c) => (
          <button
            key={c}
            type="button"
            className={`swatch ${accent === c ? 'swatch--active' : ''}`}
            style={{ background: c }}
            onClick={() => setAccent(c)}
            aria-label={`Color ${c}`}
          />
        ))}
        <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="swatch-input" title="Color personalizado" />
      </div>

      <div className="template-toolbar__actions">
        <button type="button" className="btn btn--ghost" onClick={onReset}>
          Restablecer
        </button>
        <button type="button" className="btn btn--primary" onClick={onHTML}>
          Descargar HTML
        </button>
        <button type="button" className="btn btn--primary" onClick={onPDF}>
          Descargar PDF
        </button>
      </div>
    </div>
  )
}
