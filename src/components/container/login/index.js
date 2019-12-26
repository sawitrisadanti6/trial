import React,{Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import {connect} from 'react-redux';
import {RootActions} from "../../../shared/root-action";
import {bindActionCreators} from "redux";
import Api from "../../../libraries/api";
import AuthHelper from "../../../libraries/auth-helper";
import {history} from "../../../shared/configure-store";
import Logo from '../../../images/logo.jpg';

require('dotenv').config();

const validator = new SimpleReactValidator({locale: process.env.REACT_APP_LOCALE});

class Login extends Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: false,
            errors: {},
            email: '',
            password: '',
            persistence: false,
            showPassword: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);

    }

    handleLogIn = e => {

        e.preventDefault();

        if (!validator.allValid()) {

            this.setState({
                    errors: validator.getErrorMessages()
                }
            );

            return false;

        }

        this.setState({
                errors: {},
                loading: true,
            }
        );

        let params = {

            email: this.state.email,

            password: this.state.password,

        };

        Api.post('/login', params).then(resp => {

            AuthHelper.setLogin(resp.data);

            AuthHelper.setProfile(resp.data);

            let profile = resp.data;

            let user = JSON.parse(JSON.stringify(profile));
            // delete user.role;

            // let role = JSON.parse(JSON.stringify(profile.role));
            // delete role.permisssions;

            // let permissions = JSON.parse(JSON.stringify(profile.role.permissions));

            this.props.setProfile(user);
            // this.props.setRole(role);
            // this.props.setPermission(permissions);

            history.push('/');

        }).catch(err => {

            this.setState({
                    errors: err,
                    loading: false
                }
            );

        });

    };

    handleChange (e, prop){

        this.setState({

            [prop]: e.target.value

        })

    };

    handleChecked = name => e => {

        this.setState({

            [name]: e.target.checked ? 1 : 0,

        })

    };

    handleClickShowPassword = () => {

        this.setState({

            showPassword:(!this.state.showPassword)

        })

    };

    render() {
        return (
            <main className="login">
                <section>
                    <img src={Logo} alt="vado" className="logo" />
                    <div className="border-line"> </div>
                    <h1>Login to your Dashboard</h1>
                    <form name="login" id="login" noValidate>

                        <div className="form-group">
                            <TextField variant="outlined"
                                type='text'
                                id='email'
                                name="email"
                                label="Email"
                                placeholder="Your email here.."
                                onChange={(e) => this.handleChange(e, 'email')}
                                minLength={4}
                                maxLength={50}
                                value={this.state.email}
                                fullWidth
                            />
                            {validator.message('email', this.state.email, 'email|required')}
                            <div className='text-danger'>{this.state.errors.email}</div>
                        </div>

                        <div className="form-group">
                            <TextField variant="outlined"
                                type={this.state.showPassword ? 'text' : 'password'}
                                id="adornment-password"
                                name="password"
                                label="Password"
                                placeholder="Your password here.."
                                onChange={(e) => this.handleChange(e,'password')}
                                value={this.state.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <i className="fas fa-eye"> </i> :
                                                    <i className="fas fa-eye-slash"> </i>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth
                            />
                            {validator.message('password', this.state.password, 'required')}
                            <div className='text-danger'>{this.state.errors.password}</div>
                        </div>

                        <div className='text-danger mb-2'>{this.state.errors.message}</div>

                        <button onClick={this.handleLogIn} className="btn btn-blue mt-3" disabled={this.state.loading && 'disabled' }>SUBMIT { this.state.loading && <i className="fa fa-spinner fa-spin"> </i> }</button>

                    </form>

                </section>
            </main>

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);