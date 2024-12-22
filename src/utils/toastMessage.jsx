// // Import Toastify methods
// import { toast } from "react-toastify";

// export const showSuccessToast = (message) => {
//   toast.success(message, {
//     position: toast.POSITION.TOP_RIGHT,
//     autoClose: 5000, // The toast will auto-close after 5 seconds
//     hideProgressBar: false, // Show progress bar
//     closeOnClick: true, // Close on click
//     pauseOnHover: true, // Pause on hover
//   });
// };

// export const showErrorToast = (message) => {
//   debugger;
//   toast.error(message, {
//     position: toast.POSITION.TOP_RIGHT,
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//   });
// };
import { toast } from "react-toastify";

/**
 * Function to show success toast message
 * @param {string} message - The success message to be displayed
 */
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

/**
 * Function to show error toast message
 * @param {string} message - The error message to be displayed
 */
export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
