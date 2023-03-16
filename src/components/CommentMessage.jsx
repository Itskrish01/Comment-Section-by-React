import React, { useContext, useState } from "react";
import { CommentContext } from "../ContextComment";
import data from "../data/data.json";
import { v4 as uuidv4 } from "uuid";
import { formatDistanceToNow } from "date-fns";

const CommentMessage = () => {
  const { AddComment } = useContext(CommentContext);
  const timeAgo = formatDistanceToNow(new Date());
  const [newComment, setNewComment] = useState({
    id: "",
    content: "",
    createdAt: "",
    score: 0,
    user: data.currentUser,
    replies: [],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    AddComment(newComment);
    setNewComment({
      ...newComment,
      content: "",
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewComment({
      ...newComment,
      id: uuidv4(),
      createdAt: timeAgo,
      [name]: value,
    });
  };

  return (
    <form
      className="flex bg-white px-4 py-4 mt-4 shadow-sm rounded-md gap-3"
      onSubmit={onSubmit}
    >
      <img
        className="w-10 h-10 rounded-full"
        src={data.currentUser.image.png}
        alt="Rounded avatar"
      />
      <input
        type="text"
        id="default-input"
        value={newComment.content}
        name="content"
        onChange={handleChange}
        placeholder="Write your comment..."
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
      />

      <div>
        <button
          type="submit"
          className="text-white px-6 py-3 bg-[#5357b7] hover:bg-[#3a3eb1] focus:outline-none font-medium rounded text-sm p-2.5 text-center"
        >
          SEND
        </button>
      </div>
    </form>
  );
};

export default CommentMessage;
