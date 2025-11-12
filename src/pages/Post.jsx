import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import appwriteService from "../appwrite/configAp";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && (userData ? post.userID === userData.$id : false);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      }).finally(() => setLoading(false));
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImg);
        navigate("/");
      }
    });
  };

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center mt-12">
        <div className="loader"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full py-20 mt-12">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-slate-400 mb-8">The post you're looking for doesn't exist or has been deleted.</p>
            <button 
              onClick={() => navigate("/all-posts")}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              ← Back to Posts
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12 mt-12 animate-fade-in-down">
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-slate-400">
          <button 
            onClick={() => navigate("/all-posts")}
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Posts
          </button>
          <span>/</span>
          <span className="text-slate-300 truncate">{post.title?.substring(0, 40)}...</span>
        </div>

        {/* Featured Image with Overlay */}
        <div className="mb-12 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="relative group overflow-hidden rounded-3xl shadow-2xl shadow-blue-500/20 h-96 md:h-[500px]">
            <img
              src={appwriteService.getFilePreview(post.featuredImg)}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
            
            {/* Post Meta Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-4 py-2 bg-blue-600/80 backdrop-blur-md text-white text-sm font-semibold rounded-full">
                  Featured Post
                </span>
                <span className="px-4 py-2 bg-purple-600/80 backdrop-blur-md text-white text-sm font-semibold rounded-full">
                  {new Date(post.$createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight line-clamp-3">{post.title}</h1>
            </div>
          </div>
        </div>

        {/* Post Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {/* Title & Underline */}
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
              <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
            </div>

            {/* Post Metadata */}
            <div className="flex flex-wrap items-center gap-6 md:gap-8 py-6 border-y border-slate-700/50 mb-10">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-xl">📅</span>
                <span className="text-sm">{new Date(post.$createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-xl">⏱️</span>
                <span className="text-sm">{Math.ceil(post.content?.split(' ').length / 200)} min read</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-xl">📝</span>
                <span className="text-sm">{post.content?.split(' ').length || 0} words</span>
              </div>
            </div>

            {/* Post Content */}
            <article className="prose prose-invert prose-lg max-w-none mb-12">
              <div className="text-slate-300 leading-8 text-lg space-y-6 browser-css">
                {parse(post.content)}
              </div>
            </article>

            {/* Status Badge */}
            <div className="mb-12 inline-block">
              <span className={`px-6 py-2 rounded-full font-semibold text-sm ${
                post.status === 'active' 
                  ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                  : 'bg-slate-600/20 text-slate-400 border border-slate-500/30'
              }`}>
                {post.status === 'active' ? '✓ Published' : '○ Draft'}
              </span>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            {/* About this Post Card */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 sticky top-24">
              <h3 className="text-white font-bold text-lg mb-3">About this Post</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✍️</span>
                  <div>
                    <p className="text-slate-400 text-xs">Created</p>
                    <p className="text-white font-semibold text-sm">{new Date(post.$createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔄</span>
                  <div>
                    <p className="text-slate-400 text-xs">Last Updated</p>
                    <p className="text-white font-semibold text-sm">{new Date(post.$updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="text-slate-400 text-xs">Reading Time</p>
                    <p className="text-white font-semibold text-sm">{Math.ceil(post.content?.split(' ').length / 200)} minutes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit/Delete Actions */}
            {isAuthor && (
              <div className="flex mb-4 gap-3 items-stretch">
                <Link to={`/edit-post/${post.$id}`} className="basis-1/2">
                  <button className="w-full text-sm h-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2">
                    ✏️ Edit Post
                  </button>
                </Link>
                <button
                  onClick={deletePost}
                  className="basis-1/2 text-sm px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2"
                >
                  🗑️ Delete Post
                </button>
              </div>
            )}

            {/* Back Button */}
            <button
              onClick={() => navigate("/all-posts")}
              className="w-full px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              ← All Posts
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
