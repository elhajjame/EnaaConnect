import { SendHorizontal, UserRound } from "lucide-react";

function CommentPanel() {
  return (
    <section
      aria-label="Post comments"
      className="mt-4 border-t border-line pt-4"
    >
      <div className="mb-4">
        <h3 className="text-sm font-bold text-brand-navy-dark">Comments</h3>
        <p className="mt-0.5 text-[11px] text-muted">2 comments</p>
      </div>

      <div className="space-y-4">
        {/* First static comment */}
        <article className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-navy text-white">
            <UserRound className="h-4 w-4" aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md bg-page px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-bold text-brand-navy-dark">
                Amine Zahidi
              </h4>

              <span className="rounded-full bg-brand-green/10 px-2 py-0.5 text-[10px] font-bold text-brand-green">
                Web Development
              </span>

              <span className="ml-auto text-[10px] text-muted">
                15 minutes ago
              </span>
            </div>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              I used a small context for the shared filters. It kept the page
              component much easier to read.
            </p>
          </div>
        </article>

        {/* Second static comment */}
        <article className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-green text-white">
            <UserRound className="h-4 w-4" aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md bg-page px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-bold text-brand-navy-dark">
                Lina Mansouri
              </h4>

              <span className="rounded-full bg-brand-green/10 px-2 py-0.5 text-[10px] font-bold text-brand-green">
                Frontend Development
              </span>

              <span className="ml-auto text-[10px] text-muted">
                8 minutes ago
              </span>
            </div>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              A custom hook is also a good option when the state does not need
              to be shared by many components.
            </p>
          </div>
        </article>
      </div>

      {/* Static comment input */}
      <div className="mt-4 border-t border-line pt-4">
        <div className="flex items-end gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-navy text-white">
            <UserRound className="h-4 w-4" aria-hidden="true" />
          </div>

          <div className="flex min-w-0 flex-1 items-end rounded-2xl border border-line bg-page p-1.5">
            <textarea
              name="content"
              rows={1}
              maxLength={1000}
              aria-label="Write a comment"
              placeholder="Write a comment..."
              className="min-h-9 min-w-0 flex-1 resize-none bg-transparent px-2.5 py-2 text-sm text-brand-navy-dark outline-none placeholder:text-muted"
            />

            <button
              type="button"
              aria-label="Post comment"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-lime text-brand-navy-dark transition hover:bg-brand-green hover:text-white"
            >
              <SendHorizontal className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="mt-1.5 text-right text-[10px] text-muted">
          Maximum 1000 characters
        </p>
      </div>
    </section>
  );
}

export default CommentPanel;
