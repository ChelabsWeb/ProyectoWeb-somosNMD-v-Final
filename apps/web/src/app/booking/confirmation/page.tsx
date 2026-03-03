import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Estado de Reserva - NMD Studio',
  description: 'Confirmación de la acción sobre la solicitud de reserva.',
};

export default async function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: { status?: string; action?: string; message?: string };
}) {
  const { status, action, message } = await searchParams;
  
  const isSuccess = status === 'success';
  const isConfirm = action === 'confirm';
  const isReject = action === 'reject';
  
  let title = "Estado de la Reserva";
  let description = message || "Hubo un error procesando tu solicitud.";
  let colorClass = "text-red-500"; // Default error color
  
  if (isSuccess) {
    if (isConfirm) {
      title = "Reserva Confirmada";
      description = "La solicitud ha sido confirmada correctamente. Se registrará en el calendario.";
      colorClass = "text-[#FF4500]"; // Tron Orange
    } else if (isReject) {
      title = "Reserva Rechazada";
      description = "La solicitud ha sido rechazada exitosamente.";
      colorClass = "text-[#FF4500]";
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
      <div className="relative w-full max-w-md overflow-hidden rounded-none border-4 border-black bg-background p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className={`mb-4 text-3xl font-extrabold uppercase tracking-tight ${colorClass}`}>
          {title}
        </h1>
        <p className="mb-8 text-lg font-medium text-foreground">
          {description}
        </p>
        <Link 
          href="/"
          className="inline-block rounded-none bg-black px-6 py-3 font-bold uppercase text-white transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(255,69,0,1)] hover:bg-[#FF4500]"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
