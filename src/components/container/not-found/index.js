import React,{Component} from 'react';

class NotFound extends Component {

    componentDidMount(){

        document.title = 'Istpro - 404 Not Found';

    };

    render() {
        return (
            <div>
                <h1>Not Found</h1>
            </div>
        )
    }
}

export default NotFound;

