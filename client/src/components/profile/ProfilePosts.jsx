import ProfilePostCard from "./ProfilePostCard";
import { profilePosts } from "../../data/profilePostsData";

function ProfilePosts() {
  return (
    <section aria-labelledby="profile-posts-title">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green">
            Activity
          </p>

          <h2
            id="profile-posts-title"
            className="mt-1 font-display text-2xl font-bold text-brand-navy-dark"
          >
            Posts by {}
          </h2>
        </div>

      </div>

      <div className="space-y-4">
        {profilePosts.map((post) => (
          <ProfilePostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default ProfilePosts;
