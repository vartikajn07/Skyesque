import React from "react";
import {
  ToastContainer as ReactToastifyContainer,
  toast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainer = () => <ReactToastifyContainer />;
export const showToast = (message) => {
  toast.dismiss();
  toast(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default ToastContainer;
