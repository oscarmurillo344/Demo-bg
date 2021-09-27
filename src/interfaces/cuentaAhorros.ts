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

interface DataTotal{
    actualCuentas: number
    actualSaldos: number
    actualTasa: number
    anteriorCuentas: number
    anteriorSaldos: number
    anteriorTasa: number
    total: string;
    variacionCuentas: number
    variacionSaldos: number
    variacionTasa: number
}

interface DataGrupo{
    key:number;
    actualCuentas: number
    actualSaldos: number
    actualTasa: number
    anteriorCuentas: number
    anteriorSaldos: number
    anteriorTasa: number
    id:number;
    descripcion:string;
    variacionCuentas: number
    variacionSaldos: number
    variacionTasa: number
}

