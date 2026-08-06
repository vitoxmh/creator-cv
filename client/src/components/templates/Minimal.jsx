import { splitLines, contactItems, dateRange } from './helpers'

export default function Minimal({ data }) {
  const { personal, experience, education, skills, languages, courses, projects } = data
  const contact = contactItems(personal)

  return (
    <div className="cv-minimal">
      <header className="cv-minimal__header">
        {personal.photo && <img className="cv-minimal__photo" src={personal.photo} alt="Foto de perfil" />}
        <h1 className="cv-minimal__name">{personal.fullName || 'Tu Nombre'}</h1>
        {personal.jobTitle && <p className="cv-minimal__role">{personal.jobTitle}</p>}
        {contact.length > 0 && <p className="cv-minimal__contact">{contact.join('  ·  ')}</p>}
        {personal.summary && <p className="cv-minimal__summary">{personal.summary}</p>}
      </header>

      {experience.some((e) => e.role || e.company) && (
        <section className="cv-minimal__section">
          <h2 className="cv-minimal__section-title">Experiencia</h2>
          {experience.filter((e) => e.role || e.company).map((e, i) => (
            <div className="cv-minimal__item" key={i}>
              <div className="cv-minimal__item-head">
                <span className="cv-minimal__item-title">{e.role}</span>
                <span className="cv-minimal__item-date">{dateRange(e.start, e.end)}</span>
              </div>
              {e.company && <div className="cv-minimal__item-sub">{e.company}</div>}
              {splitLines(e.bullets).length > 0 && (
                <ul className="cv-minimal__bullets">
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
        <section className="cv-minimal__section">
          <h2 className="cv-minimal__section-title">Educación</h2>
          {education.filter((ed) => ed.degree || ed.institution).map((ed, i) => (
            <div className="cv-minimal__item" key={i}>
              <div className="cv-minimal__item-head">
                <span className="cv-minimal__item-title">{ed.degree}</span>
                <span className="cv-minimal__item-date">{dateRange(ed.start, ed.end)}</span>
              </div>
              {ed.institution && <div className="cv-minimal__item-sub">{ed.institution}</div>}
              {ed.description && <p className="cv-minimal__item-desc">{ed.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="cv-minimal__section">
          <h2 className="cv-minimal__section-title">Habilidades</h2>
          <ul className="cv-minimal__skills">
            {skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {languages.some((l) => l.name) && (
        <section className="cv-minimal__section">
          <h2 className="cv-minimal__section-title">Idiomas</h2>
          <ul className="cv-minimal__languages">
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
        <section className="cv-minimal__section">
          <h2 className="cv-minimal__section-title">Cursos</h2>
          {courses.filter((c) => c.title).map((c, i) => (
            <div className="cv-minimal__item" key={i}>
              <div className="cv-minimal__item-head">
                <span className="cv-minimal__item-title">{c.title}</span>
                {c.year && <span className="cv-minimal__item-date">{c.year}</span>}
              </div>
              {c.institution && <div className="cv-minimal__item-sub">{c.institution}</div>}
            </div>
          ))}
        </section>
      )}

      {projects.some((p) => p.name) && (
        <section className="cv-minimal__section">
          <h2 className="cv-minimal__section-title">Proyectos</h2>
          {projects.filter((p) => p.name).map((p, i) => (
            <div className="cv-minimal__item" key={i}>
              <div className="cv-minimal__item-title">
                {p.name}
                {p.link && <span className="cv-minimal__link"> · {p.link}</span>}
              </div>
              {p.description && <p className="cv-minimal__item-desc">{p.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
