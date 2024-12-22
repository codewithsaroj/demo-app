// // UploadImg.jsx
// import  { useState, useRef } from "react";
// import { Button, Box } from "@mui/material";
// import PropTypes from "prop-types";

// const UploadImg = ({ onImageChange, defaultImage }) => {
//   const [imagePreview, setImagePreview] = useState(defaultImage || ""); // Default image
//   const imageInputRef = useRef(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileReader = new FileReader();
//       fileReader.onloadend = () => {
//         setImagePreview(fileReader.result); // Update the image preview
//         onImageChange(fileReader.result); // Callback to send image data to parent
//       };
//       fileReader.readAsDataURL(file); // Read the image file
//     }
//   };

//   return (
//     <Box sx={{ textAlign: "center", mb: 3 }}>
//       {/* Image Upload Button */}
//       <input
//         type="file"
//         accept="image/*"
//         ref={imageInputRef}
//         style={{ display: "none" }}
//         onChange={handleImageChange}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => imageInputRef.current.click()}
//       >
//         Upload Banner Image
//       </Button>
//       <Box mt={2}>
//         {imagePreview && (
//           <img
//             src={imagePreview}
//             alt="Banner"
//             style={{
//               width: "100%",
//               maxHeight: "250px",
//               objectFit: "cover",
//               marginTop: "10px",
//             }}
//           />
//         )}
//       </Box>
//     </Box>
//   );
// };

// // Add PropTypes validation
// UploadImg.propTypes = {
//     onImageChange: PropTypes.func.isRequired, // Callback function to handle image data
//     defaultImage: PropTypes.string,           // Default image URL (string)
//   };
// export default UploadImg;
