import React, { useContext, useEffect, useRef, useState } from "react";
import { TiMinus, TiPlus } from "react-icons/ti";
import { FaReply } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import data from "../data/data.json";
import { v4 as uuidv4 } from "uuid";
import DeleteModal from "./DeleteModal";
import { AnimatePresence, motion } from "framer-motion";
import { CommentContext } from "../ContextComment";
import { formatDistanceToNow } from "date-fns";
import Reply from "./Reply";
import { toast } from "react-hot-toast";

const Comment = ({
  profileImg,
  userName,
  createdAt,
  message,
  replies,
  score,
  commentID,
}) => {
  const {
    AddReply,
    CommentVoteDown,
    CommentVoteUp,
    ReplyVoteUp,
    ReplyVoteDown,
    EditComment,
  } = useContext(CommentContext);
  const [open, setOpen] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [isComment, setIsComment] = useState(false);
  const [isReplyToComment, setIsReplyToComment] = useState(false);
  const [isReplyToReply, setIsReplyToReply] = useState(false);
  const [votedUp, setVotedUp] = useState(false);
  const [votedDown, setVotedDown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [votedUpReply, setVotedUpReply] = useState(false);
  const [votedDownReply, setVotedDownReply] = useState(false);
  const timeAgo = formatDistanceToNow(new Date());
  const [EditMessage, setEditMessage] = useState(message);
  const [newReply, setNewReply] = useState({
    id: "",
    content: "",
    createdAt: "",
    score: 0,
    user: data.currentUser,
  });

  const [newReplyToReply, setNewReplyToReply] = useState({
    id: "",
    content: "",
    createdAt: "",
    score: 0,
    user: data.currentUser,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setIsReplyToComment(false);
    AddReply(messageId, newReply);
    setNewReply({
      ...newReply,
      content: "",
    });
  };

  const onSubmitReplyToReply = (e) => {
    e.preventDefault();
    setIsReplyToComment(false);
    AddReply(commentID, newReplyToReply);
    setIsReplyToReply(false);
    setNewReply({
      ...newReply,
      content: "",
    });
  };

  const onSubmitEditComment = (e) => {
    e.preventDefault();
    EditComment(commentID, EditMessage);
    toast.success("Successfully Edited the Reply");
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setNewReply({
      ...newReply,
      id: uuidv4(),
      createdAt: timeAgo,
      [name]: value,
    });
  };

  const handleChangeReplytoReply = (e) => {
    const { value, name } = e.target;

    setNewReplyToReply({
      ...newReplyToReply,
      id: uuidv4(),
      createdAt: timeAgo,
      [name]: value,
    });
  };

  const VoteUp = () => {
    if (votedUp) {
      return;
    }
    CommentVoteUp(commentID);
  };

  const VoteDown = () => {
    if (votedDown) {
      return;
    }
    CommentVoteDown(commentID);
  };

  const VoteUpReply = (ReplyId) => {
    if (votedUpReply) {
      return;
    }
    ReplyVoteUp(commentID, ReplyId);
  };

  const VoteDownReply = (ReplyId) => {
    if (votedDownReply) {
      return;
    }
    ReplyVoteDown(commentID, ReplyId);
  };

  return (
    <div>
      {open && (
        <DeleteModal
          commentID={messageId}
          setOpen={setOpen}
          isComment={isComment}
        />
      )}

      <div className="bg-white relative w-full flex flex-wrap-reverse sm:flex-nowrap gap-2 sm:gap-5 px-5 py-4 shadow-sm rounded-lg">
        <div>
          <div className="bg-[#f5f6fa] rounded-md text-black px-2 py-2 gap-2 flex flex-row sm:flex-col items-center">
            <div
              onClick={() => {
                setVotedUp(true);
                setVotedDown(false);
                VoteUp();
              }}
              className={`text-[#c8c4e8] hover:text-[#5557b1] text-sm font-semibold cursor-pointer `}
            >
              <TiPlus />
            </div>
            <p className="text-[#5557b1] text-sm font-semibold">{score}</p>
            <div
              onClick={() => {
                setVotedUp(false);
                setVotedDown(true);
                VoteDown();
              }}
              className={`text-[#c8c4e8] hover:text-[#5557b1] text-sm font-semibold cursor-pointer `}
            >
              <TiMinus />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                className="w-7 h-7 rounded-full"
                src={profileImg}
                alt="Rounded avatar"
              />
              <p className="text-sm text-[#4a535d] font-semibold">{userName}</p>
              {userName === "juliusomo" ? (
                <div className="bg-[#5557b1] px-2 rounded-md text-sm text-white">
                  You
                </div>
              ) : (
                ""
              )}
              <p className="text-sm text-gray-500">{createdAt}</p>
            </div>
            <div className="absolute bottom-0 p-5 sm:p-3 sm:top-0 right-0">
              {userName === "juliusomo" ? (
                !isEditing && (
                  <div className="flex gap-3">
                    <div
                      onClick={() => {
                        setOpen(true);
                        setMessageId(commentID);
                        setIsComment(true);
                      }}
                      className="flex cursor-pointer items-center gap-1 text-red-500 text-[14px] font-semibold"
                    >
                      <MdDelete />
                      <p>Delete</p>
                    </div>
                    <div
                      onClick={() => setIsEditing(true)}
                      className="flex cursor-pointer items-center gap-1 text-[#4a4d9c] text-[14px] font-semibold"
                    >
                      <MdEdit />
                      <p>Edit</p>
                    </div>
                  </div>
                )
              ) : (
                <div
                  onClick={() => {
                    setMessageId(commentID);
                    setIsReplyToComment(true);
                    setNewReply({
                      ...newReply,
                      content: "@" + userName + ", ",
                    });
                  }}
                  className="flex cursor-pointer items-center gap-1 text-[#4a4d9c] text-[14px] font-semibold"
                >
                  <FaReply />
                  <p>Reply</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 text-[#707276] text-sm sm:text-[15px] mr-3 mb-3">
            {isEditing ? (
              <form onSubmit={onSubmitEditComment}>
                <input
                  type="text"
                  id="default-input"
                  name="editmessage"
                  onChange={(e) => setEditMessage(e.target.value)}
                  value={EditMessage}
                  placeholder="Write your comment..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                />
                <div className="flex justify-end gap-2 mt-3">
                  <div>
                    <button
                      type="submit"
                      className="text-white px-4 py-2 bg-[#5357b7] hover:bg-[#3a3eb1] focus:outline-none font-medium rounded text-sm p-2.5 text-center"
                    >
                      Update
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="text-white px-4 py-2 bg-red-400 hover:bg-red-600 focus:outline-none font-medium rounded text-sm p-2.5 text-center"
                    >
                      Cancle
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <p>{message}</p>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isReplyToComment && commentID === messageId && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <form
              onSubmit={onSubmit}
              className="flex bg-white px-4 py-4 mt-4 shadow-sm rounded-md gap-3"
            >
              <img
                className="w-10 h-10 rounded-full"
                src={data.currentUser.image.png}
                alt="Rounded avatar"
              />
              <input
                type="text"
                id="default-input"
                name="content"
                onChange={handleChange}
                value={newReply.content}
                placeholder="Write your comment..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="text-white px-6 py-3 bg-[#5357b7] hover:bg-[#3a3eb1] focus:outline-none font-medium rounded text-sm p-2.5 text-center"
                >
                  SEND
                </button>
                <button
                  type="button"
                  onClick={() => setIsReplyToComment(false)}
                  className="text-white px-6 py-3 bg-red-400 hover:bg-red-600 focus:outline-none font-medium rounded text-sm p-2.5 text-center"
                >
                  Cancle
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replying section */}
      <AnimatePresence>
        {replies.length !== 0 ? (
          <div className="border-l-2 flex flex-col gap-4 pt-4 border-gray-300/60 ml-3 sm:ml-8">
            {replies.map((item) => (
              <Reply
                key={item.id}
                item={item}
                setNewReplyToReply={setNewReplyToReply}
                onSubmitReplyToReply={onSubmitReplyToReply}
                isReplyToReply={isReplyToReply}
                setIsReplyToReply={setIsReplyToReply}
                VoteUpReply={VoteUpReply}
                VoteDownReply={VoteDownReply}
                setVotedUpReply={setVotedUpReply}
                setVotedDownReply={setVotedDownReply}
                handleChangeReplytoReply={handleChangeReplytoReply}
                setOpen={setOpen}
                setMessageId={setMessageId}
                setIsComment={setIsComment}
                messageId={messageId}
                newReplyToReply={newReplyToReply}
                commentID={commentID}
              />
            ))}
          </div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
};

export default Comment;
