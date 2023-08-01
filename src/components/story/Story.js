import { getStory } from "../../services/HackerNewsService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Story = ({storyId, idx}) => {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId).then(data => data && data.url && setStory(data));
  }, []);

  const newTime = new Date(story.time * 1000);
  const years = newTime.getFullYear();
  const month = newTime.getMonth();
  const day = newTime.getDate();
  const date = day + '.' + month + '.' + years;

  return story && story.id ? (
    <Link to={`${story.id}`} className="list">
      <div className="list__title">
        <span>{idx}</span>
        <span>{story.title}</span>
      </div>
      <div className="list__desc">
        <span>rating: {story.score} </span>
        <span>by: {story.by} </span>
        <span>date: {date} </span>
        <span>comment: {story.descendants} </span>
      </div>
    </Link>
  ) : null;
};

export default Story;