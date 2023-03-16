import { useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import Comment from "./components/Comment";
import CommentMessage from "./components/CommentMessage";
import { CommentContext } from "./ContextComment";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

function App() {
  const { comments } = useContext(CommentContext);
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [comments]);
  return (
    <div
      ref={containerRef}
      className="container-items mt-10 gap-4 flex flex-col"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <AnimatePresence>
        {comments.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Comment
              key={item.id}
              commentID={item.id}
              createdAt={item.createdAt}
              message={item.content}
              profileImg={item.user.image.png}
              replies={item.replies}
              score={item.score}
              userName={item.user.username}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <CommentMessage />
    </div>
  );
}

export default App;
