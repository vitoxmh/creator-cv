import { splitLines, dateRange, normalizeSkills } from './helpers'

export default function Ats({ data }) {
  const { personal, experience, education, skills, languages, courses, projects } = data
  const contact = [personal.phone, personal.email, personal.address, personal.website, personal.linkedin].filter(Boolean)

  return (
    <div className="cv-ats">
      <header className="cv-ats__header">
        <h1 className="cv-ats__name">{personal.fullName || 'Tu Nombre'}</h1>
        {personal.jobTitle && <p className="cv-ats__title">{personal.jobTitle}</p>}
        {contact.length > 0 && <p className="cv-ats__contact">{contact.join('  |  ')}</p>}
      </header>

      {personal.summary && (
        <section className="cv-ats__section">
          <h2 className="cv-ats__section-title">Perfil</h2>
          <p className="cv-ats__summary">{personal.summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="cv-ats__section">
          <h2 className="cv-ats__section-title">Experiencia</h2>
          {experience.filter((e) => e.role || e.company).map((e, i) => (
            <div className="cv-ats__item" key={i}>
              <div className="cv-ats__item-head">
                <span className="cv-ats__item-title">
                  {e.role}
                  {e.company ? ` · ${e.company}` : ''}
                </span>
                <span className="cv-ats__item-date">{dateRange(e.start, e.end)}</span>
              </div>
              {splitLines(e.bullets).length > 0 && (
                <ul className="cv-ats__bullets">
                  {splitLines(e.bullets).map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {education.some((ed) => ed.degree || ed.institution) && (
        <section className="cv-ats__section">
          <h2 className="cv-ats__section-title">Educación</h2>
          {education.filter((ed) => ed.degree || ed.institution).map((ed, i) => (
            <div className="cv-ats__item" key={i}>
              <div className="cv-ats__item-head">
                <span className="cv-ats__item-title">{ed.degree}</span>
                <span className="cv-ats__item-date">{dateRange(ed.start, ed.end)}</span>
              </div>
              {ed.institution && <div className="cv-ats__item-sub">{ed.institution}</div>}
              {ed.description && <p className="cv-ats__item-desc">{ed.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="cv-ats__section">
          <h2 className="cv-ats__section-title">Habilidades</h2>
          {normalizeSkills(skills).map((g, i) => (
            <p className="cv-ats__skills" key={i}>
              {g.category ? `${g.category}: ` : ''}
              {g.items.join(' · ')}
            </p>
          ))}
        </section>
      )}

      {languages.some((l) => l.name) && (
        <section className="cv-ats__section">
          <h2 className="cv-ats__section-title">Idiomas</h2>
          <ul className="cv-ats__languages">
            {languages.filter((l) => l.name).map((l, i) => (
              <li key={i}>
                <strong>{l.name}</strong>
                {l.level ? ` — ${l.level}` : ''}
              </li>
            ))}
          </ul>
        </section>
      )}

      {courses.some((c) => c.title) && (
        <section className="cv-ats__section">
          <h2 className="cv-ats__section-title">Cursos</h2>
          {courses.filter((c) => c.title).map((c, i) => (
            <div className="cv-ats__item" key={i}>
              <div className="cv-ats__item-head">
                <span className="cv-ats__item-title">{c.title}</span>
                {c.year && <span className="cv-ats__item-date">{c.year}</span>}
              </div>
              {c.institution && <div className="cv-ats__item-sub">{c.institution}</div>}
            </div>
          ))}
        </section>
      )}

      {projects.some((p) => p.name) && (
        <section className="cv-ats__section">
          <h2 className="cv-ats__section-title">Proyectos</h2>
          {projects.filter((p) => p.name).map((p, i) => (
            <div className="cv-ats__item" key={i}>
              <div className="cv-ats__item-title">
                {p.name}
                {p.link && <span className="cv-ats__item-link"> · {p.link}</span>}
              </div>
              {p.description && <p className="cv-ats__item-desc">{p.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
