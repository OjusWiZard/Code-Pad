import React from "react";
import moment from "moment";
const EventTime = ({ datetime, endtime }) => {
  if (new Date(datetime).getTime() > Date.now()) {
    return (
      <div>
        STARTS ON {moment(datetime).format("Do MMMM")},{" "}
        {moment(datetime).format("hh:mm a")}{" "}
      </div>
    );
  }
  if (
    Date.now() < new Date(endtime).getTime() &&
    Date.now() > new Date(datetime).getTime()
  ) {
    return (
      <div>
        ENDS ON {moment(endtime).format("Do MMMM")},{" "}
        {moment(endtime).format("hh:mm a")}{" "}
      </div>
    );
  }
  if (Date.now() > new Date(endtime).getTime()) {
    return <div>ENDED ON {moment(endtime).format("Do MMMM YYYY")}</div>;
  }
  return <div>*</div>;
};

export default EventTime;
