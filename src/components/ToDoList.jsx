import React , {Component} from "react";
import NewItem from "./NewItem";
import axios from 'axios';
import AddItemForm from "./AddItemForm";

class ToDoList extends Component{
    state={
        MainToDoList:[],
        ToDoList :[
            {id:1,title :"grocery",completed:false},
            {id:2,title:"study",completed:false},
            {id:3,title:"wash the car",completed:false}
        ]
        

    
    };
    async componentDidMount(){
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos')
        
        this.setState({ToDoList:data,MainToDoList:data})


    }
    

    AddItem= item =>{
        const ToDoList=[item,...this.state.ToDoList]
        this.setState({ToDoList})
    }

    handleChange= e =>{
        const data = {...this.state.data};
        data[e.currentTarget.name]=e.currentTarget.value;
        data.id=Date.now();
        this.setState({data});
        
    };
    handleDelete= async listItem =>{
        const extodolist= this.state.ToDoList
        const exMainTodolist= this.state.MainToDoList
        const ToDoList = this.state.ToDoList.filter(item => item.id !== listItem.id)
        const MainToDoList = this.state.MainToDoList.filter(item => item.id !== listItem.id)
        this.setState({ToDoList,MainToDoList});
        try
        {
            const {status}= await axios.delete('https://jsonplaceholder.typicode.com/todos/'+listItem.id)
        console.log(status)
        }
        
        catch(err)
        {
            this.setState({ToDoList:extodolist,MainToDoList:exMainTodolist})
        }

        
    };
    handleEdit= async (e,listItem) =>{
        e.preventDefault();
        const extodolist= this.state.ToDoList
        const exMainTodolist= this.state.MainToDoList
        const data = listItem;
        this.setState({ToDoList,MainToDoList:exMainTodolist});
        try
        {
            const res= await axios.put('https://jsonplaceholder.typicode.com/todos/'+listItem.id,data)
            console.log(res);
            console.log("bien edité");
        }
        
        catch(err)
        {
            this.setState({ToDoList:extodolist,MainToDoList:exMainTodolist})
        }

        
    };


        /* handle delete : plus de temps pour repondre
        const {status} = await axios.delete('https://jsonplaceholder.typicode.com/todos/'+listItem.id)
        if (status===200){

        console.log(listItem);
        const ToDoList = this.state.ToDoList.filter(item => item.id !== listItem.id)
        this.setState({ToDoList});*/

    

    // on peut ajouter dans state : importance and completed , pour ajouter le checkbox ou modifier le background 

    handleSubmit(e){
        e.preventDefault();// pour ne pas rafraichir la page 
        const newItem = {...this.state.data};
        if(newItem.title!==""){
            const ToDoList=[newItem, ...this.state.ToDoList];
            this.setState({ToDoList,data:{title:"",id:null}});

        }
    };
    handleCheck=listItem =>{
        const index=this.state.ToDoList.findIndex(item=>item.id===listItem.id)
        const ToDoList=this.state.ToDoList
        ToDoList[index].completed= !ToDoList[index].completed
        this.setState({ToDoList});
        console.log(this.state.ToDoList)
    };
    
    
    

    sort=(e)=>{
        const id = e.currentTarget.id
        let ToDoList=[]
 
        if(id==="checked")
         ToDoList = this.state.MainToDoList.filter(item=>item.completed)
        else if(id ==='unchecked')
         ToDoList = this.state.MainToDoList.filter(item=>!item.completed)
        else
         ToDoList=this.state.MainToDoList
          this.setState({ToDoList});

    };

    

    render(){
       
        return(
            <div className='container'>
                <h1 className="text-center mb-3">TO DO LIST</h1>
                <AddItemForm AddItem={this.AddItem}/>
                <div className="btn-group btn-group-toggle m-3 ml-5" data-toggle="buttons">
                    <label className="btn btn-secondary ">
                    <input type="radio" name="options" id="all"  onClick={this.sort}/> All
                    </label>
                    <label className="btn btn-secondary">
                    <input type="radio" name="options" id="checked" onClick={this.sort}/> Checked
                    </label>
                    <label className="btn btn-secondary ">
                    <input type="radio" name="options" id="unchecked" onClick={this.sort}/> Unchecked
                    </label>
                </div>
                
               <ul className="list-group mt-4">
                    {this.state.ToDoList.map(listItem =>(
                       
                        //<TodoItem listItem={listItem} handleCheck={this.handleCheck} /> pour la bouton check/uncheck il mereste à la faire
                        <NewItem key={listItem.id} 
                        listItem={listItem} 
                        handleDelete={this.handleDelete} 
                        handleCheck={this.handleCheck} 
                        AddItem={this.AddItem}
                        handleEdit={this.handleEdit}
                         />
                    )) }
                </ul>
               
            </div>
        );
    }
    
}
export default ToDoList;