import PropTypes from "prop-types";
import { format } from "date-fns";
import numeral from "numeral";
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  InputLabel,
  NativeSelect,
  TextareaAutosize,
} from "@material-ui/core";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useContext, useState } from "react";
import "./Dialog.css";
import { globalContext } from "../../contexts/Context";

export const CustomerProperties = (props) => {
  const { customer, ...other } = props;

  const { oneUser, setOneUser } = useContext(globalContext);

  const [open, setOpen] = useState(false);

  const handleClose = (notesId, notes) => {
    setOpen(false);
  };

  return (
    <Card variant="outlined" {...other}>
      <CardHeader
        title="Customer Properties"
        action={
          <Button color="primary" onClick={(e) => setOpen(true)} variant="text">
            Edit
          </Button>
        }
      />
      <Dialog
        style={{ width: "100%" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
              <InputLabel>Ayanamsha</InputLabel>
              <NativeSelect
                style={{ width: "100%" }}
                defaultValue="Netal"
                inputProps={{
                  name: "name",
                  id: "uncontrolled-native",
                }}
                // onChange={(e) => handleChangeChartType(e)}
              >
                <option value="Netal">Kp</option>
                <option value="Event">LAHIRI</option>
                <option value="Horay">DELUCE</option>
              </NativeSelect>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Tables</InputLabel>
              <NativeSelect
                style={{ width: "100%" }}
                defaultValue="Netal"
                inputProps={{
                  name: "name",
                  id: "uncontrolled-native",
                }}
                // onChange={(e) => handleChangeChartType(e)}
              >
                <option value="Netal">House Significators</option>
                <option value="Event">Planet Significator</option>
                <option value="Horay">Kp House</option>
                <option value="Horay">Kp Planet</option>
                {/* <option value="Horay">Kp house</option> */}
              </NativeSelect>
            </Grid>
            {/* </DialogContent> */}
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleClose()} color="primary" autoFocus>
                Update
              </Button>
            </DialogActions>
          </Grid>
        </DialogContent>
      </Dialog>
      {/* <Button>a</Button> */}
      <Divider />
      <PropertyList>
        <PropertyListItem divider label="sun" value={oneUser?.sun} />
        <PropertyListItem divider label="moon" value={oneUser?.moon} />
        <PropertyListItem divider label="mars" value={oneUser?.mars} />
        <PropertyListItem divider label="rahu" value={oneUser?.rahu} />
        <PropertyListItem divider label="jupitor" value={oneUser?.jupitor} />
        <PropertyListItem divider label="saturn" value={oneUser?.saturn} />
        <PropertyListItem divider label="mercury" value={oneUser?.mercury} />
        <PropertyListItem divider label="ketu" value={oneUser?.ketu} />

        <PropertyListItem divider label="venus" value={oneUser?.venus} />
        {/* <PropertyListItem
          divider
          label="Store Credit"
          value={`${numeral(customer.storeCredit).format('$0,0.00')} USD`}
        />
        <PropertyListItem
          divider
          label="Status"
          value={customer.status}
        />
        <PropertyListItem
          label="Signup"
          value={format(customer.createdAt, 'dd MM yyyy HH:mm')}
        /> */}
      </PropertyList>
    </Card>
  );
};

CustomerProperties.propTypes = {
  customer: PropTypes.object.isRequired,
};
