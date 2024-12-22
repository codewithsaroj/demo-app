import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { showSuccessToast, showErrorToast } from "../utils/toastMessage";
import bannerImage from "../assets/banner.jpg";
import PersonIcon from "@mui/icons-material/Person";
import { InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
// import UploadImg from "../components/Uploadimg";
import { backendUrl } from "../utils/constant";

const CustomerRegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  //   const [imagePreview, setImagePreview] = useState(""); 

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    phone: Yup.string()
      .required("Phone no. is required")
      .min(9)
      .max(12)
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Invalid mobile number"
      ),
    companyName: Yup.string().required("Company Name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    let obj = {
      ...data,
      phone: Number(data.phone),
    };
    setIsLoading(true);

    axios
      .post(`https://sutraa-event.onrender.com/api/v1/customer/create`, obj)
      .then((response) => {
        setIsLoading(false);
        if (response.data.hasError) {
          showErrorToast(response.data.message || "Something went wrong.");
        } else {
          showSuccessToast("Form submitted successfully!");
          reset({
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
            companyName: null,
          });
        }
        console.log("Response:", response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        showErrorToast("Something went wrong. Please try again.");
        console.error("Error:", error);
      });
  };
  // Handle image change callback
  // const handleImageChange = (imageData) => {
  //     setImagePreview(imageData); // Update image preview with the selected image data
  //   };
  return (
    <Fragment>
      {/* Use the UploadImg Component */}
      {/* <Box sx={{ textAlign: "center", mb: 3 }}>
          <UploadImg onImageChange={handleImageChange} defaultImage={imagePreview} />
        </Box> */}
      <Paper
        sx={{
          maxWidth: 800,
          mx: "auto",
          //   padding: 3,
          boxShadow: 6,
          marginTop: 4,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <img
            src={bannerImage}
            alt="Logo"
            style={{
              width: "100%",
            }}
          />
        </Box>

        <Box px={4} py={3} maxWidth={800} mx="auto">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                margin="dense"
                {...register("firstName")}
                error={errors.firstName ? true : false}
                helperText={errors.firstName?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                fullWidth
                margin="dense"
                {...register("lastName")}
                error={errors.lastName ? true : false}
                helperText={errors.lastName?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                margin="dense"
                {...register("email")}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone"
                fullWidth
                margin="dense"
                {...register("phone")}
                error={errors.phone ? true : false}
                helperText={errors.phone?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="companyName"
                name="companyName"
                label="Company Name"
                fullWidth
                margin="dense"
                {...register("companyName")}
                error={errors.companyName ? true : false}
                helperText={errors.companyName?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              startIcon={
                isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : null
              }
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  );
};

export default CustomerRegistrationForm;
