import React, { useEffect, useState } from "react";
import { getStories } from "../../services/HackerNewsService";
import Story from "../story/Story";
import { Link } from "react-router-dom";
import { ReactComponent as UpdateBtn } from "../../assets/updateBtn.svg";
import Pagination from "../pagination/Pagination";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [storiesPerPage] = useState(10);

  useEffect(() => {
    setIsLoading(true);

    const fetchStories = async () => {
      await getStories()
      .then((data) => {
        return setStories(data)
      });
      // setInterval(() => getStories().then((data) => setStories(data)), 1000);
    }
    fetchStories();
    setIsLoading(false)
  }, []);

  const handleButtonUpdate = () => {
    const storiesData = async () => {
      await getStories()
      .then((data) => {
        return setStories(data)
      });
    }
  };

  const lastStoriesIndex = currentPage * storiesPerPage;
  const firstStoriesIndex = lastStoriesIndex - storiesPerPage;
  const currentStories = stories.slice(firstStoriesIndex, lastStoriesIndex);

  const paginate = (page) => {
    return setCurrentPage(page)
  };

  return (
    <main className="main">
      <div className="container">
        <header className="header">
          <Link to="/" className="title">
           Hacker News
          </Link>
          <UpdateBtn className="button" onClick={handleButtonUpdate}></UpdateBtn>
        </header>
          {isLoading ? (<h1>Loading...Please, wait!</h1>) : (<ul className="items">
            {currentStories.map((storyId, idx) => (
              <Story key={storyId} storyId={storyId} idx={idx + 1} currentPage={currentPage} />
            ))}
        </ul>)}
        <Pagination
          totalStories={stories.slice(0, 100).length}
          storiesPerPage={storiesPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
};

export default Stories;