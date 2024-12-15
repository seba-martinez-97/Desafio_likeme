import TrashIcon from "./icons/TrashIcon";
import HeartIcon from "./icons/heart-solid";
import { deletePost, likePost } from "../services/postService";

export default function CardPost({ post, onDelete, onLike }) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este post?"
    );
    if (confirmed) {
      await deletePost(post.id);
      onDelete(post.id);
    }
  };

  const handleLike = async () => {
    const updatedPost = await likePost(post.id);
    if (updatedPost) {
      onLike(updatedPost);
    }
  };

  return (
    <article className="card mb-4">
      <img src={post.img} alt={post.titulo} className="card-img-top" />
      <div className="card-body">
        <h5>{post.titulo}</h5>
        <p>{post.descripcion}</p>
        <div className="d-flex mt-3 justify-content-between align-items-center">
          <div>
            <HeartIcon
              fill="red"
              height="25"
              onClick={handleLike}
              className="cursor-pointer"
            />
            <span className="ms-2">{post.likes}</span>
          </div>
          <TrashIcon
            fill="red"
            height="25"
            onClick={handleDelete}
            className="cursor-pointer"
          />
        </div>
      </div>
    </article>
  );
}
