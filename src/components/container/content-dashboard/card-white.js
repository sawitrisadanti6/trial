import React,{Component} from 'react';
import CardLoading from "./card-loading";

class CardWhite extends Component {

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
                        <div className="card-wrapper">
                            <div className="row align-items-center">
                                <div className="col-9">
                                    <label>{this.props.title}</label>
                                    <p>{this.props.total} {this.props.text}</p>
                                </div>
                                <div className="col-3 pl-0">
                                    <span className="icon ml-auto">
                                        <i className={'fas ' + this.props.icon}> </i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </>

        )

    }
}

export default CardWhite;