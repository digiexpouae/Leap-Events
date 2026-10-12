// User text goes into the HTML email, so escape it
export const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const FONT = "'Montserrat','DM Sans',Arial,Helvetica,sans-serif";

const BRAND = {
  primary: '#5686DA',
  light: '#F0FBFF',
  border: '#DCE6F5',
  label: '#6B7C99',
  text: '#1B2438',
};

export function buildEmailHtml(data, sections) {
  const sectionHtml = ([title, rows]) => `
        <tr>
          <td style="padding:0 40px 20px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border:1px solid ${BRAND.border};border-radius:12px;overflow:hidden;">
              <tr>
                <td colspan="2" style="background:${BRAND.light};padding:12px 20px;border-bottom:1px solid ${BRAND.border};color:${BRAND.primary};font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">${escapeHtml(title)}</td>
              </tr>
              ${rows
                .map(
                  ([label, value], i) => `
              <tr>
                <td style="padding:13px 12px 13px 20px;width:200px;color:${BRAND.label};font-size:13px;font-weight:600;vertical-align:top;${i ? `border-top:1px solid ${BRAND.border};` : ''}">${escapeHtml(label)}</td>
                <td style="padding:13px 20px 13px 0;color:${BRAND.text};font-size:14px;line-height:1.55;vertical-align:top;white-space:pre-wrap;word-break:break-word;${i ? `border-top:1px solid ${BRAND.border};` : ''}">${escapeHtml(value)}</td>
              </tr>`
                )
                .join('')}
            </table>
          </td>
        </tr>`;

  return `
    <style>@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');</style>
    <div style="background:#EAF1FB;padding:32px 12px;font-family:${FONT};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:760px;margin:0 auto;border-collapse:collapse;background:#ffffff;border-radius:16px;overflow:hidden;">
        <tr>
          <td style="padding:28px 40px;border-bottom:4px solid ${BRAND.primary};">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td align="left" style="vertical-align:middle;">
                  <img src="https://leap-events.vercel.app/assets/logo.svg" alt="Leap Events" width="105" height="60" style="display:block;width:105px;height:60px;border:0;" />
                </td>
                <td align="right" style="vertical-align:middle;">
                  <span style="display:inline-block;background:${BRAND.light};color:${BRAND.primary};border:1px solid ${BRAND.border};border-radius:999px;padding:7px 16px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">New Event Brief</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:${BRAND.primary};padding:36px 40px;">
            <div style="color:#DCE6F5;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Event Name</div>
            <div style="color:#ffffff;font-size:30px;line-height:1.25;font-weight:700;margin-top:8px;">${escapeHtml(data.eventName)}</div>
            <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
              <tr>
                <td style="padding-right:32px;">
                  <div style="color:#DCE6F5;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Client</div>
                  <div style="color:#ffffff;font-size:15px;font-weight:600;margin-top:3px;">${escapeHtml(data.clientName)}</div>
                </td>
                <td>
                  <div style="color:#DCE6F5;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Date</div>
                  <div style="color:#ffffff;font-size:15px;font-weight:600;margin-top:3px;">${escapeHtml(data.eventDate)}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr><td style="height:28px;line-height:28px;font-size:0;">&nbsp;</td></tr>
        ${sections.map(sectionHtml).join('')}
        <tr>
          <td align="center" style="padding:12px 40px 40px;">
            <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background:${BRAND.primary};color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:999px;font-size:15px;font-weight:600;">Reply to ${escapeHtml(data.name)}</a>
          </td>
        </tr>
        <tr>
          <td align="center" style="background:${BRAND.light};border-top:1px solid ${BRAND.border};padding:20px 40px;color:${BRAND.label};font-size:12px;">
            © ${new Date().getFullYear()} Leap Events. All rights reserved.
          </td>
        </tr>
      </table>
    </div>
  `;
}
