// SWAPING ON BASIS OF COLS

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

function App() {
  const [editDiv, SetEditDiv] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [label, SetLabel] = useState("");
  const [options, setOptions] = useState("");
  const [form, SetForm] = useState([]);
  const [count, setCount] = useState(1);
  const [dragIndex, setDragIndex] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);

  // SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    const newFieldData = { type: activeField, label: label, column: 0 };

    if (["radio", "DropDown"].includes(activeField)) {
      newFieldData.options = options
        .split("\n")
        .map((opt) => opt.trim())
        .filter(Boolean);
    }

    if (editDiv !== null) {
      const updatedForm = [...form];
      updatedForm[editDiv] = { ...updatedForm[editDiv], ...newFieldData };
      SetForm(updatedForm);
    } else {
      SetForm((prevForm) => [...prevForm, newFieldData]);
    }

    setOpen(false);
    SetEditDiv(null);
  };

  // EDIT INPUT
  const editInput = (index) => {
    const itemToEdit = form[index];
    if (!itemToEdit) return;

    setOpen(true);
    SetEditDiv(index);
    setActiveField(itemToEdit.type);
    SetLabel(itemToEdit.label);
    if (itemToEdit.options) {
      setOptions(itemToEdit.options.join("\n"));
    }
  };

  // DELETE INPUT
  const deleteInput = (index) => {
    const updatedForm = [...form];
    updatedForm.splice(index, 1);
    SetForm(updatedForm);
  };

  const handleDragStartFormItem = (index) => {
    setDragIndex(index);
    setDraggingIndex(index);
  };

  const handleDragOverFormItem = (e) => {
    e.preventDefault();
  };

  const handleDropOnFormItem = ([dropIndex, index]) => {
    console.log("dropIndex", dropIndex);
    console.log("dragIndex: ", dragIndex);

    if (dragIndex === null || dragIndex === dropIndex) return;

    if (dropIndex === index) {
      console.log("Changing");
      const changerow = [...form];
      console.log("start", form);

      const Temp = changerow[dragIndex];

      console.log("changerow[dragIndex]: ", changerow[dragIndex]);
      console.log("changerow[dropIndex]: ", changerow[dropIndex]);

      changerow[dragIndex] = changerow[dropIndex];
      changerow[dropIndex] = Temp;

      console.log("Final:", changerow);

      SetForm(changerow);
    }

    console.log(form);
  };

  const handleDropOnColumn = (columnIndex, e) => {
    console.log("hey");
    e.preventDefault();
    const type = e.dataTransfer.getData("fieldType");

    if (type) {
      setActiveField(type);
      SetLabel("");
      setOptions("");
      setOpen(true);
    }

    if (dragIndex !== null) {
      console.log("bye");
      const updatedForm = [...form];
      updatedForm[dragIndex].column = columnIndex;
      // SetForm(updatedForm);
      setDragIndex(null);
      setDraggingIndex(null);
    }
  };

  // DIALOG
  const RenderDialog = () => (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            margin="dense"
            label="Label"
            type="text"
            fullWidth
            value={label}
            onChange={(e) => SetLabel(e.target.value)}
          />
          {(activeField === "radio" || activeField === "DropDown") && (
            <TextField
              multiline
              rows={4}
              required
              margin="dense"
              label="Options (one per line)"
              fullWidth
              value={options}
              onChange={(e) => setOptions(e.target.value)}
            />
          )}
          <DialogActions>
            <Button type="submit">
              {editDiv !== null ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <style>
        {`
          .dragging {
            opacity: 0.5;
            transform: scale(1.05);
            background-color: #e9f7fe;
            transition: transform 0.2s ease, background-color 0.3s ease;
          }
        `}
      </style>
      <div
        className="mx-3 p-3 my-5 border-3 rounded-5"
        style={{ borderStyle: "dotted", backgroundColor: "#D3D3D3" }}
      >
        <p className="fw-bolder fs-1 text-center">Dynamic Form</p>
        <div className="d-flex gap-3">
          {/* Input Fields */}
          <div className="shadow-lg p-2 rounded-2" style={{ height: "500px" }}>
            <p className="fs-3 fw-bold text-uppercase text-center">
              Input Fields
            </p>
            <hr className="border border-3 border-dark" />
            {[
              "text",
              "email",
              "date",
              "radio",
              "file",
              "button",
              "DropDown",
            ].map((type) => (
              <div
                draggable
                key={type}
                onDragStart={(e) => {
                  e.dataTransfer.setData("fieldType", type);
                }}
              >
                <div
                  className="border border-2 rounded-2 p-2 my-2 text-capitalize text-center"
                  style={{ cursor: "move" }}
                >
                  {type}
                </div>
              </div>
            ))}
          </div>

          {/* Form Columns */}
          <div
            className="w-100 border-4 rounded-2 bg-secondary border-white"
            style={{ borderStyle: "dashed" }}
          >
            {/* COL SECTION */}
            <div className="d-flex gap-3 p-3 fs-5 fw-semibold">
              <div>Col</div>
              <div className="d-flex gap-2">
                <button
                  style={{
                    cursor: count === 3 ? "not-allowed" : "pointer",
                    backgroundColor: "#D3D3D3",
                  }}
                  onClick={() => setCount(count + 1)}
                  disabled={count === 3}
                >
                  +
                </button>
                {count}
                <button
                  style={{
                    cursor: count === 1 ? "not-allowed" : "pointer",
                    backgroundColor: "#D3D3D3",
                  }}
                  onClick={() => setCount(count - 1)}
                  disabled={count === 1}
                >
                  -
                </button>
              </div>
            </div>

            <p className="fs-1 fw-bold text-uppercase text-center">Form</p>
            <hr className="border border-3" />

            {/* Columns Rendering */}
            <div className="d-flex gap-3 p-3">
              {Array.from({ length: count }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDropOnColumn(colIndex, e)}
                  style={{
                    flex: 1,
                    minHeight: "500px",
                    border: "2px dashed white",
                    backgroundColor: "#d3d3d3",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <p className="text-center fw-bold">Column {colIndex + 1}</p>

                  {form
                    .filter((item) => item?.column === colIndex)
                    .map((item, index) => {
                      const globalIndex = form?.findIndex(
                        (f) =>
                          f?.label === item?.label &&
                          f?.type === item?.type &&
                          f?.column === colIndex
                      );

                      return (
                        <div
                          key={globalIndex}
                          draggable
                          onDragStart={() =>
                            handleDragStartFormItem(globalIndex)
                          }
                          onDragOver={handleDragOverFormItem}
                          onDrop={() =>
                            handleDropOnFormItem([globalIndex, index])
                          }
                          onDragEnd={() => setDraggingIndex(null)}
                          className={`border border-2 border-black rounded p-2 d-flex flex-column justify-content-between text-capitalize ${
                            draggingIndex === globalIndex ? "dragging" : ""
                          }`}
                          style={{
                            cursor: "grab",
                            marginBottom: "10px",
                          }}
                        >
                          <div className="d-flex justify-content-between">
                            <span
                              onClick={() => editInput(globalIndex)}
                              className="text-info fs-4"
                              style={{ cursor: "pointer" }}
                            >
                              &#128393;
                            </span>
                            <span
                              onClick={() => deleteInput(globalIndex)}
                              className="text-danger fs-3"
                              style={{ cursor: "pointer" }}
                            >
                              &times;
                            </span>
                          </div>

                          <div>
                            <label className="form-label fw-bold fs-6">
                              {item?.type === "button" ? "" : item?.label}
                            </label>

                            {item?.type === "button" ? (
                              <button className="btn btn-primary w-100">
                                {item?.label}
                              </button>
                            ) : item?.type === "radio" ? (
                              item?.options?.map((opt, i) => (
                                <div key={i} className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    id={`${item?.label}-${i}`}
                                    name={item?.label}
                                    value={`${item?.label}-${i}`}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`${item?.label}-${i}`}
                                  >
                                    {opt}
                                  </label>
                                </div>
                              ))
                            ) : item?.type === "DropDown" ? (
                              <select className="form-select">
                                {item?.options?.map((opt, i) => (
                                  <option key={i} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={item?.type}
                                className="form-control"
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {RenderDialog()}
    </>
  );
}

export default App;
