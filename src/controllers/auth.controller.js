import { pool } from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'

class AuthController {
  static async login (req, res) {
    try {
      const { username, password } = req.body

      // Query the user by username
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
      if (rows.length === 0) {
        return res.status(404).json({ message: 'El usuario no existe' })
      }

      const user = rows[0]

      // Compare the provided password with the hashed password
      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) {
        return res.status(400).json({ message: 'Credenciales inválidas' })
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' })
      console.log('Token generado:', token)

      // Exclude password from the user object
      const { password: _, ...userWithoutPassword } = user

      // Set the token in the response header and body
      res.setHeader('Authorization', `Bearer ${token}`)
      res.json({ message: 'Login exitoso', token, user: userWithoutPassword })
    } catch (error) {
      console.error('Error en el login:', error.message)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async me (req, res) {
    try {
      // The user object is already extracted from the token by the middleware
      const { password: _, ...userWithoutPassword } = req.user
      res.json(userWithoutPassword)
    } catch (error) {
      console.error('Error en la consulta de usuario:', error.message)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }
}

export default AuthController
