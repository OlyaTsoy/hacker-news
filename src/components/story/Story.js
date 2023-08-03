import { getStory } from "../../services/HackerNewsService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment/moment";

const Story = ({storyId, idx, currentPage}) => {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId).then(data => setStory(data));
  }, []);

  const date = moment.unix(story.time).format("DD.MM.YYYY");
  console.log(idx)

  return story && story.id ? (
    <Link to={`${story.id}`} className="list">
      <div className="list__title">
        <span>{(currentPage - 1) * 10 + idx + '. '}</span>
        <span>{story.title}</span>
      </div>
      <div className="list__desc">
        <span>Rating: {story.score} | </span>
        <span>by: {story.by} | </span>
        <span>date: {date} | </span>
        <span>{story.descendants} comments</span>
      </div>
    </Link>
  ) : null;
};

export default Story;