"use client"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTasks } from "@/context/TasksContext"
import { printPdf } from "utils/printPdf"

import { Button } from "../ui/button"

type Props = {
  response: any
}

const TasksTable = (props: Props) => {
  const router = useRouter()
  const { tasksArray, setTasksArray } = useTasks()
  let tasks: any[] = [];

useEffect(() => {
    console.log(props.response)
    setTasksArray(props.response
      .split("\n")
      .map((task) => {
        const splitTask = task.split(/-|: /)

        if (splitTask.length < 2) return null

        const time = splitTask[0].trim()
        const description = splitTask.slice(1).join(": ").trim()

        return { time, description }
      })
      .filter(Boolean)
    )
  }, [props.response, setTasksArray])


  const edit = () => {
    router.push("/plan")
  }

  return (
    <div id="pdfContent" className=" bg-slate-900">
      <div className="flex justify-end p-2">
        <Button className="" onClick={edit}>
          Edit
        </Button>
        <Button className="" onClick={printPdf}>
          Download
        </Button>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {tasksArray.map((task, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-700" : ""}>
              <td className="px-4 py-2 border">{task.time}</td>
              <td className="px-4 py-2 border">{task.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TasksTable
