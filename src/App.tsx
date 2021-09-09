
import { GridColDef } from '@material-ui/data-grid';
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
    {field: 'correo', headerName: 'Correo', width: 170}
  ];

  const rows = data
  return (
      <> 
        <MenuBG>
          <div className="flex" style={{justifyContent:"center"}}  >
            <GridViewBG height={529} columns={columns} rows={rows} pagesize={8}  width={1030}  />
          </div>
        </MenuBG>
        
      </>
  );
}

export default App;
