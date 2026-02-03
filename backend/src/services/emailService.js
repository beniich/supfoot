// server/src/services/emailService.js
const { sendEmail } = require('../config/resend');

class EmailService {
    // Welcome email
    static async sendWelcomeEmail(user) {
        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 32px; font-weight: bold; color: #F9D406; }
          .content { color: #333; line-height: 1.6; }
          .button { display: inline-block; padding: 12px 30px; background: #F9D406; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 40px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">⚽ FootballHub+</div>
          </div>
          <div class="content">
            <h2>Bienvenue ${user.firstName} !</h2>
            <p>Merci de rejoindre FootballHub+, votre plateforme football ultime.</p>
            <p>Vous pouvez maintenant :</p>
            <ul>
              <li>Réserver des billets pour vos matchs préférés</li>
              <li>Suivre les scores en direct</li>
              <li>Acheter des produits exclusifs</li>
              <li>Scanner vos billets directement depuis l'app</li>
            </ul>
            <a href="https://footballhub.ma" class="button">Découvrir FootballHub+</a>
          </div>
          <div class="footer">
            <p>© 2024 FootballHub+. Tous droits réservés.</p>
            <p>Casablanca, Maroc</p>
          </div>
        </div>
      </body>
      </html>
    `;

        await sendEmail({
            to: user.email,
            subject: 'Bienvenue sur FootballHub+ ! ⚽',
            html,
        });
    }

    // Ticket confirmation email
    static async sendTicketEmail(ticket) {
        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; }
          .ticket { background: linear-gradient(135deg, #1A1915 0%, #2D2A25 100%); color: white; padding: 30px; border-radius: 16px; margin: 20px 0; }
          .ticket-number { font-size: 24px; font-weight: bold; color: #F9D406; margin-bottom: 20px; }
          .qr-code { text-align: center; background: white; padding: 20px; border-radius: 12px; margin: 20px 0; }
          .event-details { line-height: 1.8; }
          .button { display: inline-block; padding: 12px 30px; background: #F9D406; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Votre Billet FootballHub+</h2>
          <div class="ticket">
            <div class="ticket-number">${ticket.ticketNumber}</div>
            <div class="event-details">
              <p><strong>Événement:</strong> ${ticket.event.title}</p>
              <p><strong>Date:</strong> ${new Date(ticket.event.startDate).toLocaleDateString('fr-FR')}</p>
              <p><strong>Lieu:</strong> ${ticket.event.venue.name}</p>
              <p><strong>Type:</strong> ${ticket.ticketType}</p>
              ${ticket.seating ? `<p><strong>Section:</strong> ${ticket.seating.section} - Rangée ${ticket.seating.row} - Siège ${ticket.seating.seat}</p>` : ''}
            </div>
            <div class="qr-code">
              <img src="${ticket.qrCode}" alt="QR Code" style="max-width: 200px;" />
            </div>
          </div>
          <p>Présentez ce QR code à l'entrée du stade.</p>
          <a href="https://footballhub.ma/tickets/${ticket._id}" class="button">Voir mon billet</a>
        </div>
      </body>
      </html>
    `;

        await sendEmail({
            to: ticket.member.email,
            subject: `Votre billet pour ${ticket.event.title} 🎫`,
            html,
        });
    }

    // Password reset email
    static async sendPasswordResetEmail(user, resetToken) {
        const resetUrl = `https://footballhub.ma/reset-password?token=${resetToken}`;

        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; }
          .button { display: inline-block; padding: 12px 30px; background: #F9D406; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .warning { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Réinitialisation de mot de passe</h2>
          <p>Bonjour ${user.firstName},</p>
          <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
          <p>Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
          <a href="${resetUrl}" class="button">Réinitialiser mon mot de passe</a>
          <div class="warning">
            <p><strong>⚠️ Important :</strong></p>
            <p>Ce lien expire dans 1 heure.</p>
            <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

        await sendEmail({
            to: user.email,
            subject: 'Réinitialisation de votre mot de passe - FootballHub+',
            html,
        });
    }

    // Order confirmation email
    static async sendOrderConfirmationEmail(order) {
        const itemsHtml = order.items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.product.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.price} DH</td>
      </tr>
    `).join('');

        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; }
          .order-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .total { font-size: 20px; font-weight: bold; color: #F9D406; text-align: right; padding: 15px 0; border-top: 2px solid #F9D406; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Commande confirmée ! 🎉</h2>
          <p>Merci pour votre commande #${order.orderNumber}</p>
          
          <table class="order-table">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="padding: 10px; text-align: left;">Produit</th>
                <th style="padding: 10px; text-align: center;">Quantité</th>
                <th style="padding: 10px; text-align: right;">Prix</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <div class="total">
            Total: ${order.total} DH
          </div>
          
          <p>Votre commande sera livrée à :</p>
          <p>
            ${order.shippingAddress.street}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}
          </p>
        </div>
      </body>
      </html>
    `;

        await sendEmail({
            to: order.user.email,
            subject: `Commande #${order.orderNumber} confirmée ! 📦`,
            html,
        });
    }
}

module.exports = EmailService;
