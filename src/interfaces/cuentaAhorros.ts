export default interface DataSet //esta interface se va a reutilizar en la renderizacion de todos los datagrid
{
    key:number;
    codigo:string;
    descripcion:string;
    anterior:DataSetItems;
    actual:DataSetItems;
    variacion:DataSetItems;
}

interface DataSetItems //esta interface se va a reutilizar en la renderizacion de todos los datagrid
{
    cuenta:number;
    saldo:number;
    tasa:number;
}
