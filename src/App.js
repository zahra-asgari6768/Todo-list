import React , {useState ,useEffect} from 'react';
import './App.css';
import Form from './component/Form';
import TodoList from './component/TodoList'


function App() {
 
const[inputText,setInputText]=useState("")
const[todos,setTodos]=useState([])
const[status,setStatus] = useState("all")
const[filteredTodos , setFilteredTodos] = useState([])
   

 useEffect(() => {
  getLocalStrage()
 }, [])

 useEffect(()=>{
  filterHandler()
  saveLocalStrage()
 },[todos,status])
  

const saveLocalStrage = () =>{
  localStorage.setItem('todos',JSON.stringify(todos))
}
const getLocalStrage = () =>{
  if(localStorage.getItem('todos')===null){
    localStorage.setItem('todos',JSON.stringify([]))
  }
  else{
    let todoLocal = JSON.parse(localStorage.getItem('todos'))
    setTodos(todoLocal)
  }
}



 const filterHandler = () =>{
   switch(status){
     case 'completed':
       setFilteredTodos(todos.filter((todo)=>todo.completed===true))
       break
       case 'uncompleted':
        setFilteredTodos(todos.filter((todo)=>todo.completed===false))
        break
        default:
          setFilteredTodos(todos)
          break
   }
 }
  return (
    <div className="App">
     <header> Todo List</header> 

     <Form todos={todos}
     setTodos={setTodos}
     inputText={inputText}
     setInputText={setInputText}
     status={status}
     setStatus={setStatus}/>

     <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App
