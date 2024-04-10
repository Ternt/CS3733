import { ChangeEvent, useState } from "react";
import sanitationImage from "../../assets/sanitation_background.jpg";
import LocationSelectFormDropdown from "../../components/locationSelectFormDropdown.tsx";
import {
  TextField,
  FormControl,
  MenuItem,
  Button,
  Box,
  Typography,
  // TableContainer,
  // Table,
  // TableHead,
  // TableRow,
  // TableCell,
  // TableBody,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
//import Checkboxes from "../../components/FormElements/Checkboxes.tsx";

type form = {
  medicine: string;
  dosage: string;
  form: string;
  patientName: string;
  physicianName: string;
  location: string;
  priority: string;
  status: string;
};

function MedicineRequestForm() {
  const [formData, setFormData] = useState<form[]>([]);
  const [formInput, setFormInput] = useState<form>({
    medicine: "",
    dosage: "",
    form: "",
    patientName: "",
    physicianName: "",
    location: "",
    priority: "",
    status: "",
  });

    function isComplete(): boolean {
        return (
            formInput.medicine != "" &&
            formInput.dosage != "" &&
            formInput.form != "" &&
            formInput.patientName != "" &&
            formInput.physicianName != "" &&
            formInput.location != "" &&
            formInput.priority != "" &&
            formInput.status != ""
        );
    };

  function handlePhysicianNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormInput({ ...formInput, physicianName: e.target.value });
  }

  function handlePatientNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormInput({ ...formInput, patientName: e.target.value });
  }

    function submitForm() {
        setFormData((prevRequests) => [...prevRequests, formInput]);
        // sanitationRequests.addRequestToList(formInput);
        clearForm();
        console.log(formData); // Print the array of requests to the console
    }

    function clearForm() {
        setFormInput({
            ...formInput,
            medicine: "",
            dosage: "",
            form: "",
            patientName: "",
            physicianName: "",
            location: "",
            priority: "",
            status: "",
        });}

  return (
    <Box
      position="relative"
      sx={{
        backgroundImage: `url(${sanitationImage})`,
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Box
        position="absolute"
        top={70}
        sx={{
          width: "500px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#012d5a",
          color: "#f6bd38",
          p: 2,
        }}
      >
        <Typography variant="h4" component="h1" align="center">
          Medicine Request
        </Typography>
      </Box>

      <Box
        position="absolute"
        top={150}
        sx={{
          width: "500px",
            backgroundColor: "#ffffff"
        }}
        px={10}

      >
        <form
          id="sanitationForm"
          style={{
            backgroundColor: "whitesmoke",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormControl>
            <TextField
              required
              label="Patient Name"
              onChange={handlePatientNameInput}
              margin="normal"
              value={formInput.patientName}
              fullWidth
            />

            <TextField
              required
              label="Name of Primary Physician"
              onChange={handlePhysicianNameInput}
              margin="normal"
              value={formInput.physicianName}
              fullWidth
            />

            <TextField
              required
              select
              id="priority-select"
              label={"Priority"}
              margin="normal"
              value={formInput.priority}
              onChange={(event) => {
                setFormInput({
                  ...formInput,
                  priority: event.target.value,
                });
              }}
            >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
              <MenuItem value={"Emergency"}>Emergency</MenuItem>
            </TextField>

            <LocationSelectFormDropdown
              value={formInput.location}
              onChange={(v: string) => {
                setFormInput({ ...formInput, location: v });
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                required
                select
                id="medicine-select"
                label={"Medicine"}
                margin="normal"
                sx={{
                  width: "60%",
                  pr: "5%",
                }}
                value={formInput.medicine}
                onChange={(event) => {
                  setFormInput({
                    ...formInput,
                    medicine: event.target.value,
                  });
                }}
              >
                <MenuItem value={"PainKillers"}>PainKillers</MenuItem>
                <MenuItem value={"Tylenol"}>Tylenol</MenuItem>
                <MenuItem value={"Paracetamol"}>Paracetamol</MenuItem>
              </TextField>

              <TextField
                required
                sx={{
                  width: "35%",
                }}
                label="Dosage"
                onChange={(event) => {
                  setFormInput({
                    ...formInput,
                    dosage: event.target.value,
                  });
                }}
                margin="normal"
                value={formInput.dosage}
                fullWidth
              />
            </Box>

            <FormLabel id="mess-size">Form</FormLabel>
            <RadioGroup
              row
              name="mess-size"
              aria-labelledby="mess-size"
              value={formInput.form}
              onChange={(event) => {
                setFormInput({
                  ...formInput,
                  form: event.target.value,
                });
              }}
              sx={{
                width: "80%",
              }}
            >
              <FormControlLabel
                value="Powder"
                control={<Radio />}
                label="Powder"
              />
              <FormControlLabel
                value="Tab or Cap"
                control={<Radio />}
                label="Tab or Cap"
              />
              <FormControlLabel
                value="Chewable"
                control={<Radio />}
                label="Chewable"
              />
              <FormControlLabel
                value="Liquid"
                control={<Radio />}
                label="Liquid"
              />
              <FormControlLabel
                value="Inhaler"
                control={<Radio />}
                label="Inhaler"
              />
            </RadioGroup>

            <TextField
              required
              select
              value={formInput.status}
              label={"Status"}
              margin="normal"
              onChange={(event) => {
                setFormInput({
                  ...formInput,
                  status: event.target.value,
                });
              }}
            >
              <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
              <MenuItem value={"Assigned"}>Assigned</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Closed"}>Closed</MenuItem>
            </TextField>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              pb={"30px"}
            >
              <Button
                type="button"
                variant="contained"
                color="secondary"
                sx={{
                  margin: 1,
                }}
                onClick={clearForm}
              >
                Clear
              </Button>

              <Button
                type="button"
                variant="contained"
                color="secondary"
                sx={{
                  margin: 1,
                }}
                disabled={!isComplete()}
                onClick={submitForm}
              >
                Submit
              </Button>
            </Box>
          </FormControl>
        </form>
      </Box>

      <Box position="absolute" top={1000} sx={{ width: "80%" }}>
        {/*<TableContainer>*/}
        {/*    <Table>*/}
        {/*        <TableHead*/}
        {/*            sx={{*/}
        {/*                backgroundColor: "#012d5a",*/}
        {/*            }}*/}
        {/*        >*/}
        {/*            <TableRow>*/}
        {/*                <TableCell sx={{color: "#f6bd38"}}>Name</TableCell>*/}
        {/*                <TableCell sx={{color: "#f6bd38"}}>Priority</TableCell>*/}
        {/*                <TableCell sx={{color: "#f6bd38"}}>Location</TableCell>*/}
        {/*                <TableCell sx={{color: "#f6bd38"}}>Type</TableCell>*/}
        {/*                <TableCell sx={{color: "#f6bd38"}}>Size</TableCell>*/}
        {/*                <TableCell sx={{color: "#f6bd38"}}>*/}
        {/*                    Assignment Status*/}
        {/*                </TableCell>*/}
        {/*            </TableRow>*/}
        {/*        </TableHead>*/}
        {/*        <TableBody>*/}
        {/*            {submittedRequests.map((request, index) => (*/}
        {/*                <TableRow key={index}>*/}
        {/*                    <TableCell component="th" scope="row">*/}
        {/*                        {request.name}*/}
        {/*                    </TableCell>*/}
        {/*                    <TableCell>{request.priority}</TableCell>*/}
        {/*                    <TableCell>{request.location}</TableCell>*/}
        {/*                    <TableCell>{request.type.join(", ")}</TableCell>*/}
        {/*                    <TableCell>{request.size}</TableCell>*/}
        {/*                    <TableCell>{request.assignmentStatus}</TableCell>*/}
        {/*                </TableRow>*/}
        {/*            ))}*/}
        {/*        </TableBody>*/}
        {/*    </Table>*/}
        {/*</TableContainer>*/}
      </Box>
    </Box>
  );
}

export default MedicineRequestForm;

// import React, { useState } from "react";
// import {
//   Box,
//   FormControl,
//   MenuItem,
//   Typography,
//   InputLabel,
//   Select,
//   SelectChangeEvent,
//   TextField,
//   Button,
//   createTheme,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";
// const theme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#012D5A",
//     },
//     secondary: {
//       main: "#F6BD38",
//     },
//     background: {
//       default: "#e4e4e4",
//       paper: "#f1f1f1",
//     },
//   },
//   typography: {
//     htmlFontSize: 16,
//     fontFamily: "Roboto, sans-serif",
//     fontSize: 14,
//     h1: {
//       fontFamily: "sans-serif",
//       fontWeight: 300,
//     },
//     h4: {
//       fontFamily: "Roboto",
//       fontWeight: 300,
//     },
//   },
// });
//
// export default function MedicineDeliveryForm() {
//   type form = {
//     medicine: "";
//     dosage: "";
//     form: "";
//     patientName: "";
//     physicianName: "";
//     location: "";
//     priority: "";
//     status: "";
//   };
//
//   const [formData, setFormData] = useState<form[]>([]);
//   const [formValues, setFormValues] = useState<form>({
//     medicine: "",
//     dosage: "",
//     form: "",
//     patientName: "",
//     physicianName: "",
//     location: "",
//     priority: "",
//     status: "",
//   });
//
//   const handleSelectChange = (event: SelectChangeEvent) => {
//     setFormValues({ ...formValues, [event.target.name]: event.target.value });
//   };
//
//   const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValues({ ...formValues, [event.target.name]: event.target.value });
//   };
//
//   const handleSubmit = () => {
//     setFormData([...formData, formValues]);
//   };
//
//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <Box
//           sx={{
//             margin: 0,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "column",
//           }}
//         >
//           <Box
//             sx={{
//               width: "500px",
//               height: "100vh",
//             }}
//           >
//             <Box
//               sx={{
//                 bgcolor: "primary.main",
//                 width: "500px",
//                 padding: "20px",
//                 textAlign: "center",
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{
//                   color: "secondary.main",
//                 }}
//               >
//                 MEDICINE DELIVERY
//               </Typography>
//             </Box>
//             <Box
//               sx={{
//                 padding: "20px",
//                 width: "500px",
//                 bgcolor: "background.default",
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <FormControl
//                   variant="filled"
//                   sx={{
//                     margin: 3,
//                     width: 210,
//                   }}
//                 >
//                   <InputLabel id="medicine-label">Medicine</InputLabel>
//                   <Select
//                     value={formValues.medicine}
//                     name="medicine"
//                     label="Medicine"
//                     onChange={handleSelectChange}
//                   >
//                     <MenuItem value={"Tylenol"}>Tylenol</MenuItem>
//                     <MenuItem value={"Pain Killers"}>Pain Killers</MenuItem>
//                     <MenuItem value={"Paracetamol"}>Paracetamol</MenuItem>
//                   </Select>
//                 </FormControl>
//                 <TextField
//                   id="patient-name"
//                   name="dosage"
//                   label="Dosage"
//                   variant="filled"
//                   onChange={handleTextChange}
//                   sx={{ margin: 3, width: 85 }}
//                 />
//               </Box>
//               <Box
//                 sx={{
//                   px: "inherit",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                 }}
//               >
//                 <FormLabel id={"medicine-form"}>Form</FormLabel>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItem: "center",
//                   }}
//                 >
//                   <FormControl
//                     sx={{
//                       width: "200px",
//                       marginX: 3,
//                     }}
//                   >
//                     <RadioGroup name="form" onChange={handleSelectChange}>
//                       <FormControlLabel
//                         value="Tab or Cap"
//                         control={<Radio />}
//                         label="Tab or Cap"
//                       />
//                       <FormControlLabel
//                         value="Cream"
//                         control={<Radio />}
//                         label="Cream"
//                       />
//                       <FormControlLabel
//                         value="Inhaler"
//                         control={<Radio />}
//                         label="Inhaler"
//                       />
//                     </RadioGroup>
//                   </FormControl>
//                   <FormControl
//                     sx={{
//                       width: "150px",
//                       marginX: 3,
//                     }}
//                   >
//                     <RadioGroup name="form" onChange={handleSelectChange}>
//                       <FormControlLabel
//                         value="Chewable"
//                         control={<Radio />}
//                         label="Chewable"
//                       />
//                       <FormControlLabel
//                         value="Liquid"
//                         control={<Radio />}
//                         label="Liquid"
//                       />
//                     </RadioGroup>
//                   </FormControl>
//                 </Box>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <TextField
//                   id="patient-name"
//                   name="patientName"
//                   label="Patient Name"
//                   variant="standard"
//                   onChange={handleTextChange}
//                   // InputLabelProps={{shrink: true}}
//                   sx={{ m: 3, width: 343 }}
//                 />
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <TextField
//                   id="physician-name"
//                   name="physicianName"
//                   label="Name of Primary Physician"
//                   variant="standard"
//                   onChange={handleTextChange}
//                   sx={{ m: 3, width: 343 }}
//                 />
//               </Box>
//
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <FormControl variant="filled" sx={{ m: 3, width: 343 }}>
//                   <InputLabel id="location-label">Location</InputLabel>
//                   <Select
//                     value={formValues.location}
//                     name="location"
//                     label="Location"
//                     onChange={handleSelectChange}
//                   >
//                     <MenuItem value={"Location"}>Location</MenuItem>
//                     <MenuItem value={"Location"}>Location</MenuItem>
//                     <MenuItem value={"Location"}>Location</MenuItem>
//                     <MenuItem value={"Location"}>Location</MenuItem>
//                     <MenuItem value={"Location"}>Location</MenuItem>
//                     <MenuItem value={"Location"}>Location</MenuItem>
//                     <MenuItem value={"Location"}>Location</MenuItem>
//                     <MenuItem value={"Location"}>Location</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <FormControl sx={{ m: 3, width: 343 }} variant="filled">
//                   <InputLabel id="priority-label">Priority</InputLabel>
//                   <Select
//                     value={formValues.priority}
//                     name="priority"
//                     label="Priority"
//                     onChange={handleSelectChange}
//                   >
//                     <MenuItem value={"Priority"}>Priority</MenuItem>
//                     <MenuItem value={"Priority"}>Priority</MenuItem>
//                     <MenuItem value={"Priority"}>Priority</MenuItem>
//                     <MenuItem value={"Priority"}>Priority</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <FormControl sx={{ m: 3, width: 343 }} variant="filled">
//                   <InputLabel id="status-label">Status</InputLabel>
//                   <Select
//                     value={formValues.status}
//                     name="status"
//                     label="Status"
//                     onChange={handleSelectChange}
//                   >
//                     <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
//                     <MenuItem value={"Assigned"}>Assigned</MenuItem>
//                     <MenuItem value={"InProgress"}>In Progress</MenuItem>
//                     <MenuItem value={"Closed"}>Closed</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//               <Box
//                 sx={{
//                   m: 2,
//                   color: "secondary.main",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   onClick={handleSubmit}
//                   sx={{
//                     backgroundColor: "secondary.main",
//                     color: "primary.main",
//                   }}
//                 >
//                   Submit
//                 </Button>
//               </Box>
//             </Box>
//           </Box>
//
//           <Box sx={{ display: "flex", margin: 8 }}>
//             <TableContainer>
//               <Table>
//                 <TableHead
//                   sx={{
//                     backgroundColor: "#012d5a",
//                   }}
//                 >
//                   <TableRow>
//                     <TableCell sx={{ color: "#f6bd38" }}>Medicine</TableCell>
//                     <TableCell sx={{ color: "#f6bd38" }}>Dosage</TableCell>
//                     <TableCell sx={{ color: "#f6bd38" }}>Form</TableCell>
//                     <TableCell sx={{ color: "#f6bd38" }}>
//                       Physician Name
//                     </TableCell>
//                     <TableCell sx={{ color: "#f6bd38" }}>
//                       Patient Name
//                     </TableCell>
//                     <TableCell sx={{ color: "#f6bd38" }}>Location</TableCell>
//                     <TableCell sx={{ color: "#f6bd38" }}>Priority</TableCell>
//                     <TableCell sx={{ color: "#f6bd38" }}>Status</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {formData.map((request: form, index: number) => (
//                     <TableRow key={index}>
//                       <TableCell component="th" scope="row">
//                         {request.medicine}
//                       </TableCell>
//                       <TableCell>{request.dosage}</TableCell>
//                       <TableCell>{request.form}</TableCell>
//                       <TableCell>{request.physicianName}</TableCell>
//                       <TableCell>{request.patientName}</TableCell>
//                       <TableCell>{request.location}</TableCell>
//                       <TableCell>{request.priority}</TableCell>
//                       <TableCell>{request.status}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </Box>
//       </ThemeProvider>
//     </>
//   );
// }
