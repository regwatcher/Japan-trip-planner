import { useQueryClient } from "@tanstack/react-query";
import {
  useGetReservations,
  useSetReservation,
  getGetReservationsQueryKey,
} from "@workspace/api-client-react";
import type { Reservation } from "@workspace/api-client-react";

export type { Reservation };

export function useReservations() {
  const queryClient = useQueryClient();
  const { data: reservations = [] } = useGetReservations();
  const setMutation = useSetReservation();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: getGetReservationsQueryKey() });

  const getForActivity = (dayNumber: number, activityIndex: number): Reservation | undefined =>
    reservations.find(
      (r) => r.dayNumber === dayNumber && r.activityIndex === activityIndex
    );

  const setReservation = (
    dayNumber: number,
    activityIndex: number,
    required: boolean,
    deadline: string | null,
    updatedBy: string
  ) => {
    setMutation.mutate(
      { dayNumber, activityIndex, data: { required, deadline: deadline ?? undefined, updatedBy } },
      { onSuccess: invalidate }
    );
  };

  return {
    reservations,
    getForActivity,
    setReservation,
    isPending: setMutation.isPending,
  };
}
