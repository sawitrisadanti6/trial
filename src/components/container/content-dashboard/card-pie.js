import React,{Component} from 'react';
import CardLoading from "./card-loading";
import { Pie } from 'react-chartjs-2';
import equal from 'fast-deep-equal'

class CardPie extends Component {

    constructor(props) {

        super(props);

        this.state = {
            data: {},
            options: {}
        };

        this.buildChart = this.buildChart.bind(this);

    }

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.data, prevProps.data)){
            this.buildChart();
        }
    }

    buildChart(){

        let data = {
            labels: this.props.labels,
            datasets: [
                {
                    data: this.props.data,
                    backgroundColor: this.props.color
                }
            ]
        };

        let options = {
            ...this.props.options,
            title: {
                display: true,
                text: this.props.title,
                fontSize: 20
            }
        };

        this.setState({
            data: data, options: options
        });

    };

    render() {

        return (

            <>
                {this.props.loading ? (
                    <CardLoading/>
                ) : (
                    this.props.error ? (
                        <div className="card-wrapper text-danger">
                            <div className="row align-items-center">
                                <div className="col-9">
                                    <label>{this.props.title}</label>
                                    <p>Error</p>
                                </div>
                                <div className="col-3 pl-0">
                                    <span className="icon error ml-auto">
                                        <i className="fas fa-times"> </i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Pie
                            data={this.state.data}
                            height={250}
                            options={this.state.options}
                        />
                    )
                )}
            </>

        )

    }
}

export default CardPie;