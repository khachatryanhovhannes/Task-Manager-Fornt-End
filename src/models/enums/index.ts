enum ColorMode {
  light = "light",
  dark = "dark",
}

enum TaskStatus {
  toDo = "To Do",
  inProgress = "In Progress",
  done = "Done",
}

enum ToastStatus {
  success = "success",
  error = "error",
  loading = "loading",
}

enum Tokens {
  accessToken = "accessToken",
  refreshToken = "refreshToken",
}

const SearchStatus: Record<TaskStatus, string> = {
  [TaskStatus.toDo]: "To%20Do",
  [TaskStatus.inProgress]: "In%20Progress",
  [TaskStatus.done]: "Done",
};

export { ColorMode, TaskStatus, ToastStatus, Tokens, SearchStatus };
