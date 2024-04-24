import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {Box} from "@mui/material";
import DownloadCSV from "./DownloadCSV.tsx";
import DataTable from "./DataTable.tsx";

type employee = {
  id:number;
  firstName:string;
  lastName:string;
  assignedRequests?:{requestID:number}[];
};

export default function DisplayCSV(){
  const [employeeTable, setEmployeeTable] = useState<employee[]>([]);


  useEffect(() => {
    axios.get<[]>("/api/employees").then((response: AxiosResponse) => {
      setEmployeeTable(response.data);
    });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          height: "10vh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          gap: 1,
        }}
      >

      </Box>
        <Box
          sx={{
            p:1
          }}
        >
          <DownloadCSV
            url={"/api/employees/download"}
            filename={"employees.csv"}
            title={"Employees"}
          />
          <DataTable
            title={"Employees"}
            headers={["Employee ID", "First", "Last"]}
            rows={
              employeeTable.map((e)=>{return [e.id+"", e.firstName, e.lastName];})
            }
          />
        </Box>
    </Box>
  );
};