import React, { useState } from 'react'
import Task from '../Task';
import TaskForm from '../TaskFrom';
import './style.css'



const TaskList = (props) => {

    const [tasks,setTasks] = useState(JSON.parse(localStorage.getItem('tasks')));
    const [updetedText,setText] = useState('');

    const addTask = (task) => {
        if(task.text === null)
            return;

        let newTasks = [];
        if(localStorage.getItem('tasks') == null)
        {
          newTasks=[...tasks,task]
          localStorage.setItem('tasks',JSON.stringify(newTasks))
        }
        else
        {
          newTasks=JSON.parse(localStorage.getItem('tasks'));
          newTasks.push(task);
          localStorage.setItem('tasks',JSON.stringify(newTasks));
        }
        setTasks(JSON.parse(localStorage.getItem('tasks')));
    }

    const handleEdit = (id) => {
      const updetedTask = tasks.map( (t) => {
          if(t.id===id)
            t.isInEditMode = !t.isInEditMode;
          return t;
      })
      setTasks(updetedTask);
    }

    const handleOnChange = (e) => {
      setText(e.target.value);
    }

    const handleOkBtn = (t) => {
      const updetedTask = tasks.map( (task) => {
          if(task.id===t.id)
          {
            task.isInEditMode = !task.isInEditMode
            task.text = updetedText;
          }
          return task;
      })
      setTasks(updetedTask);

    }

    const handleIndent = (task) => {
      let index = tasks.findIndex( (t) => t.id === task.id);
      if(index!==0)
      {
        const updatedtask = tasks.map((t) => {
          if(t.id===task.id)
          {
            if(t.margin!=60)
              t.margin += 30;
  
            if(t.margin===30)
              t.color='black';
            if(t.margin===60)
              t.color='gray'
          }
          return t;
        })
        setTasks(updatedtask);
        localStorage.setItem('tasks',JSON.stringify(updatedtask));
      }
    
      console.log(task.margin);

    }


    
    const handleOutdent = (task) => {
      
      let index = tasks.findIndex( (t) => t.id === task.id);
      if(index!==0)
      {
        const updatedtask = tasks.map((t) => {
          if(t.id===task.id)
          {
            if(t.margin!==0)
              t.margin -= 30;
            
            if(t.margin===0)
              t.color='blue'
            if(t.margin===30)
              t.color='black';
          }
          return t;
        })
        setTasks(updatedtask);
        localStorage.setItem('tasks',JSON.stringify(updatedtask));
      }
      
    }

    const handleDelete = (task) => {
      let index = tasks.findIndex( (t) => t.id === task.id);
      const tempArray = [];
      tempArray.push(task.id);

      if(task.color==='darkblue')
      {
        for(let i=index+1;i<tasks.length;i++)
        {
          if(tasks[i].color!=='darkblue')
            tempArray.push(tasks[i].id);
          else
            break;
        }
      }
      else if(task.color==='black')
      {
        for(let i=index+1;i<tasks.length;i++)
        {
          if(tasks[i].color!=='darkblue' && tasks[i].color!=='black')
            tempArray.push(tasks[i].id);
          else  
            break;
        }
      }
      
      const newTasks = tasks.filter( (t) => !tempArray.includes(t.id))
      localStorage.setItem('tasks',JSON.stringify(newTasks));
      setTasks(newTasks);  
    }
    



  return(
    <div className="tool-container">
      <div className="header">
        <div className="basic-details"> 
          <p>SUBJECT: <span className="s">MATHEMATICS</span></p>
          <p>STANDARD: <span className="s">10th</span></p>
        </div>
        <div className="task-input">
          <TaskForm onSubmit={addTask}/>
        </div>
      </div>
      
      <div className="tasks">
        <Task 
        tasks={tasks} 
        handleEdit={handleEdit} 
        handleOkBtn={handleOkBtn}
        handleIndent={handleIndent}
        handleOutdent={handleOutdent}
        handleDelete={handleDelete}
        updetedText={updetedText}
        handleOnChange={handleOnChange}
        />
      </div>
    </div>
   )

 }

export default TaskList