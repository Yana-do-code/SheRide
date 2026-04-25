const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Sends a branded welcome email to a newly registered user.
 * @param {string} toEmail  - recipient address
 * @param {string} firstName - user's first name
 */
async function sendWelcomeEmail(toEmail, firstName) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to SheRide</title>
</head>
<body style="margin:0;padding:0;background:#fff0f6;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff0f6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(233,30,140,0.1);max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#e91e8c,#880e4f);padding:40px 48px;text-align:center;">
              <div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:16px;">
                <span style="background:rgba(255,255,255,0.2);color:white;width:44px;height:44px;border-radius:50%;display:inline-block;line-height:44px;font-size:1.3rem;text-align:center;">♀</span>
                <span style="color:white;font-size:2rem;font-weight:800;letter-spacing:-0.5px;">She<span style="color:#f48fb1;">Ride</span></span>
              </div>
              <p style="color:rgba(255,255,255,0.8);margin:0;font-size:0.88rem;letter-spacing:1.5px;text-transform:uppercase;">Women-Only Bus Service</p>
            </td>
          </tr>

          <!-- Hero line -->
          <tr>
            <td style="background:#fce4ec;padding:20px 48px;text-align:center;">
              <p style="margin:0;color:#c2185b;font-size:0.9rem;font-weight:600;">
                ♥ &nbsp;Safe Journey, Happy Journey&nbsp; ♥
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px 48px 32px;">
              <h1 style="color:#1a0a12;font-size:1.7rem;font-weight:800;margin:0 0 16px;">
                Welcome aboard, ${firstName}! 🎉
              </h1>
              <p style="color:#6b7280;font-size:0.97rem;line-height:1.75;margin:0 0 24px;">
                We're so excited to have you join the <strong style="color:#d81b60;">SheRide</strong> family —
                a community built exclusively for women who deserve to travel safely, comfortably, and confidently.
              </p>

              <!-- Feature pills -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:4px;">
                    <div style="background:#fff0f6;border-radius:12px;padding:16px;text-align:center;">
                      <div style="font-size:1.6rem;margin-bottom:6px;">🛡️</div>
                      <div style="font-size:0.82rem;font-weight:700;color:#c2185b;">100% Safe</div>
                      <div style="font-size:0.78rem;color:#6b7280;">Women-only rides</div>
                    </div>
                  </td>
                  <td style="padding:4px;">
                    <div style="background:#fff0f6;border-radius:12px;padding:16px;text-align:center;">
                      <div style="font-size:1.6rem;margin-bottom:6px;">📍</div>
                      <div style="font-size:0.82rem;font-weight:700;color:#c2185b;">Live Tracking</div>
                      <div style="font-size:0.78rem;color:#6b7280;">Always know where you are</div>
                    </div>
                  </td>
                  <td style="padding:4px;">
                    <div style="background:#fff0f6;border-radius:12px;padding:16px;text-align:center;">
                      <div style="font-size:1.6rem;margin-bottom:6px;">📞</div>
                      <div style="font-size:0.82rem;font-weight:700;color:#c2185b;">24/7 Support</div>
                      <div style="font-size:0.78rem;color:#6b7280;">Help is always available</div>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="color:#6b7280;font-size:0.95rem;line-height:1.7;margin:0 0 32px;">
                You can now search for buses, book your seats, and track your journey — all in one place.
                Your first ride awaits! 🚌💕
              </p>

              <!-- CTA button -->
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="background:linear-gradient(135deg,#e91e8c,#880e4f);border-radius:50px;padding:14px 36px;text-align:center;">
                    <a href="http://localhost:5173/results"
                      style="color:white;text-decoration:none;font-weight:700;font-size:0.97rem;display:block;">
                      Book Your First Ride →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color:#9ca3af;font-size:0.82rem;line-height:1.6;margin:0;border-top:1px solid #fce4ec;padding-top:24px;">
                If you didn't create this account, please ignore this email or
                <a href="mailto:sherideforher@gmail.com" style="color:#d81b60;">contact our support team</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#880e4f;padding:28px 48px;text-align:center;">
              <p style="color:rgba(255,255,255,0.5);font-size:0.78rem;margin:0 0 8px;">
                © ${new Date().getFullYear()} SheRide. All rights reserved.
              </p>
              <p style="color:rgba(255,255,255,0.4);font-size:0.74rem;margin:0;">
                Dehradun, India &nbsp;|&nbsp; sherideforher@gmail.com &nbsp;|&nbsp; +91 9548503869
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;

  await transporter.sendMail({
    from: `"SheRide 🚌" <${process.env.SMTP_USER}>`,
    to:   toEmail,
    subject: `Welcome to SheRide, ${firstName}! 🎉 Safe Journey Awaits`,
    html,
  });
}

module.exports = { sendWelcomeEmail };
