// In your prescription controller file

const Prescription = require('../models/prescription');
const AISummarizer = require('../utils/aiSummarizer');
const qrcode = require('qrcode');

exports.uploadPrescription = async (req, res) => {
  try {
    // Get base64 image from request body
    const base64Image = req.body.base64Image;
    
    if (!base64Image) {
      return res.status(400).json({
        message: 'No image data provided',
        error: 'Missing base64Image in request body'
      });
    }

    // Generate AI summary
    const aiSummary = await AISummarizer.generateSummary(base64Image);
    if (!aiSummary) {
      throw new Error('Failed to generate AI summary.');
    }

    // Create new prescription document
    const prescription = new Prescription({
      image: `data:image/jpeg;base64,${base64Image}`,
      aiSummary: aiSummary,
      // qrcode: qrcodeData,
    });
    
    // Generate QR code if needed
    // const qrcodeData = await qrcode.toDataURL(prescription._id.toString(), { errorCorrectionLevel: 'H' });
    
    await prescription.save();

    res.status(201).json({
      message: 'Prescription uploaded successfully',
      prescription: {
        id: prescription._id,
        // qrcode: prescription.qrcode,
        uploadDate: prescription.uploadDate,
        image: prescription.image,
        aiSummary: prescription.aiSummary
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Failed to upload prescription', 
      error: error.message 
    });
  }
};

// The rest of your controller code remains the same
exports.getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to retrieve prescriptions', 
      error: error.message 
    });
  }
};

exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    
    if (!prescription) {
      return res.status(404).json({ 
        message: 'Prescription not found' 
      });
    }

    res.status(200).json(prescription);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid prescription ID format' 
      });
    }

    res.status(500).json({ 
      message: 'Failed to retrieve prescription', 
      error: error.message 
    });
  }
};