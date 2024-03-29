"use client"

import * as React from "react"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import TasksTable from "./TasksTable";
import sendRequestToAi from "@/utils/sendRequestToAi";


type Props = {

}

const PromptField = (props: Props) => {
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  }

  const submit = async () => {
    const response = await sendRequestToAi(prompt);
    if(response) setAiResponse(response);
  }

  return (
    <Card className="w-full md:w-[75%] xl:w-[50%]">
      <CardHeader>
        <CardTitle>Write your prompt</CardTitle>
        <CardDescription>Describe what task have you today.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Prompt</Label>
              <Textarea value={prompt} onChange={handleInput} placeholder="Type your message here." />
            </div>
          </div>
        </form>
        {aiResponse && (
          <div>
            <TasksTable response={aiResponse}/>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={submit}>Ask AI</Button>
      </CardFooter>
    </Card>
  )
}

export default PromptField;
