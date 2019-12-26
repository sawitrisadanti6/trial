import React,{Component} from 'react';
import CardPurple from "./card-purple";
import CardWhite from "./card-white";
import Api from "../../../libraries/api";

class DashboardSurvey extends Component {
    _isMounted = false;

    constructor(props) {

        super(props);

        this.state = {
            total_new: 0,
            loading_new: true,
            error_new: false,
            total_survey: 0,
            loading_survey: true,
            error_survey: false,
            total_ca: 0,
            loading_ca: true,
            error_ca: false,
            total_done: 0,
            loading_done: true,
            error_done: false,

            total_vessels: 0,
            loading_vessels: true,
            error_vessels: false,

            total_vessels_survey: 0,
            loading_vessels_survey: true,
            error_vessels_survey: false,
        };

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        Api.get('/dashboards/survey-new').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        total_new: resp.total,
                        loading_new: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_new: true,
                    loading_new: false
                });
            }
        });
        Api.get('/dashboards/waiting-survey').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        total_survey: resp.total,
                        loading_survey: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_survey: true,
                    loading_survey: false
                });
            }
        });
        Api.get('/dashboards/waiting-ca').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        total_ca: resp.total,
                        loading_ca: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_ca: true,
                    loading_ca: false
                });
            }
        });
        Api.get('/dashboards/survey-done').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        total_done: resp.total,
                        loading_done: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_done: true,
                    loading_done: false
                });
            }
        });

        Api.get('/dashboards/vessels').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        total_vessels: resp.total,
                        loading_vessels: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_vessels: true,
                    loading_vessels: false
                });
            }
        });

        Api.get('/dashboards/vessels-surveys').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        total_vessels_survey: resp.total,
                        loading_vessels_survey: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_vessels_survey: true,
                    loading_vessels_survey: false
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

                <div className="col-md-6 col-lg-3">
                    <CardPurple
                        title='New'
                        total={this.state.total_new}
                        icon='fa-envelope'
                        loading={this.state.loading_new}
                        error={this.state.error_new}
                    />
                </div>

                <div className="col-md-6 col-lg-3">
                    <CardPurple
                        title='Waiting for Survey'
                        total={this.state.total_survey}
                        icon='fa-search'
                        loading={this.state.loading_survey}
                        error={this.state.error_survey}
                    />
                </div>

                <div className="col-md-6 col-lg-3">
                    <CardPurple
                        title='Waiting for CA'
                        total={this.state.total_ca}
                        icon='fa-binoculars'
                        loading={this.state.loading_ca}
                        error={this.state.error_ca}
                    />
                </div>

                <div className="col-md-6 col-lg-3">
                    <CardPurple
                        title='Done'
                        total={this.state.total_done}
                        icon='fa-check'
                        loading={this.state.loading_done}
                        error={this.state.error_done}
                    />
                </div>

                <div className="col-md-6">
                    <CardWhite
                        title='Total Vessels'
                        text={this.state.total_vessels > 1 ? 'Vessels' : 'Vessel'}
                        total={this.state.total_vessels}
                        icon='fa-ship'
                        loading={this.state.loading_vessels}
                        error={this.state.error_vessels}/>
                </div>

                <div className="col-md-6">
                    <CardWhite
                        title='Survey Vessels'
                        text={this.state.total_vessels_survey > 1 ? 'Vessels' : 'Vessel'}
                        total={this.state.total_vessels_survey}
                        icon='fa-ship'
                        loading={this.state.loading_vessels_survey}
                        error={this.state.error_vessels_survey}/>
                </div>
            </>

        )

    }
}

export default DashboardSurvey;