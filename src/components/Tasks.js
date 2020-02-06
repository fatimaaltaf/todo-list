import React from 'react';
import { Checkbox } from './layouts/Checkbox';

export const Tasks = () => {
  const tasks = [];

  let projectName = '';

  return (
    <div className='tasks' data-testid='tasks'>
      <h2 data-testid='project-name'>{projectName}</h2>

      <ul>
        {tasks.map(task => (
        <li key={`${task.id}`}> 
          <checkbox id={task.id}/>
          <span>{task.task}</span>
        </li>
        ))}
      </ul>
    </div>
  )
}