import { useEffect, useState } from "react";
  import CreatePostForm from "../components/feed/CreatePostForm";
  import FeedSection from "../components/feed/FeedSection";
  import { getPosts } from "../services/postService";
  import { getApiErrorMessage } from "../services/api";

  function FeedPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

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

    return (
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.58fr)_minmax(310px,0.72fr)]">
        <div className="min-w-0 space-y-6">
          <CreatePostForm />

          {errorMessage && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}

          {!isLoading && !errorMessage && <FeedSection posts={posts} />}
        </div>
      </div>
    );
  }

  export default FeedPage;