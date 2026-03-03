import * as React from 'react';

interface BookingEmailProps {
  name: string;
  email: string;
  message: string;
  dateStr?: string;
  bookingRef?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'; // Update with proper production URL

/**
 * A highly stylized email template reflecting the "Tron x Renaissance" aesthetic.
 * Utilizes standard web-safe fonts fallbacks and robust tables for email client compatibility.
 */
export const BookingEmailTemplate: React.FC<Readonly<BookingEmailProps>> = ({
  name,
  email,
  message,
  dateStr = new Date().toLocaleDateString(),
  bookingRef = `NMD-${Math.floor(Math.random() * 100000)}`,
}) => {
  return (
    <html lang="es">
      {/* eslint-disable @next/next/no-head-element */}
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NMD_COLLAB_REQ: {bookingRef}</title>
      </head>
      <body style={main}>
        <div style={container}>
          {/* Header */}
          <table width="100%" border={0} cellSpacing={0} cellPadding={0}>
            <tr>
              <td align="center" style={headerCell}>
                <h1 style={logoText}>NOMADES</h1>
                <p style={systemText}>ACCESO_SISTEMA {"//"} VERIFICADO</p>
              </td>
            </tr>
          </table>

          {/* Pill Container for Content */}
          <div style={pillContainer}>
            <table width="100%" border={0} cellSpacing={0} cellPadding={0}>
              <tr>
                <td style={contentPadding}>
                  <p style={greeting}>HOLA {name.toUpperCase()},</p>
                  <p style={paragraph}>
                    Hemos recibido correctamente tu registro en nuestros sistemas.
                    Estamos evaluando tu requerimiento y procesaremos la información a la brevedad.
                  </p>

                  <div style={dataBox}>
                    <table width="100%" border={0}>
                      <tr>
                        <td style={dataLabel}>REF_ID:</td>
                        <td style={dataValue}>{bookingRef}</td>
                      </tr>
                      <tr>
                        <td style={dataLabel}>MAIL:</td>
                        <td style={dataValue}>{email}</td>
                      </tr>
                      <tr>
                        <td style={dataLabel}>SYS_DATE:</td>
                        <td style={dataValue}>{dateStr}</td>
                      </tr>
                    </table>
                  </div>

                  <p style={messageHeader}>{"///"} ENTRADA_DE_DATOS [MEMORIA]:</p>
                  <div style={messageBox}>
                    <p style={messageContent}>{message}</p>
                  </div>

                  {/* Future action button */}
                  <table width="100%" border={0} cellSpacing={0} cellPadding={0} style={{ marginTop: '30px' }}>
                    <tr>
                      <td align="left">
                        <a href={`${baseUrl}`} style={actionButton}>
                          [ VERIFICAR_ESTADO ]
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>

          {/* Footer */}
          <table width="100%" border={0} cellSpacing={0} cellPadding={0}>
            <tr>
              <td align="center" style={footerCell}>
                <p style={footerNote}>NMD_SYS_MSG: ACCEDER_A_LA_DATA_BAJO_SU_PROPIO_RIESGO © 2024</p>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
  );
};

export default BookingEmailTemplate;

// --- Styles mapping (Inline CSS required for emails) ---

const main = {
  backgroundColor: '#000000',
  fontFamily: '"Courier New", Courier, monospace, system-ui',
  padding: '20px 0',
  color: '#FFFFFF',
};

const container = {
  margin: '0 auto',
  maxWidth: '600px',
  backgroundColor: '#0a0f1e', // nmd-blue
  border: '1px solid #333333',
  borderRadius: '24px',
  overflow: 'hidden',
};

const headerCell = {
  padding: '40px 20px',
  borderBottom: '1px solid #eb2c75', // nmd-pink accent
  backgroundColor: '#050a15',
  backgroundImage: 'radial-gradient(circle at 50% -20%, rgba(235, 44, 117, 0.4), transparent 70%)',
};

const logoText = {
  margin: '0',
  fontSize: '48px',
  fontWeight: 'bold',
  letterSpacing: '0.1em',
  color: '#FFFFFF',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const systemText = {
  margin: '10px 0 0 0',
  fontSize: '12px',
  color: '#FF4D00', // nmd-orange
  letterSpacing: '0.2em',
};

const pillContainer = {
  margin: '20px',
  backgroundColor: '#000000',
  border: '1px solid #444444',
  borderRadius: '40px', // Massive border radius
};

const contentPadding = {
  padding: '40px',
};

const greeting = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#FFFFFF',
  margin: '0 0 20px 0',
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#AAAAAA',
  margin: '0 0 30px 0',
};

const dataBox = {
  backgroundColor: '#050a15',
  border: '1px solid #333333',
  padding: '20px',
  marginBottom: '20px',
};

const dataLabel = {
  color: '#eb2c75',
  fontSize: '12px',
  width: '100px',
  paddingBottom: '8px',
};

const dataValue = {
  color: '#FFFFFF',
  fontSize: '12px',
  paddingBottom: '8px',
};

const messageHeader = {
  fontSize: '12px',
  color: '#FF4D00',
  letterSpacing: '0.1em',
  margin: '0 0 10px 0',
};

const messageBox = {
  borderLeft: '2px solid #eb2c75',
  padding: '10px 20px',
  backgroundColor: '#111111',
};

const messageContent = {
  margin: '0',
  fontSize: '14px',
  color: '#CCCCCC',
  lineHeight: '1.5',
};

const actionButton = {
  display: 'inline-block',
  padding: '16px 32px',
  backgroundColor: '#FF4D00',
  color: '#000000',
  textDecoration: 'none',
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '0.2em',
  borderRadius: '50px',
  border: '1px solid #FF4D00',
};

const footerCell = {
  padding: '20px',
  borderTop: '1px solid #333333',
  backgroundColor: '#050a15',
};

const footerNote = {
  margin: '0',
  fontSize: '10px',
  color: '#666666',
  letterSpacing: '0.1em',
};
