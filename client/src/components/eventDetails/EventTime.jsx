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
    return <div>Ends {moment(endtime).calendar()} </div>;
  }
  if (Date.now() > new Date(endtime).getTime()) {
    return <div>Ended on {moment(endtime).format("MMMM Do YYYY")}</div>;
  }
  return <div>*</div>;
};

export default EventTime;
