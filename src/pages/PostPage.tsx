import { useEffect, useState } from "react";
import PostTable from "../components/PostTable";
import AddPostModal from "../components/AddPostModal";
import PostFilterBar from "../components/PostFilterBar"; // ✅ Add this
import Swal from "sweetalert2";
import "../css/PostPage.css";

export interface Post {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  date: string;
  status: string;
  author: string;
  type: "News" | "Announcement";
  sharingTime: string;
  coverImage?: string;
  image?: string;
}

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const [filters, setFilters] = useState({
    type: "All Posts",
    status: "All Status",
    search: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("posts");
    if (stored) {
      setPosts(JSON.parse(stored));
    }
  }, []);

  const handleAddPost = (newPost: Post) => {
    const completePost: Post = {
      ...newPost,
      type: newPost.category as "News" | "Announcement",
      sharingTime: new Date().toLocaleDateString(),
      status: "Published",
      author: "Admin",
      image: newPost.coverImage || "",
    };

    const updated = [...posts, completePost];
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  const handleEditPost = (updatedPost: Post) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleDelete = async (id: number) => {
    const postToDelete = posts.find((post) => post.id === id);

    const result = await Swal.fire({
      title: "Are you sure?",
      html: `You are about to delete: <strong>"${postToDelete?.title}"</strong><br>This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      localStorage.setItem("posts", JSON.stringify(updated));

      Swal.fire("Deleted!", `"${postToDelete?.title}" has been deleted.`, "success");
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditingPost(null);
  };

  const handleSave = (post: Post) => {
    if (editingPost) {
      handleEditPost(post);
    } else {
      handleAddPost(post);
    }
    handleCloseModal();
  };

  const filteredPosts = posts.filter((post) => {
    const matchesType =
      filters.type === "All Posts" || post.type === filters.type;
    const matchesStatus =
      filters.status === "All Status" || post.status === filters.status;
    const matchesSearch =
      post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      post.author.toLowerCase().includes(filters.search.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="post-page">
      <div className="post-header">
        <h1>News & Announcements</h1>
        <button className="add-btn" onClick={() => setOpen(true)}>
          + Add News or Announcements
        </button>
      </div>

     
      <PostFilterBar onFilterChange={setFilters} />

    
      <PostTable posts={filteredPosts} onEdit={handleEdit} onDelete={handleDelete} />

      {open && (
        <AddPostModal
          onClose={handleCloseModal}
          onSave={handleSave}
          editPost={editingPost}
        />
      )}
    </div>
  );
}