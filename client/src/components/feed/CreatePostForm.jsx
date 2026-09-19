import { ImagePlus, SendHorizontal, UserRound } from "lucide-react";

function CreatePostForm() {
  return (
    <section
      aria-labelledby="create-post-title"
      className="rounded-card border border-line bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-navy text-white">
          <UserRound className="h-5 w-5" aria-hidden="true" />
        </div>

        <div>
          <h2 id="create-post-title" className="font-bold text-brand-navy-dark">
            Create a post
          </h2>

          <p className="mt-0.5 text-xs text-muted">
            Share something with your campus.
          </p>
        </div>
      </div>

      <label htmlFor="post-content" className="sr-only">
        Post content
      </label>

      <textarea
        id="post-content"
        name="content"
        rows={4}
        maxLength={2000}
        placeholder="What are you working on, Mehdi?"
        className="mt-5 min-h-28 w-full resize-none rounded-2xl border border-line bg-page px-4 py-3 text-sm leading-6 text-brand-navy-dark outline-none placeholder:text-muted focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
      />

      <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
        <button
          type="button"
          className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-bold text-slate-600 transition hover:bg-page hover:text-brand-green"
        >
          <ImagePlus className="h-4 w-4" aria-hidden="true" />
          Add photo
        </button>

        <button
          type="button"
          className="ml-auto inline-flex min-h-10 items-center gap-2 rounded-xl bg-brand-green px-4 text-xs font-bold text-white transition hover:bg-brand-green-dark"
        >
          Post
          <SendHorizontal className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-2 text-right text-[10px] text-muted">
        Maximum 2000 characters
      </p>
    </section>
  );
}

export default CreatePostForm;
