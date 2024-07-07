import {
  Box,
  Text,
  Flex,
  IconButton,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { ITask } from "../../../models";
import { deleteTask } from "../../../redux/thunks/taskThunks";
import { useTranslation } from "react-i18next";
import { DeleteConfirmationModal } from "..";
import { useState } from "react";

function Task({ task }: { task: ITask }) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const { t } = useTranslation();
  const { colorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEditClick = (id: number) => {
    navigate(`/user/tasks/${id}/edit`);
  };

  const handleReadMoreClick = () => {
    navigate(`/user/tasks/${task.id}`, {
      state: { task },
    });
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteTask(task.id));
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      bg={colorMode === "light" ? "white" : "gray.700"}
      width={{ base: "100%", sm: "300px" }}
      overflow="hidden"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={2} isTruncated>
        {task.title}
      </Text>
      <Text color="gray.600" fontSize="lg" minH={"150px"}>
        {task.description.length >= 100
          ? task.description.slice(0, 100) + "..."
          : task.description}
      </Text>
      <Flex w={"100%"} justifyContent={"space-between"}>
        <Button variant="link" onClick={handleReadMoreClick}>
          {t("TASKS.READ_MORE")}
        </Button>

        <Text color={"red"}>{task.status}</Text>
      </Flex>

      <Flex justify="space-between" mt={4}>
        <Button
          colorScheme="blue"
          onClick={() => {
            handleEditClick(task.id);
          }}
        >
          {t("TASKS.EDIT")}
        </Button>
        <IconButton
          aria-label="Delete"
          icon={<DeleteIcon />}
          onClick={() => {
            handleDeleteClick();
          }}
          variant="outline"
          colorScheme="red"
        />
      </Flex>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}

export default Task;
