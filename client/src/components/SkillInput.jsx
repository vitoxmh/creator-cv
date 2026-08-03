import { useState } from 'react'

export default function SkillInput({ value = [], onChange, placeholder = 'Escribe una habilidad y pulsa Enter…' }) {
  const [draft, setDraft] = useState('')

  const addSkills = (raw) => {
    const skills = raw.split(',').map((s) => s.trim()).filter(Boolean)
    if (skills.length === 0) return
    const seen = new Set(value)
    skills.forEach((s) => seen.add(s))
    onChange([...seen])
    setDraft('')
  }

  const removeSkill = (skill) => {
    onChange(value.filter((s) => s !== skill))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addSkills(draft)
    } else if (e.key === 'Backspace' && draft === '' && value.length > 0) {
      removeSkill(value[value.length - 1])
    }
  }

  return (
    <div>
      <div className="skill-input">
        <div className="skill-input__chips">
          {value.map((skill) => (
            <span className="skill-chip" key={skill}>
              {skill}
              <button
                type="button"
                className="skill-chip__remove"
                onClick={() => removeSkill(skill)}
                aria-label={`Quitar ${skill}`}
              >
                ×
              </button>
            </span>
          ))}
          <input
            className="skill-input__field"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => draft.trim() && addSkills(draft)}
            placeholder={value.length === 0 ? placeholder : ''}
          />
        </div>
      </div>
      <p className="skill-input__hint">Escribe lo que quieras y pulsa Enter (o coma) para añadirlo. Puedes añadir todas las que necesites.</p>
    </div>
  )
}
