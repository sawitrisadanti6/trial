import React,{Component} from 'react';
import CardLoading from "./card-loading";
import NumberFormat from "react-number-format";

class CardPurple extends Component {

    render() {

        return (

            <>
                {this.props.loading ? (
                    <CardLoading/>
                ) : (
                    this.props.error ? (
                        <div className="card-wrapper__purple mb-3 text-danger">
                            <span className="icon error mb-3">
                                <i className="fas fa-times"> </i>
                            </span>
                            <p>Error</p>
                            <label>{this.props.title}</label>
                        </div>
                    ) : (
                        <div className="card-wrapper__purple mb-3">
                            <span className="icon mb-3">
                                <i className={'fas ' + this.props.icon}> </i>
                            </span>
                            {this.props.type ?
                                <p>Rp <NumberFormat value={this.props.total === null ? '0' : this.props.total} displayType={'text'} thousandSeparator={true}/></p>
                                    :
                                <p>{this.props.total === 0 ? '0' : this.props.total}</p>
                            }
                            <label>{this.props.title}</label>
                        </div>
                    )
                )}
            </>

        )

    }
}

export default CardPurple;