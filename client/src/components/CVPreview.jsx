import { forwardRef } from 'react'
import Classic from './templates/Classic'
import Modern from './templates/Modern'
import Minimal from './templates/Minimal'
import Elegant from './templates/Elegant'
import Creative from './templates/Creative'
import Ats from './templates/Ats'

const TEMPLATES = {
  classic: Classic,
  modern: Modern,
  minimal: Minimal,
  elegant: Elegant,
  creative: Creative,
  ats: Ats
}

const CVPreview = forwardRef(function CVPreview({ data, template, accent }, ref) {
  const Template = TEMPLATES[template] || Classic
  return (
    <div className="preview-stage__inner" ref={ref}>
      <div className="cv-document" style={{ ['--cv-accent']: accent }}>
        <Template data={data} />
      </div>
    </div>
  )
})

export default CVPreview
