import React, { useState, useEffect } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Checkbox,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function DepartmentList({ departments }) {
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setSelectedItems([]);
  }, [departments]);

  const handleToggle = (index) => {
    setExpandedItems((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleSelection = (department) => {
    setSelectedItems((prev) => {
      const subDepartments = department.sub_departments.map(
        (subDep) => department.department + "-" + subDep
      );
      if (prev.includes(department.department)) {
        return prev.filter(
          (item) =>
            item !== department.department && !subDepartments.includes(item)
        );
      } else {
        return [...prev, department.department, ...subDepartments];
      }
    });
  };

  const isDepartmentSelected = (department) => {
    const subDepartments = department.sub_departments.map(
      (subDep) => department.department + "-" + subDep
    );
    return (
      selectedItems.includes(department.department) &&
      subDepartments.every((subDep) => selectedItems.includes(subDep))
    );
  };

  const handleSubDepartmentSelection = (department, subDepartment) => {
    const subDepartmentKey = department.department + "-" + subDepartment;

    setSelectedItems((prev) => {
      if (prev.includes(subDepartmentKey)) {
        return prev.filter((item) => item !== subDepartmentKey);
      } else {
        const newSelected = [...prev, subDepartmentKey];
        const allSubDepartmentsSelected = department.sub_departments.every(
          (subDep) => newSelected.includes(department.department + "-" + subDep)
        );

        if (allSubDepartmentsSelected) {
          return [...newSelected, department.department];
        }

        return newSelected;
      }
    });
  };

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  return (
    <List>
      {departments.map((department, index) => (
        <React.Fragment key={index}>
          <ListItemButton onClick={() => handleToggle(index)}>
            <Checkbox
              checked={isDepartmentSelected(department)}
              indeterminate={
                selectedItems.some((item) =>
                  item.includes(department.department)
                ) && !isDepartmentSelected(department)
              }
              onChange={() => handleSelection(department)}
            />
            <ListItemText primary={department.department} />
            {department.sub_departments.length > 0 &&
              (expandedItems.includes(index) ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          {department.sub_departments.length > 0 && (
            <Collapse in={expandedItems.includes(index)} unmountOnExit>
              <List component="div" disablePadding>
                {department.sub_departments.map((subDepartment, subIndex) => (
                  <ListItemButton key={subIndex}>
                    <Checkbox
                      checked={selectedItems.includes(
                        department.department + "-" + subDepartment
                      )}
                      onChange={() =>
                        handleSubDepartmentSelection(department, subDepartment)
                      }
                    />
                    <ListItemText primary={subDepartment} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
}

export default DepartmentList;
