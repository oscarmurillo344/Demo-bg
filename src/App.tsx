
import { GridCellParams, GridColDef, GridFilterItem, GridStateColDef } from '@material-ui/data-grid';
import './App.css';
import GridViewBG from './componentes/gridViewBG/gridViewBG';
import MenuBG from './componentes/menuBG/menuBG';
import data from './data.json'

function App() {
  const columns: any[] = [
    {dataIndex: 'id', key:'id', title: 'Id', width: 160},
    {dataIndex: 'nombre', key:'nombre', title: 'Nombre', width: 170},      
    {dataIndex: 'apellido', key:'apellido', title: 'Apellido', width: 170},
    {dataIndex: 'ci', key:'ci',  title: 'Ci', width: 170},
    {dataIndex: 'fehaNacimiento', key:'fehaNacimiento' , title: 'Fecha Nacimiento', width: 170},
    {dataIndex: 'correo', key:"correo",  title: 'Correo', width: 170},
  ];


  let rows = new Array<any>();
  for(let recorre = 0; recorre<300000; recorre++)
  {
    rows.push({
      key: recorre+1,
      id:recorre+1,
      nombre: "Nathalie Andrea",
      apellido: "Bohorquez Velez",
      ci: "0932312113",
      fehaNacimiento : "1998/05/03",
      correo: "leonel-14-velez@hotmail.com",
})
  }
  return (
      <> 
        <MenuBG>
          <div className="flex" style={{justifyContent:"center"}}  >
            <GridViewBG height={325} columns={columns} rows={rows} pagesize={10}  width={1200} 
              
            />
          </div>
        </MenuBG>
        
      </>
  );
}

export default App;
