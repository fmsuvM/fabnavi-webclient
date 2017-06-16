import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';

class Pagination extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
        offset: 0
        }
    }

    // 表示数読み込み
    // loadElementsData(projects) {
    //     this.setState({
    //         data: 5, 
    //         pageCount: Math.ceil(projects.length /  5)
    //     });
    // }

    componentDidMount(){
        // console.log('did mount props data');
        // console.dir(this.props);
        // console.log('did mount state data');
        // console.dir(this.state);
    }

    componentWillMount(){
        // console.log('will mount props data');
        // console.dir(this.props);
        // console.log('will mount state data');
        // console.dir(this.state);
    }
    
    onHandlePageClick(data){
        console.log('yay');
    }

    render(){
        // console.log('prop');
        // console.dir(this.props);
        // console.log('prop end');
        // const projectData = this.props.projects;
        return(
            <div>
                <ReactPaginate 
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    pageCount={10}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.onHandlePageClick()}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>
            
        );
    }
}

function mapStateToProps(state) {
  return {
    isFetching: state.manager.isFetching,
    projects: state.manager.projects,
    selector: state.manager.selector
  };
}

export default connect(mapStateToProps)(Pagination);