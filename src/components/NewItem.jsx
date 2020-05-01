import React, {Component}  from "react";

import axios from 'axios';


class NewItem extends Component {
   state = {
        data:{
            id:null,
            title:"", 
            edited:false
        }
    }


    handleEdit=()=>{
        this.setState({edited:true});
    }


    handleChange= e =>{
       
        const data = this.props.listItem;
        data[e.currentTarget.name]=e.currentTarget.value;
        data.id=Date.now()
        this.setState({data});
        
    };
    handleSubmit= async (e)=>{
        e.preventDefault();
        const data= this.props.listItem;
        //data.title=title;
        try {
            const res = await axios.put(
              "https://jsonplaceholder.typicode.com/todos/" + this.props.listItem.id,
              data
            );
            console.log(res.data, "successfully changed");
        }
        catch(err){
            console.log(err);
        }

       
        
    };
    





  
    
        render() { 
            const edited = this.state.edited;
        
            return(
                //<ul className="list-gorup m-2">  
                    
    
                    <section>
                            
                        <li className="list-group-item todo-item ml-5" >
                            { edited ? 
                            <form onSubmit={e=> this.props.handleEdit(e)} >
                                <input
                                    type="text"
                                    name="title"
                                    value={this.props.listItem.title}
                                    onChange={this.handleChange}
                                    className="form-control"
                                />
                            </form>
                            : <span>{this.props.listItem.title}</span>}


                            <div className="parent">
    
                                <button 
                                    type="button"
                                    className="btn btn-outline-success float-right"
                                    onClick={this.handleEdit}
                                >Edit</button> 
        
        
                                <button
                                    type="button"
                                    className="btn btn-outline-danger ml-3 float-right "
                                    onClick={()=> this.props.handleDelete(this.props.listItem)}
                                    >
                                    
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className={this.props.listItem.completed ? 'btn btn-info ml-3 float-right':'btn btn-secondary ml-3 float-right '}
                                    onClick={()=> this.props.handleCheck(this.props.listItem)}
                                    >
                                    {this.props.listItem.completed ? 'Check':'Uncheck'}
                                </button>

                            </div>
                    
                    
                    
                        </li>
    
                    </section>
                //</ul>
           
            );
        }


}
 
export default NewItem;
