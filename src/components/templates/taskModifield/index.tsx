import { Flex, Heading, Select } from "@chakra-ui/react";
import { FormEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TaskForm } from "../../";
import { useLocation } from "react-router-dom";
import { TaskStatus } from "../../../models";
import { useTranslation } from "react-i18next";

type TaskFormProps = {
  handleSubmit: FormEventHandler<HTMLDivElement>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  translatePath: string;
  title: string;
};

function TaskModifield({
  handleSubmit,
  register,
  errors,
  translatePath,
  title,
}: TaskFormProps) {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
    >
      <Heading mt={"20px"}>{title}</Heading>

      {location.pathname !== "/user/tasks/add" && (
        <Select maxW={"200px"} mt={"30px"} {...register("status")}>
          <option value={TaskStatus.toDo}>{t("SINGLE_TASK.TO_DO")}</option>
          <option value={TaskStatus.inProgress}>
            {t("SINGLE_TASK.IN_PROCESS")}
          </option>
          <option value={TaskStatus.done}>{t("SINGLE_TASK.DONE")}</option>
        </Select>
      )}

      <TaskForm
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        translatePath={translatePath}
      />
    </Flex>
  );
}

export default TaskModifield;
