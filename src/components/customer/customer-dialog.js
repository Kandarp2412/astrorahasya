import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  Autocomplete,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { setTokenSourceMapRange } from "typescript";
// import GlobalState from "../../contexts/GlobalState";
import { globalContext } from "../../contexts/Context";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider, TimePicker } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
// import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import CreatableSelect from "react-select/creatable";
import AsyncCreatableSelect from "react-select/async-creatable";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

const countryOptions = ["USA", "Germany", "Spain", "Italy"];

export const CustomerDialog = (props) => {
  const { customer, open, onClose, ...other } = props;

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
    imagesource,
    setImageSource,
  } = useContext(globalContext);

  const searchTime = useRef(0);

  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");
  const [latitude, setLatidude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [value, setValue] = useState("");
  const [timezone, setTimeZone] = useState("");
  const [timezone1, setTimeZone1] = useState("");

  const [userSelectedChartType, setUserSelectedChartType] = useState("");

  const [editadvancedOption, setEditAdvancedOption] = useState(false);

  // console.log(oneUser);

  const navigate = useNavigate();

  let { customerId } = useParams();

  // const [oneUser, setOneUser] = useState([]);
  const [name, setName] = useState("");
  const [name1, setName1] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const options = useRef([]);

  let [link, setLink] = useState("");
  const [image, setImage] = useState("");
  // const [formdata,setFormData] = useState()
  const [birthTime, setUserBirthTime] = useState();
  const [BirthPlace1, setBirthPlace1] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [flag, setFlag] = useState(false);
  const [iconFlag, setIconFlag] = useState(false);
  const [open1, setOpen] = useState(false);

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
    console.group(newValue1?.label);
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
        let details = {};

        if (image && link) {
          details = {
            name: name ? name : oneUser?.name,
            email: email ? email : oneUser?.email,
            phoneNumber: phone ? phone : oneUser?.phoneNumber,
            birthPlace: BirthPlace1 || oneUser?.birthPlace,
            date: birthDateVal.current !== null ? birthDateVal?.current?.value : oneUser?.date,
            time: birthTime || oneUser?.time,
            image: image || image || oneUser?.profile,
          };
        } else if (link) {
          details = {
            name: name ? name : oneUser?.name,
            email: email ? email : oneUser?.email,
            phoneNumber: phone ? phone : oneUser?.phoneNumber,
            birthPlace: BirthPlace1 || oneUser?.birthPlace,
            date: birthDateVal?.current !== null ? birthDateVal?.current?.value : oneUser?.date,
            time: birthTime || oneUser?.time,
            profileLink: link,
          };
        } else if (image) {
          details = {
            name: name ? name : oneUser?.name,
            email: email ? email : oneUser?.email,
            phoneNumber: phone ? phone : oneUser?.phoneNumber,
            birthPlace: BirthPlace1 || oneUser?.birthPlace,
            date: birthDateVal?.current !== null ? birthDateVal?.current?.value : oneUser?.date,
            time: birthTime || oneUser?.time,
            image: image,
          };
        } else if (deleted) {
          details = {
            name: name ? name : oneUser?.name,
            email: email ? email : oneUser?.email,
            phoneNumber: phone ? phone : oneUser?.phoneNumber,
            birthPlace: BirthPlace1 || oneUser?.birthPlace,
            date: birthDateVal?.current !== null ? birthDateVal?.current?.value : oneUser?.date,
            time: birthTime || oneUser?.time,
            delete: deleted,
          };
        } else {
          details = {
            name: name ? name : oneUser?.name,
            email: email ? email : oneUser?.email,
            phoneNumber: phone ? phone : oneUser?.phoneNumber,
            birthPlace: BirthPlace1 || oneUser?.birthPlace,
            date: birthDateVal?.current !== null ? birthDateVal?.current?.value : oneUser?.date,
            time: birthTime || oneUser?.time,
          };
        }

        let formData = new FormData();

        for (let i of Object.entries(details)) {
          formData.append(i[0], i[1]);
        }

        axios.post(`http://localhost:9003/api/profile/update/${customerId}`, formData).then(() => {
          toast.success(`Customer ${customer ? "updated" : "created"}`);
          navigate("/dashboard/customers");
          helpers.resetForm();
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          axios.get(`http://localhost:9003/api/profile/get/${customerId}`).then((res1) => {
            setOneUser(res1.data.data);
            setImage("");
            setLink("");
            setDeleted(false);
            setFlag(false);
            setIconFlag(false);
            onClose();
          });
        });
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

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

  console.log(userSelectedChartType);

  // useEffect(() => {
  //   axios.post("http://localhost:9002/oneuserdata", { id: customerId }).then((res) => {
  //     // console.log(res.data.data[0].name);
  //     setOneUser(res.data.data[0]);
  //   });
  // }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setFlag(false);
    setOpen(false);
  };

  const fileUpload = (e) => {
    let a = e.target.files[0];
    if (a) {
      setImage(a);
      setFlag(true);
      var image = document.getElementById("blah").firstElementChild;
      console.log(image);
      image.src = URL.createObjectURL(a);
    } else {
      console.log("hear");
      setImage(oneUser.profile);
      return;
    }
  };

  const handleProfileLink = (e) => {
    setLink(e.target.value);
    setFlag(true);
    var image = document.getElementById("blah").firstElementChild;
    console.log(image);
    image.src = e.target.value;
  };

  const handleProfileDelete = () => {
    setDeleted(true);
    setImage("");
    setLink("");
    setImageSource(false);
    setIconFlag(true);
  };

  const handleNotProfileDelete = () => {
    console.log(oneUser);
    setDeleted(false);
    setImage(oneUser.profile);
    // setLink(link)
    setImageSource(true);
    setIconFlag(false);
  };

  const previewClose = () => {
    setFlag(false);
    setImage("");
  };

  let time =
    locationVal?.current?.value !== ""
      ? locationVal?.current?.value?.split(",")[2]
      : oneUser?.timezone;

  useEffect(() => {
    axios
      .post("http://localhost:9003/timezone", {
        birthDateVal: birthDateVal?.current?.value,
        locationVal: time,
      })

      .then((res) => {
        setTimeZone1(res.data.data);
      });
  }, [time]);

  console.log(timezone1);

  useEffect(() => {
    axios.get(`http://localhost:9003/api/profile/get/${customerId}`).then((res) => {
      console.log(res.data);
      setOneUser(res.data.data);
    });
  }, []);

  console.log(oneUser);

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

  console.log(oneUser);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionProps={{
        onExited: formik.resetForm,
      }}
      {...other}
    >
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
              value={oneUser?.email}
            />
          </Grid>
          <Grid item xs={12}>
            {/* {console.log(oneUser.name)} */}
            <InputField
              error={Boolean(formik.touched.fullName && formik.errors.fullName)}
              fullWidth
              helperText={formik.touched.fullName && formik.errors.fullName}
              label="Full Name"
              onBlur={formik.handleBlur}
              onChange={(e) => setName(e.target.value)}
              required
              value={oneUser?.name}
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
              value={oneUser?.phoneNumber}
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
              defaultValue={oneUser?.date}
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
              defaultValue={oneUser?.time}
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
                  placeholder={oneUser?.birthPlace}
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
                    value={latitude ? latitude : oneUser?.latitude}
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
                    value={longitude ? longitude : oneUser?.longitude}
                  />
                </Grid>
                {console.log(timezone1)}
                <Grid item xs={12}>
                  <InputLabel htmlFor="timeZone">Time Zone</InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    style={{ width: "100%", marginTop: "15px" }}
                    name="timeZone"
                    onChange={(e) => setTimeZone(e.target.value)}
                    defaultValue={timezone1 ? timezone1 : oneUser?.timezone}
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
                // isClearable
                isMulti
                placeholder="start typing"
                // defaultInputValue={name1.label}
                onChange={handleChangeLocation}
                options={defaultOptions}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="profile">Profile</InputLabel>
            {/* <img src={imagesource ? oneUser.profile?oneUser.profile:"https://i.stack.imgur.com/l60Hf.png" : "https://i.stack.imgur.com/l60Hf.png"}    style={{width: "64px",height:"64px",marginTop: "11px",borderRadius: "4px"}}></img>  */}
            <Avatar
              src={
                imagesource
                  ? oneUser.profile
                    ? oneUser.profile
                    : "https://i.stack.imgur.com/l60Hf.png"
                  : "https://i.stack.imgur.com/l60Hf.png"
              }
              alt="Avatar"
              sx={{
                height: 120,
                mr: 1,
                width: 120,
              }}
              variant="rounded"
            />

            {flag ? (
              <div id="blah">
                <img
                  src="#"
                  height="250px"
                  width="650px"
                  style={{ width: "570px", marginTop: "11px", borderRadius: "4px" }}
                ></img>
                <Button
                  color="primary"
                  onClick={previewClose}
                  type="button"
                  variant="outlined"
                  style={{ marginLeft: "250px" }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div id="blah" hidden>
                <img src="#" height="250px" width="650px"></img>
              </div>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              className="button1"
              variant="outline"
              component="label"
              // onClick = {()=>setFlag(true)}
              onChange={(e) => {
                fileUpload(e);
              }}
              style={{ position: "unset", marginLeft: "10px" }}
            >
              <UpdateIcon />
              <input type="file" hidden accept="image/png, image/jpeg" />
            </Button>

            {iconFlag ? (
              <Button
                className="button3"
                onClick={() => {
                  handleNotProfileDelete();
                }}
                style={{ position: "unset", marginLeft: "-18px" }}
              >
                <CloseIcon />
              </Button>
            ) : (
              <Button
                className="button3"
                onClick={() => {
                  handleProfileDelete();
                }}
                style={{ position: "unset", marginLeft: "-18px" }}
              >
                <DeleteIcon />
              </Button>
            )}

            <span>
              <Button
                variant="outline"
                onClick={handleClickOpen}
                style={{ marginTop: "-34px", marginLeft: "-44px" }}
              >
                <UpdateIcon />
              </Button>
              <Dialog open={open1} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Profile</DialogTitle>
                <DialogContent>
                  <DialogContentText>Add profile link</DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="email"
                    fullWidth
                    onChange={handleProfileLink}
                  />
                </DialogContent>
              </Dialog>
            </span>
          </Grid>

          {formik.errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{formik.errors.submit}</FormHelperText>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose} type="button" variant="outlined">
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
  );
};

CustomerDialog.defaultProps = {
  open: false,
};

CustomerDialog.propTypes = {
  customer: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
