import React from "react";
import appwriteService from "../appwrite/configAp";
import { Link } from "react-router";

function PostCard({ $id, title, featuredImg }) {
  let imageUrl = "";

  try {
    imageUrl = appwriteService.getFilePreview(featuredImg).href;
  } catch (error) {
    console.error("invalid featuredimage in postcard: ", featuredImg);
  }

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="rounded-xl" />
          ) : (
            <div className="w-full h-40 bg-gray-300 rounded-xl flex items-center justify-center text-gray-600 text-sm">
              No Image
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
