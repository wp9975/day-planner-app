import React, { createContext, useContext, useState } from "react"

type TasksContextType = {
  tasksArray: any[];
  setTasksArray: (tasks: any[]) => void;
};

export const TasksContext = createContext<TasksContextType>({
  tasksArray: [],
  setTasksArray: () => {},
});



export const TasksProvider = ({ children }) => {
  const [tasksArray, setTasksArray] = useState([]);

  return (
    <TasksContext.Provider value={{tasksArray, setTasksArray}}> 
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => useContext(TasksContext);
