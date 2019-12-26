import React,{Component} from 'react';
import Api from "../../../libraries/api";
import CardWhite from "./card-white";

class DashboardMain extends Component {
    _isMounted = false;

    constructor(props) {

        super(props);

        this.state = {
            total_project: 0,
            loading_project: true,
            error_project: false,
            total_client: 0,
            loading_client: true,
            error_client: false,
            total_insurance: 0,
            loading_insurance: true,
            error_insurance: false,
        };

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        Api.get('/dashboards/projects').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        total_project: resp.total,
                        loading_project: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_project: true,
                    loading_project: false
                });
            }
        });
        Api.get('/dashboards/clients').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        total_client: resp.total,
                        loading_client: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_client: true,
                    loading_client: false
                });
            }
        });
        Api.get('/dashboards/insurances').then(resp => {
            if (this._isMounted) {
                if (resp) {
                    this.setState({
                        total_insurance: resp.total,
                        loading_insurance: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            if (this._isMounted) {
                this.setState({
                    error_insurance: true,
                    loading_insurance: false
                });
            }
        });
    }

    render() {

        return (

            <>
                <div className="col-md-6 col-lg-4">
                    <CardWhite
                    title='Total Project'
                    text={this.state.total_project > 1 ? 'Projects' : 'Project'}
                    total={this.state.total_project}
                    icon='fa-book'
                    loading={this.state.loading_project}
                    error={this.state.error_project}/>
                </div>
                <div className="col-md-6 col-lg-4">
                    <CardWhite
                    title='Total Client'
                    text={this.state.total_client > 1 ? 'Clients' : 'Client'}
                    total={this.state.total_client}
                    icon='fa-briefcase'
                    loading={this.state.loading_client}
                    error={this.state.error_client}/>
                </div>
                <div className="col-md-6 col-lg-4">
                    <CardWhite
                    title='Total Insurance'
                    text={this.state.total_insurance > 1 ? 'Insurances' : 'insurance'}
                    total={this.state.total_insurance}
                    icon='fa-shield-alt'
                    loading={this.state.loading_insurance}
                    error={this.state.error_insurance}/>
                </div>
            </>

        )

    }
}

export default DashboardMain;