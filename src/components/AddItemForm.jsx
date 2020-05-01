import React , {Component} from "react";
import ToDoList from "./ToDoList";
class AddItemForm extends Component{
    state={
        data:{
            id:null,
            title:"", 
            completed:false
        }
    }

    handleSubmit(e){
        e.preventDefault();// pour ne pas rafraichir la page 
        const newItem = {...this.state.data};
        if(newItem.title!==""){
            this.props.AddItem(newItem)
            this.setState({ToDoList,data:{title:"",id:null}});
        }
    };
    handleChange= e =>{
        const data = {...this.state.data};
        data[e.currentTarget.name]=e.currentTarget.value;
        data.id=Date.now();
        this.setState({data});
    };  

    render(){
        return(
            <div className="addForm">
                <form onSubmit={e=> this.handleSubmit(e)} className="add-item-form ml-5">
                
                    <input
                    value={this.state.data.title}
                    name="title"
                    className="form-control"
                    type="text"
                    placeholder="Add To Do Item"
                    onChange={this.handleChange}
                    />
                
                </form>
                <button disabled={this.state.data.title===""}className="btn btn-primary ">Add</button>
            </div>
        );
    }

   


}

export default AddItemForm;
