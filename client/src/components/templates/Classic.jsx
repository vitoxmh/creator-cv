import { splitLines, contactItems, dateRange, normalizeSkills } from './helpers'

export default function Classic({ data }) {
  const { personal, experience, education, skills, languages, courses, projects } = data
  const contact = contactItems(personal)

  return (
    <div className="cv-classic">
      <header className="cv-classic__header">
        {personal.photo && <img className="cv-classic__photo" src={personal.photo} alt="Foto de perfil" />}
        <h1 className="cv-classic__name">{personal.fullName || 'Tu Nombre'}</h1>
        {personal.jobTitle && <p className="cv-classic__title">{personal.jobTitle}</p>}
        {contact.length > 0 && (
          <p className="cv-classic__contact">
            {contact.map((item, i, arr) => (
              <span key={i}>
                {item}
                {i < arr.length - 1 ? '  ·  ' : ''}
              </span>
            ))}
          </p>
        )}
      </header>

      {personal.summary && (
        <section className="cv-classic__section">
          <h2 className="cv-classic__section-title">Perfil profesional</h2>
          <p className="cv-classic__summary">{personal.summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="cv-classic__section">
          <h2 className="cv-classic__section-title">Experiencia laboral</h2>
          {experience.filter((e) => e.role || e.company).map((e, i) => (
            <div className="cv-classic__item" key={i}>
              <div className="cv-classic__item-head">
                <span className="cv-classic__item-title">{e.role}</span>
                <span className="cv-classic__item-date">{dateRange(e.start, e.end)}</span>
              </div>
              {e.company && <div className="cv-classic__item-sub">{e.company}</div>}
              {splitLines(e.bullets).length > 0 && (
                <ul className="cv-classic__bullets">
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
        <section className="cv-classic__section">
          <h2 className="cv-classic__section-title">Educación</h2>
          {education.filter((ed) => ed.degree || ed.institution).map((ed, i) => (
            <div className="cv-classic__item" key={i}>
              <div className="cv-classic__item-head">
                <span className="cv-classic__item-title">{ed.degree}</span>
                <span className="cv-classic__item-date">{dateRange(ed.start, ed.end)}</span>
              </div>
              {ed.institution && <div className="cv-classic__item-sub">{ed.institution}</div>}
              {ed.description && <p className="cv-classic__item-desc">{ed.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="cv-classic__section">
          <h2 className="cv-classic__section-title">Habilidades</h2>
          {normalizeSkills(skills).map((g, gi) => (
            <div className="cv-classic__skill-group" key={gi}>
              {g.category && <h3 className="cv-classic__skill-cat">{g.category}</h3>}
              <ul className="cv-classic__skills">
                {g.items.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {languages.some((l) => l.name) && (
        <section className="cv-classic__section">
          <h2 className="cv-classic__section-title">Idiomas</h2>
          <ul className="cv-classic__languages">
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
        <section className="cv-classic__section">
          <h2 className="cv-classic__section-title">Cursos</h2>
          {courses.filter((c) => c.title).map((c, i) => (
            <div className="cv-classic__item" key={i}>
              <div className="cv-classic__item-head">
                <span className="cv-classic__item-title">{c.title}</span>
                {c.year && <span className="cv-classic__item-date">{c.year}</span>}
              </div>
              {c.institution && <div className="cv-classic__item-sub">{c.institution}</div>}
            </div>
          ))}
        </section>
      )}

      {projects.some((p) => p.name) && (
        <section className="cv-classic__section">
          <h2 className="cv-classic__section-title">Proyectos</h2>
          {projects.filter((p) => p.name).map((p, i) => (
            <div className="cv-classic__item" key={i}>
              <div className="cv-classic__item-title">
                {p.name}
                {p.link && <span className="cv-classic__item-link"> · {p.link}</span>}
              </div>
              {p.description && <p className="cv-classic__item-desc">{p.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
