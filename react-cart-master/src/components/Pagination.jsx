import React from "react";

const Pagination = ({
  totalPosts,
  postPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination-container">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? "active" : ""}
            style={{
              cursor: "pointer",
              padding: "20px",
              margin: "0 10px",
              background: "#c54812",
              color: "white",
            }}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
