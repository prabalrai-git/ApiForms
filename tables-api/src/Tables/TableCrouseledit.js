import { Space, Table, Button, Modal, Input,Form, DatePicker,InputNumber } from 'antd';
import { useEffect, useState } from 'react';


const TableCrousel = () =>{
 const [counter, setCounter] = useState([]);
 const [isEditing, setIsEditing] = useState(false);
 const [editingRecord,setEditingRecord] = useState(null);

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
              <Button type ='link' onClick={()=>onEditStudent(record)}>Edit</Button>
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

      const onEditStudent =(record)=>{
        setIsEditing(true)
        setEditingRecord({...record})

      }
    return (
        <>
        <Table columns={columns} dataSource={counter} />
        <Modal title= 'Edit Data'
        visible={isEditing}
        okText="Save"
        onCancel={()=>{
            setIsEditing(false);
        }}
        onOk={()=>{
            setIsEditing(false);
        }}
        >    
            <Form>
                <Form.Item label="Counter Name"  type='name' >
                <Input value={editingRecord?.CounterName}/>
                </Form.Item>
                <Form.Item label="Counter location"type='name'>
                <Input value={editingRecord?.CounterLocation}/>
                </Form.Item>
                <Form.Item label="EntryDate" type="date">
                <DatePicker  />
                </Form.Item>
                <Form.Item label="Company Id">
                <InputNumber value={editingRecord?.CompanyId} />
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}

export default TableCrousel;