import Incident from '../models/incidentModel.js'

export const createIncident = async (req, res, next) => {
  try {
    const { title, description, location } = req.body
    const userId = req.user.id
    const incidentId = await Incident.create({ userId, title, description, location })
    res.status(201).json({ message: 'Incident created successfully', incidentId })
  } catch (error) {
    next(error)
  }
}

export const getAllIncidents = async (req, res, next) => {
  try {
    const incidents = await Incident.findAll()
    res.json(incidents)
  } catch (error) {
    console.error('Error fetching incidents:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getIncidentById = async (req, res, next) => {
  try {
    const incident = await Incident.findById(req.params.id)
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' })
    }
    res.json(incident)
  } catch (error) {
    next(error)
  }
}

export const updateIncident = async (req, res, next) => {
  try {
    const { title, description, location } = req.body
    const updated = await Incident.update(req.params.id, { title, description, location })
    if (!updated) {
      return res.status(404).json({ message: 'Incident not found' })
    }
    res.json({ message: 'Incident updated successfully' })
  } catch (error) {
    next(error)
  }
}

export const updateIncidentStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const updatedBy = req.user.id
    const updated = await Incident.updateStatus(id, status, updatedBy)
    if (!updated) {
      return res.status(404).json({ message: 'Incident not found' })
    }
    res.json({ message: 'Incident status updated successfully' })
  } catch (error) {
    next(error)
  }
}

export const deleteIncident = async (req, res, next) => {
  try {
    const deleted = await Incident.delete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Incident not found' })
    }
    res.json({ message: 'Incident deleted successfully' })
  } catch (error) {
    next(error)
  }
}
