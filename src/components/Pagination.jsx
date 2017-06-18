import React, { Component, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';

import ProjectElement from '../components/ProjectElement';

// pagination update version
export default class Pagination extends Component {

  constructor(props) {
    super(props);
        // // state 定義
    this.state = {
      currentPage: 1,
      pageCount: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.length === 0) {
      return;
    }
    const data = nextProps.data;
    const startingPage = this.props.startingPage ?
            this.props.startingPage :
            1;
    const pageSize = this.props.pageSize;
    let pageCount = parseInt(data.length / pageSize);
    if(data.length % pageSize > 0) {
      pageCount++;
    }
    this.setState({
      currentPage: startingPage,
      pageCount: pageCount
    });
  }

  setCurrentPage(num) {
    this.setState({ currentPage: num });
  }

  createControls() {
    const controls = [];
    const pageCount = this.state.pageCount;
    for(let i = 1; i <= pageCount; i++) {
      const baseClassName = 'pagination-controls__button';
      const activeClassName = i === this.state.currentPage ? `${baseClassName}--active` : '';
      controls.push(
                <div key={i}
                    className={`${baseClassName} ${activeClassName}`}
                    onClick={() => this.setCurrentPage(i)}>
                    {i}
                </div>
            );
    }
    return controls;
  }

  createPaginateData() {
    const data = this.props.data;
    const pageSize = this.props.pageSize;
    const currentPage = this.state.currentPage;
    const upperLimit = currentPage * pageSize;
    const dataSlice = data.slice((upperLimit - pageSize), upperLimit);
    return dataSlice;
  }

  render() {
    if(this.props.data.length === 0) {
      return (
                <div>
                    <p> Just Moment Please</p>
                </div>
      )
    }
    const data = this.createPaginateData();
    const selector = this.props.selector;
    return (
            <div>
                <div className="paginator">
                    {this.createControls()}
                </div>
                <div className="project-list">
                    {data.map((project, index) => (
                        <ProjectElement
                            key={index}
                            project={project}
                            isSelected={selector.index == index}
                            isOpenMenu={selector.index == index && selector.openMenu}
                            menuIndex={selector.menuIndex}
                            menuType={selector.menuType} />))}
                </div>
            </div>
    )

  }
}

Pagination.defaultProps = {
  pageSize: 8, // 要素数
  startingPage: 1
};


