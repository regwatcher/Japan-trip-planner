import { useQueryClient } from "@tanstack/react-query";
import {
  useGetCustomActivityVotes,
  useCastCustomActivityVote,
  useDeleteCustomActivityVote,
  getGetCustomActivityVotesQueryKey,
} from "@workspace/api-client-react";

export type VoteType = "up" | "neutral" | "down";

export function useCustomActivityVotes() {
  const queryClient = useQueryClient();
  const { data: votes = [] } = useGetCustomActivityVotes();
  const castMutation = useCastCustomActivityVote();
  const deleteMutation = useDeleteCustomActivityVote();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: getGetCustomActivityVotesQueryKey() });

  const getVotesForActivity = (customActivityId: number) =>
    votes.filter((v) => v.customActivityId === customActivityId);

  const castVote = (voter: string, customActivityId: number, voteType: VoteType) => {
    const current = votes.find(
      (v) => v.voter === voter && v.customActivityId === customActivityId
    );
    if (current?.voteType === voteType) {
      deleteMutation.mutate({ voter, customActivityId }, { onSuccess: invalidate });
    } else {
      castMutation.mutate(
        { voter, customActivityId, data: { voteType } },
        { onSuccess: invalidate }
      );
    }
  };

  return { getVotesForActivity, castVote };
}
