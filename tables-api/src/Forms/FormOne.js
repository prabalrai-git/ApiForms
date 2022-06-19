import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
   
  } from 'antd';
  
  import { useState, useEffect } from 'react';
  import { useSearchParams } from 'react-router-dom';
  // import moment from 'moment';


  
  const FormOne = () => {
    const [counter, setCounter] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const Cid = parseInt(searchParams.get("q"));
    const dummyData = {
      CId: 1,
      CompanyId: 1,
      CounterLocation: "Ratna Park",
      CounterName: "Counter 1",
      // EntryDate: '',
     
    }

    useEffect(()=>{
      fetch('https://lunivacare.ddns.net/LunivaRouteAPI/LunivarouteManagementApi/GetCounterDetails')
    .then(response => response.json())
    .then(setCounter((pre)=>{
      let data1 = pre.CounterDetails;
      return data1.map((item)=>{
        for(let i=1;i<=data1.length;i++){
          if(item.CId===Cid){
            return item;
          }
        }
        
      })
    }) )
  },[])












  // let prevVal = {}
  // if (counter !== undefined) {
  //   prevVal = {
  //     ...counter,
  //     EntryDate: moment(counter?.EntryDate)
  //   }
  // }



  
    return (
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{marginTop:200}}
        initialValues={counter}
       
      >
        
        <Form.Item label="Counter Name" name ='CounterName' type='name' >
          <Input />
        </Form.Item>
        <Form.Item label="Counter location" name='CounterLocation' type='name'>
          <Input/>
        </Form.Item>
       
       
        <Form.Item label="EntryDate">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Company Id" name="CompanyId">
          <InputNumber />
        </Form.Item>
        
        <Form.Item style={{marginLeft:260}}>
          <Button>Edit</Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default FormOne;