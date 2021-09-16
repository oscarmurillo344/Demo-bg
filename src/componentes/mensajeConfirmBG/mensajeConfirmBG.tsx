import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd'
const  {confirm} =  Modal;



const mensajeConfirmBG = ()=>{
    return new Promise((resolve, reject)=>{

    })
    confirm({
        title: 'Desea eliminar este elemento?',
        icon: <ExclamationCircleOutlined />,        
        onOk() {
          
        },
        onCancel() {
          
        },
    })
}

export default mensajeConfirmBG