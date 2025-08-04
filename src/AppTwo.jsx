import React, { useState } from "react";
import Sider from "./components/Sider.jsx";
import DialogComponent from "./components/FieldDialog.jsx";
import FormArea from "./components/FormArea.jsx";

function AppTwo() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState("");
  const [editDiv, setEditDiv] = useState(null);
  const [formc, setFormC] = useState(0);
  const [rowI, setRowI] = useState();
  const [colI, setCoI] = useState();
  const [state, setState] = useState({
    label: "",
    options: "",
    type: "",
  });

  // DROP IN CELL
  const handleDropInCell = (e, rowIndex, colIndex) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("fieldType");
    setState({
      label: "",
      options: "",
      type,
    });
    setEditDiv({ rowIndex, colIndex });
    setOpen(true);
    setRowI(rowIndex);
    setCoI(colIndex);
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    const newFieldData = {
      type: state.type,
      label: state.label,
      rownumber: rowI + 1,
      ColumnNumber: colI + 1,
    };

    if (["RadioButton", "DropDown"].includes(state.type)) {
      newFieldData.options = state.options
        .split("\n")
        .map((opt) => opt.trim())
        .filter(Boolean);
    }

    if (editDiv) {
      const { rowIndex, colIndex } = editDiv;
      const updatedForm = [...form];
      updatedForm[rowIndex][colIndex] = newFieldData;
      setForm(updatedForm);
    } else if (formc === 0) {
      setForm([[newFieldData]]);
      setFormC(1);
    }

    setOpen(false);
    setEditDiv(null);
    console.log(state);
  };

  // ADD ROW
  const addRow = () => {
    const newRow = [null];
    setForm([...form, newRow]);
    setFormC(1);
  };

  // ADD COL
  const addColumn = (rowIndex) => {
    const updatedForm = [...form];
    updatedForm[rowIndex] = [...updatedForm[rowIndex], null];
    setForm(updatedForm);
  };

  // DELETE ROW
  const deleteRow = (rowIndex) => {
    const updatedForm = form.filter((_, index) => index !== rowIndex);
    setForm(updatedForm);
  };

  // DELETE INPUT
  const deleteInput = (rowIndex, colIndex) => {
    const updatedForm = [...form];
    updatedForm[rowIndex][colIndex] = null;
    setForm(updatedForm);
  };

  // EDIT INPUT
  const editInput = (rowIndex, colIndex) => {
    const item = form[rowIndex][colIndex];
    setEditDiv({ rowIndex, colIndex });

    setState({
      type: item.type,
      label: item.label,
      options: item.options?.join("\n") || "",
    });

    setOpen(true);
  };

  return (
    <div className="d-flex p-4 gap-5">
      <Sider
        onDragStart={(e, type) => e.dataTransfer.setData("fieldType", type)}
      />
      <FormArea
        form={form}
        addRow={addRow}
        addColumn={addColumn}
        deleteRow={deleteRow}
        handleDropInCell={handleDropInCell}
        deleteInput={deleteInput}
        editInput={editInput}
      />

      <DialogComponent
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        editDiv={editDiv}
        state={state}
        setState={setState}
      />
    </div>
  );
}

export default AppTwo;
