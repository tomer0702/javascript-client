/* eslint-disable */
import { React, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from '@material-ui/core';
import callApi from '../../../../libs/utils/api';
import { snackbarContext } from '../../../../contexts/index';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      loading: false,
    };
  }

  onClickHandler = async (e, openSnackBar) => {
    this.setState({
      loading: true,
    });
    const { rmdata, database, onClose } = this.props;
    console.log("removedata", rmdata);
    const res = await callApi(rmdata, 'delete', `/trainee/${rmdata.originalId}`);
    console.log("delete block", res);
    this.setState({ loading: false });
    if (res.statusText === 'OK') {
      console.log("statustext", res.statusText);
      this.setState({
        message: 'Deleted Successfully ',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'success');
        database();
        this.setState
      });
    } else {
      this.setState({
        message: 'Error While Deleting',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
    onClose();
  }

  render() {
    const {
      openRemove, onClose, deleteData,
    } = this.props;
    const { loading } = this.state;
    return (
      <div width="50%">
        <Dialog
          open={openRemove}
          variant="outlined"
          color="primary"
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you really want to remove Trainee ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <snackbarContext.Consumer>
              {(openSnackBar) => (
                <Button onClick={() => {console.log("opensnck", openSnackBar);this.onClickHandler(deleteData,openSnackBar)}
                }
                >
                  {loading && (
                <CircularProgress size={50} />
              )}
              {loading && <span>Deleting</span>}
              {!loading && <span>Delete</span>}
                </Button>
              )}

            </snackbarContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteDialog.propTypes = {
  openRemove: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteDialog;
