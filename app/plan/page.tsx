"use client"
import { useTasks } from '@/context/TasksContext';
import React, { useRef, useState } from 'react';
import { Table, Input, Button } from 'antd';
import { printPdf } from "@/utils/printPdf"

const { TextArea } = Input;

type Props = {};

const TasksTable = (props: Props) => {
  const { tasksArray, setTasksArray } = useTasks();
  console.log(tasksArray)
  const tableRef = useRef();

  const [editing, setEditing] = useState(false); 

  const handleEdit = (record, e) => {
    const newTasksArray = [...tasksArray];
    newTasksArray[record.key].description = e.target.value;
    setTasksArray(newTasksArray);
  }

  const edit = () => {
    setEditing(!editing); 
  }

  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      className:'w-28',
      render: (text, record) => editing ? ( 
        <TextArea
          autoSize
          defaultValue={text}
          onBlur={(e) => handleEdit(record, e)}
          className='w-24'
        />
      ) : text,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => editing ? ( 
        <TextArea
          autoSize
          defaultValue={text}
          onBlur={(e) => handleEdit(record, e)}
        />
      ) : text,
    },
  ];

  const data = tasksArray.map((task, index) => ({ ...task, key: index }));

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-4xl bg-white rounded-lg' id="pdfContent" ref={tableRef}>
      <div className='flex justify-end m-2'>
      <Button className="" onClick={edit}>
          {editing ? 'Save' : 'Edit'} 
        </Button>
        <Button className="" onClick={printPdf}>
          Download
        </Button>
      
      </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default TasksTable;
