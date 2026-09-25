import { Ellipsis, Heart, MessageCircle } from "lucide-react";
import getInitials from "../../utils/getInitials";

function ProfilePostCard({ post }) {
  const authorName = post.author?.fullName;
  const profilePicture = post.author?.profilePicture;
  const fieldOfStudy = post.author?.fieldOfStudy;
  const image = post.images?.[0];
  const likesCount = post.likesCount;
  const commentsCount = post.commentsCount;
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
          <h3 className="font-bold text-brand-navy-dark">Mehdi El Hajjame</h3>

          <p className="text-xs text-slate-400">
            {fieldOfStudy} · {post.time}
          </p>
        </div>

        <button
          type="button"
          aria-label="Post options"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-brand-navy"
        >
          <Ellipsis className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-4 text-[15px] leading-7 text-slate-600">
        {post.content && (
          <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-slate-600">
            {post.content}
          </p>
        )}
        {image && (
          <img
            src={image}
            alt={`Post attachment by ${authorName}`}
            loading="lazy"
            className="mt-4 h-60 w-full rounded-2xl object-cover sm:h-80"
          />
        )}
      </p>

      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
        >
          <Heart className="h-4 w-4" aria-hidden="true" />
          {likesCount}
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-brand-green"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {commentsCount} comments
        </button>
      </div>
    </article>
  );
}

export default ProfilePostCard;
