"use client"
import PromptField from "@/components/components/PromptField"
import { TasksProvider } from "@/context/TasksContext"
import React from "react"


export default function IndexPage() {

  return (
    <TasksProvider> 
    <section className="container flex items-center justify-center min-h-screen ">
      
        <PromptField  />
       
    </section>
    </TasksProvider>
  )
}
