import React from "react";
import ScrollToTop from "react-scroll-to-top";
import "./TopBtn.scss";

const TopBtn = () => {
  return (
    <div className="top_btn">
      <ScrollToTop color="white" className="top_btn_btn" smooth />;
    </div>
  );
};

export default TopBtn;
