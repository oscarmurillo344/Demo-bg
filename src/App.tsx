
import { GridCellParams, GridColDef, GridFilterItem, GridStateColDef } from '@material-ui/data-grid';
import './App.css';
import GridViewBG from './componentes/gridViewBG/gridViewBG';
import MenuBG from './componentes/menuBG/menuBG';
import data from './data.json'

function App() {
  const columns: GridColDef[] = [
    {field: 'id', headerName: 'Id', width: 160},
    {field: 'nombre', headerName: 'Nombre', width: 170},      
    {field: 'apellido', headerName: 'Apellido', width: 170},
    {field: 'ci', headerName: 'Ci', width: 170},
    {field: 'fehaNacimiento', headerName: 'Fecha Nacimiento', width: 170},
    {field: 'correo', headerName: 'Correo', width: 170},
    {field: 'fecha', headerName: 'Fecha', width: 170, type:"date" }
  ];


  let rows = new Array<any>();
  for(let recorre = 0; recorre<300000; recorre++)
  {
    rows.push({
      id: recorre+1,
      nombre: "Nathalie Andrea",
      apellido: "Bohorquez Velez",
      ci: "0932312113",
      fehaNacimiento : "1998/05/03",
      correo: "leonel-14-velez@hotmail.com",
      fecha: new Date()
})
  }
  return (
      <> 
        <MenuBG>
          <div className="flex" style={{justifyContent:"center"}}  >
            <GridViewBG height={525} columns={columns} rows={rows} pagesize={8}  width={1200} 
              
            />
          </div>
        </MenuBG>
        
      </>
  );
}

export default App;
