/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import {graphql} from '@apollo/client/react/hoc';
import { flowRight as compose } from 'lodash';
import { Button, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddDialog, EditDialog, DeleteDialog } from './Component/index';
import { TableComponent } from '../../components';
import { getDateFormatted } from '../../libs/utils/getdateformat';
import { STORED_USERS } from './query';
import { UPDATED_TRAINEE_SUB, DELETED_TRAINEE_SUB, ADDED_TRAINEE_SUB } from './subscription'; 


class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy: '',
      order: 'asc',
      EditOpen: false,
      RemoveOpen: false,
      editData: {},
      deleteData: {},
      page: 0,
      rowsPerPage: 5,
      loading: false,
      Count: 0,
      dataObj: [],
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { open } = this.state;
    this.setState({ open: false });
    return open;
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  handleSubmit = (data, value) => {
    this.setState({
      open: false,
    }, () => {
    });
    const message = 'This is Success Message';
    const status = 'success';
    value(message, status);
  }

  handleSelect = (event) => {
  };

  handleSort = (field) => (event) => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  handleChangePage =(refetch)=> (event, newPage) => {
    const{ rowsPerPage}= this.state;
    this.setState({
      page: newPage,
    }, () => {
      refetch({skip: String(newPage*rowsPerPage) , limit: String(rowsPerPage)});

    });
  };

  // eslint-disable-next-line no-unused-vars
  handleRemoveDialogOpen = (element) => (event) => {
    this.setState({
      RemoveOpen: true,
      deleteData: element,
    });
  };

  handleRemoveClose = () => {
    this.setState({
      EditOpen: false,
      RemoveOpen: false,
    });
  };

  handleRemove = (data, refetch) => {
    const { page } = this.state;
    console.log('page', page);
    this.setState({
      RemoveOpen: false,},()=>{
        if (data.length===1){
          this.setState({page:page-1},()=> {
            refetch({ skip:String((this.state.page-1)*rowsPerPage),limit:String(rowsPerPage),sort:this.state.orderBy});
          });
        }else refetch();
    });
  };

  // eslint-disable-next-line no-unused-vars
  handleEditDialogOpen = (element) => (event) => {
    this.setState({
      EditOpen: true,
      editData: element,
    });
  };

  handleEditClose = () => {
    this.setState({
      EditOpen: false,
    });
  };

  handleEdit = (name, email, value) => {
    this.setState({
      EditOpen: false,
    });
    // eslint-disable-next-line no-console
    const message = 'This is a success message';
    const status = 'success';
    value(message, status);
  };

  handlesnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      // snackbarOpen: false,
    });
  };

  componentDidMount = () => {
    // this.setState({ loading: false });
    // this. getTraineeData(); 
    const {
      data: {
        refetch,
      },
    } = this.props;
    const { data: { subscribeToMore } } = this.props;
    subscribeToMore({
      document: UPDATED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { data } } = prev;
        const { data: { traineeUpdated } } = subscriptionData;
        const updatedRecords = [...data].map((records) => {
          if (records.originalId === traineeUpdated.originalId) {
            return {
              ...records,
              ...traineeUpdated,
            };
          }
          return records;
        });
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            data: updatedRecords,
          },
        };
      },
    });
    subscribeToMore({
      document: DELETED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { data } } = prev;
        if (data.length === 1) {
          refetch({ skip: String((this.state.page - 1) * 5), limit: String(5), sort: this.state.orderBy });
        } else {
          refetch({ skip: String(this.state.page * 5), limit: String(5), sort: this.state.orderBy });
        }
        return 0;
      },
    });
    subscribeToMore({
      document: ADDED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        refetch({ skip: String(this.state.page * 5), limit: String(5), sort: this.state.orderBy });
        return 0;
      },
    });
  }
  getTraineeData= async()=>{
  }

  render() {
    const {
      open, order, orderBy, page,
      rowsPerPage, EditOpen, RemoveOpen, editData,
      loading, dataObj, Count, deleteData,
    } = this.state;
    const { classes } = this.props;
    const { setLoading } = this.props;

      const {
      data: {
      getAllTrainees: {data={}}= {},
      refetch,
      },
      } = this.props;
      console.log('datatrainelist',data);
      const records=data?data.records:[];
      const count= data?data.count:0;
    return (
      <>
        <div className={classes}>
          <div className={classes}>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              ADD TRAINEELIST
            </Button>
            <AddDialog open={open} onClose={this.handleClose} 
            refetchQuery={refetch}
            onSubmit={() => this.handleSubmit} />
          </div>
          &nbsp;
          &nbsp;
          <EditDialog
            Editopen={EditOpen}
            handleEditClose={this.handleEditClose}
            handleEdit={this.handleEdit}
            data={editData}
            refetchQuery={refetch}
            onClose={this.handleRemoveClose}
          />
          <br />
          <DeleteDialog
            openRemove={RemoveOpen}
            onClose={this.handleRemoveClose}
            remove={()=>this.handleRemove(data, refetch)}
            rmdata={deleteData}
            refetchQuery={refetch}
          />
          <br />
          <br />
          <TableComponent
            loader={loading}
            id="id"
            data={records}
            column={
              [
                {
                  field: 'name',
                  label: 'Name',
                },
                {
                  field: 'email',
                  label: 'Email Address',
                  format: (value) => value && value.toUpperCase(),
                },
                {
                  field: 'createdAt',
                  label: 'Date',
                  align: 'right',
                  format: getDateFormatted,
                },
              ]
            }
            actions={[
              {
                icon: <EditIcon />,
                handler: this.handleEditDialogOpen,

              },
              {
                icon: <DeleteIcon />,
                handler: this.handleRemoveDialogOpen,
              },
            ]}
            onSort={this.handleSort}
            orderBy={orderBy}
            order={order}
            onSelect={this.handleSelect}
            count={count}
            page={page}
            onChangePage={this.handleChangePage(refetch)}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            rowsPerPage={rowsPerPage}
          />
        </div>
      </>
    );
  }
}
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default ( graphql(STORED_USERS,
  {
  options: { variables: { skip: '0', limit: '5', sort: 'name' } },
  }))(TraineeList);
