import express from 'express'
import * as incidentController from '../controllers/incident.controller.js'
/* import { validateToken } from '../middlewares/auth.middleware.js' */

const router = express.Router()

router.post('/', incidentController.createIncident)
router.get('/', incidentController.getAllIncidents)
router.get('/:id', incidentController.getIncidentById)
router.put('/:id', incidentController.updateIncident)
router.patch('/:id/status', incidentController.updateIncidentStatus)
router.delete('/:id', incidentController.deleteIncident)

export default router
