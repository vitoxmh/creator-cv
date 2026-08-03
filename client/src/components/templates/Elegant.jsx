import { splitLines, contactItems, dateRange } from './helpers'

export default function Elegant({ data }) {
  const { personal, experience, education, skills, languages, projects } = data
  const contact = contactItems(personal)

  return (
    <div className="cv-elegant">
      <aside className="cv-elegant__aside">
        {personal.photo && <img className="cv-elegant__photo" src={personal.photo} alt="Foto de perfil" />}

        {contact.length > 0 && (
          <div className="cv-elegant__block">
            <h2 className="cv-elegant__block-title">Contacto</h2>
            <ul className="cv-elegant__contact">
              {contact.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {skills.length > 0 && (
          <div className="cv-elegant__block">
            <h2 className="cv-elegant__block-title">Habilidades</h2>
            <ul className="cv-elegant__skills">
              {skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {languages.some((l) => l.name) && (
          <div className="cv-elegant__block">
            <h2 className="cv-elegant__block-title">Idiomas</h2>
            <ul className="cv-elegant__languages">
              {languages.filter((l) => l.name).map((l, i) => (
                <li key={i}>
                  <strong>{l.name}</strong>
                  {l.level && <span className="cv-elegant__lang-level">{l.level}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="cv-elegant__main">
        <header className="cv-elegant__header">
          <h1 className="cv-elegant__name">{personal.fullName || 'Tu Nombre'}</h1>
          {personal.jobTitle && <p className="cv-elegant__role">{personal.jobTitle}</p>}
        </header>

        {personal.summary && <p className="cv-elegant__summary">{personal.summary}</p>}

        {experience.some((e) => e.role || e.company) && (
          <section className="cv-elegant__section">
            <h2 className="cv-elegant__section-title">Experiencia laboral</h2>
            {experience.filter((e) => e.role || e.company).map((e, i) => (
              <div className="cv-elegant__item" key={i}>
                <div className="cv-elegant__item-head">
                  <span className="cv-elegant__item-title">{e.role}</span>
                  <span className="cv-elegant__item-date">{dateRange(e.start, e.end)}</span>
                </div>
                {e.company && <div className="cv-elegant__item-sub">{e.company}</div>}
                {splitLines(e.bullets).length > 0 && (
                  <ul className="cv-elegant__bullets">
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
          <section className="cv-elegant__section">
            <h2 className="cv-elegant__section-title">Educación</h2>
            {education.filter((ed) => ed.degree || ed.institution).map((ed, i) => (
              <div className="cv-elegant__item" key={i}>
                <div className="cv-elegant__item-head">
                  <span className="cv-elegant__item-title">{ed.degree}</span>
                  <span className="cv-elegant__item-date">{dateRange(ed.start, ed.end)}</span>
                </div>
                {ed.institution && <div className="cv-elegant__item-sub">{ed.institution}</div>}
                {ed.description && <p className="cv-elegant__item-desc">{ed.description}</p>}
              </div>
            ))}
          </section>
        )}

        {projects.some((p) => p.name) && (
          <section className="cv-elegant__section">
            <h2 className="cv-elegant__section-title">Proyectos</h2>
            {projects.filter((p) => p.name).map((p, i) => (
              <div className="cv-elegant__item" key={i}>
                <div className="cv-elegant__item-title">
                  {p.name}
                  {p.link && <span className="cv-elegant__item-link"> · {p.link}</span>}
                </div>
                {p.description && <p className="cv-elegant__item-desc">{p.description}</p>}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
