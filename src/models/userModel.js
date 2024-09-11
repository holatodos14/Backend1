import { pool } from '../config/db.js'

class User {
  static async create ({ fName, lName, username, email, password, role }) {
    const [result] = await pool.execute(
      'INSERT INTO Users (fName, lName, username, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
      [fName, lName, username, email, password, role]
    )
    return result.insertId
  }

  static async findAll () {
    const [rows] = await pool.execute('SELECT id, fName, lName, username, email, role, createdAt FROM Users')
    return rows
  }

  static async findById (id) {
    const [rows] = await pool.execute('SELECT id, fName, lName, username, email, role, createdAt FROM Users WHERE id = ?', [id])
    return rows[0] || null
  }

  static async findOne ({ username }) {
    if (!username) {
      throw new Error('Username is required')
    }
    const [rows] = await pool.execute('SELECT * FROM Users WHERE username = ?', [username])
    return rows[0] || null
  }

  static async update (id, { fName, lName, email, password, role }) {
    const updateFields = []
    const values = []

    if (fName) {
      updateFields.push('fName = ?')
      values.push(fName)
    }
    if (lName) {
      updateFields.push('lName = ?')
      values.push(lName)
    }
    if (email) {
      updateFields.push('email = ?')
      values.push(email)
    }
    if (password) {
      updateFields.push('password = ?')
      values.push(password)
    }
    if (role) {
      updateFields.push('role = ?')
      values.push(role)
    }

    if (updateFields.length === 0) return false

    values.push(id)
    const [result] = await pool.execute(
      `UPDATE Users SET ${updateFields.join(', ')} WHERE id = ?`,
      values
    )
    return result.affectedRows > 0
  }

  static async delete (id) {
    const [result] = await pool.execute('DELETE FROM Users WHERE id = ?', [id])
    return result.affectedRows > 0
  }
}

export default User
