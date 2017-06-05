/**
 * @file App
 * @author leon <ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';

export default class App extends PureComponent {

    state = {
        count: 0
    };

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState(state => ({...state, count: state.count + 1}));
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div>
                hello react starter!~~
                <p>{this.state.count}</p>
            </div>
        );
    }

}
