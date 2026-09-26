import FeedPost from "./FeedPost";

function FeedSection({ onLike, likingPostId, posts = [] }) {
  return (
    <section aria-labelledby="feed-title">
      <div className="mb-4">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green">
          Community stream
        </p>

        <h2
          id="feed-title"
          className="mt-1 text-2xl font-bold text-brand-navy-dark"
        >
          Latest from campus
        </h2>

        <p className="mt-1 text-sm text-muted">
          See what students are sharing around campus.
        </p>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div
            role="status"
            className="rounded-card border border-line bg-white px-6 py-12 text-center shadow-card"
          >
            <p className="font-display text-lg font-bold text-brand-navy-dark">
              No posts yet
            </p>

            <p className="mt-2 text-sm text-muted">
              Be the first student to share something with the campus.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <FeedPost
                onLike={onLike}
                isLiking={likingPostId === post.id}
                key={post.id}
                post={post}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeedSection;
