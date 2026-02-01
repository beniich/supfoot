// src/services/badgeService.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

class BadgeService {
    /**
     * Generates a membership badge as a PDF
     * @param {Object} member - Member object
     * @param {Object} association - Association object
     * @returns {Promise<Buffer>} - Buffer of the PDF
     */
    async generateBadge(member, association) {
        return new Promise(async (resolve, reject) => {
            try {
                const doc = new PDFDocument({
                    size: [242, 153], // Standard ID card size in points (approx 85mm x 54mm)
                    margin: 0
                });

                const chunks = [];
                doc.on('data', chunk => chunks.push(chunk));
                doc.on('end', () => resolve(Buffer.concat(chunks)));
                doc.on('error', reject);

                // Background color based on association settings
                const primaryColor = association.settings?.primaryColor || '#007bff';
                doc.rect(0, 0, 242, 153).fill(primaryColor);

                // Header area (white)
                doc.rect(0, 0, 242, 40).fill('#ffffff');

                // Association Logo
                if (association.logo) {
                    try {
                        const response = await axios.get(association.logo, { responseType: 'arraybuffer' });
                        doc.image(response.data, 10, 5, { height: 30 });
                    } catch (e) {
                        console.error('Error loading association logo:', e.message);
                        doc.fillColor('#333333').fontSize(10).text(association.name, 10, 15);
                    }
                } else {
                    doc.fillColor('#333333').fontSize(10).text(association.name, 10, 15);
                }

                // Association Name
                doc.fillColor('#333333')
                    .fontSize(12)
                    .font('Helvetica-Bold')
                    .text(association.name.toUpperCase(), 50, 15, { align: 'right', width: 180 });

                // Member Photo Placeholder or actual photo
                const photoY = 50;
                doc.rect(10, photoY, 60, 75).fill('#e9ecef');
                if (member.photo) {
                    try {
                        const response = await axios.get(member.photo, { responseType: 'arraybuffer' });
                        doc.image(response.data, 10, photoY, { width: 60, height: 75, fit: [60, 75] });
                    } catch (e) {
                        doc.fillColor('#adb5bd').fontSize(8).text('PHOTO', 25, photoY + 30);
                    }
                }

                // Member Details
                doc.fillColor('#ffffff')
                    .font('Helvetica-Bold')
                    .fontSize(14)
                    .text(`${member.firstName} ${member.lastName}`, 80, 55);

                doc.font('Helvetica')
                    .fontSize(10)
                    .text(`Role: ${member.role || 'Member'}`, 80, 75);

                doc.fontSize(10)
                    .text(`Tier: ${member.tier || 'Standard'}`, 80, 90);

                doc.fontSize(10)
                    .text(`ID: ${member.membershipNumber}`, 80, 105);

                // Footer / Validity
                doc.rect(0, 133, 242, 20).fill('#000000');
                doc.fillColor('#ffffff')
                    .fontSize(8)
                    .text(`Valid until: ${new Date().getFullYear() + 1}-12-31`, 10, 139, { width: 222, align: 'center' });

                doc.end();
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = new BadgeService();
