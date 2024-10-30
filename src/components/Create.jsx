import React, { useState } from 'react'
import axios from 'axios'

const Create = () => {
  const [task, setTask] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!task) {
      console.log('task cannot be empty')
    }
    try {
      const result = await axios.post('http://localhost:3001/add', { task: task })
      console.log('task added successfully:', result.data)
      setTodos(prevTodos => [...prevTodos, result.data])
      setTask('')
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  }



  return (
    <div className='mb-4'>
      <input type="text" placeholder='type your task here' onChange={(e) => setTask(e.target.value)} required className=' min-w-[20rem] px-4 py-2 rounded-md text-black' />
      <button type='submit' onClick={handleAdd} className='ml-2 text-white uppercase bg-black px-4 py-2 rounded-md hover:bg-gray-900'>add</button>
    </div>
  )
}

export default Create