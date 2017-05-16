import React, {Component} from 'react';
import Debug from 'debug';

const debug = Debug('fabnavi:components:backbutton');

// TODO: 
export default class UpdateButton extends Component {
    render(){
        debug(this.props);

        return (
            <div>
                <p> Update Button </p>
            </div>
        )
    }
}