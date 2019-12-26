import React,{Component} from 'react';
import DashboardMain from "./dashboard-main";
import DashboardBroker from "./dashboard-broker";
import DashboardSurvey from "./dashboard-survey";
import DashboardFinance from "./dashboard-finance";

class ContentDashboard extends Component {

    render() {

        return (

            <div className="row main-content">

                <div className="col-12">
                    <h2 className="page-title">Dashboard</h2>
                </div>

                <DashboardMain />

                <DashboardBroker />

                <DashboardFinance />

                <DashboardSurvey />

            </div>

        )

    }
}

export default ContentDashboard;