import React, { useState } from 'react'
import './style.css'



const TaskForm = (props) => {

    const [input,setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(input!=='')
        {
            props.onSubmit({
                id: Math.floor(Math.random()*1000),
                text: input,
                isInEditMode: false,
                parent: [],
                children: [],
                margin: 0,
                color: 'darkblue',
            })
        }
        else
            alert('taskfield cannot be empty');
        

        setInput('');
    }

  return(

        <div className="task-form">
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                onChange={handleChange}
                value={input}
                placeholder="enter task"
                />
                <button onClick={handleSubmit}>
                    Add
                </button>

            </form>
            
        </div>
        
    
   )

 }

export default TaskForm