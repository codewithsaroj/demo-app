import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";
import { backendUrl } from "../utils/constant";

const CustomersList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    searchField: "",
    searchQuery: "",
  });

  const fetchAllCustomers = () => {
    let token = localStorage.getItem("authToken")
    axios
      .post(
        `https://sutraa-event.onrender.com/api/v1/customer/allCustomers`,
        {
          page: 1,
          limit: 10,
          searchField: searchQuery.searchField,
          searchQuery: searchQuery.searchQuery,
        },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const customers = response.data.data.customers;
        const transformedRows = customers.map((customer) => ({
          id: customer._id,
          name: `${customer.firstName} ${customer.lastName}`,
          email: customer.email,
          phone: customer.phone,
          companyName: customer.companyName,
          barCodeNumber: customer.barCodeNumber,
        }));
        setRows(transformedRows);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching data: " + err.message);
        setLoading(false);
      });
  };

  const handlePrint = (rowData) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [2, 4],
    });

    const barcodeCanvas = document.createElement("canvas");
    JsBarcode(barcodeCanvas, rowData.barCodeNumber, {
      format: "CODE128",
      displayValue: true,
    });

    const barcodeImg = barcodeCanvas.toDataURL("image/png");

    doc.addImage(barcodeImg, "PNG", 0.1, 0.1, 1.8, 0.5);

    doc.setFont("helvetica");

    doc.setFontSize(10);
    doc.setTextColor("#333");

    doc.setTextColor("#2c3e50");
    doc.text(`Name: ${rowData.name}`, 0.1, 1.0);
    doc.text(`Email: ${rowData.email}`, 0.1, 1.2);
    doc.text(`Phone: ${rowData.phone}`, 0.1, 1.4);
    doc.text(`Company Name: ${rowData.companyName}`, 0.1, 1.6);
    // doc.text(`Barcode: ${rowData.barCodeNumber}`, 20, 80);

    doc.save(`${rowData.name}_barcode.pdf`);
  };

  useEffect(() => {
    fetchAllCustomers();
  }, [searchQuery]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  const columns = [
    { field: "barCodeNumber", headerName: "Barcode", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "companyName", headerName: "Company Name", flex: 2 },
    {
      field: "print",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePrint(params.row)}
        >
          Print
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        textAlign={"center"}
        fontWeight={600}
        display={"flex"}
        alignItems={"center"}
        color="rgb(86, 184, 249)"
      >
        Customer Details
      </Typography>

      <DataGrid rows={rows} columns={columns} pageSize={5} sx={{ border: 0 }} />
    </Box>
  );
};

export default CustomersList;

//old code

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";
// import Box from "@mui/material/Box";
// import CircularProgress from "@mui/material/CircularProgress";
// import Typography from "@mui/material/Typography";
// import Search from "./search";
// import Button from "@mui/material/Button";
// import Barcode from "./Barcode";

// const CustomersList = () => {
//   const columns = [
//     { field: "barCodeNumber", headerName: "Barcode", flex: 1 },
//     { field: "phone", headerName: "Phone", flex: 1 },
//     { field: "name", headerName: "Name", flex: 2 },
//     { field: "email", headerName: "Email", flex: 2 },
//     { field: "companyName", headerName: "Company Name", flex: 2 },
//     {
//       field: "print",
//       headerName: "Action",
//       flex: 1,
//       renderCell: (params) => {
//         return (
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handlePrint(params.row)}
//           >
//             Print
//           </Button>
//         );
//       },
//     },
//   ];
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState({
//     searchField: "",
//     searchQuery: "",
//   });

//   const fetchAllCustomers = () => {
//     axios
//       .post(
//         `${backendUrl}/api/v1/customer/allCustomers`,
//         {
//           page: 1,
//           limit: 10,
//           searchField: searchQuery.searchField,
//           searchQuery: searchQuery.searchQuery,
//         },
//         {
//           headers: {
//             Token: `Bearer`, // Example of sending an Authorization header with a token
//             "Content-Type": "application/json", // Ensure content type is JSON
//             "Custom-Header": "CustomHeaderValue", // Example of a custom header
//           },
//         }
//       )
//       .then((response) => {
//         const customers = response.data.data.customers;
//         const transformedRows = customers.map((customer) => ({
//           id: customer._id,
//           name: `${customer.firstName} ${customer.lastName}`,
//           email: customer.email,
//           phone: customer.phone,
//           companyName: customer.companyName,
//           barCodeNumber: customer.barCodeNumber,
//         }));
//         setRows(transformedRows);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Error fetching data: " + err.message);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchAllCustomers();
//   }, [searchQuery]);

//   const handleSelectionChange = (newSelection) => {
//     setSelectedRows(newSelection.selectionModel);
//   };

//   const handlePrint = (rowData) => {
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write(`
//       <html>
//         <head>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               padding: 20px;
//               background-color: #f4f4f9;
//               color: #333;
//             }
//             h3 {
//               color: #2c3e50;
//               text-align: center;
//               font-size: 24px;
//             }
//             .container {
//               width: 100%;
//               max-width: 600px;
//               margin: 0 auto;
//               padding: 20px;
//               background-color: #fff;
//               border-radius: 8px;
//               box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             }
//             .item {
//               margin-bottom: 15px;
//               font-size: 18px;
//             }
//             .item strong {
//               color: #2c3e50;
//             }
//             .footer {
//               text-align: center;
//               margin-top: 30px;
//               font-size: 14px;
//               color: #7f8c8d;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <h3>Customer Details</h3>
//             <div class="item">
//               <strong>Name:</strong> ${rowData.name}
//             </div>
//             <div class="item">
//               <strong>Email:</strong> ${rowData.email}
//             </div>
//             <div class="item">
//               <strong>Phone:</strong> ${rowData.phone}
//             </div>
//             <div class="item">
//               <strong>Company Name:</strong> ${rowData.companyName}
//             </div>
//             <div class="item">
//               <strong>Barcode:</strong> ${rowData.barCodeNumber}
//             </div>
//           </div>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.print();
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <Typography color="error">{error}</Typography>
//       </div>
//     );
//   }

//   const paginationModel = { page: 0, pageSize: 5 };

//   return (
//     // <Paper
//     //   sx={{ height: "520px", width: "100%", marginTop: "20px", boxShadow: 6 }}
//     // >
//     <Box>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           paddingBottom: "20px",
//           borderBottom: "2px solid rgb(202, 208, 215)",
//         }}
//       >
//         <Typography
//           variant="h4"
//           gutterBottom
//           textAlign={"center"}
//           fontWeight={600}
//           display={"flex"}
//           alignItems={"center"}
//           color="rgb(86, 184, 249)"
//         >
//           Customer Details
//         </Typography>
//         <Search setSearchQuery={setSearchQuery} handlePrint={handlePrint} />
//       </div>

//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{ pagination: { paginationModel } }}
//         pageSizeOptions={[5, 10, 20]}
//         sx={{ border: 0 }}
//       />

//     </Box>
//   );
// };
// export default CustomersList;
