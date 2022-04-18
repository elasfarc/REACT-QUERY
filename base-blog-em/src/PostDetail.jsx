import { useQuery, useMutation } from "react-query";
async function fetchComments({ queryKey: [key, postId] }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const { data, isLoading } = useQuery(
    ["postComments", post.id],
    fetchComments
  );

  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation((postId) => updatePost(postId));

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={deleteMutation.mutate(post.id)}>Delete</button>{" "}
      <button onClick={updateMutation.mutate(post.id)}>Update title</button>
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>deleting the post...</p>
      )}
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error deleting the post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>post is deleted successfully</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {isLoading ? (
        <p>loading comments...</p>
      ) : (
        data.map((comment) => (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        ))
      )}
    </>
  );
}
