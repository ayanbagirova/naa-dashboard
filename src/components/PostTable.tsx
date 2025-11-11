import "../css/PostTable.css";
import { Edit, Trash2 } from "lucide-react";

export interface Post {
  id: number;
  title: string;
  slug: string;
  category: "News" | "Announcement";
  coverImage?: string;
  gallery?: string[];
  content: string;
  date: string;
  status: string;
  author: string;
  type: "News" | "Announcement";
  sharingTime: string;
}

interface Props {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export default function PostTable({ posts, onEdit, onDelete }: Props) {
  const handleDeleteClick = (post: Post) => {
    onDelete(post.id);
  };

  return (
    <div className="post-table-container">
      <table className="post-table">
        <thead>
          <tr>
            <th>Post</th>
            <th>Type</th>
            <th>Sharing time</th>
            <th>Status</th>
            <th>Publish Status</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              {/* Post column */}
              <td className="post-info">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="post-image"
                />
                <div className="post-details">
                  <h4 className="post-title">{post.title}</h4>
                  <p className="post-subtitle">
                  {post.content}
                  </p>
                </div>
              </td>

           
              <td>
                <span
                  className={`type-badge ${
                    post.type === "News" ? "news" : "announcement"
                  }`}
                >
                  {post.type}
                </span>
              </td>

             
              <td>
                <div className="sharing-time">
                  <p>{post.date}</p>
                  <span>{post.sharingTime}</span>
                </div>
              </td>

           
              <td>
                <span className="status-badge active">
                  <span className="dot" /> Active
                </span>
              </td>

            
              <td>
                <div className="publish-dropdown">
                  <select>
                    <option>Publish</option>
                    <option>Draft</option>
                  </select>
                </div>
              </td>

            
              <td>{post.author}</td>

           
              <td className="actions">
                <button onClick={() => onEdit(post)} title="Edit">
                  <Edit size={17} strokeWidth={2} />
                </button>
                <button onClick={() => handleDeleteClick(post)} title="Delete">
                  <Trash2 size={17} strokeWidth={2} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {posts.length === 0 && (
        <p className="no-posts">No posts yet.</p>
      )}
    </div>
  );
}