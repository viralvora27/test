import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteToDo, changeStatus, editToDo } from "../reducers/todo";
import {
  Card,
  CardBody,
  IconButton,
  Flex,
  Text,
  Divider,
  Stack,
  Checkbox,
  HStack
} from "@chakra-ui/react";
import { FiEdit, FiTrash } from "react-icons/fi";

const ListTodo = () => {
  const { todoList } = useSelector((state) => state.toDo);
  const dispatch = useDispatch();

  const [sortedList, setSortedList] = useState([]);

  // to mark task completed or back uncompleted
  const handleChangeStatus = (e) => {
    const id = e.target.name;
    const isCompleted = e.target.checked;
    dispatch(changeStatus({ id, isCompleted }));
  };

  // sort todo list
  useEffect(() => {
    // to hide deleted tasks
    const filterList = todoList.filter((item) => !item.isDeleted);

    // to move recently created tasks at the top
    filterList.sort(function (a, b) {
      return new Date(b.createdDate) - new Date(a.createdDate);
    });

    // to move completed tasks at the bottom
    filterList.sort(function (x, y) {
      return x.isCompleted === y.isCompleted ? 0 : x.isCompleted ? 1 : -1;
    });

    setSortedList(filterList);
  }, [todoList]);

  return (
    <Card my="4">
      <CardBody className="list" p={0}>
        {sortedList.map(
          ({
            id,
            title,
            description,
            createdDate,
            updatedDate,
            isCompleted
          }) => {
            return (
              <React.Fragment key={id}>
                <Flex alignItems="center" px={4} py={3}>
                  <Checkbox
                    colorScheme="green"
                    size="lg"
                    className="checkbox"
                    mr={4}
                    isChecked={isCompleted}
                    name={id}
                    onChange={(e) => handleChangeStatus(e)}
                    title="Complete the task"
                  />

                  <Stack
                    spacing={0}
                    textDecoration={isCompleted ? "line-through" : "unset"}
                    color={isCompleted ? "gray" : "unset"}
                  >
                    <Text fontSize="20px">{title}</Text>
                    <Text
                      color={isCompleted ? "gray" : "gray.600"}
                      title={description}
                    >
                      {description.length > 70
                        ? description.substring(0, 70) + "..."
                        : description}
                    </Text>
                  </Stack>

                  <HStack ml="auto" mr={0}>
                    <Stack spacing={0} color="gray.500">
                      <Text>{isCompleted ? "Completed" : "Created"} on:</Text>
                      <Text>{isCompleted ? updatedDate : createdDate}</Text>
                    </Stack>

                    <Text borderLeft="solid 1px grey">
                      <IconButton
                        onClick={() => dispatch(editToDo({ id }))}
                        icon={<FiEdit />}
                        colorScheme="green"
                        color="white"
                        fontSize="lg"
                        title="Edit"
                        mr={2}
                        ml={2}
                        isDisabled={isCompleted}
                      />
                      <IconButton
                        onClick={() => dispatch(deleteToDo({ id }))}
                        icon={<FiTrash />}
                        colorScheme="red"
                        color="white"
                        fontSize="lg"
                        title="Delete"
                      />
                    </Text>
                  </HStack>
                </Flex>
                <Divider />
              </React.Fragment>
            );
          }
        )}

        {sortedList.length === 0 && (
          <Text fontSize="lg" px={3} py={4} textAlign="center">
            There is not any pending tasks.
          </Text>
        )}
      </CardBody>
    </Card>
  );
};

export default ListTodo;
