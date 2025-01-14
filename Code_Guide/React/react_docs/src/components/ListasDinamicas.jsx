import React, {useState, useState} from 'react';

const [tasks, setTasks] = useState(['Task 1', 'Task 2']);
const [newTask, setNewTask] = useState('');

function addTask(){
    setTasks([...tasks, newTask]);
    setNewTask('');
}

function TaskList(){
    return (
        <div>
            <ul>
                {tasks.map((task, index)=>(
                    <li key={index}>{task}</li>
                ))}
                <input value={newTask} onChange={e => setNewTask(e.target.value)} />
                <button onClick={addTask}>Add Task</button>
            </ul>
        </div>
    )
}
