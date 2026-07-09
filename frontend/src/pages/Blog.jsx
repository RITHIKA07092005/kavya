import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api.get("/blogs").then((r) => setBlogs(r.data)).catch(() => {});
  }, []);

  return (
    <div className="section pt-32">
      <h1 className="text-4xl font-bold text-center mb-2">Blog</h1>
      <p className="text-white/60 text-center mb-12">Insights on product, engineering, and design.</p>
      {blogs.length === 0 ? (
        <p className="text-center text-white/50">No posts yet — check back soon.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((b) => (
            <div key={b._id} className="glass p-6">
              {b.coverImage && <img src={b.coverImage} alt={b.title} className="rounded-xl mb-4 h-40 w-full object-cover" />}
              <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
              <p className="text-white/60 text-sm line-clamp-3">{b.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
