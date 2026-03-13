import { Resend } from "resend";

const resend = new Resend("re_baQvTnq5_J3U4Ged2e7XzfMizSuQm4Pjg");

async function test() {
  try {
    console.log("Sending email...");
    const { data, error } = await resend.emails.send({
      from: "Reserva Estudio <onboarding@resend.dev>",
      to: ["nmd.wav@gmail.com"],
      subject: "Test Email from Script",
      html: "<p>This is a test email.</p>"
    });
    
    if (error) {
      console.error("Resend Error:", JSON.stringify(error, null, 2));
    } else {
      console.log("Success! Data:", data);
    }
  } catch (err) {
    console.error("Exception:", err);
  }
}

test();
