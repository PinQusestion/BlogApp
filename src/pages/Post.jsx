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

  return post ? (
    <div className="w-full py-8 mt-16 mb-12">
      <Container>
        {/* Main Post Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 via-slate-700/50 to-slate-900/50 p-8 md:p-12 border border-white/10 shadow-2xl backdrop-blur-md">
          
          {/* Featured Image */}
          <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
            <img
              src={appwriteService.getFilePreview(post.featuredImg)}
              alt={post.title}
              className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          {/* Post Content */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                {post.title}
              </h1>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <div className="text-slate-300 text-lg leading-relaxed space-y-4 browser-css">
                {parse(post.content)}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isAuthor && (
            <div className="mt-12 pt-8 border-t border-white/10 flex gap-4 flex-wrap">
              <Link to={`/edit-post/${post.$id}`}>
                <button className="btn-blue px-8 py-3 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95">
                  ✏️ Edit Post
                </button>
              </Link>
              <button 
                className="btn-red px-8 py-3 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 active:scale-95"
                onClick={deletePost}
              >
                🗑️ Delete Post
              </button>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-8">
            <button 
              onClick={() => navigate("/all-posts")}
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 transition-colors duration-300"
            >
              ← Back to All Posts
            </button>
          </div>
        </div>
      </Container>
    </div>
  ) : loading ? (
    <div className="w-full py-8 mt-20 flex justify-center">
      <div className="loader"></div>
    </div>
  ) : null;
}
