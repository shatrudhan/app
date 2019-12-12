import React, { Fragment, useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { global } from  '../global.js';

let todolist = '';
const Todo = () => {

    // css variable
    const style_todo_input = {
      'padding' : '2px 10px 2px 18px',
      'borderRight': '1px solid #06000000',
      'borderBottom': '1px solid #9c9c9c',
      'borderTop': '1px solid #9c9c9c',
      'borderLeft': '1px solid #9c9c9c',
      'marginRight': '-1px',
    }
    const style_todo_list = {
      'width': '20%',
      'margin': '0 auto',
      'marginTop': '25px',
    }

    const style_cont = {
      'background': 'white',
      'margin': '10px 0px',
      'padding': '5px',
      'fontWeight': '600'
    }

    const remove_todo = {
      'float': 'right',
      'marginTop': '-5px',
      'fontSize': '16px',
      'marginRight': '-5px',
      'borderRadius': '0',
    }

    const edit_todo = {
      'float': 'right',
      'marginTop': '-5px',
      'fontSize': '16px',
      'marginRight': '0px',
      'borderRadius': '0',
      'color': '#fff8f8',
      'fontWeight': '600',
    }

    const [todo_hidden_input, set_todo_hidden_input] = useState(0);
    const [todo_input, set_todo_input] = useState('');
    const [todo_list, set_todo_list] = useState( { lists : [] } );

    const ToDoSubmit = (e) => {
      e.preventDefault();
      
      const hidden_input = e.target[0].value;
      const val_input = e.target[1].value;
      
      if(val_input)
      {
        todo_list.lists = [];
        axios.post(global.api_url+'welcome/AddToDoList' , JSON.stringify({tdlist:val_input,id:hidden_input})).then(res => {
          if(res.data.response === 1){
            set_todo_list({lists : [...todo_list.lists ,res.data.lists]});
            set_todo_input('');
            set_todo_hidden_input(0);
          }
        })
      }

    }

    const RemoveToDo = (id) => {
      axios.post(global.api_url+'welcome/RemoveToDoList' , JSON.stringify({id:id})).then(res => {
        if(res.data.response === 1){
          todo_list.lists = [];
          set_todo_list({lists : [...todo_list.lists ,res.data.lists]});
          set_todo_input('');
        }
      })
    }

    const EditToDo = (id,todo) => {
      set_todo_hidden_input(id);
      set_todo_input(todo);
    }

    const ToDoInputChange = (e) => {
      console.log(e.target.value)
      const inval =  e.target.value.toUpperCase();
      if(inval.length <= 20){
        set_todo_input(inval);
      }else{
        return false;
      }
    }

    useEffect(() => {

      const fetchData = async () => {
        const result = await axios(
          global.api_url+'welcome/GetAllToDoList',
        );
        set_todo_list({lists : [...todo_list.lists ,result.data.lists]});
      };
      fetchData();

    }, []);
    
    if(todo_list.lists[0]){
      todolist = todo_list.lists[0].slice(0).reverse().map( (item,index) => ( 
                                                                          <Fragment key={index}> 
                                                                            <div style={style_cont}> 
                                                                              {item.todo} 
                                                                              <button type="button" className="btn btn-sm btn-danger remove_todo" style={remove_todo} onClick={RemoveToDo.bind(this,item.id)}>X</button>
                                                                              <button type="button" className="btn btn-sm btn-success remove_todo" style={edit_todo} onClick={EditToDo.bind(this,item.id,item.todo)}>&#10003;</button>
                                                                            </div>
                                                                          </Fragment>  ))
    }
    
    return <Fragment>
          <div className="timer_main_div">
            
            <div>
              <h1>3. TO DO LIST</h1>
            </div>

            <br /><br />

            <div className="todo_box">

            <form onSubmit={ToDoSubmit}>
              <input type="hidden" name="hidden_id" id="hidden_id" onChange={ToDoInputChange} value={todo_hidden_input} />
              <input type="text" name="txt_todo" onChange={ToDoInputChange} value={todo_input} placeholder="enter some value" style={style_todo_input} autoComplete="off" /><button type="submit">+</button>
            </form>

            <div style={style_todo_list}>

              {todolist}          

            </div>    

            </div>

          </div>
          <br /><br />
  </Fragment>

}

export default Todo;
