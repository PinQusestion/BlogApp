import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import appwriteService from "../appwrite/configAp";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && (userData ? post.userID === userData.$id : false);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
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
    <div className="relative mt-20 overflow-hidden rounded-[24px] py-10 px-6 border border-white/10 bg-white/5 backdrop-blur-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.3)] animate-fade-in-up before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent mb-10">
      <Container>
        <div className="w-full flex justify-left mb-4 relative rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImg)}
            alt={post.title}
            className="rounded-xl size-50"
          />
          <div className="ml-10">
            <div className="w-full mb-6 text-white">
              <h1 className="text-4xl font-bold text-left">{post.title}</h1>
            </div>
            <div className="browser-css text-[#a4b0c0] text-left">
              {parse(post.content)}
            </div>
            <div className="browser-css"></div>
          </div>
        </div>
        {isAuthor && (
          <div className="w-fit h-fit ml-5">
            <Link to={`/edit-post/${post.$id}`}>
              <button className="btn-blue mr-2 text-white relative overflow-hidden px-6 py-2 rounded-lg font-semibold text-base border-none cursor-pointer transition-all duration-300 before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-left before:duration-500 hover:before:left-[100%]">Edit</button>
            </Link>
            <button className="btn-red text-white relative overflow-hidden px-6 py-2 rounded-lg font-semibold text-base border-none cursor-pointer transition-all duration-300 before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-left before:duration-500 hover:before:left-[100%]" onClick={deletePost}>Delete</button>
          </div>
        )}
      </Container>
    </div>
  ) : null;
}
