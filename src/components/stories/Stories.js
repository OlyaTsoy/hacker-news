import "./stories.css";
import React, { useEffect, useState } from "react";
import { getStories } from "../../services/HackerNewsService";
import Story from "../story/Story";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ReactComponent as UpdateBtn } from "../../assets/updateBtn.svg";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentStories, setCurrentStories] = useState(null);
  // const [totalPage, setTotalPage] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);
  // const [storiesPerPage] = useState(10);

  // useEffect(() => {
  //   setIsLoading(true);

  //   getStories().then((data) => setStories(data));
  //   const endStoriesPage = currentPage + storiesPerPage;
  //   setCurrentStories(stories.slice(currentPage, endStoriesPage));
  //   // setTotalPage(10);
  //   setTotalPage(Math.ceil(stories.length / storiesPerPage));
  //   // setInterval(() => getStories().then((data) => setStories(data)), 1000);

  //   setIsLoading(false);
  // }, [currentPage, storiesPerPage, stories]);

  useEffect(() => {
    setIsLoading(true);

    const storiesData = async () => {
      await getStories()
      .then((data) => {
        return setStories(data)
      });
      // setInterval(() => getStories().then((data) => setStories(data)), 1000);
    }
    storiesData();
    setIsLoading(false)
  }, []);

  const handleButtonUpdate = () => {
    const storiesData = async () => {
      await getStories()
      .then((data) => {
        return setStories(data)
      });
    }
    console.log(storiesData())
  };

  // const handlePageChange = (event) => {
  //   // console.log(event);
  //   // setCurrentPage(event.selected);
  //   const newStoriesPage = (event.selected * storiesPerPage) % stories.length;
  //   setCurrentPage(newStoriesPage);
  // }

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
            {stories.slice(0, 100).map((storyId, idx) => (
              <Story key={storyId} storyId={storyId} idx={idx + 1 + '. '} />
            ))}
            {/* {currentStories?.slice(0, 100).map((storyId, idx) => (
              <Story key={storyId} storyId={storyId} idx={idx + 1 + '. '} />
            ))} */}
          </ul>)}
          {/* <ReactPaginate
            nextLabel=">>"
            previousLabel="<<"
            breakLabel="..."
            pageCount={totalPage}
            forcePage={currentPage}
            renderOnZeroPageCount={null}
            onPageChange={handlePageChange}
            className="pagination"
            activeClassName="active__page"
            previousClassName="previous__page"
            nextClassName="next__page"
          /> */}
      </div>
    </main>
  );
};

export default Stories;