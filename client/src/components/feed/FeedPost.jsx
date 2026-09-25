import { Ellipsis, Heart, MessageCircle } from "lucide-react";
import getInitials from "../../utils/getInitials";

export default function FeedPost({ post }) {
  const authorName = post.author?.fullName || "Deleted user";
  const profilePicture = post.author?.profilePicture;
  const images = post.images || [];
  const likesCount = post.likesCount ?? 0;
  const commentsCount = post.commentsCount ?? 0;

  const hasMultipleImages = images.length > 1;

  return (
    <article className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-start gap-3">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt={`${authorName}'s profile`}
            className="h-11 w-11 shrink-0 rounded-2xl object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={authorName}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-lime to-brand-green text-sm font-bold text-brand-navy-dark"
          >
            {getInitials(authorName)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-brand-navy-dark">{authorName}</h3>

          <p className="mt-1 text-xs text-muted">{post.createdAt}</p>
        </div>

        <button
          type="button"
          aria-label="Post options"
          className="grid h-9 w-9 place-items-center rounded-xl text-muted transition hover:bg-page hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
        >
          <Ellipsis className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-slate-600">
        {post.content}
      </p>

      {images.length > 0 && (
        <div
          className={`mt-4 grid gap-2 ${
            hasMultipleImages ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {images.map((image, index) => (
            <img
              key={`${post.id}-image-${index}`}
              src={image}
              alt={`Post attachment ${index + 1} by ${authorName}`}
              loading="lazy"
              className={`w-full rounded-2xl object-cover ${
                hasMultipleImages ? "h-44 sm:h-56" : "h-60 sm:h-80"
              }`}
            />
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
        <button
          type="button"
          className="cursor-pointer inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
        >
          <Heart className="h-4 w-4" aria-hidden="true" />
          {likesCount} {likesCount === 1 ? "like" : "likes"}
        </button>

        <span className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {commentsCount} {commentsCount === 1 ? "comment" : "comments"}
        </span>
      </div>
    </article>
  );
}
