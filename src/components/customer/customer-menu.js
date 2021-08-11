import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import {
  IconButton,
  Menu,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
  Button,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@material-ui/core";
import { InputField } from "../input-field";
import FormControl from "@material-ui/core/FormControl";
import { usePopover } from "../../hooks/use-popover";
import { DotsVertical as DotsVerticalIcon } from "../../icons/dots-vertical";
import PropTypes from "prop-types";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { globalContext } from "../../contexts/Context";
import CreatableSelect from "react-select/creatable";
import { CustomerDialog } from "./customer-dialog";
import { CustomerInfo } from "./customer-info";
import * as Yup from "yup";

const countryOptions = ["USA", "Germany", "Spain", "Italy"];

export const CustomerMenu = (props) => {
  const navigate = useNavigate();
  const { customer, onEdit } = props;
  // console.log(onEdit);

  const { refreshUserTable, setRefreshUserTable } = useContext(globalContext);

  const [editModal, setEditModal] = useState(false);

  const {
    oneUser,
    setOneUser,
    formData,
    setData,
    ayanamshas,
    selectedAyanamsha,
    setSelectedAyanamsha,
    setDasha,
    dasha,
    chartType,
    setChartType,
    astavargaPointsCount,
    setAstavargaPointsCount,
    astavargaPoints,
    setAstavargaPoints,
    setYoginiDasaYear,
    setYoginiDasa,
    cheraDashaPlanetName,
    setcheraDashaPlanetName,
    cheraDashaResult,
    setCheraDashaResult,
    cheraDashaSignName,
    setCheraDashaSignName,
    setMoonSign,
    birthDateVal,
    latitudeVal,
    longitudeVal,
    locationVal,
    namesVal,
    birthTimeVal,
  } = useContext(globalContext);

  const searchTime = useRef(0);

  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");
  const [latitude, setLatidude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [value, setValue] = useState("");
  const [timezone, setTimeZone] = useState("");

  const [userSelectedChartType, setUserSelectedChartType] = useState("");

  const [editadvancedOption, setEditAdvancedOption] = useState(false);

  // console.log(oneUser);

  // const navigate = useNavigate();

  let { customerId } = useParams();

  // const [oneUser, setOneUser] = useState([]);
  const [name, setName] = useState("");
  const [name1, setName1] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const options = useRef([]);

  useEffect(() => {
    axios.get(`http://localhost:9003/api/profile/get/${customerId}`).then((res) => {
      console.log(res.data);
      setOneUser(res.data.data);
    });
  }, []);

  // let defaultOptions1 = [];

  // const [syscatname, setsyscatname] = useState({
  //   isLoading: false,
  //   options1: defaultOptions1,
  //   value: undefined,
  // });

  useEffect(() => {
    axios
      .get("http://localhost:9003/api/profile/tags")
      .then((res2) => {
        console.log(res2);
        options.current = res2.data.data.map((i) => i.tagName);
      })
      .catch((err2) => console.log(err2));
  }, []);

  let createOption = (label) => ({
    label,
    // value: label.toLowerCase().replace(/\W/g, ""),
  });

  let defaultOptions = [];

  for (let i of options.current) {
    defaultOptions = [...defaultOptions, createOption(i)];
  }

  console.log(defaultOptions);

  const handleChangeLocation = (newValue1, actionMeta) => {
    setName1(newValue1?.label);
    console.log(newValue1?.label);
    if (actionMeta.action == "create-option") {
      setName1(newValue1);
      const headers = {
        "Content-Type": "text/plain",
      };
      //axios.defaults.headers.common["Authorization"] = token;
      axios.defaults.headers.common["Content-Type"] = "text/plain";
      axios.defaults.headers.common["Accept"] = "application/json";
      axios
        .post("http://localhost:9003/api/profile/tags", { tagName: newValue1?.label })
        .then((res) => {
          console.log(res);
        });
      setAsset(asset.slice().concat(createOption(newValue1.value)));
    }
  };

  const [asset, setAsset] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: customer?.address || "",
      email: customer?.email || "",
      fullName: customer?.fullName || "",
      country: customer?.country || "",
      phone: customer?.phone || "",
      submit: null,
    },
    validationSchema: Yup.object().shape({
      address: Yup.string().max(255),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      fullName: Yup.string().max(255).required("Full name is required"),
      country: Yup.string().oneOf(countryOptions),
      phone: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log(oneUser.birthPlace);
        // console.log(name);
        axios
          .post(`http://localhost:9003/api/profile/update/${customer._id}`, {
            name: name ? name : oneUser.name,
            email: email ? email : oneUser.email,
            phoneNumber: phone ? phone : oneUser.phoneNumber,
            birthPlace:
              locationVal.current !== null ? locationVal.current.value : oneUser.birthPlace,
            date: birthDateVal.current !== null ? birthDateVal.current.value : oneUser.date,
            time: birthTimeVal.current !== null ? birthTimeVal.current.value : oneUser.time,
            id: customerId,
            longitude: longitude ? longitude : oneUser.longitude,
            latitude: latitude ? latitude : oneUser.latitude,
            timezone: timezone ? timezone : oneUser.timezone,
            chartType: userSelectedChartType ? userSelectedChartType : "Netal",
          })
          .then(() => {
            toast.success(`Customer ${customer ? "updated" : "created"}`);
            navigate("/dashboard/customers");
            helpers.resetForm();
            helpers.setStatus({ success: true });
            helpers.setSubmitting(false);
          });
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  // console.log(customer);

  const [anchorRef, open, handleOpen] = usePopover();

  const handleClose = () => {
    setEditModal(false);
  };

  const handleEdit = () => {
    setEditModal(true);
  };

  const handleEditPlus = () => {
    handleClose();
    navigate(`/dashboard/customers/${customer.id}`);
  };

  const handleReport = () => {
    handleClose();
    // toast.error("This action is not available on demo");
  };

  const handleBirthPlace = (e) => {
    // console.log(e.target.value);
    var searchText = e.target.value;

    if (searchTime.current) {
      clearTimeout(searchTime.current);
    }

    searchTime.current = setTimeout(() => {
      setSearch(searchText);
    }, 500);
  };

  const handleTextFeild = (event, val) => {
    val ? setLatidude(val.latitude) : setLatidude("");
    val ? setLongitude(val.longitude) : setLongitude("");
  };

  const handleChangeChartType = (e) => {
    setUserSelectedChartType(e.target.value);
  };

  const handleDelete = () => {
    handleClose();
    axios.post(`http://localhost:9003/api/profile/delete/${customer._id}`).then((res) => {
      toast.success("successfully deleted");
      setRefreshUserTable(!refreshUserTable);
    });
  };

  useEffect(() => {
    axios
      .post("http://localhost:9003/searching3", {
        search: search,
      })
      .then((result) => {
        setResult(result.data.data);
      })
      .catch((err) => console.log(err));
  }, [search]);

  return (
    <>
      <IconButton onClick={handleOpen} ref={anchorRef} {...props}>
        <DotsVerticalIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleEditPlus}>Edit +</MenuItem>
        <MenuItem onClick={handleReport}>View</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Dialog open={editModal}>
        <DialogTitle>{customer ? "Update Customer" : "Create Customer"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                defaultValue={customer.email}
              />
            </Grid>
            <Grid item xs={12}>
              {console.log(oneUser)}
              <InputField
                error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                fullWidth
                helperText={formik.touched.fullName && formik.errors.fullName}
                label="Full Name"
                onBlur={formik.handleBlur}
                onChange={(e) => setName(e.target.value)}
                required
                defaultValue={customer.name}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone number"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={(e) => setPhone(e.target.value)}
                defaultValue={customer.phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="name">Date of birth</InputLabel>
              <TextField
                fullWidth
                id="date"
                variant="outlined"
                // style={{ width: 270 }}
                size="small"
                type="date"
                defaultValue={customer.date}
                // sx={{
                //   display: {
                //     xs: "flex",
                //     md: {display:"flex",flexDirection:"column"},
                //   },
                // }}
                inputRef={birthDateVal}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="name">Time of birth</InputLabel>
              <input
                // fullWidth
                defaultValue={customer.time}
                id="appt-time"
                type="time"
                name="appt-time"
                step="2"
                style={{
                  height: "40px",
                  marginTop: "15px",
                  // maxWidth: "525px !important",
                  width: "100%",
                  // minWidth: "135px",
                  borderRadius: "6px",
                  outline: "midnightblue",
                  border: "1px solid #C5C5C5",
                  padding: "8px",
                }}
                // onChange={(e) => setUserBirthTime(e.target.value)}
                inputRef={birthTimeVal}
              />
            </Grid>
            {/* {console.log(oneUser.birthPlace)} */}
            <Grid item xs={12}>
              <InputLabel htmlFor="name">
                Birth Place{" "}
                <a href="#" onClick={(e) => setEditAdvancedOption(!editadvancedOption)}>
                  +Advanced Options
                </a>
              </InputLabel>
              <Autocomplete
                fullWidth
                id="combo-box-demo"
                options={result}
                onChange={handleTextFeild} // prints the selected value
                // defaultValue={oneUser.birthPlace}
                getOptionLabel={(options) =>
                  `${options.place} ,${options.state !== " " ? options.state : " "},${
                    options.country_name
                  }`
                }
                // style={{ width: 32 }}
                onInputChange={handleBirthPlace}
                name="location"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={locationVal}
                    placeholder={customer.birthPlace}
                    variant="outlined"
                    size="small"
                  />
                )}
                // defaultValue={oneUser.birthPlace}
              />
              {/* </Grid> */}
              {editadvancedOption === true ? (
                <div style={{ marginTop: "30px" }}>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="longitude">Latitude</InputLabel>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      style={{ width: "100%", marginTop: "15px" }}
                      name="latitude"
                      onChange={(e) => setLatidude(e.target.value)}
                      inputRef={latitudeVal}
                      value={latitude ? latitude : customer.latitude}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="latitude">Longitude</InputLabel>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      style={{ width: "100%", marginTop: "15px" }}
                      name="longitude"
                      onChange={(e) => setLongitude(e.target.value)}
                      inputRef={longitudeVal}
                      value={longitude ? longitude : customer.longitude}
                    />
                  </Grid>
                  {/* {console.log(longitudeVal)} */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor="timeZone">Time Zone</InputLabel>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      style={{ width: "100%", marginTop: "15px" }}
                      name="timeZone"
                      onChange={(e) => setTimeZone(e.target.value)}
                      defaultValue={customer.timezone}
                    />
                  </Grid>
                </div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel
                  htmlFor="name-native-error"
                  style={{ fontSize: "19px", marginLeft: "-14px" }}
                >
                  Chart Type
                </InputLabel>
                <NativeSelect
                  defaultValue="Netal"
                  inputProps={{
                    name: "name",
                    id: "uncontrolled-native",
                  }}
                  onChange={(e) => handleChangeChartType(e)}
                >
                  <option value="Netal">Netal</option>
                  <option value="Event">Event</option>
                  <option value="Horary">Horary</option>
                </NativeSelect>
              </FormControl>
              {userSelectedChartType === "Horary" ? (
                <>
                  <InputLabel
                    htmlFor="name-native-error"
                    style={{ marginTop: "10px" }}
                    // style={{ fontSize: "19px", marginLeft: "-14px" }}
                  >
                    Number
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    style={{ width: "100%" }}
                    name="timeZone"
                  />
                  <InputLabel htmlFor="name-native-error" style={{ marginTop: "10px" }}>
                    Questions
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    style={{ width: "100%" }}
                    name="timeZone"
                  />
                </>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <InputLabel htmlFor="name-native-error" style={{ fontSize: "19px" }}>
                Tags
              </InputLabel>
              <FormControl style={{ width: "100%", marginTop: "10px" }}>
                <CreatableSelect
                  isClearable
                  // isMulti
                  placeholder="start typing"
                  // defaultInputValue={name1.label}
                  onChange={handleChangeLocation}
                  options={defaultOptions}
                />
              </FormControl>
            </Grid>
            {formik.errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{formik.errors.submit}</FormHelperText>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose} type="button" variant="outlined">
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={formik.isSubmitting}
            onClick={formik.handleSubmit}
            type="submit"
            variant="contained"
          >
            {customer ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* {editModal ? <CustomerInfo /> : null} */}
    </>
  );
};

CustomerMenu.propTypes = {
  customer: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
};
