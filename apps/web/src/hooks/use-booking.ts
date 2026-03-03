import { useQuery } from "@tanstack/react-query";
import { getAvailableSlots } from "@/lib/actions/booking";

export function useBookingSlots(date: Date | undefined) {
  return useQuery({
    queryKey: ["booking-slots", date?.toISOString()],
    queryFn: async () => {
      if (!date) return [];
      const res = await getAvailableSlots(date.toISOString());
      if (!res.success) {
        if (res.error) {
          console.error("Booking validation error:", res.error);
          throw new Error(`${res.message}: ${JSON.stringify(res.error)}`);
        }
        throw new Error(res.message || "Error fetching slots");
      }
      return res.data || [];
    },
    enabled: !!date,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
