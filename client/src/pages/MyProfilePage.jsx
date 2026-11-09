import { Camera, Pencil, User, AtSign, Mail, Edit } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { api } from "../libs/axios.js";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "../schema/userSchema.js";
import AuthContext from "../context/AuthContext.jsx";

const MyProfilePage = () => {
  // Auth Context
  const { dispatch } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  //   React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        if (res.status === 200) {
          setProfile(res.data.data);
          reset({
            name: res.data.data.name,
            username: res.data.data.username,
            email: res.data.data.email,
          });
        }
      } catch (error) {
        toast.error("Failed to fetch profile" || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleConfirmPhoto = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("avatar", selectedImage);

    try {
      const res = await api.patch("/user/profile", formData);

      if (res.status === 200) {
        setProfile(res.data.data);

        setSelectedImage(null);
        setImagePreview(null);
        console.log(res.data.data);
        dispatch({
          type: "UPDATE_USER",
          payload: res.data.data,
        });

        toast.success("Profile photo updated successfully");
      }
    } catch (error) {
      console.log("Avatar upload error:", error);
      console.log("Response:", error.response);
      toast.error(
        error.response?.data?.message || "Profile photo update failed",
      );
    }
  };

  const handleCancelPhoto = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);

    try {
      const res = await api.patch("/user/profile", formData);
      if (res.status === 200) {
        setProfile(res.data.data);
        setIsEditing(false);
        dispatch({
          type: "UPDATE_USER",
          payload: res.data.data,
        });
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 font-sans text-base-content py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-base-content">
            My Profile
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            Your Repicity identity.
          </p>
        </div>

        {/* Profile Card Container */}
        <div className="bg-base-100 border border-base-300 rounded-(--radius-box) overflow-hidden shadow-sm">
          {/* Top Banner with Decorative Circles */}
          <div className="h-36 w-full bg-gradient-to-r from-orange-100 via-amber-100 to-orange-200 relative overflow-hidden flex items-center justify-end px-8">
            <div className="absolute right-[-20px] top-[-50px] w-64 h-64 rounded-full border border-orange-200/60 pointer-events-none"></div>
            <div className="absolute right-[-60px] top-[-90px] w-96 h-96 rounded-full border border-orange-200/40 pointer-events-none"></div>
          </div>

          {/* Profile Content Area */}
          <div className="px-6 sm:px-8 pb-8">
            <input
              id="avatar-upload"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />
            {/* Avatar & Change Photo Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-14 mb-6 gap-4">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-amber-200 text-amber-900 font-display font-bold text-2xl flex items-center justify-center border-4 border-base-100 shadow-sm">
                  {imagePreview || profile?.avatar ? (
                    <img
                      src={imagePreview || profile.avatar}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    profile?.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center shadow-md border-2 border-base-100 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                </label>
              </div>

              <div className="flex items-center space-x-3">
                {!imagePreview && (
                  <label
                    htmlFor="avatar-upload"
                    className="px-4 py-2 bg-base-100 hover:bg-base-200 border border-base-300 rounded-(--radius-field) text-xs font-semibold text-base-content transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5 text-base-content/70" />
                    <span>Change photo</span>
                  </label>
                )}
                {imagePreview && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCancelPhoto}
                      className="px-3 py-2 text-xs font-semibold text-base-content/70 hover:text-base-content transition-colors"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleConfirmPhoto}
                      className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-content rounded-(--radius-field) text-xs font-semibold transition-colors"
                    >
                      Confirm Photo
                    </button>
                  </div>
                )}
                <span className="text-xs text-base-content/50">
                  PNG, JPG or WEBP
                </span>
              </div>
            </div>

            {/* Name & Edit Button Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-base-content">
                  {profile?.name}
                </h2>
                <p className="text-sm text-base-content/60 font-medium mt-0.5">
                  {profile?.username}
                </p>
              </div>

              {isEditing ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      reset({
                        name: profile.name,
                        username: profile.username,
                        email: profile.email,
                      });

                      setIsEditing(false);
                    }}
                    className="px-4 py-2 bg-base-100 hover:bg-base-200 border border-base-300 rounded-(--radius-field) text-xs font-semibold text-base-content transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    form="profile-form"
                    type="submit"
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-content rounded-(--radius-field) text-xs font-semibold transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  type="button"
                  className="px-4 py-2 bg-base-100 hover:bg-base-200 border border-base-300 rounded-(--radius-field) text-xs font-semibold text-base-content transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
                >
                  <Pencil className="w-3.5 h-3.5 text-base-content/70" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            <hr className="border-base-200 mb-6" />

            {/* Account Details Section */}
            <form
              id="profile-form"
              onSubmit={handleSubmit(onSubmit, (errors) =>
                console.log("Validation errors:", errors),
              )}
            >
              <div className="space-y-6">
                <h3 className="font-display text-lg font-bold text-base-content">
                  Account details
                </h3>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="flex items-center space-x-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-base-content/50">
                        Full Name
                      </p>
                      {isEditing ? (
                        <>
                          <input
                            {...register("name")}
                            type="text"
                            className="w-full px-3 py-2 bg-base-100 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary"
                          />
                          {errors.name && (
                            <p className="text-error text-xs mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm font-semibold text-base-content">
                          {profile?.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Username */}
                  <div className="flex items-center space-x-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                      <AtSign className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-base-content/50">
                        Username
                      </p>
                      {isEditing ? (
                        <input
                          {...register("username")}
                          type="text"
                          className="w-full px-3 py-2 bg-base-100 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary"
                        />
                      ) : (
                        <p className="text-sm font-semibold text-base-content">
                          @{profile?.username}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-base-content/50">
                        Email
                      </p>
                      {isEditing ? (
                        <input
                          {...register("email")}
                          type="email"
                          className="w-full px-3 py-2 bg-base-100 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary"
                        />
                      ) : (
                        <p className="text-sm font-semibold text-base-content">
                          {profile?.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
