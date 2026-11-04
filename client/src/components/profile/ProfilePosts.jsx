import ProfilePostCard from "./ProfilePostCard";
import { useEffect, useState } from "react";
import { getApiErrorMessage } from "../../services/api";
import { getPosts } from "../../services/postService";
import PageLoader from "../loading/PageLoader";

function ProfilePosts({ userId, profileName }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadProfilePosts() {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        setErrorMessage("");

        const postsData = await getPosts();

        const userPosts = postsData.filter(
          (post) => post.author?.id === userId,
        );

        setPosts(userPosts);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    loadProfilePosts();
  }, [userId]);

  return (
    <section aria-labelledby="profile-posts-title">
      <div className="mb-4">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green">
          Activity
        </p>

        <h2
          id="profile-posts-title"
          className="mt-1 font-display text-2xl font-bold text-brand-navy-dark"
        >
          Posts by {profileName}
        </h2>
      </div>

      {isLoading && (
        <div className="grid min-h-72 place-items-center">
          <PageLoader />
        </div>
      )}

      {errorMessage && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}

      {!isLoading && !errorMessage && posts.length === 0 && (
        <div className="rounded-card border border-line bg-white px-6 py-12 text-center shadow-card">
          <p className="font-display text-lg font-bold text-brand-navy-dark">
            No posts yet
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Posts created by {profileName} will appear here.
          </p>
        </div>
      )}

      {!isLoading && !errorMessage && posts.length > 0 && (
        <div className="space-y-4">
          {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProfilePosts;
