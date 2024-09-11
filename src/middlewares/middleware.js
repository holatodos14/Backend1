export const validateCORS = (req, res, next) => {
  const validOrigins = ['http://localhost:5173']
  const { origin } = req.headers

  if (validOrigins.includes(origin) || !origin) {
    res.setHeader('Access-Control-Allow-Origin', origin ?? '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    return next()
  }

  res.status(403).json({ message: 'Error de CORS. No estás permitido.' })
}
export const handleError = (err, req, res, next) => {
  console.error(err)

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Error de validación', details: err.message })
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'No autorizado' })
  }

  res.status(500).json({ message: 'Error interno del servidor' })
}

export const validateId = (req, res, next) => {
  const { id } = req.params

  if (isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({ message: 'ID inválido' })
  }

  next()
}
