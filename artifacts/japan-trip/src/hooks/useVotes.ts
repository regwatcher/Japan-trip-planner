import { useQueryClient } from "@tanstack/react-query";
import {
  useGetVotes,
  useCastVote,
  useDeleteVote,
  getGetVotesQueryKey,
} from "@workspace/api-client-react";
import type { Vote } from "@workspace/api-client-react";
import { itinerary } from "../data/itinerary";
import { useVoterContext } from "@/contexts/VoterContext";

export const FAMILY_MEMBERS = ["Olivier", "Katja", "Alix", "Chloé", "Maxime"] as const;
export type FamilyMember = (typeof FAMILY_MEMBERS)[number];

export type VoteType = "up" | "neutral" | "down";

export type VotesRecord = Record<string, Record<string, VoteType>>;

function votesToRecord(votes: Vote[]): VotesRecord {
  const record: VotesRecord = {};
  for (const v of votes) {
    const key = `${v.dayNumber}-${v.activityIndex}`;
    if (!record[key]) record[key] = {};
    record[key][v.voter] = v.voteType;
  }
  return record;
}

export function useVotes() {
  const { currentVoter, setCurrentVoter } = useVoterContext();
  const queryClient = useQueryClient();
  const { data: rawVotes = [] } = useGetVotes();
  const castVoteMutation = useCastVote();
  const deleteVoteMutation = useDeleteVote();

  const votes = votesToRecord(rawVotes);

  const castVote = (dayNumber: number, activityIndex: number, type: VoteType) => {
    if (!currentVoter) return;

    const key = `${dayNumber}-${activityIndex}`;
    const currentVote = votes[key]?.[currentVoter];

    if (currentVote === type) {
      deleteVoteMutation.mutate(
        { voter: currentVoter, dayNumber, activityIndex },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetVotesQueryKey() });
          },
        }
      );
    } else {
      castVoteMutation.mutate(
        { voter: currentVoter, dayNumber, activityIndex, data: { voteType: type } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetVotesQueryKey() });
          },
        }
      );
    }
  };

  const getLeaderboard = () => {
    const scores: {
      dayNumber: number;
      activityIndex: number;
      activity: (typeof itinerary)[0]["activities"][0];
      upvotes: number;
      downvotes: number;
      neutrals: number;
      netScore: number;
      totalVotes: number;
    }[] = [];

    itinerary.forEach((day) => {
      day.activities.forEach((activity, index) => {
        if (activity.isIncluded) return;

        const key = `${day.dayNumber}-${index}`;
        const activityVotes = votes[key] || {};

        let upvotes = 0;
        let downvotes = 0;
        let neutrals = 0;

        Object.values(activityVotes).forEach((vote) => {
          if (vote === "up") upvotes++;
          if (vote === "down") downvotes++;
          if (vote === "neutral") neutrals++;
        });

        const netScore = upvotes - downvotes;
        if (upvotes > 0 || downvotes > 0 || neutrals > 0) {
          scores.push({
            dayNumber: day.dayNumber,
            activityIndex: index,
            activity,
            upvotes,
            downvotes,
            neutrals,
            netScore,
            totalVotes: upvotes + downvotes + neutrals,
          });
        }
      });
    });

    return scores.sort((a, b) => b.netScore - a.netScore || b.totalVotes - a.totalVotes);
  };

  return {
    currentVoter,
    setCurrentVoter,
    votes,
    castVote,
    getLeaderboard,
  };
}
