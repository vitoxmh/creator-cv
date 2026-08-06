export function splitTextLines(text) {
  return text ? text.split('\n').map((l) => l.trim()).filter(Boolean) : []
}

function dateRangeText(start, end) {
  if (!start && !end) return ''
  if (start && end) return `${start} a ${end}`
  return start || end
}

export function cvToPlainText(data) {
  const { personal, experience, education, skills, languages, courses, projects } = data
  const lines = []
  const contact = [personal.phone, personal.email, personal.address, personal.website, personal.linkedin].filter(Boolean)

  if (personal.fullName) lines.push(personal.fullName.toUpperCase())
  if (personal.jobTitle) lines.push(personal.jobTitle)
  if (contact.length) lines.push(contact.join(' | '))
  lines.push('')

  if (personal.summary) {
    lines.push('PERFIL')
    lines.push(personal.summary)
    lines.push('')
  }

  if (experience.some((e) => e.role || e.company)) {
    lines.push('EXPERIENCIA')
    experience.filter((e) => e.role || e.company).forEach((e) => {
      if (e.role || e.company) lines.push(`${e.role || ''}${e.role && e.company ? ' - ' : ''}${e.company || ''}`)
      const range = dateRangeText(e.start, e.end)
      if (range) lines.push(range)
      splitTextLines(e.bullets).forEach((b) => lines.push(`- ${b}`))
      lines.push('')
    })
  }

  if (education.some((ed) => ed.degree || ed.institution)) {
    lines.push('EDUCACION')
    education.filter((ed) => ed.degree || ed.institution).forEach((ed) => {
      lines.push(`${ed.degree || ''}${ed.degree && ed.institution ? ' - ' : ''}${ed.institution || ''}`)
      const range = dateRangeText(ed.start, ed.end)
      if (range) lines.push(range)
      if (ed.description) lines.push(ed.description)
      lines.push('')
    })
  }

  if (skills.length) {
    lines.push('HABILIDADES')
    lines.push(skills.join(', '))
    lines.push('')
  }

  if (languages.some((l) => l.name)) {
    lines.push('IDIOMAS')
    languages.filter((l) => l.name).forEach((l) => {
      lines.push(`${l.name}${l.level ? `: ${l.level}` : ''}`)
    })
    lines.push('')
  }

  if (courses.some((c) => c.title)) {
    lines.push('CURSOS')
    courses.filter((c) => c.title).forEach((c) => {
      lines.push(`${c.title}${c.institution ? ` - ${c.institution}` : ''}${c.year ? ` (${c.year})` : ''}`)
    })
    lines.push('')
  }

  if (projects.some((p) => p.name)) {
    lines.push('PROYECTOS')
    projects.filter((p) => p.name).forEach((p) => {
      lines.push(`${p.name}${p.link ? ` - ${p.link}` : ''}`)
      if (p.description) lines.push(p.description)
      lines.push('')
    })
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}
