import { SubmitHandler, useForm } from "react-hook-form";
import { ITask, ToastStatus } from "../../models";
import { useTranslation } from "react-i18next";
import { TaskModifield } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { ToastId, useToast } from "@chakra-ui/react";
import { toastOptions } from "../../helpers";
import { addTask } from "../../redux/thunks/taskThunks";
import { useEffect, useRef } from "react";

function AddTask() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);
  const { isTaskEventLoading, taskEventError, isTaskModify } = useAppSelector(
    (state) => state.tasks
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>({
    mode: "onSubmit",
  });
  const toastModify = (status: ToastStatus, message: string) => {
    if (status === ToastStatus.loading) {
      toastIdRef.current = toast(
        toastOptions({ status: status, message: message })
      );
    }
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, { status: status, title: message });
    }
  };

  useEffect(() => {
    if (isTaskEventLoading) {
      toastModify(ToastStatus.loading, t("TASKS_EVENT.ADD_LOADING"));
    } else if (taskEventError) {
      toastModify(ToastStatus.error, t("TASKS_EVENT.ADD_ERROR"));
    } else if (isTaskModify) {
      toastModify(ToastStatus.success, t("TASKS_EVENT.ADD_SUCCESS"));
      navigate("/user/tasks");
    }
  }, [isTaskEventLoading, taskEventError, isTaskModify]);

  const onSubmit: SubmitHandler<ITask> = (data) => {
    dispatch(
      addTask({
        ...data,
        dueDate: new Date(data.dueDate).toISOString(),
      })
    );
  };

  return (
    <TaskModifield
      handleSubmit={handleSubmit(onSubmit)}
      errors={errors}
      register={register}
      title={t("TASK.TITLE_ADD")}
      translatePath="TASK"
    />
  );
}

export default AddTask;
