import React, { useState } from 'react'
import axios from 'axios'


const VITE_API_URL = import.meta.env.VITE_API_URL

const Create = ({ addTodo }) => {
  const [task, setTask] = useState('');

  const handleAdd = async (e) => {
    if (!task) {
      console.log('task cannot be empty')
      return
    }
    try {
      const result = await axios.post(`${VITE_API_URL}/add`, { task })
      console.log('task added successfully:', result.data);

      addTodo(result.data);

      setTask('');

      window.location.reload();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  }

  return (
    <div className='mb-4 mx-auto flex flex-col sm:flex-row gap-2 justify-center'>
      <input type="text" placeholder='type your task here' value={task} onChange={(e) => setTask(e.target.value)} className=' w-auto px-4 py-2 rounded-md text-black' required />
      <button type='button' onClick={handleAdd} className='sm:ml-2 text-white uppercase bg-black px-4 py-2 rounded-md hover:bg-gray-900'>add</button>
    </div>
  )
}

export default Create