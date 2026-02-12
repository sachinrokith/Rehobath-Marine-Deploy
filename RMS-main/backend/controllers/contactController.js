import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

/* global process */

dotenv.config();

// Rate limiting storage (in production, use Redis)
const rateLimitStore = new Map();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;


    // Basic validation
    const errors = {};
    if (!name || name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }
    if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!message || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }


    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Rate limiting (basic implementation)
    const clientIP = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const rateLimitKey = `${clientIP}_${Math.floor(now / (60 * 1000))}`; // Per minute
    
    if (rateLimitStore.has(rateLimitKey)) {
      const count = rateLimitStore.get(rateLimitKey);
      if (count >= 3) { // Max 3 submissions per minute
        return res.status(429).json({
          success: false,
          message: 'Too many submissions. Please try again in a minute.'
        });
      }
      rateLimitStore.set(rateLimitKey, count + 1);
    } else {
      rateLimitStore.set(rateLimitKey, 1);
    }

    // Clean up old rate limit entries (keep only last hour)
    const cutoff = now - (60 * 60 * 1000);
    for (const [key] of rateLimitStore.entries()) {
      if (parseInt(key.split('_')[1]) < cutoff) {
        rateLimitStore.delete(key);
      }
    }

    // Save to database
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      message: message.trim(),
      ipAddress: clientIP,
      userAgent: req.get('User-Agent') || 'Unknown'
    });

    await contact.save();

    // Send email
    try {
      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-left: 4px solid #667eea;">
            <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #667eea;">Sender's Name:</strong><br>
              <span style="color: #555;">${name}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #667eea;">Sender's Email:</strong><br>
              <span style="color: #555;">${email}</span>
            </div>
            
            ${phone ? `
            <div style="margin-bottom: 20px;">
              <strong style="color: #667eea;">Phone Number:</strong><br>
              <span style="color: #555;">${phone}</span>
            </div>
            ` : ''}
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #667eea;">Message:</strong><br>
              <div style="background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #667eea; margin-top: 10px;">
                <p style="color: #555; margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Submitted on: ${new Date().toLocaleString()}<br>
                IP Address: ${clientIP}<br>
                User Agent: ${req.get('User-Agent') || 'Unknown'}
              </p>
            </div>
          </div>
          
          <div style="background: #333; padding: 20px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 14px;">
              This message was sent from your website contact form
            </p>
          </div>
        </div>
      `;

      const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME || 'Website Contact'}" <${process.env.EMAIL_USER}>`,
        to: 'dovin479@gmail.com',
        replyTo: email, // Use sender's email as reply-to
        subject: `New Contact Form Message from ${name}`,
        html: emailContent,
        text: `
          New Contact Form Submission
          
          Sender's Name: ${name}
          Sender's Email: ${email}
          ${phone ? `Phone Number: ${phone}` : ''}
          
          Message:
          ${message}
          
          ---
          Submitted on: ${new Date().toLocaleString()}
          IP Address: ${clientIP}
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Still save the contact but log the error
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          count: total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching contacts',
      error: error.message
    });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: { contact }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating contact',
      error: error.message
    });
  }
};
