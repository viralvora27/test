import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, updateToDo, getToDo } from "../reducers/todo";
import {
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  IconButton
} from "@chakra-ui/react";
import { FiPlus, FiSave } from "react-icons/fi";
import { useEffect } from "react";

const AddTodo = () => {
  const dispatch = useDispatch();
  const { editId, getTodoData } = useSelector((state) => state.toDo);

  // state values of title, description, title error
  const [state, setState] = useState({
    title: "",
    description: "",
    isTitleErr: false
  });

  // to change values of title and description
  const handleChange = (e) => {
    const getVal = e.target.value;
    const getName = e.target.name;

    let isTitleErr = state.isTitleErr;
    if (getVal && getName === "title") {
      isTitleErr = false;
    }
    setState({
      ...state,
      [getName]: getVal,
      isTitleErr
    });
  };

  // to add data
  const add = () => {
    if (title === "") {
      setState({ ...state, isTitleErr: true });
      return;
    }

    dispatch(addToDo({ newTitle: title, description }));
    reset();
  };

  // to update data
  const update = () => {
    if (title === "") {
      setState({ ...state, isTitleErr: true });
      return;
    }
    dispatch(updateToDo({ title, description, id: editId }));
    reset();
  };

  // to clear add/update form
  const reset = () => {
    setState({ ...state, title: "", description: "", isTitleErr: false });
  };

  // to get edit task data
  useEffect(() => {
    if (editId) {
      dispatch(getToDo({ id: editId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  // to bind edit task data in the form
  useEffect(() => {
    if (Object.keys(getTodoData).length > 0) {
      setState({
        ...state,
        title: getTodoData.title,
        description: getTodoData.description || ""
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTodoData]);

  const { title, isTitleErr, description } = state;

  return (
    <Card my="4">
      <CardBody>
        <Flex w="100%">
          <FormControl mr={5} w="35%">
            <FormLabel mb={0}>Title</FormLabel>
            <Input
              type="text"
              name="title"
              onChange={(e) => handleChange(e)}
              value={title}
            />
            {isTitleErr && (
              <Text mt={1} color="red" fontSize="sm">
                Title is required.
              </Text>
            )}
          </FormControl>

          <FormControl mr={5} w="55%">
            <FormLabel mb={0}>Description</FormLabel>
            <Input
              type="text"
              name="description"
              onChange={(e) => handleChange(e)}
              value={description}
            />
          </FormControl>

          <IconButton
            onClick={() => (editId ? update() : add())}
            icon={editId ? <FiSave /> : <FiPlus />}
            colorScheme="facebook"
            color="white"
            fontSize="lg"
            title="Add"
            mt="22px"
          />
        </Flex>
      </CardBody>
    </Card>
  );
};
export default AddTodo;
