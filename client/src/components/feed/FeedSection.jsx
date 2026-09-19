import FeedPost from "./FeedPost";

function FeedSection({ posts }) {
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
        {posts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default FeedSection;
