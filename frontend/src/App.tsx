import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { getBatteries, postBattery } from './services/battery';
import Table from './components/Table';
import { buildQueryString, debounce, sortByKey } from './utils/utils';

type Entity={name:string;post_code:number;watt_capacity:number}

const initialInput={name:'',post_code:0,watt_capacity:0}

function App() {

  const [data,setData] = useState<{batteries:Entity[],total:number}>({batteries:[],total:0})
  const [input,setInput] = useState<Entity>(initialInput)
  const [search,setSearch]=useState({name:'',min_post_code:'',max_post_code:''})

  useEffect(()=>{
    getBatteries().then(res=>{
      setData(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setInput({...input,[name]:value})
  }

  const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    try{
      await  postBattery(input)
      setData({batteries:[...data.batteries, input],total:data.total+1})
    }catch(err){
      console.log(err)
    }
    setInput(initialInput)    
  }

  const handleSearch=useCallback(debounce(async(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    
    const inputs = {...search,[name]:value}
    const params = buildQueryString(inputs)
    
    setSearch(inputs)

    try{
      const res = await getBatteries(`?${params}`)
      setData(res.data)
    }catch(err){
      console.log(err)
    }
  },600),[search])

  return (
    <div className="main">
      <h1>Virtual Power Plant System</h1>
      <form style={{display:'flex', flexDirection:'column', gap:5}} onSubmit={onSubmit}>
        <h3>Create Battery</h3>
        <InputField name="name" placeholder='Name' value={input.name} onChange={handleChange} />
        <InputField name="post_code" placeholder='Post Code' value={input.post_code} onChange={handleChange} />
        <InputField name="watt_capacity" placeholder='Watt Capacity' value={input.watt_capacity} onChange={handleChange} />
        <button style={{width:'100px',padding:10, cursor:'pointer'}} type='submit'>Create</button>
      </form>
      <br />
      <div style={{display:'flex',flexDirection:'column',gap:5}}>
      <div style={{display:'flex', gap:5}}>
      <InputField name="name" placeholder='Search' onChange={handleSearch} />
      <InputField name="min_post_code" placeholder='Min Post Code' onChange={handleSearch} />
      <InputField name="max_post_code" placeholder='Max Post Code' onChange={handleSearch} />
      </div>
      <Table 
        columns={
          [
            {name:'name',header:'Name'},
            {name:'post_code',header:'Post Code'},
            {name:'watt_capacity',header:'Watt Capacity'}]
          }
        data={data.batteries.sort(sortByKey('name'))} 
        />
        <h5>Total:{data.total}</h5>
      </div>
    </div>
  );
}

export default App;
