import PropTypes from "prop-types";
import Logo1 from "../icons/logo-RVA.png";

export const Logo = (props) => {
  // const { emblemOnly, variant } = props;

  // const color = variant === "light" ? "#ffffff" : "#1D262D";

  return (
    <div style={{ backgroundColor: "transparent" }}>
      <img
        // className='mr-2'
        src="https://www.rahasyavedicastrology.com/assets/img/RVALogo.png"
        alt="Logo"
        width="50px"
        style={{ marginTop: "-10px", marginLeft: "20px" }}
      />
    </div>
  );
};
