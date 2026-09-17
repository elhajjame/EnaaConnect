import CreatePostForm from "../components/feed/CreatePostForm";
import FeedSection from "../components/feed/FeedSection";
import { feedPosts } from "../data/feedData";

function FeedPage() {
  return (
    <main className="px-4 pb-24 pt-5 sm:px-6 sm:pt-7 lg:pb-10 xl:px-9">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.58fr)_minmax(310px,0.72fr)]">
        <div className="min-w-0 space-y-6">
          <CreatePostForm />

          <FeedSection posts={feedPosts} />
        </div>
      </div>
    </main>
  );
}

export default FeedPage;
