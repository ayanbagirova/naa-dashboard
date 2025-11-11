import { mockPosts } from "../mock/posts";

let posts = [...mockPosts];

export const getPosts = async (): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(posts), 500);
  });
};

export const addPost = async (newPost: Post): Promise<Post> => {
  posts.push(newPost);
  return newPost;
};

export const updatePost = async (updatedPost: Post): Promise<Post> => {
  posts = posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
  return updatedPost;
};

export const deletePost = async (id: number): Promise<void> => {
  posts = posts.filter((post) => post.id !== id);
};