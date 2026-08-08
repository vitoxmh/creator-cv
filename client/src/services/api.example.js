import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
})

export default api

export function extractError(err) {
  return err?.response?.data?.error || 'Ha ocurrido un error inesperado'
}
