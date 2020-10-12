import React, { useState } from 'react'
import './style.css'



const Task = ({tasks,handleOnChange,handleEdit,handleOkBtn,handleIndent,handleOutdent,handleDelete}) => {

  
  return tasks.map( (task,index) => (
    
    
    <div className="row">
        <div key={index} className="task-row">
            
            <div className="task-icones">
                <i className="fas fa-expand-arrows-alt"></i>
                <i onClick={() => handleOutdent(task)} className="fas fa-outdent"></i>
                <i onClick={() => handleIndent(task)} className="fas fa-indent"></i>
                <i onClick={() => handleDelete(task)} className="fas fa-trash-alt"></i>
            </div>

            {task.isInEditMode ? 

                <div className="task-box-input">
                    <input 
                        type="text"
                        defaultValue={task.text}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <button onClick={() => handleEdit(task.id)}><i className="far fa-window-close"></i></button>
                    <button onClick={() =>  handleOkBtn({id: task.id})}><i className="far fa-check-circle"></i></button>
                </div>
                :
                <div className="task-box" style={{marginLeft: `${task.margin}px`}}> 
                    <div className="task-text" style={{color:`${task.color}`,borderBottom: `1.5px solid ${task.color}`}} onClick={() => handleEdit(task.id)}>
                        {task.text}
                    </div>
                </div>
            }
            
        </div>
    </div>
    
  ))
    
   

 }

export default Task