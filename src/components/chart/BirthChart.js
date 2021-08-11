// import { Divider } from "@chakra-ui/layout";
// import { Select } from "@chakra-ui/select";
import axios from "axios";
import moment from "moment";
import React, { useContext, useState } from "react";
import { globalContext } from "../../contexts/Context";
// import AppContext, { globalContext } from "../../context/Context";
import BirthChartSVG from "./BirthChartSVG";
import NorthIndianStyle from "./NorthIndianStyle";
import PropTypes from "prop-types";
import { Autocomplete, Divider, TextField } from "@material-ui/core";
import Toggle from "react-toggle";
import "./Toggle.css";

// import { globalContext } from "";
// import BirthChartSVG from '../BirthChartSVG';

function BirthChart(props) {
  const { firstchartsShow } = props;
  const { data, formData, setData, selectedAyanamsha, chartType, toggleTrue, setToggleTrue } =
    useContext(globalContext);
  // const { isDark } = useContext(AppContext);
  const [progressionChart, setProgressionChart] = useState(formData.birthDate);
  const [transitChart, setTransitChart] = useState({});
  const [selectedCharts, setSelectedCharts] = useState(["d1Chart"]);

  const [date, setDate] = useState(0);

  const equation = moment(formData.birthDate).format("yyyy");

  const addDate = moment(formData.birthDate).format("DD");

  const [transitionDate, setTransitionDate] = useState(equation);

  const [progrestionDate, setProgressionDate] = useState(addDate);
  const [chartsShow, setChartsShow] = useState("d1Chart");

  const handleDate = (e) => {
    axios
      .post("http://localhost:9002/api/getprogressionChart", {
        dateString: finalProgressionDate,
        timeString: formData.birthTime,
        lat: formData.latitude,
        lng: formData.longitude,
        ayanamsha: selectedAyanamsha,
      })
      .then((result) => {
        console.log(data.dasha);
        setProgressionChart(result.data.charts);
      });

    axios
      .post("http://localhost:9002/api/gettransitChart", {
        dateString: finalTransitDate,
        timeString: formData.birthTime,
        lat: formData.latitude,
        lng: formData.longitude,
        ayanamsha: selectedAyanamsha,
      })
      .then((result) => {
        console.log(result.data.charts.d1Chart);
        setTransitChart(result.data.charts);
      });

    setProgressionDate(parseInt(addDate) + parseInt(date));
    // console.log(progrestionDate);
    setDate(parseInt(e.target.value - equation));

    setTransitionDate(e.target.value);
    // console.log(transitionDate);
  };

  let finalTransitDate = moment(formData.birthDate).format("DD-MM-") + transitionDate;

  let finalProgressionDate = progrestionDate + moment(formData.birthDate).format("-MM-YYYY");

  if (date === 0) {
    finalProgressionDate = formData.birthDate;
    finalTransitDate = formData.birthDate;
  }

  const handleToggle = () => {
    // console.log(toggleTrue);
    setToggleTrue(!toggleTrue);
    // console.log(toggleTrue);
  };

  const top100Films = [
    { title: "Birth Chart" },
    { title: "Sun Chart" },
    { title: "Moon Chart" },
    { title: "Chalit Chart" },
    { title: "Hora Chart" },
    { title: "Dreshkan Chart" },
    { title: "Chathurthamasha Chart" },
    { title: "Panchmansha Chart" },
    { title: "Saptamansha Chart" },
    { title: "Ashtamansha Chart" },
    { title: "Navamansha Chart" },
    { title: "Dashamansha Chart" },
    { title: "Dwadashamsha Chart" },
    { title: "Shodashamsha Chart" },
    { title: "Vishmansha Chart" },
    { title: "Chaturvimshamsha Chart" },
    { title: "Bhamsha" },
    { title: "Trishamansha Chart" },
    { title: "Khavedamansha Chart" },
    { title: "Akshvedamsha Chart" },
    { title: "Shashtymasha Chart" },
  ];

  // const handleCharts = (e) => {
  //   setChartsShow(e.target.value);
  //   console.log(e.target.value);
  // };

  return (
    <div>
      {data &&
        selectedCharts &&
        selectedCharts.map((key) => {
          return (
            <div key={key}>
              {/* <div className="chart-top-fields"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              > */}

              {/* <div>
                  <Autocomplete
                    id="combo-box-demo"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    style={{
                      
                    }}
                    hiddenLabel="true"
                    renderInput={(params) => (
                      <TextField
                        
                        {...params}
                       
                        defaultValue="d1Chart"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <Toggle
                  id="cheese-status"
                  
                  onClick={(e) => handleToggle(e)}
                /> */}
              {/* </div> */}
              {/* <Divider
                style={{
                  border: "1px solid grey",
                  marginBottom: "10px",
                  
                  textAlign: "justify",
                  
                }}
              /> */}
              <div className="chart-box">
                {data &&
                  (chartType === "North Indian" ? (
                    <NorthIndianStyle
                      data={data?.charts[firstchartsShow]}
                      selectedCharts={selectedCharts}
                    />
                  ) : (
                    <BirthChartSVG
                      data={data?.charts[firstchartsShow]}
                      selectedCharts={selectedCharts}
                    />
                  ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}

BirthChart.propTypes = {
  firstchartsShow: PropTypes.node.isRequired,
};

export default BirthChart;
