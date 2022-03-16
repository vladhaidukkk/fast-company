import React from "react";
import PropTypes from "prop-types";

const CompletedMeetingsCard = ({ amount }) => (
  <div className="card mb-3">
    <div className="card-body d-flex flex-column justify-content-center text-center">
      <h5 className="card-title">
        <span>Completed meetings</span>
      </h5>
      <h1 className="display-1">{amount}</h1>
    </div>
  </div>
);

CompletedMeetingsCard.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default CompletedMeetingsCard;
