import { Resend } from 'resend';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { fullName, institution, email, phone, enquiryType, message, website } = req.body || {};

    // 1. Silent discard for bot honeypot submission
    if (website) {
      return res.status(200).json({ success: true, message: 'Received' });
    }

    // 2. Check if Resend email service is configured
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !toEmail) {
      // Per brief: never show fake success. Return clear unconfigured indicator
      return res.status(200).json({
        success: false,
        emailNotConfigured: true,
        error: 'Email delivery not configured in environment variables.'
      });
    }

    // 3. Validation
    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, email, or message.'
      });
    }

    // 4. Send email via Resend
    const resend = new Resend(apiKey);

    const emailSubject = `New Partnership Enquiry — ${enquiryType || 'General'} — ${institution || fullName}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E4DAC4; background-color: #FAF7F0;">
        <div style="background-color: #00644E; padding: 16px; color: #FFFFFF; text-align: center; font-size: 20px; font-weight: bold; letter-spacing: 1px;">
          MERCHX PARTNERSHIP ENQUIRY
        </div>
        <div style="padding: 24px; background-color: #FFFFFF; margin-top: 12px; border: 1px solid #E4DAC4;">
          <h2 style="color: #1B1B1B; margin-top: 0; font-size: 18px; border-bottom: 2px solid #00644E; padding-bottom: 8px;">Enquiry Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #6B6F6C; width: 35%;"><strong>Full Name:</strong></td>
              <td style="padding: 8px 0; color: #1B1B1B;">${escapeHtml(fullName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B6F6C;"><strong>Institution / Org:</strong></td>
              <td style="padding: 8px 0; color: #1B1B1B;">${escapeHtml(institution || 'Not specified')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B6F6C;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #1B1B1B;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B6F6C;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; color: #1B1B1B;">${escapeHtml(phone || 'Not provided')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B6F6C;"><strong>Enquiry Type:</strong></td>
              <td style="padding: 8px 0; color: #00644E; font-weight: bold;">${escapeHtml(enquiryType || 'General')}</td>
            </tr>
          </table>

          <h3 style="color: #1B1B1B; margin-top: 24px; font-size: 16px; border-bottom: 1px solid #E4DAC4; padding-bottom: 6px;">Message</h3>
          <p style="color: #1B1B1B; font-size: 14px; line-height: 1.6; white-space: pre-wrap; background-color: #FAF7F0; padding: 12px; border-left: 3px solid #00644E;">
            ${escapeHtml(message)}
          </p>
        </div>
        <div style="text-align: center; margin-top: 16px; font-size: 11px; color: #6B6F6C;">
          This message was submitted via the MerchX Corporate Website Partnership Form.
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'MerchX Partnerships <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: emailSubject,
      html: emailHtml
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

