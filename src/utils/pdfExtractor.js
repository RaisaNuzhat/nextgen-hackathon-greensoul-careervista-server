import mammoth from 'mammoth';
import path from 'path';
import { PdfReader } from 'pdfreader';

/**
 * Extract text from PDF buffer using pdfreader
 * @param {Buffer} buffer - PDF file buffer from multer
 * @returns {Promise<string>} - Extracted text
 */
export async function extractTextFromPDFBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const pdfReader = new PdfReader();
    let text = '';

    pdfReader.parseBuffer(buffer, (err, item) => {
      if (err) {
        reject(new Error('Failed to extract text from PDF: ' + err.message));
      } else if (!item) {
        // End of file
        if (!text || text.trim().length < 100) {
          reject(new Error('Could not extract meaningful text from PDF'));
        } else {
          resolve(text);
        }
      } else if (item.text) {
        text += item.text + ' ';
      }
    });
  });
}

/**
 * Extract text from any supported file type
 * @param {Object} file - Multer file object with buffer
 * @returns {Promise<string>} - Extracted text
 */
export async function extractTextFromBuffer(file) {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  try {
    if (fileExtension === '.pdf') {
      return await extractTextFromPDFBuffer(file.buffer);
    } 
    else if (fileExtension === '.docx') {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      const text = result.value;
      
      if (!text || text.trim().length < 100) {
        throw new Error('Could not extract meaningful text from DOCX');
      }
      
      return text;
    } 
    else if (fileExtension === '.doc') {
      throw new Error('Legacy .doc format not supported. Please use .docx or .pdf');
    } 
    else {
      throw new Error('Unsupported file format. Please upload PDF or DOCX');
    }
  } catch (error) {
    console.error('Text extraction error:', error);
    throw error;
  }
}