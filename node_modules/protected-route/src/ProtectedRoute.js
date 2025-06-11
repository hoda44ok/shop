import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({ isAllowed, redirectToPath, ...props }) =>
    isAllowed ?
        <Route {...props}/> :
        <Redirect to={redirectToPath} />;

ProtectedRoute.propTypes = {
    isAllowed: PropTypes.bool.isRequired,
    redirectToPath: PropTypes.string.isRequired
};

export default ProtectedRoute;