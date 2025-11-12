import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/configAp";
import { Container, PostCard } from "../components";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Icon from "../components/Icon"

function Home() {
  const authStatus = useSelector((state) => state.auth?.status);

  const actionItems = [
    {
      icon: "BookOpen",
      heading: "Discover Stories",
      desc: "Explore a diverse collection of articles, tutorials, and insights from writers around the world.",
      bg: "#dfe7ff",
      stroke: "#4f45e4"
    },
    {
      icon: "PenTool",
      heading: "Share Your Voice",
      desc: "Create and publish your own posts with our intuitive writing interface and reach engaged readers.",
      bg:"#f3e8fd",
      stroke: "#8a38ec"
    },
    {
      icon: "MessageCircle",
      heading: "Join Community",
      desc: "Connect with like-minded individuals, engage in discussions, and build meaningful relationships.",
      bg:"#dbfbe7",
      stroke: "#00a74b"
    }
  ]

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((response) => {
        if (response && response.documents) {
          setPosts(response.documents);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (posts.length === 0 && authStatus && !loading) {
    return (
      <div className="w-full py-12 mt-12">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-20 shadow-2xl animate-fade-in-down min-h-[600px] flex items-center justify-center border border-slate-700">
            {/* Decorative animated elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl -ml-48 -mb-48 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
              {/* Emoji Icon */}
              <div className="text-6xl md:text-7xl animate-bounce">📝</div>

              {/* Main Heading */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
                  Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">Creative Journey</span>
                </h1>
                <p className="text-base md:text-xl text-slate-300 leading-relaxed">
                  You haven't created any posts yet. Share your first story, idea, or insight with our community today!
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 px-4 md:px-0">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-500/50 rounded-xl p-4 text-left transition-all duration-300">
                  <p className="text-2xl mb-2">✨</p>
                  <p className="text-white font-semibold text-sm">Easy to Create</p>
                  <p className="text-slate-400 text-xs mt-1">Simple editor with no coding required</p>
                </div>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-500/50 rounded-xl p-4 text-left transition-all duration-300">
                  <p className="text-2xl mb-2">👥</p>
                  <p className="text-white font-semibold text-sm">Reach Audience</p>
                  <p className="text-slate-400 text-xs mt-1">Get discovered by thousands of readers</p>
                </div>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-500/50 rounded-xl p-4 text-left transition-all duration-300">
                  <p className="text-2xl mb-2">🎯</p>
                  <p className="text-white font-semibold text-sm">Be Inspired</p>
                  <p className="text-slate-400 text-xs mt-1">Connect with other creative minds</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button
                  onClick={() => navigate("/add-posts")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 transform active:scale-95"
                >
                  🚀 Write Your First Post
                </button>
                <button
                  onClick={() => navigate("/all-posts")}
                  className="px-8 py-4 bg-slate-800 border-2 border-slate-600 text-slate-100 font-bold rounded-xl hover:border-blue-500 hover:bg-slate-700 hover:scale-105 transition-all duration-300 transform active:scale-95"
                >
                  🔍 Browse Community
                </button>
              </div>

              {/* Encouragement Text */}
              <p className="text-slate-400 text-sm italic pt-4">
                Don't worry! Your first post can be about anything. Start with what inspires you most.
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return !loading ? (
    <div className="w-full py-8 mt-12">
      <Container>
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#463fc2] via-[#5d54e6] to-[#706df9] p-8 md:p-16 mb-16 shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">BlogSpace</span>
            </h1>
            <p className="text-base md:text-lg text-blue-100 mb-6 leading-relaxed">
              Discover amazing stories, share your thoughts, and connect with a
              community of passionate writers and readers.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {authStatus ? (
                <>
                  <button
                    onClick={() => navigate("/all-posts")}
                    className="bg-white px-5 py-2.5 text-[#463fc2] text-sm font-semibold rounded-lg hover:cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Explore Posts
                  </button>
                  <button
                    onClick={() => navigate("/add-posts")}
                    className="bg-transparent border-2 border-white px-5 py-2.5 text-white text-sm font-semibold rounded-lg hover:cursor-pointer hover:bg-white/10 hover:scale-105 transition-all duration-300"
                  >
                    Start Writing
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-white px-5 py-2.5 text-[#463fc2] text-sm font-semibold rounded-lg hover:cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="bg-transparent border-2 border-white px-5 py-2.5 text-white text-sm font-semibold rounded-lg hover:cursor-pointer hover:bg-white/10 hover:scale-105 transition-all duration-300"
                  >
                    Sign Up - Free
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-6">
            Why Choose <span className="text-[#706df9]">BlogSpace</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actionItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-5 flex flex-col space-y-3 items-center text-center rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div
                  style={{ "--bg": item.bg }}
                  className="p-3 bg-[var(--bg)] rounded-xl"
                >
                  <Icon
                    style={{ "--st": item.stroke }}
                    icon={item.icon}
                    className="stroke-[var(--st)] w-6 h-6"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{item.heading}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Posts Section */}
        {posts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white">Latest Posts</h2>
              {authStatus && (
                <button
                  onClick={() => navigate("/all-posts")}
                  className="text-[#706df9] hover:text-[#5d54e6] font-semibold text-sm transition-colors duration-300"
                >
                  View All →
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.slice(0, 8).map((post) => (
                <div key={post.$id}>
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        {!authStatus && (
          <div className="mt-16 bg-gradient-to-r from-[#463fc2] to-[#706df9] rounded-2xl p-8 text-center shadow-2xl">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              Ready to Start Your Writing Journey?
            </h2>
            <p className="text-base text-blue-100 mb-5 max-w-2xl mx-auto">
              Join thousands of writers sharing their stories, ideas, and knowledge with the world.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white px-6 py-2.5 text-[#463fc2] text-sm font-bold rounded-lg hover:cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Sign Up Now - It&apos;s Free!
            </button>
          </div>
        )}
      </Container>
    </div>
  ) : (
    <div className="w-full py-8 mt-10 flex justify-center">
      <div className="loader"></div>
    </div>
  );
}

export default Home;
