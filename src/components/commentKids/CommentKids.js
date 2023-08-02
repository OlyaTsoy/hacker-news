import "./commentKids.css";
import { useState, useEffect } from "react";
import { getComment } from "../../services/HackerNewsService";

const CommentKids = ({comment, descendants}) => {
  const [commentKids, setCommentKids] = useState([]);
  const [openChildComment, setOpenChildComment] = useState(false);

  useEffect(() => {
    const b = async () => {
    try {
      comment.kids?.forEach(async (el) => {
        const a = await getComment(el)
          setCommentKids((prev) => {
            return [...prev, a]
          })
      })

    } catch (err) {
      console.log(err)
    }
    }
    b();
  }, []);

  const asd = commentKids.map((a, com) => {
    console.log(commentKids)
      if (openChildComment) {
        return (
          <>
          <li className="list list__child" key={com}>
            <div className="comment__by ">
              <span>{a.by}</span>
            </div>
            <div className="comment__text">
              <span>{a.text}</span>
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
        {asd}
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