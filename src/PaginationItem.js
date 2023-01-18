import './Pagination.css';
var classNames = require('classnames');

function PaginationItem({ page, currentPage, onPageChange }) {
    const liClasses = classNames({
        'page-item': true,
        active: page === currentPage
    });

    return (
        <li className={liClasses} onClick={() => onPageChange(page)}>
            <span className="page-link">{page}</span>
        </li>
    )
}

export default PaginationItem