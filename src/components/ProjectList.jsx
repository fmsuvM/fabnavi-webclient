// defaultで表示するcomponent
import React, { Component, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate'
import Debug from 'debug';

import ProjectElement from '../components/ProjectElement';
import Pagination from '../components/Pagination.jsx';

const debug = Debug('fabnavi:jsx:ProjectList');

class ProjectList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const selector = this.props.selector;
    return (
      <div className="project-list-container">
        <Pagination data={this.props.projects} selector={selector} />
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isFetching) {
      return;
    }
    if(this.props.match.path !== nextProps.match.path) {
      if(nextProps.match.path === 'myprojects') { // myProjectの場合，自分が作成したprojectのみを引っ張ってくる
        api.getOwnProjects();
      } else { // そうじゃない場合，全部引っ張ってくる
        api.getAllProjects();
      }
    }
  }

  componentWillMount() {
    if(this.props.projects.length !== 0) {
      return;
    }
    if(this.props.match.path === 'myprojects') {
      api.getOwnProjects();
    } else {
      api.getAllProjects();
    }
  }

  componentDidUpdate() {
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.manager.isFetching,
    projects: state.manager.projects,
    selector: state.manager.selector
  };
}

// mapStateToPropsでstateを渡す
export default connect(mapStateToProps)(ProjectList);
