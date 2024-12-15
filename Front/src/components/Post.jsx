import React, { useState, useEffect } from "react";
import {
  getPosts,
  deletePost,
  likePost,
  addPost,
  shortenUrl,
} from "../services/postService";
import CardPost from "./CardPost";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    titulo: "",
    img: "",
    descripcion: "",
  });

  // Cargar posts al montar el componente
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Manejar la eliminación de un post
  const handleDelete = async (id) => {
    try {
      await deletePost(id); // Elimina en el backend
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id)); // Actualiza el estado localmente
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  };

  // Manejar el like de un post
  const handleLike = async (id) => {
    try {
      const updatedPost = await likePost(id); // Actualiza en el backend
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? updatedPost : post))
      ); // Actualiza el estado localmente
    } catch (error) {
      console.error("Error al dar like al post:", error);
    }
  };

  // Manejar la adición de un post con URL acortada
  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const shortenedImg = await shortenUrl(newPost.img); // Acortar la URL de la imagen
      const post = { ...newPost, img: shortenedImg };
      const addedPost = await addPost(post); // Agregar el post al backend
      setPosts((prevPosts) => [addedPost, ...prevPosts]); // Actualiza el estado localmente
      setNewPost({ titulo: "", img: "", descripcion: "" }); // Limpia el formulario
    } catch (error) {
      console.error("Error al agregar el post:", error);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleAddPost} className="mb-4">
        <div className="mb-2">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            name="titulo"
            value={newPost.titulo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="img" className="form-label">
            Imagen URL
          </label>
          <input
            type="text"
            className="form-control"
            id="img"
            name="img"
            value={newPost.img}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={newPost.descripcion}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar Post
        </button>
      </form>
      <div className="row">
        {posts.map((post) => (
          <CardPost
            key={post.id}
            post={post}
            onDelete={handleDelete}
            onLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
}
