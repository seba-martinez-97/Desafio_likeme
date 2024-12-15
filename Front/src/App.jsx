import { useEffect, useState } from "react";
import { successToast, errorToast } from "./utils/toast";
import {getPosts,addPost,deletePost,likePost,} from "./services/postService";
import AddPost from "./components/AddPost";
import CardPost from "./components/CardPost";



export default function App() {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch(() => {
        errorToast("Error al obtener los posts");
      });
  }, []);

  const agregarPost = async () => {
    try {
      // Acorta la URL de la imagen antes de enviarla
      const shortenedImg = await shortenURL(imgSrc);

      const post = {
        titulo,
        img: shortenedImg, // Usa la URL acortada
        descripcion,
      };

      const newPost = await addPost(post);
      setPosts([...posts, newPost]);
      successToast("Post creado correctamente");
    } catch (error) {
      errorToast("Error al agregar el post");
    }
  };

  const deletePostById = async (id) => {
    try {
      await deletePost(id);
      const newPosts = posts.filter((post) => post.id !== id);
      setPosts(newPosts);
      successToast("Post eliminado correctamente");
    } catch (error) {
      errorToast("Error al eliminar el post");
    }
  };

  const likePostById = async (id) => {
    try {
      await likePost(id);
      const newPosts = posts.map((post) => {
        if (post.id === id) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      });
      setPosts(newPosts);
    } catch (error) {
      errorToast("Error al dar like al post");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">📷 Like Me 📷</h1>
      <main className="row">
        <section className="col-12 col-md-4 mt-5">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h2>Agrega tarjeta nueva</h2>
              <AddPost
                setTitulo={setTitulo}
                setImgSRC={setImgSRC}
                setDescripcion={setDescripcion}
                agregarPost={agregarPost}
              />
            </div>
          </div>
        </section>
        <section className="col-12 col-md-8 mt-5">
          {posts.map((post) => (
            <CardPost
              key={post.id}
              post={post}
              deletePostById={deletePostById}
              likePostById={likePostById}
            />
          ))}

          {posts.length === 0 && (
            <div className="card">
              <div className="card-body">
                <h2>No existen posts</h2>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
