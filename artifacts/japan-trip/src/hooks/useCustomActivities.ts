import { useQueryClient } from "@tanstack/react-query";
import {
  useGetCustomActivities,
  useCreateCustomActivity,
  useDeleteCustomActivity,
  getGetCustomActivitiesQueryKey,
} from "@workspace/api-client-react";

export function useCustomActivities(dayNumber: number) {
  const queryClient = useQueryClient();
  const { data: all = [] } = useGetCustomActivities();
  const createMutation = useCreateCustomActivity();
  const deleteMutation = useDeleteCustomActivity();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: getGetCustomActivitiesQueryKey() });

  const dayActivities = all.filter((a) => a.dayNumber === dayNumber);

  const propose = (proposedBy: string, name: string, description?: string) => {
    createMutation.mutate(
      { data: { dayNumber, proposedBy, name, description } },
      { onSuccess: invalidate }
    );
  };

  const deleteActivity = (id: number) => {
    deleteMutation.mutate({ id }, { onSuccess: invalidate });
  };

  return {
    customActivities: dayActivities,
    propose,
    deleteActivity,
    isPending: createMutation.isPending,
  };
}
