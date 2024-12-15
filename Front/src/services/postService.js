// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/posts";

export const getPosts = async () => {
  try {
    const response = await fetch(URL_API);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const addPost = async (post) => {
  try {
    const response = await fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error("Failed to add post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

export const deletePost = async (id) => {
  try {
    const response = await fetch(`${URL_API}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

export const likePost = async (id) => {
  try {
    const response = await fetch(`${URL_API}/${id}/like`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Failed to like post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error liking post:", error);
  }
};

export const updatePost = async (id, updatedPost) => {
  try {
    const response = await fetch(`${URL_API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });
    if (!response.ok) {
      throw new Error("Failed to update post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating post:", error);
  }
};
