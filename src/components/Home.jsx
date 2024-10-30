import React, { useState, useEffect } from 'react'
import Create from './Create';
import axios from 'axios'
import { RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from "react-icons/ri";
import { BsTrash3 } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";


const VITE_API_URL = import.meta.env.VITE_API_URL


const Home = () => {

  const [todos, setTodos] = useState([]);
  const [modalOfEditingTask, setModalOfEditingTask] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState("");



  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const result = await axios.get(`${VITE_API_URL}/get`)
        setTodos(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTodos();
  }, [])

  const handleDoneTask = async (id) => {
    try {
      const result = await axios.put(`${VITE_API_URL}/update/${id}`)
      setTodos(prevTodos =>
        prevTodos.map(todo => todo._id === id ? { ...todo, done: !todo.done } : todo))
    } catch (error) {
      console.log('fail to toggle error', error)
    }

  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${VITE_API_URL}/delete/${id}`)
      console.log(`${id} deleted successfully!`)
      setTodos(prevTodos => prevTodos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.log('fail to delete task', error)
    }
  }

  const handleSaveEditedTask = async () => {
    try {
      await axios.put(`${VITE_API_URL}/updateTask/${currentTask._id}`, { task: currentTask.task });
      setTodos((prevTodos) => prevTodos.map((todo) => todo._id === currentTask._id ? { ...todo, task: currentTask.task } : todo));
      closeEditTask();
    } catch (error) {
      console.log("Failed to update task", error);
    }
  };

  const openEditTask = (task) => {
    setModalOfEditingTask(true)
    setCurrentTask(task)

  }

  const closeEditTask = () => {
    setModalOfEditingTask(false)
    setCurrentTask("")
  }

  const handeEditInputChange = (value) => {
    setCurrentTask(prevCurrentTask => {
      return {
        ...prevCurrentTask,
        task: value
      }
    });
  }



  return (
    <div className='mx-auto max-w-5xl h-full rounded-lg shadow-lg py-2 px-4 bg-slate-400'>
      <h1 className='text-center text-2xl font-bold mb-4 uppercase'>todo list</h1>
      <Create />
      <div className="task_list w-8/12 mx-auto px-6 py-3 rounded-lg">
        {todos.length === 0
          ?
          <div className='text-red-800'>no record found</div>
          :
          todos.map(todo => (
            <div className="flex flex-row mb-2 border border-black px-4 py-2 rounded-md" key={todo._id}>
              <div onClick={() => handleDoneTask(todo._id)}>
                {todo.done ? <RiCheckboxCircleLine size={20} /> : <RiCheckboxBlankCircleLine size={20} />}
              </div>
              <p className={todo.done ? 'line-through text-left ml-2' : 'text-left ml-2'} >{todo.task}</p>

              <button className='ml-auto' onClick={() => openEditTask(todo)}>
                <BiSolidEdit size={20} />
              </button>


              <button className="ml-2" onClick={() => handleDelete(todo._id)}>
                <BsTrash3 size={20} />
              </button>
            </div>
          ))}

        {modalOfEditingTask && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-black w-full max-w-md p-6 rounded-lg shadow-lg relative">
              <button
                onClick={closeEditTask}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
              <input
                type='text'
                value={currentTask.task}
                onChange={(e) => handeEditInputChange(e.target.value)}
                className='px-4 py-2 border rounded-mg' />
              <button
                onClick={handleSaveEditedTask}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}

export default Home
