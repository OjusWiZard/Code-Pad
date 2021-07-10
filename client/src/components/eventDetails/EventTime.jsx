import React from "react";
import moment from "moment";
const EventTime = ({ datetime, endtime }) => {
  console.log(datetime, endtime, Date.now());
  if (new Date(datetime).getTime() > Date.now()) {
    return (
      <div>
        Starts {moment(datetime).format("MMMM Do YYYY")} at{" "}
        {moment(datetime).format("h:mm:ss a")}{" "}
      </div>
    );
  }
  if (
    Date.now() < new Date(endtime).getTime() &&
    Date.now() > new Date(datetime).getTime()
  ) {
    return <div>ENDS ON {(moment(endtime).format("Do MMMM"))}, {moment(endtime).format("hh:mm a")} </div>;
  }
  if (Date.now() > new Date(endtime).getTime()) {
    return <div>ENDED ON {moment(endtime).format("MMMM Do YYYY")}</div>;
  }
  return <div>*</div>;
};

export default EventTime;
