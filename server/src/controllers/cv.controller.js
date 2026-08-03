import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function list(req, res, next) {
  try {
    const cvs = await prisma.cv.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, template: true, accentColor: true, updatedAt: true }
    })
    res.json({ cvs })
  } catch (err) {
    next(err)
  }
}

export async function getOne(req, res, next) {
  try {
    const cv = await prisma.cv.findFirst({ where: { id: req.params.id, userId: req.user.id } })
    if (!cv) return res.status(404).json({ error: 'CV no encontrado' })
    res.json({ cv })
  } catch (err) {
    next(err)
  }
}

export async function create(req, res, next) {
  try {
    const { title, data, template, accentColor } = req.body
    const cv = await prisma.cv.create({
      data: {
        userId: req.user.id,
        title: title || 'Mi CV',
        data: data || {},
        template: template || 'classic',
        accentColor: accentColor || '#2c5f8a'
      }
    })
    res.status(201).json({ cv })
  } catch (err) {
    next(err)
  }
}

export async function update(req, res, next) {
  try {
    const existing = await prisma.cv.findFirst({ where: { id: req.params.id, userId: req.user.id } })
    if (!existing) return res.status(404).json({ error: 'CV no encontrado' })

    const { title, data, template, accentColor } = req.body
    const cv = await prisma.cv.update({
      where: { id: existing.id },
      data: {
        title: title ?? existing.title,
        data: data ?? existing.data,
        template: template ?? existing.template,
        accentColor: accentColor ?? existing.accentColor
      }
    })
    res.json({ cv })
  } catch (err) {
    next(err)
  }
}

export async function remove(req, res, next) {
  try {
    const existing = await prisma.cv.findFirst({ where: { id: req.params.id, userId: req.user.id } })
    if (!existing) return res.status(404).json({ error: 'CV no encontrado' })

    await prisma.cv.delete({ where: { id: existing.id } })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}
