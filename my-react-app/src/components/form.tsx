import { FormEventHandler, useRef, useState } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormGroup,
} from "@mui/material";
import { Status } from "../types";

function TodoForm(props: {
  addTodo: (title: string, status: Status) => boolean;
}) {
  const title = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState(Status.NotStarted);
  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    props.addTodo(title.current?.value ?? "No title", status);
    title.current!.value = "";
    setStatus(Status.NotStarted);
  };

  const onChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value as Status);
  };
  return (
    <form onSubmit={submit}>
      <FormGroup style={{ padding: "50px" }}>
        <FormControl style={{ margin: "20px" }}>
          <InputLabel htmlFor="my-input">Todo</InputLabel>
          <Input
            type="text"
            id="my-input"
            inputRef={title}
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl>
          <InputLabel
            id="demo-simple-select-label"
            htmlFor="demo-simple-select"
          >
            Status
          </InputLabel>
          <br></br>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={onChange}
          >
            {Object.values(Status).map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit">Add</Button>
        </FormControl>
      </FormGroup>
    </form>
  );
}
export default TodoForm;
