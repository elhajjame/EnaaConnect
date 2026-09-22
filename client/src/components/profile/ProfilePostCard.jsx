import { Ellipsis, Heart, MessageCircle } from "lucide-react";

import profileAvatar from "../../assets/profile-avatar.png";

function ProfilePostCard({ post }) {
  return (
    <article className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-start gap-3">
        <img
          src={profileAvatar}
          alt=""
          className="h-11 w-11 shrink-0 rounded-2xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-brand-navy-dark">Mehdi El Hajjame</h3>

          <p className="text-xs text-slate-400">MERN class · {post.time}</p>
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
        {post.content}
      </p>

      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
        >
          <Heart className="h-4 w-4" aria-hidden="true" />
          {post.likesCount}
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-brand-green"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {post.commentsCount} replies
        </button>
      </div>
    </article>
  );
}

export default ProfilePostCard;
