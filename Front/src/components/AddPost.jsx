import { useState } from "react";
import { addPost } from "../services/postService";
import { errorToast } from "../utils/toast";

export default function AddPost({ onPostAdded }) {
  const [values, setValues] = useState({
    titulo: "",
    img: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { titulo, img, descripcion } = values;
    if (!titulo.trim() || !img.trim() || !descripcion.trim()) {
      return errorToast("Todos los campos son obligatorios");
    }

    const post = {
      titulo: titulo.trim(),
      img: img.trim(),
      descripcion: descripcion.trim(),
    };
    const result = await addPost(post);
    if (result) {
      onPostAdded(result);
      setValues({ titulo: "", img: "", descripcion: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="titulo" className="form-label">
          Título
        </label>
        <input
          type="text"
          className="form-control"
          id="titulo"
          name="titulo"
          onChange={handleChange}
          value={values.titulo}
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
          onChange={handleChange}
          value={values.img}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">
          Descripción
        </label>
        <textarea
          id="descripcion"
          className="form-control"
          name="descripcion"
          onChange={handleChange}
          value={values.descripcion}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-light mx-auto d-block">
        Agregar
      </button>
    </form>
  );
}
