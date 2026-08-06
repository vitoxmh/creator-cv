const TEMPLATES = [
  { id: 'classic', label: 'Clásico' },
  { id: 'modern', label: 'Moderno' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'elegant', label: 'Ejecutivo' },
  { id: 'creative', label: 'Creativo' },
  { id: 'ats', label: 'ATS' }
]

const ACCENTS = ['#2c5f8a', '#7c3aed', '#0f766e', '#be185d', '#b45309', '#1f2937']

export default function Toolbar({
  template,
  setTemplate,
  accent,
  setAccent,
  onPDF,
  onHTML,
  onTXT,
  onNew,
  onSave,
  saving,
  status,
  cvTitle,
  setCvTitle,
  cvList,
  currentCvId,
  onLoad,
  onDelete,
  user,
  onLogout
}) {
  return (
    <div className="template-toolbar panel">
      <div className="template-toolbar__row">
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
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="swatch-input"
            title="Color personalizado"
          />
        </div>

        <div className="template-toolbar__actions">
          <button type="button" className="btn btn--ghost" onClick={onHTML}>
            Descargar HTML
          </button>
          <button type="button" className="btn btn--ghost" onClick={onTXT}>
            Descargar TXT
          </button>
          <button type="button" className="btn btn--primary" onClick={onPDF}>
            Descargar PDF
          </button>
          <span className="template-toolbar__user">{user?.name || ''}</span>
          <button type="button" className="btn btn--ghost" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="template-toolbar__row template-toolbar__row--save">
        <input
          className="toolbar-input"
          value={cvTitle}
          onChange={(e) => setCvTitle(e.target.value)}
          placeholder="Título del CV"
        />
        <button type="button" className="btn btn--primary" onClick={onSave} disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar'}
        </button>
        <select
          className="toolbar-select"
          value={currentCvId || ''}
          onChange={(e) => onLoad(e.target.value)}
          title="Cargar un CV guardado"
        >
          <option value="">Cargar CV…</option>
          {cvList.map((cv) => (
            <option key={cv.id} value={cv.id}>
              {cv.title}
            </option>
          ))}
        </select>
        <button type="button" className="btn btn--ghost" onClick={onNew}>
          Nuevo
        </button>
        <button type="button" className="btn btn--danger" onClick={() => onDelete(currentCvId)} disabled={!currentCvId}>
          Eliminar
        </button>
        {status && <span className="template-toolbar__status">{status}</span>}
      </div>
    </div>
  )
}
