export function splitLines(text) {
  return text ? text.split('\n').map((l) => l.trim()).filter(Boolean) : []
}

export function contactItems(personal) {
  return [personal.phone, personal.email, personal.address, personal.website, personal.linkedin].filter(Boolean)
}

export function initialsOf(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function dateRange(start, end) {
  if (!start && !end) return ''
  if (start && end) return `${start} — ${end}`
  return start || end
}
