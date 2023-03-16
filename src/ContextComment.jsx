import React, { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import data from "./data/data.json";

export const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState(data.comments);

  const AddComment = (newComment) => {
    if (newComment.content === "") {
      return;
    }
    setComments([...comments, newComment]);
  };

  const DeleteComment = (commentId) => {
    const newState = comments.filter((comment) => comment.id !== commentId);
    setComments(newState);
  };

  const DeleteReply = (ReplyId) => {
    const newState = comments.map((item) => {
      return {
        ...item,
        replies: item.replies.filter((reply) => reply.id !== ReplyId),
      };
    });
    setComments(newState);
  };

  const AddReply = (commentId, newReply) => {
    if (newReply.content === "") {
      toast.error("You can't send an empty message");
      return;
    }
    const updatedArray = comments.map((item) => {
      if (item.id === commentId) {
        return {
          ...item,
          replies: [...item.replies, newReply],
        };
      }
      return item;
    });

    setComments(updatedArray);
  };

  const CommentVoteUp = (commentId) => {
    const updatedArray = comments.map((item) => {
      if (item.id === commentId) {
        return {
          ...item,
          score: item.score + 1,
        };
      }
      return item;
    });

    setComments(updatedArray);
  };

  const CommentVoteDown = (commentId) => {
    const updatedArray = comments.map((item) => {
      if (item.id === commentId) {
        return {
          ...item,
          score: item.score - 1,
        };
      }
      return item;
    });

    setComments(updatedArray);
  };

  const ReplyVoteUp = (commentId, replyId) => {
    const updatedArray = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === replyId) {
            return {
              ...reply,
              score: reply.score + 1,
            };
          }
          return reply;
        });
        return {
          ...comment,
          replies: updatedReplies,
        };
      }
      return comment;
    });

    setComments(updatedArray);
  };

  const ReplyVoteDown = (commentId, replyId) => {
    const updatedArray = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === replyId) {
            return {
              ...reply,
              score: reply.score - 1,
            };
          }
          return reply;
        });
        return {
          ...comment,
          replies: updatedReplies,
        };
      }
      return comment;
    });

    setComments(updatedArray);
  };

  const EditComment = (commentId, newEditedComment) => {
    const updatedArray = comments.map((item) => {
      if (item.id === commentId) {
        return {
          ...item,
          content: newEditedComment,
        };
      }
      return item;
    });

    setComments(updatedArray);
  };

  const EditReplyMessage = (commentId, replyId, newEditReply) => {
    const updatedArray = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === replyId) {
            return {
              ...reply,
              content: newEditReply,
            };
          }
          return reply;
        });
        return {
          ...comment,
          replies: updatedReplies,
        };
      }
      return comment;
    });

    setComments(updatedArray);
  };

  const values = {
    comments,
    AddComment,
    DeleteComment,
    DeleteReply,
    AddReply,
    CommentVoteDown,
    CommentVoteUp,
    ReplyVoteUp,
    ReplyVoteDown,
    EditComment,
    EditReplyMessage,
  };

  return (
    <CommentContext.Provider value={values}>{children}</CommentContext.Provider>
  );
};

export default CommentProvider;
