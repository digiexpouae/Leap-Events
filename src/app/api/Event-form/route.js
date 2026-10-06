import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { validateStep } from '@/app/event-form/briefSchema';

const VALIDATED_STEPS = [2, 3, 4, 5, 6, 7, 8, 9];

// User text goes into the HTML email, so escape it
const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const list = (arr) => (Array.isArray(arr) && arr.length ? arr.join(', ') : '—');
const text = (value) => (value ? String(value) : '—');

export async function POST(req) {
  try {
    const data = await req.json();

    // Same rules as the form
    const errors = VALIDATED_STEPS.reduce((acc, step) => ({ ...acc, ...validateStep(step, data) }), {});
    if (Object.keys(errors).length) {
      return NextResponse.json({ message: 'Please check the form fields', errors }, { status: 400 });
    }

    const sections = [
      ['Event Essentials', [
        ['Client / Company', data.clientName],
        ['Event Name', data.eventName],
        ['Event Date', `${data.eventDate} (${data.dateStatus})`],
      ]],
      ['Event Format', [
        ['Formats', list(data.formats)],
        ['Duration', data.duration],
      ]],
      ['Space and Build', [
        ['Length', data.length],
        ['Breadth / Width', data.width],
        ['Height Available', data.heightAvailable],
        ['Height Restriction', text(data.heightRestriction)],
        ['Size Guide', data.sizeGuide],
        ['Site Notes', text(data.siteNotes)],
      ]],
      ['Location and Audience', [
        ['Primary Audience', list(data.audience)],
        ['Expected Attendance', data.attendance],
        ['Emirate', data.emirate],
        ['Venue', data.venueDetails],
      ]],
      ['Food and Beverage', [
        ['Main Requirement', data.fbRequirement],
        ['Service Styles', list(data.serviceStyles)],
        ['Dietary / Cuisine Notes', text(data.fbNotes)],
      ]],
      ['Entertainment', [
        ['Selected', list(data.entertainment)],
        ['Notes', text(data.entertainmentNotes)],
      ]],
      ['Creative Direction', [
        ['Short Description', data.creativeDescription],
        ['What Matters Most', list(data.priorities)],
        ['Anything Else', text(data.notes)],
      ]],
      ['Contact', [
        ['Name', data.name],
        ['Email', data.email],
        ['Phone', data.phone],
      ]],
    ];

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
      replyTo: data.email,
      subject: `📩 New Event Brief: ${String(data.eventName).replace(/[\r\n]/g, ' ')} (${String(data.clientName).replace(/[\r\n]/g, ' ')})`,
      text: sections
        .map(([title, rows]) => `${title.toUpperCase()}\n${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}`)
        .join('\n\n'),
      html: `
        <div style="background:linear-gradient(135deg,#f7f7f7,#e9e9e9);padding:30px 20px;font-family:Arial, Helvetica, sans-serif;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;box-shadow:0 6px 20px rgba(0,0,0,0.08);padding:40px 32px;line-height:1.6;">
            <div style="text-align:center;margin-bottom:28px;">
              <img src="https://leap-events.vercel.app/assets/logo.svg" alt="Leap Logo" style="height:55px;width:135px;display:inline-block;margin:0 auto;" />
              <h2 style="margin:24px 0 0;color:#5686DA;font-size:27px;font-weight:700;">New Event Brief</h2>
            </div>

            ${sections
              .map(
                ([title, rows]) => `
            <h3 style="margin:24px 0 8px;color:#5686DA;font-size:15px;text-transform:uppercase;border-bottom:1px solid #eee;padding-bottom:6px;">${escapeHtml(title)}</h3>
            <table style="width:100%;border-collapse:collapse;font-size:15px;color:#333;">
              ${rows
                .map(
                  ([label, value], i) => `
              <tr${i % 2 ? ' style="background:#fafafa;"' : ''}>
                <td style="padding:10px 0;font-weight:600;width:190px;color:#555;vertical-align:top;">${escapeHtml(label)}:</td>
                <td style="padding:10px 0;white-space:pre-wrap;word-break:break-word;">${escapeHtml(value)}</td>
              </tr>`
                )
                .join('')}
            </table>`
              )
              .join('')}

            <div style="text-align:center;margin-top:32px;">
              <a href="mailto:${encodeURIComponent(data.email)}" style="display:inline-block;background:#5686DA;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:15px;font-weight:bold;box-shadow:0 3px 6px rgba(0,0,0,0.1);">
                Reply to ${escapeHtml(data.name)}
              </a>
            </div>

            <div style="margin-top:40px;text-align:center;color:#999;font-size:13px;border-top:1px solid #eee;padding-top:16px;">
              © ${new Date().getFullYear()} Leap Events. All rights reserved.
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Event brief sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Event brief email error:', error);
    return NextResponse.json({ message: 'Failed to send the event brief' }, { status: 500 });
  }
}
