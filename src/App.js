import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Post from "./components/Post";
import Pagination from "./components/Pagination";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };
    getPosts();
  }, []);
  console.log(posts);
  //Get Current posts
  const indexOfLastPost = currentPage * postPerPage;
  const inxexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(inxexOfFirstPost, indexOfLastPost);

  ///Change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Post posts={currentPosts} loading={loading} />
      <Pagination
        postPerPage={postPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
