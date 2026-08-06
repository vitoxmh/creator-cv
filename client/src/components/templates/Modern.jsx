import { splitLines, dateRange, initialsOf } from './helpers'

export default function Modern({ data }) {
  const { personal, experience, education, skills, languages, courses, projects } = data

  return (
    <div className="cv-modern">
      <aside className="cv-modern__sidebar">
        <div className="cv-modern__photo">
          {personal.photo ? <img src={personal.photo} alt="Foto de perfil" /> : <span>{initialsOf(personal.fullName)}</span>}
        </div>

        <h2 className="cv-modern__side-title">Contacto</h2>
        <ul className="cv-modern__contact">
          {personal.phone && (
            <li>
              <span className="cv-modern__contact-label">Teléfono</span>
              {personal.phone}
            </li>
          )}
          {personal.email && (
            <li>
              <span className="cv-modern__contact-label">Email</span>
              {personal.email}
            </li>
          )}
          {personal.address && (
            <li>
              <span className="cv-modern__contact-label">Ubicación</span>
              {personal.address}
            </li>
          )}
          {personal.website && (
            <li>
              <span className="cv-modern__contact-label">Web</span>
              {personal.website}
            </li>
          )}
          {personal.linkedin && (
            <li>
              <span className="cv-modern__contact-label">LinkedIn</span>
              {personal.linkedin}
            </li>
          )}
        </ul>

        {skills.length > 0 && (
          <>
            <h2 className="cv-modern__side-title">Habilidades</h2>
            <ul className="cv-modern__skills">
              {skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </>
        )}

        {languages.some((l) => l.name) && (
          <>
            <h2 className="cv-modern__side-title">Idiomas</h2>
            <ul className="cv-modern__languages">
              {languages.filter((l) => l.name).map((l, i) => (
                <li key={i}>
                  <strong>{l.name}</strong>
                  {l.level && <span>{l.level}</span>}
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>

      <main className="cv-modern__main">
        <h1 className="cv-modern__name">{personal.fullName || 'Tu Nombre'}</h1>
        {personal.jobTitle && <p className="cv-modern__role">{personal.jobTitle}</p>}
        {personal.summary && <p className="cv-modern__summary">{personal.summary}</p>}

        {experience.some((e) => e.role || e.company) && (
          <section className="cv-modern__section">
            <h2 className="cv-modern__section-title">Experiencia laboral</h2>
            {experience.filter((e) => e.role || e.company).map((e, i) => (
              <div className="cv-modern__item" key={i}>
                <div className="cv-modern__item-head">
                  <span className="cv-modern__item-title">{e.role}</span>
                  <span className="cv-modern__item-date">{dateRange(e.start, e.end)}</span>
                </div>
                {e.company && <div className="cv-modern__item-sub">{e.company}</div>}
                {splitLines(e.bullets).length > 0 && (
                  <ul className="cv-modern__bullets">
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
          <section className="cv-modern__section">
            <h2 className="cv-modern__section-title">Educación</h2>
            {education.filter((ed) => ed.degree || ed.institution).map((ed, i) => (
              <div className="cv-modern__item" key={i}>
                <div className="cv-modern__item-head">
                  <span className="cv-modern__item-title">{ed.degree}</span>
                  <span className="cv-modern__item-date">{dateRange(ed.start, ed.end)}</span>
                </div>
                {ed.institution && <div className="cv-modern__item-sub">{ed.institution}</div>}
                {ed.description && <p className="cv-modern__item-desc">{ed.description}</p>}
              </div>
            ))}
          </section>
        )}

        {courses.some((c) => c.title) && (
          <section className="cv-modern__section">
            <h2 className="cv-modern__section-title">Cursos</h2>
            {courses.filter((c) => c.title).map((c, i) => (
              <div className="cv-modern__item" key={i}>
                <div className="cv-modern__item-head">
                  <span className="cv-modern__item-title">{c.title}</span>
                  {c.year && <span className="cv-modern__item-date">{c.year}</span>}
                </div>
                {c.institution && <div className="cv-modern__item-sub">{c.institution}</div>}
              </div>
            ))}
          </section>
        )}

        {projects.some((p) => p.name) && (
          <section className="cv-modern__section">
            <h2 className="cv-modern__section-title">Proyectos</h2>
            {projects.filter((p) => p.name).map((p, i) => (
              <div className="cv-modern__item" key={i}>
                <div className="cv-modern__item-title">
                  {p.name}
                  {p.link && <span className="cv-modern__link"> · {p.link}</span>}
                </div>
                {p.description && <p className="cv-modern__item-desc">{p.description}</p>}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
