import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../images/logo-white.png';
import {bindActionCreators} from "redux";
import {RootActions} from "../../../shared/root-action";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";

class Navbar extends Component {

    constructor(props) {

        super(props);

        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    }

    handleToggleSidebar(){

        if(this.props.toggle_sidebar_state){

            this.props.setHideSidebar();

        }else{

            this.props.setShowSidebar();

        }

    }

    render() {

        return(

            <header className="header-nav d-md-none">
                <nav className="navbar">
                    <Link to="#" className="navbar-brand m-0 p-0">
                        <img src={Logo} alt="vado" className="logo" />
                    </Link>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        className="d-md-none"
                        onClick={this.handleToggleSidebar}
                    >
                        <MenuIcon />
                    </IconButton>
                </nav>
            </header>

        )

    }

}

const mapStateToProps = (state) => {

    return {

        toggle_sidebar_state: state.toggle_sidebar_state,

        profile_state: state.profile_state

    };

};

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators(RootActions, dispatch)

};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);