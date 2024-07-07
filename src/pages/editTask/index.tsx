import { SubmitHandler, useForm } from "react-hook-form";
import { ITask } from "../../models/interfaces";
import { useTranslation } from "react-i18next";
import { TaskModifield, Loader } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { editTask, getTask } from "../../redux/thunks/taskThunks";
import { ToastId, useToast } from "@chakra-ui/react";
import { formatDateString, toastOptions } from "../../helpers";
import { ToastStatus } from "../../models";
import { useEffect, useRef } from "react";
import { clearTaskEvents } from "../../redux/features/tasksSlice";

function EditTask() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const numericId = Number(id);
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);
  const {
    singleTask,
    isTaskEventLoading,
    taskEventError,
    isTaskModify,
    isGeneralTasksLoading,
  } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTask(numericId));
  }, []);

  useEffect(() => {
    if (singleTask) {
      setValue("id", singleTask.id);
      setValue("title", singleTask.title);
      setValue("description", singleTask.description);
      setValue("status", singleTask.status);
      setValue("createdAt", singleTask.createdAt);
      setValue("updatedAt", singleTask.updatedAt);
      setValue("dueDate", formatDateString(singleTask.dueDate));
      setValue("userId", singleTask.userId);
    }
  }, [singleTask]);

  const {
    register,
    handleSubmit,
    setValue,
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
      toastModify(ToastStatus.loading, t("TASKS_EVENT.EDIT_LOADING"));
    } else if (taskEventError) {
      toastModify(ToastStatus.error, t("TASKS_EVENT.EDIT_ERROR"));
    } else if (isTaskModify) {
      toastModify(ToastStatus.success, t("TASKS_EVENT.EDIT_SUCCESS"));
      navigate(-1);
      dispatch(clearTaskEvents());
    }
  }, [isTaskEventLoading, taskEventError, isTaskModify]);

  const onSubmit: SubmitHandler<ITask> = (data) => {
    dispatch(
      editTask({
        id: data.id,
        task: {
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
          status: data.status,
        },
      })
    );
  };

  return (
    <>
      {isGeneralTasksLoading && !singleTask ? (
        <Loader />
      ) : (
        singleTask && (
          <TaskModifield
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
            register={register}
            title={t("TASK.TITLE_EDIT")}
            translatePath="TASK"
          />
        )
      )}
    </>
  );
}

export default EditTask;
