import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {

  //States
  const [inputText, setInputText] = useState("");
  const[todos, setTodos] = useState([])
  const[status,setStatus] = useState('all');
  const[filteredTodos,setFilteredTodos]= useState([]);
  //Get the qoutes 
  const[quotes,setQoutes] = useState('');

  const getQuote = () =>{
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) =>{
        let randomNum = Math.floor(Math.random()* data.length);
        setQoutes(data[randomNum])
      });
  };
  

  //Run once when the app starts
  useEffect(()=>{
    getLocalTodos();
  },[])
  //useEffect
  useEffect(()=>{

      filterHandler();
      saveLocalTodos();

  },[todos,status])

  const filterHandler = () =>
  {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;

  }}

//save local todo
    const saveLocalTodos =() =>{
        localStorage.setItem("todos",JSON.stringify((todos)));
    }
    const getLocalTodos = () =>{
      if (localStorage.getItem("todos") === null){
        localStorage.setItem("todos",JSON.stringify([]));
      }else{
        let todoLocal = JSON.parse(localStorage.getItem("todos"));
        setTodos(todoLocal);
      }

    }



  return (
    <div className="App">
      <header>
        <h1>To Do It is The Aim!</h1>
      </header>
      
        <p>{quotes.text}</p>
        <p>{quotes.author}</p>
        <p></p>
        
        <button onClick={getQuote} className="getQuotes">Want A Push?</button>
        
      <Form
        setStatus={setStatus}
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        filteredTodos={filteredTodos}
      />
      <TodoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos}/>
      <footer>
        <p className="Footer-text">
          <h3>Devloped by :: Aditya Patil</h3>
          <a
            className="footer-link-text"
            href="https://www.instagram.com/accounts/onetap/?next=%2F"
            target="_blank"
          >
            Get In Touch
          </a>
          </p>
      </footer>      
    </div>
    
  );
}

export default App;
