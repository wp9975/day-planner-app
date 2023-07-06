"use client"
import { TasksProvider, useTasks } from '@/context/TasksContext';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragElement from './dragdrop/DragElement';




// Define the task object type
type Props = {

};

const TasksTable = (props : Props) => {
  const { tasksArray, setTasksArray } = useTasks();
console.log(tasksArray)
  // FunctionA to handle reordering of tasks
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const reorderedTasks = Array.from(tasksArray);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    setTasksArray(reorderedTasks);
  };

  // Function to handle changing task time or description
  const handleChange = (event, index) => {
    const newTasks = [...tasksArray];
    newTasks[index][event.target.name] = event.target.value;
    setTasksArray(newTasks);
  };

  return (
    <TasksProvider>
    <div className='flex items-center justify-center min-h-screen'>
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasksArray.map((task, index) => (
             
             <DragElement task={task} index={index} handleChange={handleChange} />

            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </div>
    </TasksProvider>
  );
};

export default TasksTable;
