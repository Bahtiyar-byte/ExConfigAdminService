interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = (props: Props) => {
  const pageNumbers = Array.from({ length: props.totalPages }, (_, i) => i + 1)

  const disableLeftArrows = props.currentPage === 1 ? 'disabled' : ''
  const disableRightArrows = props.currentPage === props.totalPages ? 'disabled' : ''

  return (
    <div className="pagination">
      <ul>
        <li className={disableLeftArrows}>
          <a href="#" onClick={() => props.onPageChange(1)} aria-label="First" className="icon-chevron-double-left"></a>
        </li>
        <li className={disableLeftArrows}>
          <a
            href="#"
            onClick={() => props.onPageChange(props.currentPage - 1)}
            aria-label="Previous"
            className="icon-chevron-left"
          ></a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={props.currentPage === number ? 'pagination-active' : ''}>
            <a href="#" onClick={() => props.onPageChange(number)}>
              {number}
            </a>
          </li>
        ))}
        <li className={disableRightArrows}>
          <a
            href="#"
            onClick={() => props.onPageChange(props.currentPage + 1)}
            aria-label="Next"
            className="icon-chevron-right"
          ></a>
        </li>
        <li className={disableRightArrows}>
          <a
            href="#"
            onClick={() => props.onPageChange(props.totalPages)}
            aria-label="Last"
            className="icon-chevron-double-right"
          ></a>
        </li>
      </ul>
      <div className="pagination-pages">{props.totalPages} Pages</div>
    </div>
  )
}
