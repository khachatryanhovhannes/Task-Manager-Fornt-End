import {
  HStack,
  Box,
  Select,
  Input,
  Flex,
  useToast,
  ToastId,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ErrorMessage, Loader, Pagination, Task } from "../../components";
import { TaskStatus, ToastStatus } from "../../models";
import { getTasks } from "../../redux/thunks/taskThunks";
import { ONE_PAGE_TASK_COUNT } from "../../constants";
import { toastOptions } from "../../helpers";
import { useLocation, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const { t } = useTranslation();
  const location = useLocation();
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);
  const {
    allTasksCount,
    tasks,
    error,
    isTaskEventLoading,
    taskEventError,
    isTaskModify,
  } = useAppSelector((state) => state.tasks);

  const toastModify = (status: ToastStatus, message: string) => {
    if (status === ToastStatus.loading) {
      toastIdRef.current = toast(
        toastOptions({ status: status, message: message })
      );
    }
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, {
        status: status,
        title: message,
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (isTaskEventLoading) {
      toastModify(ToastStatus.loading, t("TASKS_EVENT.DELETE_LOADING"));
    } else if (taskEventError) {
      toastModify(ToastStatus.error, t("TASKS_EVENT.DELETE_ERROR"));
    } else if (isTaskModify) {
      toastModify(ToastStatus.success, t("TASKS_EVENT.DELETE_SUCCESS"));
    }
  }, [isTaskEventLoading, taskEventError, isTaskModify, page]);

  const dispatch = useAppDispatch();

  const isGeneralTasksLoading = useAppSelector(
    (state) => state.tasks.isGeneralTasksLoading
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const searchParams = new URLSearchParams(location.search);
    setDate(searchParams.get("date") || "");
    setStatus(searchParams.get("status") || "");
    setPage(Number(searchParams.get("page")) || 1);
    dispatch(
      getTasks({
        take: ONE_PAGE_TASK_COUNT,
        skip: ONE_PAGE_TASK_COUNT * (page - 1),
        date,
        status,
      })
    );
  }, [status, date, isTaskModify, searchParams]);

  const updateSearchParams = (params: { [key: string]: string }) => {
    const currentSearchParams = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([key, value]) => {
      currentSearchParams.set(key, value);
    });

    setSearchParams(currentSearchParams);
    const queryString = currentSearchParams.toString();

    const pathname = location.pathname;
    const hash = location.hash;

    const newUrl = `${pathname}?${queryString}${hash}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
    setPage(1);
    updateSearchParams({ status: selectedStatus, page: "1" });
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    setPage(1);
    updateSearchParams({ date: selectedDate, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateSearchParams({ page: newPage.toString() });
  };

  return (
    <Box p={4} minH={"600px"} w={"100%"}>
      <Flex
        gap={"30px"}
        wrap={"wrap"}
        width={"100%"}
        justifyContent={{ base: "center", lg: "center", xl: "right" }}
      >
        <Select
          w={"300px"}
          onChange={handleStatusChange}
          mb={"20px"}
          value={status}
        >
          <option value="">{t("TASKS.ALL")}</option>
          <option value={TaskStatus.toDo}>{t("TASKS.TO_DO")}</option>
          <option value={TaskStatus.inProgress}>{t("TASKS.IN_PROCESS")}</option>
          <option value={TaskStatus.done}>{t("TASKS.DONE")}</option>
        </Select>
        <Input
          type="date"
          value={date}
          onChange={handleDateChange}
          min={new Date().toISOString().split("T")[0]}
          w={"300px"}
        />
      </Flex>
      <ErrorMessage text={error} />
      {isGeneralTasksLoading ? (
        <Loader />
      ) : (
        <HStack
          alignItems={"start"}
          justifyContent={"center"}
          flexWrap="wrap"
          mt={"30px"}
        >
          {tasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </HStack>
      )}
      {tasks.length && allTasksCount > ONE_PAGE_TASK_COUNT ? (
        <Pagination
          pageCount={Math.ceil(allTasksCount / ONE_PAGE_TASK_COUNT)}
          activePage={page}
          handlePageChange={handlePageChange}
        />
      ) : null}
    </Box>
  );
}

export default Tasks;
