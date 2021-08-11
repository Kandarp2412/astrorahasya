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
import "./Toggle.css";
// import { PropTypes } from "@material-ui/core";
// import { globalContext } from "";
// import BirthChartSVG from '../BirthChartSVG';

function TransiteChart(props) {
  const { chartsShow } = props;
  const {
    data,
    formData,
    setData,
    selectedAyanamsha,
    progressionChart,
    setProgressionChart,
    transitChart,
    setTransitChart,
    selectedCharts,
    setSelectedCharts,
    anotherCharts,
    setAnotherCharts,
    equation,
    addDate,
    transitionDate,
    setTransitionDate,
    progrestionDate,
    setProgressionDate,
    date,
    setDate,
    chartType,
  } = useContext(globalContext);

  // console.log(chartsShow);

  // const { isDark } = useContext(AppContext);
  // const [progressionChart, setProgressionChart] = useState(formData.birthDate);
  // const [transitChart, setTransitChart] = useState({});
  // const [selectedCharts, setSelectedCharts] = useState(["d1Chart"]);
  // const [anotherCharts, setAnotherCharts] = useState([
  //   "d7Chart",
  //   "d9Chart",
  //   "d10Chart",
  //   "d60Chart",
  // ]);
  // const [date, setDate] = useState(0);

  // const equation = moment(formData.birthDate).format("yyyy");

  // const addDate = moment(formData.birthDate).format("DD");

  // const [transitionDate, setTransitionDate] = useState(equation);

  // const [progrestionDate, setProgressionDate] = useState(addDate);

  // const handleDate = (e) => {
  //   axios
  //     .post("http://localhost:9002/api/getprogressionChart", {
  //       dateString: finalProgressionDate,
  //       timeString: formData.birthTime,
  //       lat: formData.latitude,
  //       lng: formData.longitude,
  //       ayanamsha: selectedAyanamsha,
  //     })
  //     .then((result) => {
  //       console.log(data.dasha);
  //       setProgressionChart(result.data.charts);
  //     });

  //   axios
  //     .post("http://localhost:9002/api/gettransitChart", {
  //       dateString: finalTransitDate,
  //       timeString: formData.birthTime,
  //       lat: formData.latitude,
  //       lng: formData.longitude,
  //       ayanamsha: selectedAyanamsha,
  //     })
  //     .then((result) => {
  //       console.log(result.data.charts.d1Chart);
  //       setTransitChart(result.data.charts);
  //     });

  //   setProgressionDate(parseInt(addDate) + parseInt(date));
  //   console.log(progrestionDate);
  //   setDate(parseInt(e.target.value - equation));

  //   setTransitionDate(e.target.value);
  //   console.log(transitionDate);
  // };

  let finalTransitDate = moment(formData.birthDate).format("DD-MM-") + transitionDate;

  let finalProgressionDate = progrestionDate + moment(formData.birthDate).format("-MM-YYYY");

  if (date === 0) {
    finalProgressionDate = formData.birthDate;
    finalTransitDate = formData.birthDate;
  }
  return (
    <div>
      {data &&
        selectedCharts &&
        selectedCharts.map((key) => {
          return (
            <div key={key}>
              {/* <div className="col-sm-12"> */}
              {/* <div style={{ textAlign: "justify" }}>
                  <h5>Transition Chart</h5>
                  <p style={{ fontSize: "12px" }}>DATE - {finalTransitDate}</p>
                </div>
                <Divider
                  style={{
                    border: "1px solid grey",
                    marginBottom: "10px",
                  }}
                /> */}
              <div className="chart-box">
                {/* {data &&  (
                    <BirthChartSVG
                      data={transitChart?.["d1Chart"]}
                      selectedCharts={selectedCharts}
                    />
                  )} */}
                {/* {data &&
                    transitChart &&
                    (chartType === "North indian" ? (
                      <NorthIndianStyle
                        data={data?.charts["d1Chart"]}
                        selectedCharts={selectedCharts}
                      />
                    ) : (
                      <BirthChartSVG
                        data={data?.charts["d1Chart"]}
                        selectedCharts={selectedCharts}
                      />
                    ))} */}
                {data ? (
                  chartType === "North Indian" ? (
                    <NorthIndianStyle
                      data={data?.charts[chartsShow]}
                      selectedCharts={selectedCharts}
                    />
                  ) : data ? (
                    <BirthChartSVG
                      data={data?.charts[chartsShow]}
                      selectedCharts={selectedCharts}
                    />
                  ) : chartType === "North Indian" ? (
                    data && (
                      <NorthIndianStyle
                        data={data?.charts[chartsShow]}
                        selectedCharts={selectedCharts}
                      />
                    )
                  ) : (
                    <BirthChartSVG
                      data={data?.charts[chartsShow]}
                      selectedCharts={selectedCharts}
                    />
                  )
                ) : null}
              </div>
              {/* </div> */}
            </div>
          );
        })}
    </div>
  );
}

TransiteChart.propTypes = {
  chartsShow: PropTypes.node.isRequired,
};

export default TransiteChart;
