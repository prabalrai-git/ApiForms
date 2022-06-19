import { Space, Table, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';


const TableOne = () =>{
 let [counter, setCounter] = useState([]);






const navigate = useNavigate();

    useEffect(()=>{
        fetch('https://lunivacare.ddns.net/LunivaRouteAPI/LunivarouteManagementApi/GetCounterDetails')
      .then( response => response.json())
      .then(json => setCounter(json.CounterDetails));
    },[])

    const columns = [
        {
          title: 'CounterName',
          dataIndex: 'CounterName',
          key: 'CounterName'
        },
        {
          title: 'CounterLocation',
          dataIndex: 'CounterLocation',
          key: 'CounterLocation',
        },
        {
          title: 'EntryDate',
          dataIndex: 'EntryDate',
          key: 'EntryDate',
        },
        {
          title: 'CompanyId',
          dataIndex: 'CompanyId',
          key: 'CompanyId',
        },
        {
          title: 'Action',
          key: 'action',
          render: (record) => (
            <Space size="middle">
              <Button type = "link" onClick={()=>{
                navigate(`./FormOne?q=${record.CId}`)
              } }>Edit</Button>
              <Button  type = "link" onClick={()=>onDelete(record)} >Delete</Button>
            </Space>
          ),
        },
      ];
     const onDelete =(record) =>{
     
        setCounter((pre)=>{
          return pre.filter((counterName)=>counterName.CId !== record.CId)
        })
      }
     
    
    return (
        <>
        <Table columns={columns} dataSource={counter} />
        </>
    )


}

export default TableOne;