import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/configAp";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <Container>``
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
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

export default Home;
