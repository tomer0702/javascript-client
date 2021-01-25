import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { Button, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddDialog, EditDialog, DeleteDialog } from './Component/index';
import { TableComponent } from '../../components';
import callApi from '../../libs/utils/api';
import { trainees } from './Data/trainee';
import { getDateFormatted } from '../../libs/utils/getdateformat';

const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  dialog: {
    textAlign: 'right',
  },
});

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
      rowsPerPage: 20,
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
      // eslint-disable-next-line
      console.log(data);
    });
    const message = 'This is Success Message';
    const status = 'success';
    value(message, status);
  }

  handleSelect = (event) => {
    // eslint-disable-next-line
    console.log(event);
  };

  handleSort = (field) => (event) => {
    const { order } = this.state;
    // eslint-disable-next-line
    console.log(event);
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage }, () => {
      this.getTraineeData();
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
      RemoveOpen: false,
    });
  };

  handleRemove = (value) => {
    const { deleteData } = this.state;
    this.setState({
      RemoveOpen: false,
    });
    // eslint-disable-next-line no-console
    console.log('Deleted Item ', deleteData);
    const { createdAt } = deleteData;
    const isAfter = moment(createdAt).isSameOrAfter('2019-02-14T18:15:11.778Z');
    const message = isAfter
      ? 'This is a success message!'
      : 'This is an error message!';
    const status = isAfter ? 'success' : 'error';
    value(message, status);
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
    console.log('Edited Item ', { name, email });
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
    this.setState({ loading: true });
    this.getTraineeData();
  }

   getTraineeData= async () => {
     const { page, rowsPerPage } = this.state;
     // eslint-disable-next-line consistent-return
     callApi({ }, 'get', `/trainee?skip=${page * rowsPerPage}&limit=${rowsPerPage}`).then((res) => {
       // eslint-disable-next-line max-len
       this.setState({ dataObj: res.data.data.records, loading: false, Count: res.data.data.count });

       if (res.data.status !== 200) {
         this.setState({
           loading: false,
           Count: 100,

         }, () => {
           console.log('call Api');
         });
       } else {
         this.setState({ dataObj: trainees, loading: false });
         return res;
       }
     });
   }

   render() {
     const {
       open, order, orderBy, page,
       rowsPerPage, EditOpen, RemoveOpen, editData,
       loading, dataObj, Count,
     } = this.state;
     const { classes } = this.props;
     return (
       <>
         <div className={classes.root}>
           <div className={classes.dialog}>
             <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
               ADD TRAINEELIST
             </Button>
             <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
           </div>
          &nbsp;
          &nbsp;
           <EditDialog
             Editopen={EditOpen}
             handleEditClose={this.handleEditClose}
             handleEdit={this.handleEdit}
             data={editData}
           />
           <br />
           <DeleteDialog
             openRemove={RemoveOpen}
             onClose={this.handleRemoveClose}
             remove={this.handleRemove}
           />
           <br />
           <br />
           <TableComponent
             loader={loading}
             id="id"
             data={dataObj}
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
             count={Count}
             page={page}
             onChangePage={this.handleChangePage}
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
export default withStyles(useStyles)(TraineeList);
