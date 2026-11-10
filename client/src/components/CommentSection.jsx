import React, { useEffect, useState } from "react";
import { api } from "../libs/axios.js";
import { Pencil, Trash2, Send } from "lucide-react";
import toast from "react-hot-toast";

const CommentSection = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/comments/${recipeId}`);
        setComments(res.data.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        toast.error("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [recipeId]);

  const handleSubmitComment = async () => {
    if (!commentText.trim()) {
      return toast.error("Please write a comment");
    }

    try {
      const res = await api.post(`/comments/${recipeId}/create-comment`, {
        content: commentText,
      });

      if (res.status === 201) {
        toast.success("Comment posted!");

        setCommentText("");

        // Fetch updated comments
        const commentsRes = await api.get(`/comments/${recipeId}`);

        setComments(commentsRes.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post comment");
    }
  };
  return (
    <div className="bg-base-100 border border-base-300 rounded-(--radius-box) p-6 sm:p-8 shadow-sm space-y-8">
      <h2 className="font-display text-2xl font-bold text-base-content">
        Reviews &amp; comments ({comments.length})
      </h2>

      {/* Add Comment Input */}
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-1">
          MC
        </div>
        <form onSubmit={handleSubmitComment} className="flex-1 space-y-3">
          <span className="block text-xs font-bold text-base-content/70">
            Add a comment
          </span>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows="3"
            placeholder="Share how it turned out or a tip for other cooks"
            className="w-full px-4 py-2.5 bg-base-100 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content resize-none"
          ></textarea>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-primary-content rounded-(--radius-field) text-xs font-semibold hover:opacity-95 transition-opacity flex items-center space-x-2 cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post comment</span>
            </button>
          </div>
        </form>
      </div>

      {/* Comment List */}
      <div className="divide-y divide-base-200 pt-2">
        {loading ? (
          <p className="text-sm text-base-content/50 py-4">
            Loading comments...
          </p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-base-content/50 py-4">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="py-4 flex items-start space-x-3 first:pt-0"
            >
              {/* Avatar */}
              {comment.user?.avatar ? (
                <>
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.username}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                  />
                </>
              ) : (
                <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {comment.user?.username?.slice(0, 2).toUpperCase()}
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-base-content">
                    @{comment.user?.username}
                  </span>

                  <span className="text-[11px] text-base-content/50">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
