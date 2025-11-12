import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/configAp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false)

  const submit = async (data) => {
    setLoading(true)
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : appwriteService.uploadFile(post.featuredImg);

      if (file) {
        appwriteService.deleteFile(post.image);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImg,
      });

      if (dbPost) {
        setLoading(false)
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImg = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-gA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  const renderImagePreview = (featuredImg) => {
    try {
      if (featuredImg) {
        const previewUrl = appwriteService.getFilePreview(featuredImg).href;
        return <img src={previewUrl} alt="Featured" className="rounded-lg" />;
      }
    } catch (error) {
      console.error("Error loading featured image:", featuredImg);
    }
    return (
      <div className="w-full h-40 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-sm">
        No Image Available
      </div>
    );
  };

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return !loading ? (
    <div className="w-full py-12 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 animate-fade-in-down">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
                {post ? "Edit Post" : "Create New Post"}
              </h1>
              <p className="text-slate-400 text-lg">
                {post ? "Update your amazing story" : "Share your amazing story with the world"}
              </p>
            </div>
          </div>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        </div>

        {/* Main Form Container */}
        <form onSubmit={handleSubmit(submit)}>
          <div className="space-y-8">
            {/* Title Input */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <label className="block text-sm font-bold text-white mb-3">Post Title</label>
              <input
                type="text"
                placeholder="Enter an engaging title for your post"
                className="w-full px-6 py-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                {...register("title", { required: true })}
              />
            </div>

            {/* Slug Input */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.15s'}}>
              <label className="block text-sm font-bold text-white mb-3">
                Post Slug <span className="text-slate-400 text-xs font-normal">(Auto-generated)</span>
              </label>
              <input
                type="text"
                placeholder="post-slug-auto-generated"
                className="w-full px-6 py-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
            </div>

            {/* Content Editor */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <label className="block text-sm font-bold text-white mb-3">Post Content</label>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
                <RTE
                  name="content"
                  control={control}
                  defaultValue={getValues("content")}
                />
              </div>
            </div>

            {/* Two Column Section for Image & Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Featured Image Upload - 2/3 */}
              <div className="lg:col-span-2 animate-fade-in-up" style={{animationDelay: '0.25s'}}>
                <label className="block text-sm font-bold text-white mb-3">Featured Image</label>
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-dashed border-white/20 hover:border-blue-500/30 rounded-2xl p-8 transition-all duration-300 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    id="file-input"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                  />
                  <label htmlFor="file-input" className="flex flex-col items-center cursor-pointer">
                    <div className="text-4xl mb-3">🖼️</div>
                    <p className="text-white font-semibold mb-1">Drag and drop your image here</p>
                    <p className="text-slate-400 text-sm">or click to browse</p>
                    <p className="text-slate-500 text-xs mt-2">PNG, JPG, GIF up to 50MB</p>
                  </label>
                </div>
                
                {/* Image Preview */}
                {post?.featuredImg && (
                  <div className="mt-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-4 overflow-hidden">
                    <p className="text-sm text-slate-400 mb-3">Current Featured Image</p>
                    {renderImagePreview(post.featuredImg)}
                  </div>
                )}
              </div>

              {/* Status & Sidebar - 1/3 */}
              <div className="lg:col-span-1 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                {/* Status Select */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-white mb-3">Post Status</label>
                  <select
                    className="w-full px-6 py-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    {...register("status", { required: true })}
                  >
                    <option value="active" className="bg-slate-900">✓ Publish Now</option>
                    <option value="inactive" className="bg-slate-900">○ Save as Draft</option>
                  </select>
                </div>

                {/* Post Stats */}
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6 mb-6">
                  <h3 className="text-white font-bold text-sm mb-4">Post Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">Character Count</span>
                      <span className="text-white font-semibold text-sm">{(watch('content') || '').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">Word Count</span>
                      <span className="text-white font-semibold text-sm">{watch('content')?.split(' ').filter(w => w).length || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">Est. Read Time</span>
                      <span className="text-white font-semibold text-sm">{Math.ceil((watch('content')?.split(' ').filter(w => w).length || 0) / 200)} min</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 mb-3"
                >
                  {post ? "✓ Update Post" : "🚀 Publish Post"}
                </button>

                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={() => navigate(post ? `/post/${post.$id}` : "/all-posts")}
                  className="w-full px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  ← Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="loader"></div>
    </div>
  );
}

export default PostForm;
