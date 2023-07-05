import React from 'react';


type Props = {
    response: any;
}

const TasksTable = (props : Props) => {
  const tasks = props.response.split('\n').map(task => {
    const splitTask = task.split(/-|: /);

    if (splitTask.length < 2) return null;
    
    const time = splitTask[0].trim();
    const description = splitTask.slice(1).join(': ').trim();

    return { time, description };
  }).filter(Boolean);

  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : ''}>
              <td className="px-4 py-2 border">{task.time}</td>
              <td className="px-4 py-2 border">{task.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
