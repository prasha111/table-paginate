import React, { useEffect, useState } from 'react'
import "../styles/firstPage.css"
import Pagination from '../components/pagination/pagination';
import Table from '../components/table/table';
import { api } from '../service/apiServiceCall';

const headerTable = ["S.No.","Percentage Funded","Amount Pledged"]
const tableValue  = ["s.no","percentage.funded","amt.pledged"]
function FirstPage() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const itemsPerPage = 5;

  useEffect(() => {
    api().then((res) => {
        setData(res)
        setTotalPages(Math.ceil(res.length / itemsPerPage))
      })
      .catch((err) => {
        alert("err")
      });
  }, [])
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className='container'>
        <h1>Kickstarter Projects</h1>
        <Table tableHeader={headerTable} dataMap={tableValue} data={paginatedData} />
      </div>
      <div>
        <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
        <div>
        </div>
      </div>
    </div>
  )
}

export default FirstPage