import { ImagePlus, Upload, X } from "lucide-react";
import { useState } from "react";
import {
  updateProfile,
  updateProfilePicture,
} from "../../services/profileService";
import { getApiErrorMessage } from "../../services/api";

function EditProfile({ onProfileUpdated, profile, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fieldOfStudy: profile.fieldOfStudy || "",
    academicYear: String(new Date().getFullYear()),
    biography: profile.biography || "",
    interests: profile.interests?.join(", ") || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploadingPicture, setIsUploadingPicture] = useState(false);
  if (!isOpen) {
    return null;
  }
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleProfilePicture(e) {
    const imageInput = e.target;
    const imageFile = imageInput.files?.[0];

    if (!imageFile || isUploadingPicture) {
      return;
    }

    try {
      setIsUploadingPicture(true);
      setErrorMessage("");

      const updatedProfile = await updateProfilePicture(imageFile);

      onProfileUpdated(updatedProfile);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsUploadingPicture(false);
      imageInput.value = "";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const profileData = {
      fieldOfStudy: formData.fieldOfStudy.trim(),
      academicYear: formData.academicYear,
      biography: formData.biography.trim(),
      interests: formData.interests
        .split(",")
        .map((interest) => interest.trim())
        .filter(Boolean),
    };

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const profileUpdated = await updateProfile(profileData);
      onProfileUpdated(profileUpdated);
      onClose();
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0b2038]/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-editor-title"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-[1.8rem] bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 sm:px-6">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-green">
              Profile settings
            </p>

            <h2
              id="profile-editor-title"
              className="font-display text-xl font-bold text-brand-navy-dark"
            >
              Edit profile
            </h2>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="grid h-9 w-9 place-items-center rounded-xl bg-page text-slate-500 hover:text-brand-navy"
            aria-label="Close edit profile"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 sm:px-6">
          <div className="flex flex-col items-start gap-3 rounded-2xl bg-page p-3 sm:flex-row sm:items-center">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-green shadow-sm">
              <ImagePlus className="h-5 w-5" aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-brand-navy-dark">
                Profile photo
              </p>

              <p className="text-xs text-slate-500">
                JPG, PNG or WebP, up to 5 MB.
              </p>
            </div>

            <label
              htmlFor="edit-profile-photo"
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-xs font-bold text-brand-green shadow-sm hover:bg-[#eef8ef]"
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              {isUploadingPicture ? "Uploading..." : "Upload Profile Photo"}
            </label>

            <input
              onChange={handleProfilePicture}
              disabled={isUploadingPicture}
              id="edit-profile-photo"
              name="profilePicture"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
            />
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="edit-field"
                className="mb-1 block text-xs font-bold text-brand-navy-dark"
              >
                Field of study
              </label>

              <input
                value={formData.fieldOfStudy}
                onChange={handleChange}
                maxLength={100}
                id="edit-field"
                name="fieldOfStudy"
                type="text"
                placeholder="MERN Class"
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-brand-navy-dark shadow-sm outline-none focus:border-[#2f873e] focus:ring-4 focus:ring-[#d9eedc]"
              />
            </div>

            <div>
              <label
                htmlFor="edit-year"
                className="mb-1 block text-xs font-bold text-brand-navy-dark"
              >
                Academic year
              </label>

              <input
                id="edit-year"
                name="academicYear"
                type="text"
                value={formData.academicYear}
                readOnly
                aria-readonly="true"
                className="w-full cursor-not-allowed rounded-xl border border-line bg-page px-3 py-2.5 text-sm text-brand-navy-dark shadow-sm outline-none"
              />
            </div>
          </div>

          <div className="mt-3 grid items-start gap-3 sm:grid-cols-[1.25fr_0.75fr]">
            <div>
              <label
                htmlFor="edit-biography"
                className="mb-1 block text-xs font-bold text-brand-navy-dark"
              >
                Biography
              </label>

              <textarea
                value={formData.biography}
                onChange={handleChange}
                maxLength={500}
                id="edit-biography"
                name="biography"
                rows={2}
                className="w-full resize-none overflow-hidden rounded-xl border border-line bg-white px-3 py-2.5 text-sm leading-5 text-brand-navy-dark shadow-sm outline-none focus:border-[#2f873e] focus:ring-4 focus:ring-[#d9eedc]"
              />
            </div>

            <div>
              <label
                htmlFor="edit-interests"
                className="mb-1 block text-xs font-bold text-brand-navy-dark"
              >
                Interests
              </label>

              <input
                value={formData.interests}
                onChange={handleChange}
                id="edit-interests"
                name="interests"
                type="text"
                placeholder="JavaScript, React, Node.js, MongoDB, UI Design"
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-brand-navy-dark shadow-sm outline-none focus:border-[#2f873e] focus:ring-4 focus:ring-[#d9eedc]"
              />

              <p className="mt-1 text-[10px] text-slate-400">
                Separate with commas.
              </p>
            </div>
          </div>
          {errorMessage && (
            <p
              role="alert"
              className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}
          <div className="mt-3 flex justify-end gap-2 border-t border-slate-100 pt-3">
            <button
              onClick={onClose}
              type="button"
              className="rounded-xl border border-line px-4 py-2 text-sm font-bold text-brand-navy hover:bg-page"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-brand-green px-5 py-2 text-sm font-bold text-white hover:bg-brand-green-dark"
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
