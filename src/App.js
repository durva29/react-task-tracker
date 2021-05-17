import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import  Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import {useState,useEffect} from 'react';
import Footer from './components/Footer';
import About from './components/About';

const App = () => {
  const[showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([]);
  
 useEffect(() => {
     const getTasks = async () => {
       const taskFromServer = await fetchTasks();
       setTask(taskFromServer)
     }

     getTasks()
 },[])

 // fetch single task
const fetchSingleTask = async(id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  const data = await res.json();
  return data;
}


// fetch task from server
const fetchTasks = async () =>{
  const res = await fetch("http://localhost:5000/tasks");
  const data = await res.json();
  console.log(data)
  return data;
}


//  Add task
const addTask = async (task) => {
  const res = await fetch("http://localhost:5000/tasks",{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify(task)
  })
  const data = await res.json();
  setTask([...tasks,data])
}


//delete tasks
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'DELETE'
  })
  setTask(tasks.filter((task) => task.id !== id))
}

//toggleTask

const toggleTask = async (id) => {
  const resp = await fetchSingleTask(id);
  const updateToTask = {...resp, reminder: !resp.reminder}
  const updatedTask = await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(updateToTask)
  })
  var data = await updatedTask.json();
  setTask(tasks.map((task) => task.id === id ? {...task, reminder:!data.reminder} : task))
}

return (
  <Router>
    <div className="container">
     <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)}  showAdd={showAddTask}/>
     <Route path='/' exact render={(props) => (
       <>
     {showAddTask && <AddTask onAdd={addTask}/>}
     {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleTask}/> : "No Tasks"}
       </>
     )}/>
     <Route path='/about' component={About} />
     <Footer/>
    </div>
  </Router>
  );
}

export default App;
