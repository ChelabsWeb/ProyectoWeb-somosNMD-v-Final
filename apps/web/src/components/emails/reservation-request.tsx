import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ReservationRequestEmailProps {
  applicantName: string;
  applicantEmail: string;
  timeSlot: string;
  sessionType: string;
  confirmUrl: string;
  rejectUrl: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const ReservationRequestEmail = ({
  applicantName,
  applicantEmail,
  timeSlot,
  sessionType,
  confirmUrl,
  rejectUrl,
}: ReservationRequestEmailProps) => {

  return (
    <Html>
      <Head />
      <Preview>Nueva solicitud de reserva de {applicantName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>NUEVA RESERVA</Heading>
          
          <Text style={text}>
            Has recibido una nueva solicitud de reserva para el NMD Studio.
          </Text>

          <Section style={detailsContainer}>
            <Text style={detailItem}>
              <strong>Nombre:</strong> {applicantName}
            </Text>
            <Text style={detailItem}>
              <strong>Email:</strong> {applicantEmail}
            </Text>
            <Text style={detailItem}>
              <strong>Horario:</strong> {timeSlot}
            </Text>
            <Text style={detailItem}>
              <strong>Modalidad:</strong> {sessionType}
            </Text>
          </Section>

          <Section style={btnContainer}>
            <Button style={btnConfirm} href={confirmUrl}>
              CONFIRMAR RESERVA
            </Button>
            <Button style={btnReject} href={rejectUrl}>
              RECHAZAR O CONFLICTO
            </Button>
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

const detailItem = {
  color: "#000000",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "12px 0",
  fontWeight: "500",
};

const btnContainer = {
  textAlign: "center" as const,
  marginTop: "32px",
};

const btnConfirm = {
  backgroundColor: "#000000",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "800",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "16px 0",
  marginBottom: "16px",
  textTransform: "uppercase" as const,
  border: "4px solid #000000",
};

const btnReject = {
  backgroundColor: "transparent",
  border: "4px solid #000000",
  color: "#000000",
  fontSize: "16px",
  fontWeight: "800",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "14px 0",
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

export default ReservationRequestEmail;
