import React,{Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Api from "../../../libraries/api";
import user from "../../../images/user.png";
import {toast, ToastContainer} from "react-toastify";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "../../presentational/table-pagination-actions";

require('dotenv').config();

class Users extends Component {
    _isMounted = false;

    constructor(props) {

        let currentDate = new Date();

        super(props);

        this.state = {
            loading: true,
            loadingButton: false,
            errors: {},

            roles: [],
            showDialog: false,
            idDelete: '',
            currDelete: '',

            nik: '',
            fullName: '',
            email: '',
            password: '',
            position: '',
            phone: '',
            address: '',
            birthCity: '',
            bod: currentDate.getFullYear() + '-' + appendLeadingZeroes(currentDate.getMonth() + 1) + '-' + appendLeadingZeroes(currentDate.getDate()),
            roleId: '',

            rows: [],
            total: 0,
            perPage: 10,
            currentPage: 1,
            currentPageTable: 0,

            isEdit: false,
            isDelete: false,
            isCreate: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

        document.title = 'Istpro - User';

        this.__fetchData(false);

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    __fetchData = update => {
        this._isMounted = true;

        let page = update ? parseInt(this.state.currentPage + 1) : this.state.currentPage;

        let route = '/users?include=roles&limit='+this.state.perPage+'&page='+page;

        Api.get(route).then(resp => {
            if (this._isMounted) {

                if (resp.data) {

                    this.setState({
                        rows: resp.data,
                        perPage: resp.meta.pagination.per_page,
                        currentPage: resp.meta.pagination.current_page,
                        currentPageTable: resp.meta.pagination.current_page - 1,
                        total: resp.meta.pagination.total,
                        loading: false,
                        isEdit: resp.meta.custom.isEdit,
                        isDelete: resp.meta.custom.isDelete,
                        isCreate: resp.meta.custom.isCreate,
                    })

                }
            }
        }).catch(err => {
            console.log(err);
        });
    };

    handleChange (e, prop){

        this.setState({

            [prop]: e.target.value

        })

    };

    handleOpen = (row) => {
        this.setState({
            showDialog :true,
            idDelete: row.id,
            currDelete: row.name,
        })
    };

    handleClose = () => {
        this.setState({
            showDialog :false,
        })
    };

    handleDelete = () => {

        if(this.state.idDelete) {
            Api.delete('/users/'+this.state.idDelete, '', false).then(resp => {

                this.setState({
                    showDialog: false,
                    }
                );

                this.showMessage(true, 'User successfully deleted');
                this.__fetchData(false);

            }).catch(err => {

                this.setState({
                    showDialog: false
                    }
                );

                this.showMessage(true, 'User successfully deleted');
                this.__fetchData(false);
            });
        }
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

    handleChangePage = (event, newPage) => {
        this.setState({
            rows: [],
            currentPage:newPage,
            currentPageTable:newPage,
            loading: true,
        }, () => {
            this.__fetchData(true);
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({
            perPage:parseInt(event.target.value, 10),
            currentPage:1,
            loading: true,
        },() => {
            this.__fetchData(false);
        });
    };

    render() {
        return (
            <div className="row main-content">
                <div className="col-12">
                    <h2 className="page-title">Users</h2>
                    {this.state.isCreate &&
                    <Link to="/users/add" className="btn btn-blue">ADD USER</Link>
                    }
                </div>
                <div className="col-12 mt-3">
                    <div className="table-wrapper">
                        <Table className="table-list" size="small" >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>NIK</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" className="py-5">
                                            <CircularProgress color="primary"  />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    this.state.rows.length === 0 ? (
                                        <TableRow style={{ height: 33 * this.state.perPage}}>
                                            <TableCell colSpan={5} style={{ textAlign: "center" }}>No users</TableCell>
                                        </TableRow>
                                    ) : (
                                        this.state.rows.map(row => (
                                            <TableRow
                                                key={row.id}
                                                selected={row.selected}>
                                                <TableCell>
                                                    <img src={row.avatar === null ? user : process.env.REACT_APP_API_STORAGE_PATH+row.avatar} className="img-user mr-2" />
                                                    <span>{row.name === null ? 'NA' : row.name}</span>
                                                </TableCell>
                                                <TableCell>{row.nik === null ? 'NA' : row.nik}</TableCell>
                                                <TableCell>{row.email === null ? 'NA' : row.email}</TableCell>
                                                <TableCell>{row.roles === null ? 'NA' : row.roles.data[0].display_name}</TableCell>
                                                <TableCell>
                                                    {this.state.isEdit &&
                                                    <Link to={"/users/edit/" + row.id} className="btn-icon mr-2">
                                                        <i className="fas fa-edit"> </i>
                                                    </Link>
                                                    }
                                                    {this.state.isDelete &&
                                                    <button className="btn-icon" onClick={() => this.handleOpen(row)}>
                                                        <i className="fas fa-trash-alt"> </i>
                                                    </button>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )
                                )}

                            </TableBody>
                        </Table>
                    </div>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={this.state.total}
                        rowsPerPage={this.state.perPage}
                        page={this.state.currentPageTable}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />

                </div>

                <Dialog
                    maxWidth='sm'
                    fullWidth={true}
                    open={this.state.showDialog}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">DELETE USER: {this.state.currDelete}</DialogTitle>
                    <DialogContent>
                        <p>Are you sure you wanna delete this user?</p>
                    </DialogContent>
                    <DialogActions>
                        <button className="btn btn-blue-trans" onClick={this.handleClose}>
                            Cancel
                        </button>
                        <button className="btn btn-blue" onClick={this.handleDelete}>
                            Delete
                        </button>
                    </DialogActions>
                </Dialog>

                <ToastContainer />

            </div>
        )
    }
}

export default Users;

function appendLeadingZeroes(n) {
    if (n <= 9) {
        return "0" + n;
    }
    return n
}