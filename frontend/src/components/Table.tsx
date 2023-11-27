import React from 'react'

interface IProps{
    columns:{header:string;name:string}[]
    data:any[]
}

const Table:React.FC<IProps> = (props) => {
    const {data,columns} = props
  return (
    <table>
        <thead>
            <tr>
                {columns.map(col=><th key={col.header}>{col.header}</th>)}
            </tr>
        </thead>
        <tbody>
            {data.map((x,i)=>
            <tr key={i}>
                {columns.map(col=><td key={col.name}>{x[col.name]}</td>)}
            </tr>)}
        </tbody>
    </table>
  )
}

export default Table