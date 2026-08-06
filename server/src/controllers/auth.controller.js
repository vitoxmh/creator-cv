import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const TOKEN_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 días

function setTokenCookie(res, userId) {
  const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: TOKEN_AGE_SECONDS })
  const cookieSecure = process.env.COOKIE_SECURE !== undefined
    ? process.env.COOKIE_SECURE === 'true'
    : process.env.NODE_ENV === 'production'
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: cookieSecure,
    maxAge: TOKEN_AGE_SECONDS * 1000
  })
}

export async function register(req, res, next) {
  try {
    const { email, password, name } = req.body
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, contraseña y nombre son obligatorios' })
    }
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return res.status(409).json({ error: 'Ya existe una cuenta con ese email' })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({ data: { email, passwordHash, name } })

    setTokenCookie(res, user.id)
    res.status(201).json({ user: { id: user.id, email: user.email, name: user.name } })
  } catch (err) {
    next(err)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email y contraseña son obligatorios' })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'Credenciales incorrectas' })

    setTokenCookie(res, user.id)
    res.json({ user: { id: user.id, email: user.email, name: user.name } })
  } catch (err) {
    next(err)
  }
}

export function logout(_req, res) {
  res.clearCookie('token')
  res.json({ ok: true })
}

export async function me(req, res, next) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } })
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json({ user: { id: user.id, email: user.email, name: user.name } })
  } catch (err) {
    next(err)
  }
}
