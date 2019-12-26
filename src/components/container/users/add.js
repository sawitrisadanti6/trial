import React,{Component} from 'react';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import SimpleReactValidator from "simple-react-validator";
import Api from "../../../libraries/api";
import user from "../../../images/user.png";
import ErrorHandling from "../../../libraries/error-handling";
import {toast, ToastContainer} from "react-toastify";
import {history} from "../../../shared/configure-store";

require('dotenv').config();
const validator = new SimpleReactValidator({locale: process.env.REACT_APP_LOCALE});

class UsersAdd extends Component {
    constructor(props) {

        super(props);

        this.state = {
            loading: true,
            loadingButton: false,
            errors: {},

            roles: [],
            showAdd: false,
            showForm: false,

            nik: '',
            fullName: '',
            email: '',
            password: '',
            position: '',
            phone: '',
            address: '',
            birthCity: '',
            bod: null,
            roleId: '',
            photo: user,
            avatar: '',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

        document.title = 'Istpro - Add User';

        Api.get('/roles').then(resp => {

            if (resp.data) {

                this.setState({
                    roles: resp.data,
                })

            }

        }).catch(err => {
            console.log(err);
        });

    }

    handleChange (e, prop){

        this.setState({

            [prop]: e.target.value

        })

    };

    handleDate (date, prop){

        this.setState({

            [prop]: date

        })

    };

    showMessage = (status, message) => {
        if(status) {
            toast.success(message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }else {
            toast.error(message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    };

    handleSubmit = (e) => {

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
                loadingButton: true,
            }
        );

        let date = this.state.bod;

        let formData = new FormData();
        formData.append('nik', this.state.nik);
        formData.append('name', this.state.fullName);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('position', this.state.position);
        formData.append('phone', this.state.phone);
        formData.append('address', this.state.address);
        formData.append('birthCity', this.state.birthCity);
        formData.append('bod', date.getFullYear()+'-'+this.appendLeadingZeroes(date.getMonth()+1)+'-'+this.appendLeadingZeroes(date.getDate()));
        formData.append('role', this.state.roleId);
        formData.append('avatar', this.state.avatar);

        Api.putFile('/users',{
            method: 'POST',
            body: formData
        }).then(resp => {

            this.setState({
                    loadingButton: false,
                }
            );

            history.push('/users');

            this.showMessage(true, 'User successfully added');

        }).catch(err => {

            if(ErrorHandling.checkErrorTokenExpired(err)){

            }else{

                this.setState({
                        errors: err.errors,
                        loadingButton: false
                    }
                );

                this.showMessage(false, 'Invalid format data');
            }
        });

    };

    handleAvatar = e => {
        this.setState({
            photo: URL.createObjectURL(e.target.files[0]),
            avatar: e.target.files[0]
        });
    };


    appendLeadingZeroes = n =>{
        if(n <= 9){
            return "0" + n;
        }
        return n
    };

    render() {
        return (
            <div className="row main-content">
                <div className="col-12">
                    <h2 className="page-title">Add User</h2>
                </div>
                <div className="col-12 mt-3">
                    <div className="table-wrapper">
                        <form name="add" id="addUser" className="row" noValidate>
                            <div className="col-md-10">
                                <div className="form-group">
                                    <img src={this.state.photo} alt="user" className="user-photo mr-2" />
                                    <TextField variant="outlined"
                                        type="file"
                                        id='avatar'
                                        name="avatar"
                                        className="avatar"
                                        onChange={this.handleAvatar}
                                    />
                                    <label for="avatar" className="label-file btn btn-blue">Upload Avatar</label>
                                    <div className='text-danger'>{this.state.errors.avatar}</div>
                                </div>

                                <div className="form-group">
                                    <TextField variant="outlined"
                                        type='number'
                                        id='nik'
                                        name="nik"
                                        label="NIK"
                                        onChange={(e) => this.handleChange(e, 'nik')}
                                        minLength={4}
                                        maxLength={50}
                                        value={this.state.nik}
                                        fullWidth
                                    />
                                    {validator.message('nik', this.state.nik, 'required')}
                                    <div className='text-danger'>{this.state.errors.nik}</div>
                                </div>

                                <div className="form-group">
                                    <TextField variant="outlined"
                                        type='text'
                                        id='fullName'
                                        name="fullName"
                                        label="Full Name"
                                        onChange={(e) => this.handleChange(e, 'fullName')}
                                        minLength={4}
                                        maxLength={50}
                                        value={this.state.fullName}
                                        fullWidth
                                    />
                                    {validator.message('fullName', this.state.fullName, 'required')}
                                    <div className='text-danger'>{this.state.errors.fullName}</div>
                                </div>

                                <div className="form-group">
                                    <TextField variant="outlined"
                                        type='text'
                                        id='email'
                                        name="email"
                                        label="Email"
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
                                        onChange={(e) => this.handleChange(e,'password')}
                                        value={this.state.password}
                                        fullWidth
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
                                    />
                                    {validator.message('password', this.state.password, 'required|min:8')}
                                    <div className='text-danger'>{this.state.errors.password}</div>
                                </div>

                                <div className="form-group">
                                    <TextField variant="outlined"
                                        type='text'
                                        id='position'
                                        name="position"
                                        label="Job Position"
                                        onChange={(e) => this.handleChange(e, 'position')}
                                        minLength={4}
                                        maxLength={50}
                                        value={this.state.position}
                                        fullWidth
                                    />
                                    {validator.message('position', this.state.position, 'required')}
                                    <div className='text-danger'>{this.state.errors.position}</div>
                                </div>

                                <div className="form-group">
                                    <TextField variant="outlined"
                                        type='number'
                                        id='phone'
                                        name="phone"
                                        label="Phone"
                                        onChange={(e) => this.handleChange(e, 'phone')}
                                        minLength={4}
                                        maxLength={50}
                                        value={this.state.phone}
                                        fullWidth
                                    />
                                    {validator.message('phone', this.state.phone, 'required')}
                                    <div className='text-danger'>{this.state.errors.phone}</div>
                                </div>

                                <div className="form-group">
                                    <TextField variant="outlined"
                                        type='text'
                                        id='address'
                                        name="address"
                                        label="Address"
                                        onChange={(e) => this.handleChange(e, 'address')}
                                        minLength={4}
                                        maxLength={50}
                                        value={this.state.address}
                                        fullWidth
                                    />
                                    {validator.message('address', this.state.address, 'required')}
                                    <div className='text-danger'>{this.state.errors.address}</div>
                                </div>

                                <div className="form-group">
                                    <TextField variant="outlined"
                                        type='text'
                                        id='birthCity'
                                        name="birthCity"
                                        label="Birth City"
                                        onChange={(e) => this.handleChange(e, 'birthCity')}
                                        minLength={4}
                                        maxLength={50}
                                        value={this.state.birthCity}
                                        fullWidth
                                    />
                                    {validator.message('birthCity', this.state.birthCity, 'required')}
                                    <div className='text-danger'>{this.state.errors.birthCity}</div>
                                </div>

                                <div className="form-group">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            label="Birth Date"
                                            value={this.state.bod}
                                            onChange={(date) => this.handleDate(date, 'bod')}
                                            format={'yyyy-MM-dd'}
                                            cancelLabel="BATAL"
                                        />
                                    </MuiPickersUtilsProvider>
                                    {validator.message('bod', this.state.bod, 'required')}
                                    <div className='text-danger'>{this.state.errors.bod}</div>
                                </div>

                                <div className="form-group">
                                    <TextField variant="outlined"
                                        select
                                        id="roleId"
                                        name="roleId"
                                        label="Role"
                                        onChange={(e) => this.handleChange(e, 'roleId')}
                                        minLength={4}
                                        maxLength={50}
                                        value={this.state.roleId}
                                        fullWidth
                                    >
                                        {this.state.roles.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.display_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    {validator.message('roleId', this.state.roleId, 'required')}
                                    <div className='text-danger'>{this.state.errors.roleId}</div>
                                </div>

                                <Link to="/users" className="btn btn-blue-trans mr-3">
                                    Cancel
                                </Link>
                                <button
                                    className="btn btn-blue"
                                    onClick={this.handleSubmit}
                                    disabled={this.state.loadingButton && 'disabled' }>
                                    Submit { this.state.loadingButton && <i className="fa fa-spinner fa-spin"> </i> }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <ToastContainer />

            </div>
        )
    }
}

export default UsersAdd;
