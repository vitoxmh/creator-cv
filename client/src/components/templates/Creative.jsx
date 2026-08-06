import { splitLines, dateRange } from './helpers'

export default function Creative({ data }) {
  const { personal, experience, education, skills, languages, courses, projects } = data

  const contact = [personal.phone, personal.email, personal.address, personal.website, personal.linkedin].filter(Boolean)

  return (
    <div className="cv-creative">
      <header className="cv-creative__header">
        <div className="cv-creative__header-left">
          <h1 className="cv-creative__name">{personal.fullName || 'Tu Nombre'}</h1>
          {personal.jobTitle && <p className="cv-creative__role">{personal.jobTitle}</p>}
        </div>
        {personal.photo && <img className="cv-creative__photo" src={personal.photo} alt="Foto de perfil" />}
      </header>

      {contact.length > 0 && (
        <ul className="cv-creative__contact">
          {contact.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      )}

      {personal.summary && <p className="cv-creative__summary">{personal.summary}</p>}

      {experience.some((e) => e.role || e.company) && (
        <section className="cv-creative__section">
          <h2 className="cv-creative__section-title">Experiencia laboral</h2>
          {experience.filter((e) => e.role || e.company).map((e, i) => (
            <div className="cv-creative__item" key={i}>
              <div className="cv-creative__item-head">
                <span className="cv-creative__item-title">{e.role}</span>
                <span className="cv-creative__item-date">{dateRange(e.start, e.end)}</span>
              </div>
              {e.company && <div className="cv-creative__item-sub">{e.company}</div>}
              {splitLines(e.bullets).length > 0 && (
                <ul className="cv-creative__bullets">
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
        <section className="cv-creative__section">
          <h2 className="cv-creative__section-title">Educación</h2>
          {education.filter((ed) => ed.degree || ed.institution).map((ed, i) => (
            <div className="cv-creative__item" key={i}>
              <div className="cv-creative__item-head">
                <span className="cv-creative__item-title">{ed.degree}</span>
                <span className="cv-creative__item-date">{dateRange(ed.start, ed.end)}</span>
              </div>
              {ed.institution && <div className="cv-creative__item-sub">{ed.institution}</div>}
              {ed.description && <p className="cv-creative__item-desc">{ed.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="cv-creative__section">
          <h2 className="cv-creative__section-title">Habilidades</h2>
          <ul className="cv-creative__skills">
            {skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {languages.some((l) => l.name) && (
        <section className="cv-creative__section">
          <h2 className="cv-creative__section-title">Idiomas</h2>
          <ul className="cv-creative__languages">
            {languages.filter((l) => l.name).map((l, i) => (
              <li key={i}>
                <strong>{l.name}</strong>
                {l.level && <span className="cv-creative__lang-level">{l.level}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {courses.some((c) => c.title) && (
        <section className="cv-creative__section">
          <h2 className="cv-creative__section-title">Cursos</h2>
          {courses.filter((c) => c.title).map((c, i) => (
            <div className="cv-creative__item" key={i}>
              <div className="cv-creative__item-head">
                <span className="cv-creative__item-title">{c.title}</span>
                {c.year && <span className="cv-creative__item-date">{c.year}</span>}
              </div>
              {c.institution && <div className="cv-creative__item-sub">{c.institution}</div>}
            </div>
          ))}
        </section>
      )}

      {projects.some((p) => p.name) && (
        <section className="cv-creative__section">
          <h2 className="cv-creative__section-title">Proyectos</h2>
          {projects.filter((p) => p.name).map((p, i) => (
            <div className="cv-creative__item" key={i}>
              <div className="cv-creative__item-title">
                {p.name}
                {p.link && <span className="cv-creative__item-link"> · {p.link}</span>}
              </div>
              {p.description && <p className="cv-creative__item-desc">{p.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
