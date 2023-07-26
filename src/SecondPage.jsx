import { useState, useEffect } from "react";
import { z } from "zod";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DepartmentList from './DepartmentList';
import departmentsData from './departments.json';

const postSchema = z.array(
  z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string(),
  })
);

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "userId",
    headerName: "User ID",
    width: 150,
    editable: true,
  },
  {
    field: "title",
    headerName: "Title",
    width: 350,
    editable: true,
  },
  {
    field: "body",
    headerName: "Body",
    width: 800,
    editable: true,
  },
];

const SecondPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const d = response.data;

        try {
          const validData = postSchema.parse(d);
          setData(validData);
          console.log("Valid Data:", validData);
        } catch (error) {
          console.error("Validation Error:", error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <DepartmentList departments={departmentsData} />
    </>
  );
};

export default SecondPage;
