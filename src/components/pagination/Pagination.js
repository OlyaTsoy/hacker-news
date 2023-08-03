import "./pagination.css";

const Pagination = ({ totalStories, storiesPerPage, paginate, currentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalStories / storiesPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page) => {
        return <button className={`pagination__page ${page === currentPage ? "pagination__page-active" : ""}`}
          key={page}
          onClick={() => paginate(page)}>
          {page}
        </button>
      })}
    </div>
  )
};

export default Pagination;