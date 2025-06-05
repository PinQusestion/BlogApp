import React from "react";
import appwriteService from "../appwrite/configAp";
import { Link } from "react-router";

function PostCard({ $id, title, featuredImg, content }) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const text = doc.body.textContent;

  let imageUrl = "";

  try {
    imageUrl = appwriteService.getFilePreview(featuredImg).href;
  } catch (error) {
    console.error("invalid featuredimage in postcard: ", featuredImg);
  }

  return (
    <Link to={`/post/${$id}`}>
      <div className="rounded-2xl h-full overflow-hidden bg-white dark:bg-slate-700 shadow-2xl p-5 transition-all cursor-pointer hover:shadow-indigo-200 dark:hover:shadow-cyan-800">
        <div className="w-full justify-center mb-4">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="rounded-xl w-min h-[139.53px]" />
          ) : (
            <div className="w-full h-40 bg-gray-300 rounded-xl flex items-center justify-center text-gray-600 text-sm">
              No Image
            </div>
          )}
        </div>
        <h2 className="mt-5 text-left text-white text-xl font-semibold hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">{title}</h2>
        <p className="text-left text-white truncate mt-3">{text}</p>
      </div>
    </Link>
  );
}

export default PostCard;
