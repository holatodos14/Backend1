import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    const userWithoutPassword = { ...user, password: undefined }
    res.json(userWithoutPassword)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createUser = async (req, res) => {
  try {
    const { fName, lName, username, email, password, role } = req.body
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10)

    const userId = await User.create({
      fName,
      lName,
      username,
      email,
      password: hashedPassword,
      role
    })
    res.status(201).json({ message: 'Usuario creado exitosamente', userId })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { fName, lName, email, password, role } = req.body
    const updateData = { fName, lName, email, role }
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }
    const updated = await User.update(req.params.id, updateData)
    if (!updated) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.json({ message: 'Usuario actualizado exitosamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.delete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.json({ message: 'Usuario eliminado exitosamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
