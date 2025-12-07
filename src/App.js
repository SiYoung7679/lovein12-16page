// src/App.js

import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Post from "./components/Post.js";
import { posts } from "./data/post.js";

function App() {
  return (
    <div>
      <Header />

      {/* posts 배열을 돌면서 Post 컴포넌트 여러 개 렌더링 */}
      {posts.map((post) => (
        <Post
          key={post.id}
          profileImg={post.profileImg}
          userName={post.userName}
          images={post.images}
          likes={post.likes}
          caption={post.caption}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
