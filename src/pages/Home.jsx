import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/configAp";
import { Container, PostCard } from "../components";
import { useNavigate } from "react-router";
import Icon from "../components/Icon"

function Home() {

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
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .finally(() => setLoading(false));
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
                <button
                  onClick={() => navigate("/add-posts")}
                  className="btn-blue inline-flex items-center justify-center gap-3 px-8 py-4 text-white font-medium text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 active:scale-95"
                >
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
        <h1 className="text-4xl text-white">
          Welcome to <span className="text-[#706df9]">BlogSpace</span>
        </h1>
        <p className="text-xl text-[#afb8cf] mt-7">
          Discover amazing stories, share your thoughts, and connect with a
          community of passionate writers and readers.
        </p>
        <div className="flex mt-10 justify-center gap-5">
          <button
            onClick={() => navigate("/all-posts")}
            className="bg-[#463fc2] px-6 py-3 text-white text-[18px] font-medium rounded-xl hover:cursor-pointer hover:bg-[#463fc29d]"
          >
            Explore Posts
          </button>
          <button
            onClick={() => navigate("/add-posts")}
            className="bg-white px-5 py-3 text-[#3a37fd] text-[18px] border-3 border-[#1512fb] font-medium rounded-xl hover:cursor-pointer hover:bg-[#ffffffc2]"
          >
            Start Writing
          </button>
        </div>
        <div className="flex flex-col space-y-5 mt-10">
          {actionItems.map((item) => (
            <div className="bg-gray-100 p-8 flex flex-col space-y-5 items-center justify-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div style={{ "--bg" : item.bg }} className="p-4 bg-[var(--bg)] rounded-4xl">
                <Icon style={{ "--st" : item.stroke }} icon={item.icon} className="stroke-[var(--st)]"/>
              </div>
              <h1 className="text-xl font-semibold">{item.heading}</h1>
              <p>{item.desc}</p>
            </div>
          ))
        }
        </div>
        <div className="mt-20">
          <h1 className="text-3xl text-white mb-[35px]">Latest Posts</h1>
          <div className="flex flex-wrap text-center">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
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

export default Home;
