interface ITask {
  createdAt: string;
  description: string;
  dueDate: string;
  id: number;
  status: string;
  title: string;
  updatedAt: string;
  userId: number;
}

interface IAddTask {
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

interface IFile {
  createdAt: string;
  id: number;
  imagePath: string;
  updatedAt: string;
}

interface IUser {
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  imageId: string;
  lastName: string;
  role: string;
  updatedAt: string;
  file: IFile;
}

interface IUserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

interface IUserChangePassword {
  email: string;
  password: string;
  newPassword: string;
}

interface IUserChangeData {
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: FileList | undefined;
}

interface IGetTasksParapms {
  skip: number;
  take: number;
  date?: string;
  status?: string;
}

interface IEditTask {
  id: number;
  task: IAddTask;
}

export type {
  IEditTask,
  IGetTasksParapms,
  IUserLogin,
  IUserRegister,
  IUser,
  ITask,
  IAddTask,
  IUserChangePassword,
  IUserChangeData,
};
