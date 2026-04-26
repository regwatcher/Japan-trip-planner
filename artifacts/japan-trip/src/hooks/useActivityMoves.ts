import { useQueryClient } from "@tanstack/react-query";
import {
  useGetActivityMoves,
  useSetActivityMove,
  useDeleteActivityMove,
  getGetActivityMovesQueryKey,
} from "@workspace/api-client-react";
import type { ActivityMove } from "@workspace/api-client-react";

export type { ActivityMove };

export function useActivityMoves() {
  const queryClient = useQueryClient();
  const { data: moves = [] } = useGetActivityMoves();
  const setMoveMutation = useSetActivityMove();
  const deleteMoveMutation = useDeleteActivityMove();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: getGetActivityMovesQueryKey() });

  const getMoveForActivity = (dayNumber: number, activityIndex: number): ActivityMove | undefined =>
    moves.find((m) => m.dayNumber === dayNumber && m.activityIndex === activityIndex);

  const getActivitiesMovedToDay = (targetDayNumber: number): ActivityMove[] =>
    moves.filter((m) => m.targetDayNumber === targetDayNumber);

  const setMove = (
    dayNumber: number,
    activityIndex: number,
    targetDayNumber: number,
    movedBy: string
  ) => {
    setMoveMutation.mutate(
      { dayNumber, activityIndex, data: { targetDayNumber, movedBy } },
      { onSuccess: invalidate }
    );
  };

  const deleteMove = (dayNumber: number, activityIndex: number) => {
    deleteMoveMutation.mutate(
      { dayNumber, activityIndex },
      { onSuccess: invalidate }
    );
  };

  return {
    moves,
    getMoveForActivity,
    getActivitiesMovedToDay,
    setMove,
    deleteMove,
    isPending: setMoveMutation.isPending || deleteMoveMutation.isPending,
  };
}
