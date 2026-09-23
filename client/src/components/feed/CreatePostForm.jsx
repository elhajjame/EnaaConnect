import { ImagePlus, SendHorizontal, UserRound } from "lucide-react";
import { useState } from "react";
import { createPost } from "../../services/postService";
import { getApiErrorMessage } from "../../services/api";

const allowedImageType = ["image/jpeg", "image/png", "image/webp"];
const maximumImageSize = 3 * 1024 * 1024;

function CreatePostForm({ onPostCreated }) {
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleImage(e) {
    const selectedImage = e.target.files?.[0];

    if (!selectedImage) {
      setImage(null);
      return;
    }

    if (!allowedImageType.includes(selectedImage.type)) {
      setImage(null);
      setErrorMessage("Only JPEG, PNG, and WebP images are allowed.");
      e.target.value = "";
      return;
    }

    if (selectedImage.size > maximumImageSize) {
      setImage(null);
      setErrorMessage("The image must be 3 MB or smaller.");
      e.target.value = "";
      return;
    }

    setErrorMessage("");
    setImage(selectedImage);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const CheckContent = content.trim();

    if (!CheckContent && !image) {
      setErrorMessage("add text or select an image");
      return;
    }

    const formElement = e.currentTarget;

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const createdPost = await createPost(CheckContent, image);
      onPostCreated(createdPost);

      setContent("");
      setImage(null);
      formElement.reset();
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
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
        value={content}
        onChange={(event) => setContent(event.target.value)}
        disabled={isSubmitting}
        id="post-content"
        name="content"
        rows={4}
        maxLength={2000}
        placeholder="What are you working on, Mehdi?"
        className="mt-5 min-h-28 w-full resize-none rounded-2xl border border-line bg-page px-4 py-3 text-sm leading-6 text-brand-navy-dark outline-none placeholder:text-muted focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
      />

      <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
        <label
          htmlFor="post-image"
          className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl px-3 text-xs font-bold text-slate-600 transition hover:bg-page hover:text-brand-green"
        >
          <ImagePlus className="h-4 w-4" aria-hidden="true" />
          {image ? image.name : "Add photo"}
        </label>

        <input
          onChange={handleImage}
          disabled={isSubmitting}
          id="post-image"
          name="images"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
        />

        <button
          type="submit"
          disabled={isSubmitting || (!content.trim() && !image)}
          className="ml-auto inline-flex min-h-10 items-center gap-2 rounded-xl bg-brand-green px-4 text-xs font-bold text-white transition hover:bg-brand-green-dark"
        >
          {isSubmitting ? "Posting..." : "Post"}
          <SendHorizontal className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {errorMessage && (
        <p
          role="alert"
          className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}
      <p className="mt-2 text-right text-[10px] text-muted">
        Maximum 2000 characters
      </p>
    </form>
  );
}

export default CreatePostForm;
