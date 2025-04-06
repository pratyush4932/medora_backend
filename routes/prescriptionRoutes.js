const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

// Route to upload a prescription
router.post('/upload', prescriptionController.uploadPrescription);

// Route to get all prescriptions
router.get('/', prescriptionController.getPrescriptions);

// Route to get a specific prescription by ID
router.get('/:id', prescriptionController.getPrescriptionById);

module.exports = router;