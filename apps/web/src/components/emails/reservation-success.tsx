import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ReservationSuccessEmailProps {
  applicantName: string;
  timeSlot: string;
  sessionType: string;
}

export const ReservationSuccessEmail = ({
  applicantName,
  timeSlot,
  sessionType,
}: ReservationSuccessEmailProps) => {

  return (
    <Html>
      <Head />
      <Preview>¡Sesión de estudio confirmada!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>¡RESERVA CONFIRMADA!</Heading>
          
          <Text style={text}>
            Hola {applicantName}. Tu solicitud de reserva ha sido aprobada. ¡Te esperamos en el NMD Studio!
          </Text>

          <Section style={detailsContainer}>
            <Text style={detailItem}>
              <strong>Horario:</strong> {timeSlot}
            </Text>
            <Text style={detailItem}>
              <strong>Modalidad:</strong> {sessionType}
            </Text>
          </Section>

          <Text style={text}>
            Por favor, sé puntual. El evento ya ha sido registrado en nuestro calendario.
          </Text>

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

const detailItem = {
  color: "#000000",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "12px 0",
  fontWeight: "500",
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

export default ReservationSuccessEmail;
