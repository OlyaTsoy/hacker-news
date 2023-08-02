import "./commentKids.css";
import { useState, useEffect } from "react";
import { getComment } from "../../services/HackerNewsService";

const CommentKids = ({comment, descendants}) => {
  const [commentKids, setCommentKids] = useState([]);
  const [openChildComment, setOpenChildComment] = useState(false);

  useEffect(() => {
    const fetchComment = async () => {
    try {
      comment.kids?.forEach(async (kid) => {
        const data = await getComment(kid)
          setCommentKids((prev) => {
            return [...prev, data]
          })
      })

    } catch (err) {
      console.log(err)
    }
    }
    fetchComment();
  }, []);

  const kids = commentKids.map((kid, com) => {
      if (openChildComment) {
        return (
          <>
          <li className="list list__child" key={com}>
            <div className="comment__by ">
              <span>{kid.by}</span>
            </div>
            <div className="comment__text">
              <span>{kid.text}</span>
            </div>
          </li>
          {/* <ul>
            {a.kids?.length ? <CommentKids key={a.id} comment={a}/> : ''}
          </ul> */}
          </>
        )
      }
      return '';
  });

  const toggleKidsComment = () => {
    setOpenChildComment(!openChildComment);
  };

  return (
    <li className="list">
      <div className="comment__by">
        <span>{comment.by}</span>
      </div>
      <div className="comment__text">
        <span>{comment.text}</span>
       </div>
       <ul>
        {kids}
       </ul>
       {comment.kids?.length ?
          <div className="comments__btn" onClick={toggleKidsComment}>
            {openChildComment ? "Hide" : `Show ${descendants} reply`}
          </div>
        : ''}
    </li>
  )
};

export default CommentKids;