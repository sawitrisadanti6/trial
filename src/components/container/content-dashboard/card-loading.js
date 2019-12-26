import React,{Component} from 'react';
import Loading from '../../../images/loading.gif';

class CardLoading extends Component {

    constructor(props) {

        super(props);

        this.state = {

        };

    }

    render() {

        return (

            <div className="card-wrapper loading mb-3">
                <img src={Loading} alt="loading" className="img-fluid loading" />
            </div>

        )

    }
}

export default CardLoading;