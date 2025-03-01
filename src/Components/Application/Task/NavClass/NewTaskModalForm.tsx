import { Cancel, Save, SubTask, TaskTitle } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { addNewTask, setAddModal, setMyTask, setValidation } from "@/Redux/Reducers/TaskSlice";
import { AddTaskData } from "@/Type/Application/Tasks/TaskType";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { TaskRadioRow } from "./TaskRadioRow";

export const NewTaskModalForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { validation } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const AddTask: SubmitHandler<AddTaskData> = (data) => {
    if (data.title !== "" && data.collection !== "" && data.description !== "") {
      dispatch(addNewTask(data));
      dispatch(setMyTask(data));
      dispatch(setAddModal());
      dispatch(setValidation(false));
    }
  };

  return (
    <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(AddTask)}>
      <Row>
        <Col md="12" className="mt-0">
          <FormGroup>
            <Label check>{TaskTitle}</Label>
            <input type="text" className={`form-control ${validation && `${errors.title ? "is-invalid" : "is-valid"}`}`} {...register("title", { required: true })} />
          </FormGroup>
        </Col>
        <Col md="12" className="mt-0">
          <FormGroup>
            <Label check>{SubTask}</Label>
            <input type="text" className={`form-control ${validation && `${errors.sunTitle ? "is-invalid" : "is-valid"}`}`} {...register("sunTitle", { required: true })} />
          </FormGroup>
        </Col>
        <TaskRadioRow />
        <Col md="6" className="mt-0">
          <FormGroup>
            <Input type="select" className="form-control js-example-basic-single">
              <option value="My Task">My Task</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md="6" className="mt-0">
          
        </Col>
        <Col md="12" className="my-0">
          <FormGroup>
            <textarea className={`form-control ${validation && `${errors.description ? "is-invalid" : "is-valid"}`}`} {...register("description", { required: true })} />
          </FormGroup>
        </Col>
      </Row>
      <Button color="secondary" className="me-1" type="submit" onClick={() => dispatch(setValidation(true))}>
        {Save}
      </Button>
      <Button color="primary" onClick={() => dispatch(setAddModal())}>
        {Cancel}
      </Button>
    </Form>
  );
};
