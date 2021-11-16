export interface catalogosCampos{
    campo:string;

}

export interface FiltrosValores {
    id:number
    campo:string
    valor?:any
    listaFiltro:any[]
}

export interface ModalBGStateCatalogo{
    campo:string;
    tipoDato:string;
    isCatalogo: boolean
    catalogoValue:catalogosValues[] 
    FiltrosVista:FiltrosValores
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