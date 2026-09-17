import {
    Ellipsis,
    Heart,
    MessageCircle,
    UserRound,
  } from "lucide-react";

  import CommentPanel from "./comments/CommentPanel";

  function FeedPost({ post }) {
    return (
      <article className="rounded-card border border-line bg-white p-5 shadow-sm sm:p-6">
        {/* Post header */}
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-navy text-white">
            <UserRound className="h-5 w-5" aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-brand-navy-dark">
                {post.author.fullName}
              </h3>

              <span className="rounded-full bg-brand-green/10 px-2.5 py-1 text-[10px] font-bold text-brand-green">
                {post.author.fieldOfStudy}
              </span>
            </div>

            <p className="mt-1 text-xs text-muted">{post.createdAt}</p>
          </div>

          <button
            type="button"
            aria-label="Post options"
            className="grid h-9 w-9 place-items-center rounded-xl text-muted transition hover:bg-page hover:text-brand-navy"
          >
            <Ellipsis className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Post content */}
        <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-slate-600">
          {post.content}
        </p>

        {/* First post image */}
        {post.images[0] && (
          <img
            src={post.images[0]}
            alt="Post"
            className="mt-4 h-60 w-full rounded-2xl object-cover sm:h-80"
          />
        )}

        {/* Post actions */}
        <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-rose-50
            hover:text-rose-600"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            {post.likesCount} likes
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-brand-green/10
            hover:text-brand-green"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {post.commentsCount} comments
          </button>
        </div>

        <CommentPanel />
      </article>
    );
  }

  export default FeedPost;