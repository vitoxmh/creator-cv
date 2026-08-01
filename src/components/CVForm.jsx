import { useRef } from 'react'

const EMPTY_EXPERIENCE = { role: '', company: '', start: '', end: '', bullets: '' }
const EMPTY_EDUCATION = { degree: '', institution: '', start: '', end: '', description: '' }
const EMPTY_LANGUAGE = { name: '', level: 'Intermedio' }
const EMPTY_PROJECT = { name: '', description: '', link: '' }

function Section({ title, action, children }) {
  return (
    <div className="form-section">
      <div className="form-section__head">
        <h3>{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )
}

function Field({ label, className = '', children }) {
  return (
    <div className={`field ${className}`}>
      <span className="field__label">{label}</span>
      {children}
    </div>
  )
}

export default function CVForm({ data, update }) {
  const fileRef = useRef(null)
  const { personal } = data

  const setPersonal = (key, value) => update('personal', { ...data.personal, [key]: value })
  const setItem = (section, index, field, value) =>
    update(section, data[section].map((it, i) => (i === index ? { ...it, [field]: value } : it)))
  const addItem = (section, empty) => update(section, [...data[section], empty])
  const removeItem = (section, index) => update(section, data[section].filter((_, i) => i !== index))

  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPersonal('photo', reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="form panel">
      <Section title="Datos personales">
        <Field label="Nombre completo">
          <input value={personal.fullName} onChange={(e) => setPersonal('fullName', e.target.value)} placeholder="Ana García López" />
        </Field>
        <Field label="Título profesional">
          <input value={personal.jobTitle} onChange={(e) => setPersonal('jobTitle', e.target.value)} placeholder="Desarrolladora Frontend" />
        </Field>
        <div className="field-grid">
          <Field label="Email">
            <input type="email" value={personal.email} onChange={(e) => setPersonal('email', e.target.value)} placeholder="correo@ejemplo.com" />
          </Field>
          <Field label="Teléfono">
            <input value={personal.phone} onChange={(e) => setPersonal('phone', e.target.value)} placeholder="+34 600 000 000" />
          </Field>
          <Field label="Ubicación">
            <input value={personal.address} onChange={(e) => setPersonal('address', e.target.value)} placeholder="Madrid, España" />
          </Field>
          <Field label="Sitio web">
            <input value={personal.website} onChange={(e) => setPersonal('website', e.target.value)} placeholder="www.tusitio.com" />
          </Field>
        </div>
        <Field label="LinkedIn / GitHub">
          <input value={personal.linkedin} onChange={(e) => setPersonal('linkedin', e.target.value)} placeholder="linkedin.com/in/usuario" />
        </Field>
        <Field label="Foto de perfil">
          <div className="photo-upload">
            {personal.photo ? (
              <img src={personal.photo} alt="Foto de perfil" />
            ) : (
              <span className="photo-upload__placeholder">Sin foto</span>
            )}
            <button type="button" className="btn btn--ghost" onClick={() => fileRef.current?.click()}>
              Subir foto
            </button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handlePhoto} />
            {personal.photo && (
              <button type="button" className="btn btn--ghost" onClick={() => setPersonal('photo', null)}>
                Quitar
              </button>
            )}
          </div>
        </Field>
        <Field label="Resumen profesional">
          <textarea
            rows={4}
            value={personal.summary}
            onChange={(e) => setPersonal('summary', e.target.value)}
            placeholder="Describe brevemente tu perfil, experiencia y fortalezas."
          />
        </Field>
      </Section>

      <Section
        title="Experiencia laboral"
        action={
          <button type="button" className="btn btn--ghost" onClick={() => addItem('experience', EMPTY_EXPERIENCE)}>
            + Añadir
          </button>
        }
      >
        {data.experience.map((exp, i) => (
          <div className="item-card" key={i}>
            <div className="item-card__head">
              <strong>Experiencia {i + 1}</strong>
              <button type="button" className="btn btn--danger" onClick={() => removeItem('experience', i)}>
                Eliminar
              </button>
            </div>
            <div className="field-grid">
              <Field label="Puesto">
                <input value={exp.role} onChange={(e) => setItem('experience', i, 'role', e.target.value)} placeholder="Desarrolladora Frontend" />
              </Field>
              <Field label="Empresa">
                <input value={exp.company} onChange={(e) => setItem('experience', i, 'company', e.target.value)} placeholder="Empresa S.L." />
              </Field>
              <Field label="Desde">
                <input value={exp.start} onChange={(e) => setItem('experience', i, 'start', e.target.value)} placeholder="Ene 2021" />
              </Field>
              <Field label="Hasta">
                <input value={exp.end} onChange={(e) => setItem('experience', i, 'end', e.target.value)} placeholder="Actualidad" />
              </Field>
            </div>
            <Field label="Logros (uno por línea)">
              <textarea rows={3} value={exp.bullets} onChange={(e) => setItem('experience', i, 'bullets', e.target.value)} />
            </Field>
          </div>
        ))}
      </Section>

      <Section
        title="Educación"
        action={
          <button type="button" className="btn btn--ghost" onClick={() => addItem('education', EMPTY_EDUCATION)}>
            + Añadir
          </button>
        }
      >
        {data.education.map((ed, i) => (
          <div className="item-card" key={i}>
            <div className="item-card__head">
              <strong>Formación {i + 1}</strong>
              <button type="button" className="btn btn--danger" onClick={() => removeItem('education', i)}>
                Eliminar
              </button>
            </div>
            <Field label="Titulación">
              <input value={ed.degree} onChange={(e) => setItem('education', i, 'degree', e.target.value)} placeholder="Grado en..." />
            </Field>
            <Field label="Centro">
              <input value={ed.institution} onChange={(e) => setItem('education', i, 'institution', e.target.value)} placeholder="Universidad..." />
            </Field>
            <div className="field-grid">
              <Field label="Año inicio">
                <input value={ed.start} onChange={(e) => setItem('education', i, 'start', e.target.value)} placeholder="2016" />
              </Field>
              <Field label="Año fin">
                <input value={ed.end} onChange={(e) => setItem('education', i, 'end', e.target.value)} placeholder="2018" />
              </Field>
            </div>
            <Field label="Descripción">
              <textarea rows={2} value={ed.description} onChange={(e) => setItem('education', i, 'description', e.target.value)} />
            </Field>
          </div>
        ))}
      </Section>

      <Section title="Habilidades">
        <Field label="Habilidades (separadas por coma)">
          <textarea
            rows={3}
            value={data.skills.join(', ')}
            onChange={(e) => update('skills', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
            placeholder="React, TypeScript, Figma, ..."
          />
        </Field>
      </Section>

      <Section
        title="Idiomas"
        action={
          <button type="button" className="btn btn--ghost" onClick={() => addItem('languages', EMPTY_LANGUAGE)}>
            + Añadir
          </button>
        }
      >
        {data.languages.map((lang, i) => (
          <div className="item-card item-card--compact" key={i}>
            <div className="item-card__head">
              <strong>Idioma {i + 1}</strong>
              <button type="button" className="btn btn--danger" onClick={() => removeItem('languages', i)}>
                Eliminar
              </button>
            </div>
            <div className="field-grid">
              <Field label="Idioma">
                <input value={lang.name} onChange={(e) => setItem('languages', i, 'name', e.target.value)} placeholder="Inglés" />
              </Field>
              <Field label="Nivel">
                <select value={lang.level} onChange={(e) => setItem('languages', i, 'level', e.target.value)}>
                  <option value="Básico">Básico</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                  <option value="Nativo">Nativo</option>
                </select>
              </Field>
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Proyectos"
        action={
          <button type="button" className="btn btn--ghost" onClick={() => addItem('projects', EMPTY_PROJECT)}>
            + Añadir
          </button>
        }
      >
        {data.projects.map((proj, i) => (
          <div className="item-card" key={i}>
            <div className="item-card__head">
              <strong>Proyecto {i + 1}</strong>
              <button type="button" className="btn btn--danger" onClick={() => removeItem('projects', i)}>
                Eliminar
              </button>
            </div>
            <Field label="Nombre">
              <input value={proj.name} onChange={(e) => setItem('projects', i, 'name', e.target.value)} placeholder="Nombre del proyecto" />
            </Field>
            <Field label="Descripción">
              <textarea rows={2} value={proj.description} onChange={(e) => setItem('projects', i, 'description', e.target.value)} />
            </Field>
            <Field label="Enlace">
              <input value={proj.link} onChange={(e) => setItem('projects', i, 'link', e.target.value)} placeholder="github.com/usuario/proyecto" />
            </Field>
          </div>
        ))}
      </Section>
    </div>
  )
}
