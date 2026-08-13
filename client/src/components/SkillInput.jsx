import { useState } from 'react'

const EMPTY_GROUP = { category: '', items: [] }

export default function SkillInput({ value = [], onChange }) {
  const [drafts, setDrafts] = useState({})

  const setGroup = (index, patch) => {
    onChange(value.map((g, i) => (i === index ? { ...g, ...patch } : g)))
  }

  const addSkills = (index, raw) => {
    const skills = raw.split(',').map((s) => s.trim()).filter(Boolean)
    if (skills.length === 0) return
    const seen = new Set(value[index].items)
    skills.forEach((s) => seen.add(s))
    setGroup(index, { items: [...seen] })
    setDrafts((d) => ({ ...d, [index]: '' }))
  }

  const removeSkill = (index, skill) => {
    setGroup(index, { items: value[index].items.filter((s) => s !== skill) })
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addSkills(index, drafts[index] || '')
    } else if (e.key === 'Backspace' && (drafts[index] || '') === '' && value[index].items.length > 0) {
      removeSkill(index, value[index].items[value[index].items.length - 1])
    }
  }

  const addGroup = () => onChange([...value, { ...EMPTY_GROUP }])
  const removeGroup = (index) => onChange(value.filter((_, i) => i !== index))

  return (
    <div>
      {value.map((group, i) => (
        <div className="skill-group" key={i}>
          <div className="skill-group__head">
            <input
              className="skill-group__name"
              value={group.category}
              onChange={(e) => setGroup(i, { category: e.target.value })}
              placeholder="Categoría (ej. Front-End)"
            />
            <button type="button" className="skill-group__remove" onClick={() => removeGroup(i)} aria-label={`Eliminar categoría ${group.category || i + 1}`}>
              ×
            </button>
          </div>
          <div className="skill-input">
            <div className="skill-input__chips">
              {group.items.map((skill) => (
                <span className="skill-chip" key={skill}>
                  {skill}
                  <button
                    type="button"
                    className="skill-chip__remove"
                    onClick={() => removeSkill(i, skill)}
                    aria-label={`Quitar ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                className="skill-input__field"
                value={drafts[i] || ''}
                onChange={(e) => setDrafts((d) => ({ ...d, [i]: e.target.value }))}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onBlur={() => (drafts[i] || '').trim() && addSkills(i, drafts[i])}
                placeholder={group.items.length === 0 ? 'Escribe una habilidad y pulsa Enter…' : ''}
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn--ghost" onClick={addGroup}>
        + Añadir categoría
      </button>
      <p className="skill-input__hint">
        Escribe lo que quieras y pulsa Enter (o coma) para añadirlo a cada categoría. Puedes añadir todas las que necesites.
      </p>
    </div>
  )
}
