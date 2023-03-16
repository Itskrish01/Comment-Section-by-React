import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TiMinus, TiPlus } from "react-icons/ti";
import { FaReply } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import data from "../data/data.json";
import { CommentContext } from "../ContextComment";
import { toast } from "react-hot-toast";

const Reply = ({
  item,
  setIsReplyToReply,
  onSubmitReplyToReply,
  isReplyToReply,
  VoteUpReply,
  VoteDownReply,
  handleChangeReplytoReply,
  setVotedUpReply,
  setVotedDownReply,
  setOpen,
  setMessageId,
  setIsComment,
  messageId,
  newReplyToReply,
  setNewReplyToReply,
  commentID,
}) => {
  const { EditReplyMessage } = useContext(CommentContext);
  const [isEditing, setIsEditing] = useState(false);
  const [EditMessage, setEditMessage] = useState(item.content);

  const onSubmitEditComment = (e) => {
    e.preventDefault();
    EditReplyMessage(commentID, item.id, EditMessage);
    toast.success("Successfully Edited the Reply");
    setIsEditing(false);
  };

  const parts = item.content.split(/(@\w+)/g);

  return (
    <div>
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <div key={item.id} className="ml-3 sm:ml-8">
          <div className="bg-white relative flex flex-wrap-reverse sm:flex-nowrap gap-2 sm:gap-5 px-5 py-4 shadow-sm rounded-lg">
            <div>
              <div className="bg-[#f5f6fa] rounded-md text-black px-2 py-2 gap-2 flex flex-row sm:flex-col items-center">
                <div
                  onClick={() => {
                    setVotedUpReply(true);
                    setVotedDownReply(false);
                    VoteUpReply(item.id);
                  }}
                  className={`text-[#c8c4e8] hover:text-[#5557b1] text-sm font-semibold cursor-pointer `}
                >
                  <TiPlus />
                </div>
                <p className="text-[#5557b1] text-sm font-semibold">
                  {item.score}
                </p>
                <div
                  onClick={() => {
                    setVotedUpReply(false);
                    setVotedDownReply(true);
                    VoteDownReply(item.id);
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
                    src={item.user.image.png}
                    alt="Rounded avatar"
                  />
                  <p className="text-sm text-[#4a535d] font-semibold">
                    {item.user.username}
                  </p>
                  {item.user.username === "juliusomo" ? (
                    <div className="bg-[#5557b1] px-2 rounded-md text-sm text-white">
                      You
                    </div>
                  ) : (
                    ""
                  )}
                  <p className="text-sm text-gray-500">{item.createdAt}</p>
                </div>
                <div className="absolute bottom-0 p-5 sm:p-3 sm:top-0 right-0">
                  {item.user.username === "juliusomo" ? (
                    !isEditing && (
                      <div className="flex gap-3">
                        <div
                          onClick={() => {
                            setOpen(true);
                            setMessageId(item.id);
                            setIsComment(false);
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
                        setMessageId(item.id);
                        setIsReplyToReply(true);
                        setNewReplyToReply({
                          ...newReplyToReply,
                          content: "@" + item.user.username + ", ",
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
              <div className="mt-3 text-[#707276] text-sm sm:text-[15px] mb-3">
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
                  <p>
                    {parts.map((part, index) => {
                      if (part.startsWith("@")) {
                        return (
                          <span
                            key={index}
                            className=" font-semibold text-[#5557b1]"
                          >
                            {part}
                          </span>
                        );
                      } else {
                        return <span key={index}>{part}</span>;
                      }
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isReplyToReply && item.id === messageId && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <form
              onSubmit={onSubmitReplyToReply}
              className="flex bg-white ml-8 px-4 py-4 mt-4 shadow-sm rounded-md gap-3"
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
                onChange={handleChangeReplytoReply}
                value={newReplyToReply.content}
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
                  onClick={() => setIsReplyToReply(false)}
                  className="text-white px-6 py-3 bg-red-400 hover:bg-red-600 focus:outline-none font-medium rounded text-sm p-2.5 text-center"
                >
                  Cancle
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reply;
