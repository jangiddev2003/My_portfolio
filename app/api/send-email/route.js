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
    // VERIFY ENVIRONMENT VARIABLES
    // ============================================
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('ERROR: EMAIL_USER and EMAIL_PASSWORD not configured');
      return Response.json(
        { error: 'Email service not configured. Admin will be notified manually.' },
        { status: 500 }
      );
    }

    // ============================================
    // EMAIL TRANSPORTER SETUP
    // ============================================
    // Configure Gmail SMTP connection with secure settings
    const transporter = nodemailer.createTransport({
      // Gmail service configuration
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        // Gmail account credentials from environment
        user: process.env.EMAIL_USER,
        // Use App Password for Gmail (more secure than account password)
        pass: process.env.EMAIL_PASSWORD,
      },
      logger: true,
      debug: true,
    });

    // Verify connection works before sending
    try {
      await transporter.verify();
      console.log('Email service connection verified');
    } catch (verifyError) {
      console.error('Email service error:', verifyError.message);
      throw new Error(`Email service failed: ${verifyError.message}`);
    }

    // ============================================
    // SEND EMAIL TO PORTFOLIO OWNER
    // ============================================
    // Email notification to portfolio owner with inquiry details
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'jangiddev2003@gmail.com',
        replyTo: email,
        subject: `New Hire Request from ${name}`,
        // HTML formatted email body with inquiry details
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #596aa1;">New Hire Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr style="border: 1px solid #eee;">
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr style="border: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">From portfolio contact form</p>
          </div>
        `,
      });
      console.log('Admin notification sent successfully');
    } catch (adminError) {
      console.error('Failed to send admin email:', adminError.message);
      throw adminError;
    }

    // ============================================
    // SEND CONFIRMATION EMAIL TO SENDER
    // ============================================
    // Confirmation email sent to person who submitted the form
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thanks for reaching out! Dev Jangid Portfolio',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #596aa1;">Thanks for reaching out!</h2>
            <p>Hi ${name},</p>
            <p>I received your message and will get back to you as soon as possible.</p>
            <p>Best regards,<br><strong>Dev Jangid</strong></p>
          </div>
        `,
      });
      console.log('Confirmation email sent');
    } catch (confirmError) {
      console.error('Confirmation email failed:', confirmError.message);
    }

    return Response.json(
      { success: true, message: 'Email sent successfully! Check your inbox.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('EMAIL API ERROR:', error.message);
    console.error('Stack:', error.stack);
    
    return Response.json(
      { error: error.message || 'Failed to send email. Please try the mailto link.' },
      { status: 500 }
    );
  }
}
