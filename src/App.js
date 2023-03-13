import logo from "./logo.svg";
import React, { useState } from "react";

import "./App.css";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
 
`;


const Button = styled.button`
  display: inline-block;
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  height: 30px;
  width: 50px;
  border-radius: 2px;
  cursor: pointer;
`;

const Text = styled.input`
  border: 2px solid #000;
  width: 200px;
  padding: 5px;
  border-radius: 2px;
  margin: 5px;
`;

const TaskCount = styled.span`
  marging: 10px;
`;

const Tasks = styled.div``;

const LIST = styled.li`
listStyle: "none";
text-decoration: "line-through";
`;

function App() {

  const [input, setInput] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [todoList, setTodoList] = useState([]);

  const handleClick = () => {
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,

      {
        id: id,
        task: input,
        complete: false,
      }

    ]);

    setInput("");
  };

  const handleComplete = (id) => {

    let list = todoList.map( (task) => {

      let item = {};

      if (task.id == id) {
        
        if (!task.complete) {
          setCompletedTaskCount(completedTaskCount + 1);
        } else {
          setCompletedTaskCount(completedTaskCount - 1);
        }

        item = { ...task, complete: !task.complete };
      } 
    
      else item = { ...task };

      return item;
    });

    setTodoList(list);
  };

  return (
    <Container>
      <div>
        <h2>To DO List</h2>
        <Text value={input} onInput={(e) => setInput(e.target.value)}></Text>
        <Button onClick={() => handleClick()}>Add</Button>

        <Tasks>
          <TaskCount>
            <b> Pending Tasks</b> { todoList.length - completedTaskCount}
          </TaskCount>

          
          <TaskCount>
           <b> Completed Tasks </b> {completedTaskCount}
            </TaskCount>
        </Tasks>

        <div>
          <ul>
            {todoList.map((todo) => {
              return (
                <LIST
                  completed={todo.completed}

                  id={todo.id}

                  onClick={() => handleComplete(todo.id)}

                  style={{
                    listStyle:"none",
                    textDecoration: todo.complete && "line-through",
                  }}
                >
                  {todo.task}
                </LIST>
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default App;
