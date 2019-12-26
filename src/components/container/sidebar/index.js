import React,{ Component } from 'react';
import PropTypes from "prop-types"
import { withRouter, Link } from 'react-router-dom';
import {bindActionCreators} from "redux";
import {RootActions} from "../../../shared/root-action";
import {connect} from "react-redux";
import AuthHelper from "../../../libraries/auth-helper";
import Logo from "../../../images/logo-white.png";
import Api from "../../../libraries/api";

class Sidebar extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {

        super(props);

        this.state = {
            loading: true,
            menus: [],
        };
    }

    componentDidMount() {

        Api.get('/auth-menus').then(resp => {

            if(resp.data) {
                this.setState({
                    menus: resp.data.menus,
                    loading: false,
                })
            }

        }).catch(err => {
            console.log(err);
        });

    }

    checkPermission = (name) => {
        let result;
        if(this.state.menus) {
            result = Object.keys(this.state.menus).filter((key) => this.state.menus[key] === name);

        }
        return result.length;
    };

    handleLogout = () => {

        AuthHelper.logOut();

    };

    render() {
        const { location } = this.props;
        // const perms = this.props.permission_state;

        return(

            <aside className={"side-nav " + (this.props.toggle_sidebar_state ? "show" : "")  } >
                <header className="header-nav d-none d-md-block">
                    <nav className="navbar justify-content-center">
                        <Link to="#" className="navbar-brand m-0 p-0">
                            <img src={Logo} alt="vado" className="logo" />
                        </Link>
                    </nav>
                </header>
                {!this.state.loading &&
                <ul className="nav flex-column">
                    <li className="nav-item name">General</li>
                    <li className={'nav-item '+ (location.pathname === '/' && 'active')}><Link to='/'><i className="fas fa-tachometer-alt"> </i>Dashboard</Link></li>
                    {this.checkPermission('Meetings') > 0 &&
                    <li className={'nav-item '+ (location.pathname === '/meetings' && 'active')}><Link to='/meetings'><i className="fas fa-users"> </i>Meetings</Link></li>
                    }
                    {this.checkPermission('Vessels') > 0 &&
                    <li className={'nav-item '+ (location.pathname === '/vessels' && 'active')}><Link to='/vessels'><i className="fas fa-ship"> </i>Vessels</Link></li>
                    }
                    {this.checkPermission('Clients') > 0 &&
                    <li className={'nav-item '+ (location.pathname === '/clients' && 'active')}><Link to='/clients'><i className="fas fa-briefcase"> </i>Clients</Link></li>
                    }
                    {this.checkPermission('Departments') > 0 &&
                    <li className={'nav-item '+ (location.pathname === '/departments' && 'active')}><Link to='/departments'><i className="fas fa-building"> </i>Departments</Link></li>
                    }
                    {this.checkPermission('Insurances') > 0 &&
                    <li className={'nav-item '+ (location.pathname === '/insurances' && 'active')}><Link to='/insurances'><i className="fas fa-shield-alt"> </i>Insurances</Link></li>
                    }
                    {this.checkPermission('Insurance Types') > 0 &&
                    <li className={'nav-item '+ (location.pathname === '/insurance-types' && 'active')}><Link to='/insurance-types'><i className="fas fa-th-list"> </i>Insurance Types</Link></li>
                    }
                    {this.checkPermission('Agents') > 0 &&
                    <li className={'nav-item '+ (location.pathname === '/agents' && 'active')}><Link to='/agents'><i className="fas fa-user-tie"> </i>Agents</Link></li>
                    }
                    {this.checkPermission('Users') > 0 &&
                    <li className={'nav-item '+ (location.pathname === '/users' && 'active')}><Link to='/users'><i className="fas fa-user"> </i>Users</Link></li>
                    }
                    {this.checkPermission('Roles') > 0 &&
                    <li className={'nav-item '+ (location.pathname === '/roles' && 'active')}><Link to='/roles'><i className="fas fa-user-cog"> </i>Roles</Link></li>
                    }

                    {/*<li className={'nav-item '+ (location.pathname === '/activities' && 'active')}><Link to='/'><i className="fas fa-chart-area"> </i>Activities</Link></li>*/}

                    <hr />

                    <li className="nav-item name">Broking</li>
                    {this.checkPermission('Projects') > 0 &&
                    <li className={'nav-item '+ (location.pathname === '/projects' && 'active')}><Link to='/projects'><i className="fas fa-book"> </i>Projects</Link></li>
                    }

                    <hr />

                    <li className="nav-item name">Finance</li>
                    {this.checkPermission('Projects Finance') > 0 &&
                    <li className={'nav-item '+ (location.pathname === '/projects-finance' && 'active')}><Link to='/projects-finance'><i className="fas fa-book"> </i>Projects Finance</Link></li>
                    }
                    {this.checkPermission('Invoices') &&
                    <li className={'nav-item '+ (location.pathname === '/invoices' && 'active')}><Link to='/invoices'><i className="fas fa-file-alt"> </i>Invoices</Link></li>
                    }

                    <li className={'nav-item '+ (location.pathname === '/installments' && 'active')}><Link to='/installments'><i className="fas fa-hourglass-half"> </i>Installments</Link></li>

                    {this.checkPermission('Cash Transaction') &&
                    <li className={'nav-item '+ (location.pathname === '/cashtransactions' && 'active')}><Link to='/cashtransactions'><i className="far fa-credit-card"> </i>Cash Transaction</Link></li>
                    }
                    {this.checkPermission('Reimbursements') &&
                    <li className={'nav-item '+ (location.pathname === '/reimbursements' && 'active')}><Link to='/reimbursements'><i className="fas fa-clipboard-check"> </i>Reimbursements</Link></li>
                    }
                    <li className={'nav-item '+ (location.pathname === '/my-reimbursements/'+this.props.profile_state.id && 'active')}><Link to={'/my-reimbursements/'+this.props.profile_state.id}><i className="fas fa-file-invoice-dollar"> </i>My Reimbursements</Link></li>

                    <hr />

                    <li className="nav-item name">Survey</li>
                    {this.checkPermission('Surveys') &&
                    <li className={'nav-item '+ (location.pathname === '/surveys' && 'active')}><Link to='/surveys'><i className="fas fa-paste"> </i>Surveys</Link></li>
                    }


                    <li className={location.pathname === '/' ? 'nav-item active' : 'nav-item'}><button onClick={this.handleLogout}>Sign out</button></li>
                </ul>
                }
            </aside>

        )

    }

}

const mapStateToProps = (state) => {

    return {

        toggle_sidebar_state: state.toggle_sidebar_state,

        profile_state: state.profile_state,

        permission_state: state.permission_state,


    };

};

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators(RootActions, dispatch)

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));