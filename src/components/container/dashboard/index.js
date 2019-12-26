import React, {Component} from 'react';
import ContentDashboard from "../content-dashboard";
import NotFound from "../not-found";
import {Switch} from 'react-router-dom'
import Sidebar from "../sidebar";
import Navbar from "../navbar";
import AuthHelper from "../../../libraries/auth-helper";
import {PrivateRoute} from '../../../libraries/route-handling'
import {bindActionCreators} from "redux";
import {RootActions} from "../../../shared/root-action";
import {connect} from "react-redux";
import {history} from "../../../shared/configure-store";

const styleSide = {
    maxWidth: '250px',
    background: '#fbfbfb'
};

const styleDashboard = {
    zIndex: '5',
    position: 'relative',
    background: '#fbfbfb'
};

class Dashboard extends Component {

    constructor(props) {

        super(props);

    }

    componentDidMount() {
        if(AuthHelper.isLoggedIn()){
            this.props.setProfile(AuthHelper.getProfile());
        }else{
            history.push('/login');
        }
    }

    render() {
        return (

            <div>
                <Navbar />

                <main className="dashboard">

                    <div className="container-fluid">

                        <div className="row">

                            <div className="col-md-3 col-lg px-0" style={styleSide}>

                                <Sidebar/>

                            </div>

                            <div className="col-md" style={styleDashboard}>

                                <Switch>

                                    <PrivateRoute exact path="/" component={ContentDashboard}/>
                                    <PrivateRoute exact path="/users" component={Users}/>
                                    <PrivateRoute path="/users/add" component={UsersAdd}/>
                                    <PrivateRoute path="/users/edit/:id" component={UsersEdit}/>

                                    <PrivateRoute component={NotFound}/>
                                </Switch>

                            </div>
d
                        </div>

                    </div>

                </main>

            </div>

        )

    }
}

const mapStateToProps = (state) => {

    return {

        profile_state: state.profile_state,

        role_state: state.role_state,

        permission_state: state.permission_state,

    };

};

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators(RootActions, dispatch)

};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

