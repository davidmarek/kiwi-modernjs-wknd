import React, { Component } from "react";
import PropTypes from 'prop-types';

class Pagination extends Component {
  createLinks() {
    let links = [];
    const minShowedPage = Math.max(1, this.props.pageIndex - 5);
    const maxShowedPage = Math.min(this.props.pageCount, this.props.pageIndex + 5);

    if (minShowedPage !== 1) {
      links.push(<li key="prev-dots" className="page-item disabled"><a className="page-link">...</a></li>)
    }

    for (let i = minShowedPage; i <= maxShowedPage; i++) {
      links.push(<li key={i} className={"page-item" + (this.props.pageIndex === i ? " active" : "")}>
        <a className="page-link" onClick={() => this.props.onPageChange(i)}>{i}</a>
      </li>);
    }

    if (maxShowedPage !== this.props.pageCount) {
      links.push(<li key="next-dots" className="page-item disabled"><a className="page-link">...</a></li>)
    }

    return links;
  }
  
  render() {
    const links = this.createLinks();

    return (
      <nav aria-label="Flights page navigation">
        <ul className="pagination justify-content-center">
          <li className={"page-item" + (this.props.pageIndex   === 1 ? " disabled" : "")}>
            <a className="page-link" onClick={() => this.props.onPageChange(this.props.pageIndex - 1)}>Previous</a>
          </li>
          {links}
          <li className={"page-item" + (this.props.pageIndex === this.props.pageCount ? " disabled" : "")}><a className="page-link" onClick={() => this.props.onPageChange(this.props.pageIndex + 1)}>Next</a></li>
        </ul>
      </nav>
    )
  }
}

Pagination.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;