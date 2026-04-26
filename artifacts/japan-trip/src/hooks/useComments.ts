import { useQueryClient } from "@tanstack/react-query";
import {
  useGetComments,
  usePostComment,
  useDeleteComment,
  getGetCommentsQueryKey,
} from "@workspace/api-client-react";

export function useComments() {
  const queryClient = useQueryClient();
  const { data: comments = [] } = useGetComments();
  const postMutation = usePostComment();
  const deleteMutation = useDeleteComment();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: getGetCommentsQueryKey() });

  const getForActivity = (dayNumber: number, activityIndex: number) =>
    comments.filter((c) => c.dayNumber === dayNumber && c.activityIndex === activityIndex);

  const getForCustomActivity = (customActivityId: number) =>
    comments.filter((c) => c.customActivityId === customActivityId);

  const addComment = (data: {
    author: string;
    dayNumber: number;
    activityIndex?: number;
    customActivityId?: number;
    content: string;
  }) => {
    postMutation.mutate({ data }, { onSuccess: invalidate });
  };

  const deleteComment = (id: number) => {
    deleteMutation.mutate({ id }, { onSuccess: invalidate });
  };

  return { getForActivity, getForCustomActivity, addComment, deleteComment, isPending: postMutation.isPending };
}
