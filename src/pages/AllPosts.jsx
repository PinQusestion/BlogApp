import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/configAp";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    })
    .finally(() => setLoading(false))
  }, []);

  if (posts.length === 0) {
    return !loading ? (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute top-60 right-20 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-pulse"></div>

              <div className="absolute bottom-40 left-20 w-1 h-1 bg-blue-400 rounded-full opacity-35 animate-pulse"></div>
              <div className="absolute bottom-80 right-40 w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
            </div>

            <div className="text-center max-w-2xl mx-auto space-y-8 animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
                No posts have been uploaded
              </h1>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed px-4">
                Start sharing your thoughts and ideas with the world. Create
                your first blog post and begin your journey of storytelling and
                knowledge sharing.
              </p>

              <div className="pt-4">
                <button onClick={() => navigate("/add-posts")} className="btn-blue inline-flex items-center justify-center gap-3 px-8 py-4 text-white font-medium text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 active:scale-95">
                  + Create Your First Post
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    ) : (
      <div className="w-full py-8 flex justify-center">
        <div className="loader"></div>
      </div>
    );
  }
  return !loading ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <div className="w-full py-8 flex justify-center">
      <div className="loader"></div>
    </div>
  );
}

export default AllPosts;
