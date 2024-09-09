import express from 'express'
import * as incidentController from '../controllers/incident.controller.js'
import { validateToken } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/', validateToken, incidentController.createIncident)
router.get('/', validateToken, incidentController.getAllIncidents)
router.get('/:id', validateToken, incidentController.getIncidentById)
router.put('/:id', validateToken, incidentController.updateIncident)
router.patch('/:id/status', validateToken, incidentController.updateIncidentStatus)
router.delete('/:id', validateToken, incidentController.deleteIncident)

export default router
