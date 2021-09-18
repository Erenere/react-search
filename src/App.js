import './App.css';
import { services } from './utils';
import React from 'react';
import Element from './Element';

function App() {

  const [index,setIndex] = React.useState(0);
  const [list,setList] = React.useState([]);
  const [filter,setFilter] = React.useState("");
  const [filterType,setFilterType] = React.useState(0);
  
  React.useEffect(() => {
    fetch(`${services.apiUrl}/photos`).then(res=>res.json()).then(result=>{
      const arr = [...result];
      setList(arr.slice(0,100));
    })
  }, [list]);

  let pageNumbers = [];
  
  for(let i=1;i<=Math.ceil(list.length/10);i++){
    pageNumbers.push(i);
  }

  const changePage = (event)=>{
    setIndex((parseInt(event.target.textContent)-1)*10);
  };

  const changeHandler = (event)=>{
    
    const input = String(event.target.value).toLowerCase();
    setFilter(input); 
    setFilterType(0);
    
    setIndex(0);
  };

  const changeHandler2 = (event)=>{
    const input = String(event.target.value);
    setFilter(input); 
    setFilterType(1);
    setIndex(0);
  }

  return (
    <div className="App">
      <div className="top">
        <h1>Items</h1>
        <form className="Search">
        <input type="text" autoComplete="off" placeholder="Search..." name="Search" className="input" onChange={(event)=>changeHandler(event)}></input>
      </form>
      <form className="Search2">
        <input type="text" autoComplete="off" placeholder="Search By Id..." name="Search" className="input" onChange={(event)=>changeHandler2(event)}></input>
      </form>
      </div>
      
      <div className="Elements">        
        {!filterType?(filter.length>=2 ? (
          list.filter((el)=>(
            el.title.search(filter)!==-1
          )).slice(index,index+10).map((el)=>{
            return <Element url={el.url} title={el.title} id={el.id}></Element>;
          })
        )
        :(          
        list.slice(index,index+10).map((el)=>{    
        return <Element url={el.url} title={el.title} id={el.id}></Element>
        })
        )):(filter.length ? (
          list.filter((el)=>(
            String(el.id).search(filter)!==-1
          )).slice(index,index+10).map((el)=>{
            return <Element url={el.url} title={el.title} id={el.id}></Element>;
          })
        )
        :(          
        list.slice(index,index+10).map((el)=>{    
        return <Element url={el.url} title={el.title} id={el.id}></Element>
        })
        ))
        }
      </div>
    <div className="buttons">
      {!filterType?(pageNumbers.slice(0,Math.ceil(list.filter((el)=>(
      el.title.search(filter)!==-1
    )).length/10)).map((n)=>(
        <button className="button" onClick={changePage}>{n}</button>
      ))):(pageNumbers.slice(0,Math.ceil(list.filter((el)=>(
        String(el.id).search(filter)!==-1
      )).length/10)).map((n)=>(
          <button className="button" onClick={changePage}>{n}</button>
        )))}
    </div>      
    </div>
  );
}

export default App;