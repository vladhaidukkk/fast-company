import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQualities,
  getQualitiesByIds,
  getQualitiesLoading,
} from "../../store/reducers/qualities";

const Qualities = ({ items }) => {
  const dispatch = useDispatch();
  const qualitiesList = useSelector(getQualitiesByIds(items));
  const isLoading = useSelector(getQualitiesLoading());

  useEffect(() => {
    dispatch(fetchQualities());
  }, []);

  if (!isLoading) {
    return qualitiesList.map((quality) => (
      <span key={quality._id} className={`badge mx-1 bg-${quality.color}`}>
        {quality.name}
      </span>
    ));
  }
  return "loading...";
};

Qualities.defaultProps = {
  items: [],
};

Qualities.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

export default Qualities;
