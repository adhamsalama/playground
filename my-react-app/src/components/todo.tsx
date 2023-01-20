import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Alert from "@mui/material/Alert";
import { ITodo, Status, updateFunction } from "../types";

export default function Todo(props: { todo: ITodo; update: updateFunction }) {
  const statusToSeverity = (status: Status) => {
    switch (status) {
      case Status.Done:
        return "success";
      case Status.InProgress:
        return "info";
      case Status.NotStarted:
        return "warning";
      case Status.Paused:
        return "error";
    }
  };
  const severity = statusToSeverity(props.todo.status);
  const updateStatus = (e: SelectChangeEvent) => {
    // setStatus(e.target.value as Status);
    props.update(props.todo.id, e.target.value as Status);
  };
  return (
    <Alert style={{ margin: "10px" }} severity={severity}>
      ID: {props.todo.id}
      <br />
      Title: {props.todo.title}
      <br />
      Status: {props.todo.status}
      <br />
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.todo.status}
        label="Status"
        onChange={updateStatus}
      >
        {Object.values(Status).map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
    </Alert>
  );
}
