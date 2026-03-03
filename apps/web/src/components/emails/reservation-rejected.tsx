import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";

interface ReservationRejectedEmailProps {
  applicantName: string;
  timeSlot: string;
  sessionType?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const ReservationRejectedEmail = ({
  applicantName,
  timeSlot,
  sessionType,
}: ReservationRejectedEmailProps) => {

  return (
    <Html>
      <Head />
      <Preview>Actualización sobre tu solicitud de reserva en NMD Studio</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>HORARIO NO DISPONIBLE</Heading>
          
          <Text style={text}>
            Hola {applicantName}.
          </Text>
          <Text style={text}>
            Lamentamos informarte que el horario que solicitaste (<strong>{timeSlot}</strong>) ya no se encuentra disponible porque fue asignado a otro artista recientemente.
          </Text>

          <Section style={detailsContainer}>
            <Text style={text}>
              Te invitamos a buscar un nuevo espacio disponible en nuestra plataforma.
            </Text>
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <Link href={baseUrl} style={btnLink}>
                BUSCAR NUEVO HORARIO
              </Link>
            </div>
          </Section>

          <Text style={footer}>
            NMD STUDIO SYSTEM — {new Date().getFullYear()}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles for the email maintaining the Brutalismo Elegante aesthetic where possible
// within the constraints of email clients.

const main = {
  backgroundColor: "#BDBDBB", // NMD background gray
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "100%",
  maxWidth: "600px",
};

const h1 = {
  color: "#E63026", // NMD Primary Red/Orange
  fontSize: "32px",
  fontWeight: "900",
  letterSpacing: "-0.05em",
  lineHeight: "1.2",
  margin: "24px 0",
  textAlign: "center" as const,
  textTransform: "uppercase" as const,
};

const text = {
  color: "#000000",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
  fontWeight: "600",
};

const detailsContainer = {
  backgroundColor: "#BDBDBB",
  padding: "24px",
  margin: "32px 0",
  border: "4px solid #000000",
  boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
};

const btnLink = {
  backgroundColor: "#000000",
  border: "4px solid #000000",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "800",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 24px",
  textTransform: "uppercase" as const,
};

const footer = {
  color: "#000000",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "48px 0 0",
  textAlign: "center" as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  fontWeight: "600",
};

export default ReservationRejectedEmail;
