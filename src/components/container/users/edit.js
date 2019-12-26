import React,{Component} from 'react';
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

class UsersEdit extends Component {
    constructor(props) {

        super(props);

        this.state = {
            loading: true,
            loadingButton: false,
            errors: {},

            roles: [],
            showAdd: false,
            showForm: false,

            id: '',
            nik: '',
            name: '',
            email: '',
            password: '',
            position: '',
            phone: '',
            address: '',
            birthCity: '',
            bod: null,
            role: '',
            photo: user,
            avatar: '',

            rows: [],
            sendPageNumber: '',
            sendPerPage: '',
            total: 0,
            perPage: 10,
            currentPage: 1,
            currentPageTable: 0,
            totalData: 0,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

        document.title = 'Istpro - Edit User';

        const id = this.props.match.params.id;

        let currentDate = new Date();

        Api.get('/roles').then(resp => {

            if (resp.data) {

                this.setState({
                    roles: resp.data,
                })

            }

        }).catch(err => {
            console.log(err);
        });

        Api.get('/users/'+id+'?include=roles').then(resp => {

            if (resp.data) {
                let data = resp.data;
                this.setState({
                    id: data.id,
                    nik: data.nik,
                    name: data.name,
                    email: data.email,
                    password: '',
                    position: data.position,
                    phone: data.phone,
                    avatar: 'http://api.istpromarine.com/storage/'+data.avatar,
                    photo: 'http://api.istpromarine.com/storage/'+data.avatar,
                    address: data.address,
                    birthCity: data.birth_city,
                    bod: data.birth_date !== null ? data.birth_date : currentDate.getFullYear() + '-' + appendLeadingZeroes(currentDate.getMonth() + 1) + '-' + appendLeadingZeroes(currentDate.getDate()),
                    role: data.roles.data[0].id
            });

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

        let params = {
            avatar : this.state.nik,
            nik : this.state.nik,
            name : this.state.name,
            email : this.state.email,
            position : this.state.position,
            phone : this.state.phone,
            address : this.state.address,
            birthCity : this.state.birthCity,
            bod : this.state.bod,
            role : this.state.role,
        };

        let formData = new FormData();
        formData.append('nik', this.state.nik);
        formData.append('name', this.state.name);
        formData.append('email', this.state.email);
        formData.append('position', this.state.position);
        formData.append('phone', this.state.phone);
        formData.append('address', this.state.address);
        formData.append('birthCity', this.state.birthCity);
        formData.append('bod', this.state.bod);
        formData.append('role', this.state.role);
        formData.append('avatar', this.state.avatar);

        Api.putFile('/users/'+this.state.id,{
            method: 'POST',
            body: formData
        }).then(resp => {

            console.log(resp);
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

    render() {
        return (
            <div className="row main-content">
                <div className="col-12">
                    <h2 className="page-title">Edit User</h2>
                </div>
                <div className="col-12 mt-3">
                    <div className="table-wrapper">
                        <form name="edit" id="editUser" className="row" noValidate>
                            <div className="col-md-10">
                                <div className="form-group">
                                    <img src={this.state.photo} alt="user" className="user-photo mr-2"/>
                                    <TextField variant="outlined"
                                        type="file"
                                        id='avatar'
                                        name="avatar"
                                        className="avatar"
                                        onChange={this.handleAvatar}
                                    />
                                    <label htmlFor="avatar" className="label-file btn btn-blue">Upload Avatar</label>
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
                                        id='name'
                                        name="name"
                                        label="Full Name"
                                        onChange={(e) => this.handleChange(e, 'name')}
                                        minLength={4}
                                        maxLength={50}
                                        value={this.state.name}
                                        fullWidth
                                    />
                                    {validator.message('name', this.state.name, 'required')}
                                    <div className='text-danger'>{this.state.errors.name}</div>
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

                      {/*          <div className="form-group">
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
                                </div>*/}

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
                                        id="role"
                                        name="role"
                                        label="Role"
                                        onChange={(e) => this.handleChange(e, 'role')}
                                        minLength={4}
                                        maxLength={50}
                                        value={this.state.role}
                                        fullWidth
                                    >
                                        {this.state.roles.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.display_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    {validator.message('role', this.state.role, 'required')}
                                    <div className='text-danger'>{this.state.errors.role}</div>
                                </div>

                                <Link to="/users" className="btn btn-blue-trans mr-3">
                                    Cancel
                                </Link>
                                <button className="btn btn-blue" onClick={this.handleSubmit}>
                                    Save
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

export default UsersEdit;

function appendLeadingZeroes(n) {
    if (n <= 9) {
        return "0" + n;
    }
    return n
}