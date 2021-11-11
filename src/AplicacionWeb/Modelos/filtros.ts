export interface catalogosCampos{
    campo:string;

}

export interface FiltrosValores {
    id:number
    campo:string
    listaFiltro:any[]
}

export interface catalogosValues{
    campo:string;
    id:string;
    value:string;

}

export interface catalogosFiltros{
    tipoDato:string;
    id:string;
    value:string;
}

export interface informacionFiltros{
    campo:string;
    tipoDato:string;
    esCatalogo:boolean;    
}