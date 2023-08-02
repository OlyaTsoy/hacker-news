import "./comments.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStory } from "../../services/HackerNewsService";
import { getComment } from "../../services/HackerNewsService";
import CommentKids from "../commentKids/CommentKids";
import { ReactComponent as UpdateBtn } from "../../assets/updateBtn.svg";
import { ReactComponent as BackBtn} from "../../assets/backBtn.svg";

const Comments = () => {
  const [story, setStory] = useState({});
  const [comments, setComments] = useState([]);

  const {storyId} = useParams();

  useEffect(() => {
    const a = async () => {
      const data = await getStory(storyId)
      .then((data) =>
        setStory(data)
      );
    }
    a();
  }, []);

  useEffect(() => {
    const b = async () => {
      try {
        story.kids?.forEach(async (el) => {
            const data = await getComment(el);
            setComments((prev) => {
              return [...prev, data]
            });
            console.log(comments);
          });
      } catch (err) {
        console.log(err);
      }
    }
    b();
  }, [story.kids]);

  const handleButtonUpdate = () => {
    const b = async () => {
      await getComment(story.kids)
    }
    console.log(b)
  };

  const newTime = new Date(story.time * 1000);
  const years = newTime.getFullYear();
  const month = newTime.getMonth();
  const day = newTime.getDate();
  const date = day + '.' + month + '.' + years;

  return story ? (
    <main className="comments">
      <div className="container">
        <header className="header">
          <Link to="/" className="title">
            Hacker News
          </Link>
          <div className="comments__button">
            <Link to="/"><BackBtn className="button"></BackBtn></Link>
            <UpdateBtn className="button" onClick={handleButtonUpdate}></UpdateBtn>
          </div>
        </header>
        <ul className="items">
          <a href={story.url} className="list">
            <div className="list__title">
              <span>{story.title}</span>
            </div>
            <div className="list__desc">
              <span>by: {story.by} | </span>
              <span>date: {date} | </span>
              <span>{story.descendants} comments</span>
            </div>
          </a>
          <ul className="list__title">Comments:
            {comments.length < 1 ? (<h2 className="comments__notFound">No comments...</h2>) : (comments.map((comment, id) => (
              <CommentKids key={id} comment={comment} descendants={story.descendants}/>
            )))}
          </ul>
        </ul>
      </div>
    </main>
  ) : null;
};

export default Comments;