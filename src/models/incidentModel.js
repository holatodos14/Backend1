import { pool } from '../config/db.js'

class Incident {
  static async create ({ userId, title, description, location }) {
    const [result] = await pool.execute(
      'INSERT INTO Incidents (userId, title, description, location) VALUES (?, ?, ?, ?)',
      [userId, title, description, location]
    )
    return result.insertId
  }

  static async findAll () {
    const [rows] = await pool.execute('SELECT * FROM Incidents')
    return rows
  }

  static async findById (id) {
    const [rows] = await pool.execute('SELECT * FROM Incidents WHERE id = ?', [id])
    return rows[0]
  }

  static async update (id, { title, description, location }) {
    const [result] = await pool.execute(
      'UPDATE Incidents SET title = ?, description = ?, location = ? WHERE id = ?',
      [title, description, location, id]
    )
    return result.affectedRows > 0
  }

  static async updateStatus (id, status, updatedBy) {
    const connection = await pool.getConnection()
    try {
      await connection.beginTransaction()

      const [updateResult] = await connection.execute(
        'UPDATE Incidents SET status = ? WHERE id = ?',
        [status, id]
      )

      if (updateResult.affectedRows === 0) {
        await connection.rollback()
        return false
      }

      await connection.execute(
        'INSERT INTO Incident_Log (incidentId, updatedBy, newStatus) VALUES (?, ?, ?)',
        [id, updatedBy, status]
      )

      await connection.commit()
      return true
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  static async delete (id) {
    const [result] = await pool.execute('DELETE FROM Incidents WHERE id = ?', [id])
    return result.affectedRows > 0
  }
}

export default Incident
