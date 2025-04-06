const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

class AISummarizer {
  constructor() {
    // Ensure you have set the GEMINI_API_KEY in your .env file
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async generateSummary(base64Image) {
    try {
      
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
      
    
      const imageBuffer = Buffer.from(base64Data, 'base64');

     
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      
      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [
            { inline_data: { 
              mime_type: 'image/jpeg', 
              data: base64Data 
            }},
            { text: "Analyze this prescription and provide a detailed summary of key information including medication names, dosages, and any special instructions." }
          ]
        }]
      });

     
      return result.response.text();
    } catch (error) {
      console.error('Error generating AI summary:', error);
      throw new Error('Failed to generate AI summary');
    }
  }
}

module.exports = new AISummarizer();