function countPages(len: number, rowsPerPage: number): number[] {
  if(len === 0) return [1]
  let pages = []
  const maxPage = Math.ceil(len / rowsPerPage)
  for (let i = 1; i <= maxPage; i ++) {
    pages.push(i)
  }
  return pages
}

type PaginationProps = {
  length: number
  rowsPerPage: number
  page: number
  setPage: (page: number) => void
}

const Pagination = ({ length, rowsPerPage, page, setPage }: PaginationProps) => {

  const pages = countPages(length, rowsPerPage)

  const changePage = (page: number) => {
    setPage(page)
  }

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNextPage = () => {
    if (page < pages.length) setPage(page + 1)
  }

  return (
    <nav className="flex justify-center py-4">
        <ul className="inline-flex -space-x-px">
          <li key='previous' onClick={handlePrevPage} className="pagination-previous">Previous</li>
          {pages.map(curPage => 
            <li
              key={curPage}
              onClick={() => changePage(curPage)} 
              className={`pagination-page ${page === curPage ? 'text-faded-red' : 'text-gray-500'}`}>{curPage}</li>
          )}
          <li key='next' onClick={handleNextPage} className="pagination-next">Next</li>
        </ul>
    </nav>
  )
}

export default Pagination