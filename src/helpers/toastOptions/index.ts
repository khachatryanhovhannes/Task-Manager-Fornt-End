import { ToastStatus } from "../../models";

interface IToastOptionsProps {
  status: ToastStatus.success | ToastStatus.error | ToastStatus.loading;
  message: string;
}

export default function toastOptions({ status, message }: IToastOptionsProps) {
  return {
    description: message,
    status: status,
    duration: status === ToastStatus.loading ? 10000 : 2000,
    isClosable: true,
  };
}

