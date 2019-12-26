import React,{Component} from 'react';
import CardPie from "./card-pie";
import Api from "../../../libraries/api";
import CardPurple from "./card-purple";

const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        position: "right",
        align: "middle"
    }
};

const color = [
    "#F09994",
    "#B9CCEA",
    "#FFF6F0",
    "#E3EBF6",
    "#FED8C7",
];

class DashboardFinance extends Component {

    constructor(props) {

        super(props);

        this.state = {
            data_bi: [],
            labels_bi: [],
            loading_bi: true,
            error_bi: false,

            data_gw: [],
            labels_gw: [],
            loading_gw: true,
            error_gw: false,

            data_ul: [],
            labels_ul: [],
            loading_ul: true,
            error_ul: false,

            data_rf: [],
            labels_rf: [],
            loading_rf: true,
            error_rf: false,

            data_af: [],
            labels_af: [],
            loading_af: true,
            error_af: false,

            total_bi: '',
            loading_total_bi: true,
            error_total_bi: false,

            total_rf: '',
            loading_total_rf: true,
            error_total_rf: false,

            total_af: '',
            loading_total_af: true,
            error_total_af: false,

            total_up: '',
            loading_total_up: true,
            error_total_up: false,
        };

    }

    componentDidMount() {
        this._isMounted = true;

        Api.get('/dashboards/gross-written').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        loading_gw: false,
                        data_gw: resp.data,
                        labels_gw: resp.labels
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_gw: true,
                    loading_gw: false
                });
            }
        });

        Api.get('/dashboards/broking-income').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        loading_bi: false,
                        data_bi: resp.data,
                        labels_bi: resp.labels
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_bi: true,
                    loading_bi: false
                });
            }
        });

        Api.get('/dashboards/uplift').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        loading_ul: false,
                        data_ul: resp.data,
                        labels_ul: resp.labels
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_ul: true,
                    loading_ul: false
                });
            }
        });

        Api.get('/dashboards/risk-fee').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        loading_rf: false,
                        data_rf: resp.data,
                        labels_rf: resp.labels
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_rf: true,
                    loading_rf: false
                });
            }
        });

        Api.get('/dashboards/agent-payable').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        loading_af: false,
                        data_af: resp.data,
                        labels_af: resp.labels
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_af: true,
                    loading_af: false
                });
            }
        });

        Api.get('/dashboards/monthly-broking-income').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        loading_total_bi: false,
                        total_bi: resp.total,
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_total_bi: true,
                    loading_total_bi: false
                });
            }
        });

        Api.get('/dashboards/monthly-risk-fee').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        loading_total_rf: false,
                        total_rf: resp.total,
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_total_rf: true,
                    loading_total_rf: false
                });
            }
        });

        Api.get('/dashboards/monthly-admin-fee').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        loading_total_af: false,
                        total_af: resp.total,
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_total_af: true,
                    loading_total_af: false
                });
            }
        });

        Api.get('/dashboards/monthly-uplift').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        loading_total_up: false,
                        total_up: resp.total,
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_total_up: true,
                    loading_total_up: false
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
                <div className="col-md-6">
                    <div className="row">
                        <div className="col">
                            <CardPie
                            title='Gross Written Premium'
                            data={this.state.data_gw}
                            labels={this.state.labels_gw}
                            color={color}
                            options={options}
                            loading={this.state.loading_gw}
                            error={this.state.error_gw}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col">
                            <CardPie
                            title='Broking Income'
                            data={this.state.data_bi}
                            labels={this.state.labels_bi}
                            color={color}
                            options={options}
                            loading={this.state.loading_bi}
                            error={this.state.error_bi}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col">
                            <CardPie
                            title='Uplift'
                            data={this.state.data_ul}
                            labels={this.state.labels_ul}
                            color={color}
                            options={options}
                            loading={this.state.loading_ul}
                            error={this.state.error_ul}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col">
                            <CardPie
                            title='Risk Fee'
                            data={this.state.data_rf}
                            labels={this.state.labels_rf}
                            color={color}
                            options={options}
                            loading={this.state.loading_rf}
                            error={this.state.error_rf}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="row">
                        <div className="col">
                            <CardPie
                                title='Agent Fee Payables'
                                data={this.state.data_af}
                                labels={this.state.labels_af}
                                color={color}
                                options={options}
                                loading={this.state.loading_af}
                                error={this.state.error_af}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <hr />
                </div>
                <div className="col-md-6 col-lg-3">
                    <CardPurple
                        title='Broking Income'
                        total={this.state.total_bi}
                        icon='fa-link'
                        type='amount'
                        loading={this.state.loading_total_bi}
                        error={this.state.error_total_bi}
                    />
                </div>
                <div className="col-md-6 col-lg-3">
                    <CardPurple
                        title='Risk Fee'
                        total={this.state.total_rf}
                        icon='fa-briefcase-medical'
                        type='amount'
                        loading={this.state.loading_total_rf}
                        error={this.state.error_total_rf}
                    />
                </div>
                <div className="col-md-6 col-lg-3">
                    <CardPurple
                        title='Admin Fee'
                        total={this.state.total_af}
                        icon='fa-hands-helping'
                        type='amount'
                        loading={this.state.loading_total_af}
                        error={this.state.error_total_af}
                    />
                </div>
                <div className="col-md-6 col-lg-3">
                    <CardPurple
                        title='Uplift'
                        total={this.state.total_up}
                        icon='fa-sort-amount-up'
                        type='amount'
                        loading={this.state.loading_total_up}
                        error={this.state.error_total_up}
                    />
                </div>

            </>

        )

    }
}

export default DashboardFinance;