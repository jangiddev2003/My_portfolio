/**
 * ============================================
 * EMAIL API ENDPOINT
 * ============================================
 * POST endpoint for sending hiring inquiry emails
 * 
 * Uses Nodemailer with Gmail SMTP
 * Requires environment variables:
 * - EMAIL_USER: Gmail address
 * - EMAIL_PASSWORD: Gmail App Password
 * 
 * Sends two emails:
 * 1. To portfolio owner with inquiry details
 * 2. To sender with confirmation message
 * ============================================
 */

import nodemailer from 'nodemailer';

// ============================================
// POST REQUEST HANDLER
// ============================================
// Handles incoming email requests
export async function POST(request) {
  try {
    // ============================================
    // PARSE REQUEST BODY
    // ============================================
    // Extract form data from request JSON
    const { name, email, message } = await request.json();

    // ============================================
    // INPUT VALIDATION
    // ============================================
    // Check that all required fields are provided
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ============================================
    // EMAIL TRANSPORTER SETUP
    // ============================================
    // Configure Gmail SMTP connection
    const transporter = nodemailer.createTransport({
      // Gmail service configuration
      service: 'gmail',
      auth: {
        // Gmail account credentials from environment
        user: process.env.EMAIL_USER,
        // Use App Password for Gmail (more secure than account password)
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // ============================================
    // SEND EMAIL TO PORTFOLIO OWNER
    // ============================================
    // Email notification to portfolio owner with inquiry details
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'jangiddev2003@gmail.com',
      subject: `New Hire Request from ${name}`,
      // HTML formatted email body with inquiry details
      html: `
        <h2>New Hire Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      // Reply-to set to sender's email for easy response
      replyTo: email,
    });

    // ============================================
    // SEND CONFIRMATION EMAIL TO SENDER
    // ============================================
    // Confirmation email sent to person who submitted the form
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message',
      // HTML formatted confirmation message
      html: `
        <h2>Thanks for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We received your message and will get back to you soon.</p>
        <p>Best regards,<br>Dev Jangid</p>
      `,
    });

    // ============================================
    // SUCCESS RESPONSE
    // ============================================
    // Return success status to client
    return Response.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    // ============================================
    // ERROR HANDLING
    // ============================================
    // Log error details for debugging
    console.error('Email error:', error);
    // Return error response to client
    return Response.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
