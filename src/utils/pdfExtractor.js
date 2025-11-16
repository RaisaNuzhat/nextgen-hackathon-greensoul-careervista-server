import { PDFExtract } from "pdf.js-extract";
import fs from "fs";


export  async function extractTextFromPDF(filePath) {
  return new Promise((resolve, reject) => {
    const pdfExtract = new PDFExtract();
    const options = {};

    pdfExtract.extract(filePath, options, (err, data) => {
      if (err) {
        reject(new Error('Failed to extract text from PDF: ' + err.message));
        return;
      }

      try {
        // combine text from all pages
        const text = data.pages
          .map((page) => page.content.map((c) => c.str).join(' '))
          .join('\n\n');

        if (!text || text.trim().length < 100) {
          reject(new Error('Could not extract meaningful text from PDF'));
          return;
        }

        resolve(text);
      } catch (error) {
        reject(new Error('Error processing PDF text: ' + error.message));
      }
    });
  });
}

export function deleteUploadedFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Failed to delete file:', err);
    } else {
      console.log('Uploaded file deleted successfully:', filePath);
    }
  });
}

