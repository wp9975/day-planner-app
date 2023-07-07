"use client"
import React, { createContext, useContext, useEffect, useState } from "react"

type TasksContextType = {
  tasksArray: any[]
  setTasksArray: (tasks: any[]) => void
}

export const TasksContext = createContext<TasksContextType>({
  tasksArray: [],
  setTasksArray: () => {},
})

export const TasksProvider = ({ children }) => {
  const [tasksArray, setTasksArray] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksArray))
  }, [tasksArray])

  return (
    <TasksContext.Provider value={{ tasksArray, setTasksArray }}>
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => useContext(TasksContext)
