import React,{Component} from 'react';
import CardPurple from "./card-purple";
import {Link} from "react-router-dom";
import Api from "../../../libraries/api";
import CardLoading from "./card-loading";

class DashboardBroker extends Component {
    _isMounted = false;

    constructor(props) {

        super(props);

        this.state = {
            total_placement: 0,
            loading_placement: true,
            error_placement: false,
            total_quotation: 0,
            loading_quotation: true,
            error_quotation: false,
            total_binding: 0,
            loading_binding: true,
            error_binding: false,
            potential_client: [],
            loading_potential_client: true,
            error_potential_client: false,
        };

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        Api.get('/dashboards/placement').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        total_placement: resp.total,
                        loading_placement: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_placement: true,
                    loading_placement: false
                });
            }
        });
        Api.get('/dashboards/quotation').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        total_quotation: resp.total,
                        loading_quotation: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_quotation: true,
                    loading_quotation: false
                });
            }
        });
        Api.get('/dashboards/binding').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        total_binding: resp.total,
                        loading_binding: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_binding: true,
                    loading_binding: false
                });
            }
        });
        Api.get('/dashboards/potential-clients').then(resp => {
            if (this._isMounted) {
                if (resp.data) {
                    this.setState({
                        potential_client: resp.data,
                        loading_potential_client: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_potential_client: true,
                    loading_potential_client: false
                });
            }
        });
    }

    render() {

        return (

            <>
                <div className="col-12">
                    <hr />
                </div>
                <div className="col-md-6 col-lg-8">
                    <div className="row">
                        <div className="col-md-6">
                            <CardPurple
                                title={this.state.total_placement > 1 ? 'Placements' : 'Placement'}
                                total={this.state.total_placement}
                                icon='fa-check'
                                loading={this.state.loading_placement}
                                error={this.state.error_placement}
                            />
                        </div>
                        <div className="col-md-6">
                            <CardPurple
                                title={this.state.total_quotation > 1 ? 'Quotations' : 'Quotation'}
                                total={this.state.total_quotation}
                                icon='fa-arrows-alt-h'
                                loading={this.state.loading_quotation}
                                error={this.state.error_quotation}
                            />
                        </div>
                        <div className="col-md-6">
                            <CardPurple
                                title={this.state.total_binding > 1 ? 'Bindings' : 'Binding'}
                                total={this.state.total_binding}
                                icon='fa-handshake'
                                loading={this.state.loading_binding}
                                error={this.state.error_binding}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="row">
                        <div className="col">

                            {
                                this.state.loading_potential_client ? (
                                    <CardLoading/>
                                ) : (
                                    this.state.error_potential_client ? (

                                        <div className="card-wrapper text-danger">
                                            <div className="row align-items-center">
                                                <div className="col-9">
                                                    <label>Clients</label>
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
                                            <h3>{this.state.potential_client.length > 1 ? 'Clients' : 'Client'}</h3>
                                            <ul>
                                                {
                                                    this.state.potential_client.map((item, index) => (
                                                        <li key={index}>{item.company_name}</li>
                                                    ))
                                                }
                                            </ul>
                                            <Link to="/clients" className="btn btn-blue full">See All</Link>
                                        </div>
                                    )
                                )
                            }

                        </div>
                    </div>
                </div>
            </>

        )

    }
}

export default DashboardBroker;