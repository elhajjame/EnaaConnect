import { useEffect, useState } from "react";
import CreatePostForm from "../components/feed/CreatePostForm";
import FeedSection from "../components/feed/FeedSection";
import { getPosts, togglePostLike } from "../services/postService";
import { getApiErrorMessage } from "../services/api";
import PageLoader from "../components/loading/PageLoader";


function FeedPage() {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [likingPostId, setLikingPost] = useState(null);
  function handlePostCreated(createdPost) {
    setPosts((currentPosts) => [createdPost, ...currentPosts]);
  }

  useEffect(() => {
    async function loadPosts() {
      try {
        setErrorMessage("");

        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  async function handleLike(postId) {
    if (likingPostId) {
      return;
    }

    try {
      setLikingPost(postId);

      await togglePostLike(postId);
      const updatePost = await getPosts();
      setPosts(updatePost);
    } catch (error) {
      getApiErrorMessage(error);
    } finally {
      setLikingPost(null);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.58fr)_minmax(310px,0.72fr)]">
      <div className="min-w-0 space-y-6">
        <CreatePostForm onPostCreated={handlePostCreated} />
        {isLoading && (
          <div className="grid min-h-[60vh] place-items-center">
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

        {!isLoading && !errorMessage && (
          <FeedSection
            posts={posts}
            onLike={handleLike}
            likingPostId={likingPostId}
          />
        )}
      </div>
    </div>
  );
}

export default FeedPage;
