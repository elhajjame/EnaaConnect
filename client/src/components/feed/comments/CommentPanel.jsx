import { SendHorizontal, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { createComment, getComments } from "../../../services/postService";
import { getApiErrorMessage } from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

function CommentPanel({ postId }) {
  const { user } = useAuth();
  const [commentsData, setCommentsData] = useState({
    comments: [],
    commentsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const newComment = await createComment(postId, content);

      setCommentsData((currentData) => ({
        comments: [...currentData.comments, newComment],
        commentsCount: newComment.commentsCount,
      }));

      setContent("");
    } catch (error) {
      setSubmitError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    async function loadComments() {
      try {
        setErrorMessage("");

        const commentsData = await getComments(postId);
        setCommentsData(commentsData);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }
    loadComments();
  }, []);
  return (
    <section
      aria-label="Post comments"
      className="mt-4 border-t border-line pt-4"
    >
      <div className="mb-4">
        <h3 className="text-sm font-bold text-brand-navy-dark">Comments</h3>
        <p className="mt-0.5 text-[11px] text-muted">
          {commentsData.commentsCount} comments
        </p>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <p role="status" className="text-sm text-muted">
            Loading comments...
          </p>
        )}

        {!isLoading && errorMessage && (
          <p role="alert" className="text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        {!isLoading && !errorMessage && commentsData.comments.length === 0 && (
          <p className="text-sm text-muted">No comments yet.</p>
        )}

        {!isLoading &&
          !errorMessage &&
          commentsData.comments.map((comment) => (
            <article key={comment.id} className="flex items-start gap-3">
              {comment.author?.profilePicture ? (
                <img
                  src={comment.author.profilePicture}
                  alt={`${comment.author.fullName}'s profile`}
                  className="h-9 w-9 shrink-0 rounded-xl object-cover"
                />
              ) : (
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-green text-white">
                  <UserRound className="h-4 w-4" aria-hidden="true" />
                </div>
              )}

              <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md bg-page px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-brand-navy-dark">
                    {comment.author?.id ? (
                      <Link
                        to={`/profile/${comment.author.id}`}
                        className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                      >
                        {comment.author.fullName}
                      </Link>
                    ) : (
                      comment.author?.fullName || "Deleted user"
                    )}
                  </h4>

                  {comment.author?.fieldOfStudy && (
                    <span className="rounded-full bg-brand-green/10 px-2 py-0.5 text-[10px] font-bold text-brand-green">
                      {comment.author.fieldOfStudy}
                    </span>
                  )}

                  <span className="ml-auto text-[10px] text-muted">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {comment.content}
                </p>
              </div>
            </article>
          ))}
      </div>

      {/* comment input */}
      <div className="mt-4 border-t border-line pt-4">
        <form onSubmit={handleSubmitComment} className="flex items-end gap-3">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={`${user.fullName}'s profile`}
              className="h-9 w-9 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-navy text-white">
              <UserRound className="h-4 w-4" aria-hidden="true" />
            </div>
          )}

          <div className="flex min-w-0 flex-1 items-end rounded-2xl border border-line bg-page p-1.5">
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              name="content"
              rows={1}
              maxLength={1000}
              aria-label="Write a comment"
              placeholder="Write a comment..."
              className="min-h-9 min-w-0 flex-1 resize-none bg-transparent px-2.5 py-2 text-sm text-brand-navy-dark outline-none placeholder:text-muted"
            />

            <button
              disabled={isSubmitting}
              type="submit"
              aria-label="Post comment"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-lime text-brand-navy-dark transition hover:bg-brand-green hover:text-white"
            >
              <SendHorizontal className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
        {submitError && (
          <p role="alert" className="mt-2 text-right text-xs text-red-700">
            {submitError}
          </p>
        )}
        <p className="mt-1.5 text-right text-[10px] text-muted">
          Maximum 1000 characters
        </p>
      </div>
    </section>
  );
}

export default CommentPanel;
