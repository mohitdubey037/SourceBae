import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = ({ title, body, show }) => {
  useEffect(() => {
    if (title && body && show) {
      toast.info(<Display />, {
        autoClose: false,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function Display() {
    return (
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    );
  }

  return (
    <ToastContainer
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      autoClose={false}
    />
  );
};

Notification.defaultProps = {
  title: "This is title",
  body: "Some body",
};

Notification.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default Notification;
