import React, { useEffect, useState } from 'react'
import "../styles/firstPage.css"
import Pagination from '../components/pagination/pagination';

function FirstPage() {
  const [data, setData] = useState([])
  const [startingPage, setStartingPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json").then((response) => response.json())
      .then((res) => {
        setData(res)
        setTotalPages(Math.ceil(res.length / itemsPerPage))
      })
      .catch((err) => {

      });
  }, [])
  const pages = (page) => {

  }  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const calculateVisiblePages = () => {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    const adjustedStart = Math.max(1, end - 4);
    return Array.from({ length: end - adjustedStart + 1 }, (_, i) => adjustedStart + i);
  };
  return (
    <div>

      <div>
        <h1>Kickstarter Projects</h1>
        <table className="table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage Funded</th>
              <th>Amount Pledged</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((project, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{project["percentage.funded"]}</td>
                <td>{project["amt.pledged"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
        {/* <span className="paginate-span">
          <button
            aria-label="Previous Page"
            onClick={prevPage} className={`left-arrow ${currentPage === 1 ? "disabled" : ""}`}>&lt;</button>
          {calculateVisiblePages().map((page) => (
            <a
              key={page}
              className={`page-number ${currentPage === page ? "selected-a" : "not-selected-a"
                }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </a>
          ))}
          <button
            aria-label="Next Page"

            onClick={nextPage} className={`right-arrow ${currentPage === totalPages ? "disabled" : ""}`}>&gt;</button>
        </span> */}
        <div>
        </div>
      </div>
    </div>
  )
}

export default FirstPage