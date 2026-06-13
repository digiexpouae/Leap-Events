import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { fullName, email, phone, message } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: [
        process.env.SMTP_FROM || process.env.SMTP_USER,
        process.env.SMTP_SECONDARY_TO,
      ].filter(Boolean),
      subject: `📩 Contact Form Submission from ${fullName || email}`,
      text: `
Name: ${fullName || ''}
Email: ${email}
Phone: ${phone || ''}
Message: ${message || ''}
      `,
      html: `
        <div style="background:linear-gradient(135deg,#f7f7f7,#e9e9e9);padding:30px 20px;font-family:Arial, Helvetica, sans-serif;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;box-shadow:0 6px 20px rgba(0,0,0,0.08);padding:40px 32px;line-height:1.6;">
            <div style="text-align:center;margin-bottom:28px;">
              <img src="https://leap-events.vercel.app/assets/logo.svg" alt="Leap Logo" style="height:55px;width:135px;display:inline-block;margin:0 auto;" />
              <h2 style="margin:24px 0 0;color:#5686DA;font-size:27px;font-weight:700;">New Contact Form Submission</h2>
            </div>

            <table style="width:100%;border-collapse:collapse;font-size:15px;color:#333;margin-top:20px;">
              <tr>
                <td style="padding:12px 0;font-weight:600;width:160px;color:#555;">Name:</td>
                <td style="padding:12px 0;">${fullName || ''}</td>
              </tr>
              <tr style="background:#fafafa;">
                <td style="padding:12px 0;font-weight:600;color:#555;">Email:</td>
                <td style="padding:12px 0;">${email}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;font-weight:600;color:#555;">Phone:</td>
                <td style="padding:12px 0;">${phone || ''}</td>
              </tr>
              <tr style="background:#fafafa;">
                <td style="padding:12px 0;font-weight:600;color:#555;vertical-align:top;">Message:</td>
                <td style="padding:12px 0;">${message || ''}</td>
              </tr>
            </table>

            <div style="text-align:center;margin-top:32px;">
              <a href="mailto:${email}" style="display:inline-block;background:#5686DA;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:15px;font-weight:bold;box-shadow:0 3px 6px rgba(0,0,0,0.1);">
                Reply to Inquiry
              </a>
            </div>

            <div style="margin-top:40px;text-align:center;color:#999;font-size:13px;border-top:1px solid #eee;padding-top:16px;">
              © ${new Date().getFullYear()} Leap Events. All rights reserved.
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: error.message },
      { status: 500 }
    );
  }
}