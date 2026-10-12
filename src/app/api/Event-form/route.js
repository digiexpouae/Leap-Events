import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { validateStep } from '@/app/event-form/briefSchema';
import { buildEmailHtml } from './emailTemplate';

const VALIDATED_STEPS = [2, 3, 4, 5, 6, 7, 8, 9];

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
      html: buildEmailHtml(data, sections),
    });

    return NextResponse.json({ message: 'Event brief sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Event brief email error:', error);
    return NextResponse.json({ message: 'Failed to send the event brief' }, { status: 500 });
  }
}
