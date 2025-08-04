import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Checkbox } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const FormArea = ({
  form,
  addRow,
  addColumn,
  deleteRow,
  handleDropInCell,
  deleteInput,
  editInput,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((s) => !s);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const renderField = (field, rowIndex, colIndex) => (
    <div className="d-flex justify-content-center">
      <div className="w-100 p-2">
        {field?.type === "TextArea" ? (
          <>
            <label>{field?.label}</label>
            <textarea className="form-control" />
          </>
        ) : field?.type === "RadioButton" ? (
          <FormControl>
            <FormLabel>{field?.label}</FormLabel>
            <RadioGroup name={`radio-group-${rowIndex}-${colIndex}`}>
              {field?.options?.map((opt, i) => (
                <FormControlLabel
                  key={i}
                  value={opt}
                  control={<Radio />}
                  label={opt}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ) : field?.type === "DropDown" ? (
          <>
            <label>{field?.label}</label>
            <select className="form-select">
              {field?.options.map((opt, i) => (
                <option key={i}>{opt}</option>
              ))}
            </select>
          </>
        ) : field?.type === "Switcher" ? (
          <FormGroup>
            <FormControlLabel control={<Switch />} label={field?.label} />
          </FormGroup>
        ) : field?.type === "CheckBox" ? (
          <FormControlLabel control={<Checkbox />} label={field?.label} />
        ) : field?.type === "File" ? (
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            {field?.label}
            <VisuallyHiddenInput type="file" />
          </Button>
        ) : field?.type === "Date" ? (
          <>
            <label>{field?.label}</label>
            <input type="date" className="form-control" />
          </>
        ) : field?.type === "Input" ? (
          <TextField label={field?.label} variant="outlined" fullWidth />
        ) : field?.type === "Password" ? (
          <FormControl variant="outlined" fullWidth>
            <InputLabel>{field?.label}</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={field?.label}
            />
          </FormControl>
        ) : field?.type === "Mail" ? (
          <>
            <label>{field?.label}</label>
            <input type="email" className="form-control" />
          </>
        ) : field?.type === "PhoneNumber" ? (
          <>
            <label>{field?.label}</label>
            <input
              type="tel"
              className="form-control"
              placeholder="0312-3456789"
            />
          </>
        ) : null}
      </div>
      <div className="d-flex flex-column p-3">
        <span
          onClick={() => editInput(rowIndex, colIndex)}
          style={{ cursor: "pointer" }}
          className="text-info fs-4"
        >
          &#128393;
        </span>
        <span
          onClick={() => deleteInput(rowIndex, colIndex)}
          className="text-danger fs-4"
          style={{ cursor: "pointer" }}
        >
          &times;
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-100 p-4 shadow-lg text-capitalize">
      <p className="text-capitalize fw-bold fs-2 text-center">Form Area</p>
      {form?.length !== 0 && (
        <div className="d-flex gap-2 mb-3">
          <button className="btn btn-outline-primary" onClick={addRow}>
            Add Row
          </button>
        </div>
      )}
      <div className="bg-light p-3 rounded">
        {form?.length === 0 ? (
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={addRow}>
              Create Form
            </button>
          </div>
        ) : (
          form?.map((rowData, rowIndex) => (
            <div key={rowIndex}>
              <div className="d-flex justify-content-end">
                <button
                  onClick={() => addColumn(rowIndex)}
                  disabled={form[rowIndex].length >= 3}
                  className="btn btn-outline-primary"
                >
                  Add Col
                </button>
                <button
                  onClick={() => deleteRow(rowIndex)}
                  className="btn btn-outline-danger"
                >
                  Delete Row
                </button>
              </div>
              <div className="d-flex gap-2 mb-2">
                {rowData?.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className="bg-white border rounded p-2 flex-fill"
                    style={{ minHeight: "100px" }}
                    onDrop={(e) => handleDropInCell(e, rowIndex, colIndex)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {cell ? (
                      renderField(cell, rowIndex, colIndex)
                    ) : (
                      <span className="text-muted">Drop here</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FormArea;
