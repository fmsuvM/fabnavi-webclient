import React, {Component, PropTypes , cloneElement} from 'react';
import {connect} from 'react-redux';


// pagination update version
export default class Pagination extends Component {

    constructor(props){
        super(props);
        // // state 定義
        this.state = {
            currentPage: 1,
            pageCount: 0
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data.length === 0){
            return;
        }
        const data = nextProps.data;
        const startingPage = this.props.startingPage
            ? this.props.startingPage
            : 1;
        const pageSize = this.props.pageSize;
        let pageCount = parseInt(data.length / pageSize);
        if(data.length % pageSize > 0){
            pageCount++;
        }
        this.setState({
            currentPage: startingPage,
            pageCount: pageCount
        });
    }

    setCurrentPage(num){
        this.setState({currentPage: num});
    }

    createControls(){
        let controls = [];
        const pageCount = this.state.pageCount;
        for(let i = 1; i <= pageCount; i++){
            const baseClassName = 'pagination-controls__button';
            const activeClassName = i === this.state.currentPage ? `${baseClassName}--active` : '';
            controls.push(
                <div key={i}
                    className={`${baseClassName} ${activeClassName}`}
                    onClick={() => this.setCurrentPage(i)}
                >
                {i}
                </div>
            );
        }
        return controls;
    }

    createPaginateData(){
        const data = this.props.data;
        const pageSize = this.props.pageSize;
        const currentPage = this.state.currentPage;
        const upperLimit = currentPage * pageSize;
        const dataSlice = data.slice((upperLimit - pageSize), upperLimit);
        return dataSlice;
    }

    render(){
        // this.makingProps(this.props.data)
        if(this.props.data.length === 0){
            return (
                <div>
                    <p> Just Moment Please</p>
                </div>
            )
        } else {
            return(
            <div>
                <div className="procon">
                    {this.createControls()}
                </div>
                <div className="proconcon">
                    {cloneElement(this.props.children, {data: this.createPaginateData(), selector: this.props.selector})}
                </div>
            </div>
        )
        }

    }
}

Pagination.defaultProps = {
    pageSize: 8,// 要素数
    startingPage: 1
};



