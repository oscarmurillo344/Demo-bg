import React from 'react'
import { AiOutlineSetting, AiOutlineShop, AiOutlineSnippets, AiOutlineSolution, AiOutlineTool, AiOutlineUngroup, AiOutlineUnlock, AiOutlineUpload, AiOutlineUser } from 'react-icons/ai'

const menu = [
    {
        nombre:"Activos y Pasivos", 
        icon: <AiOutlineUser></AiOutlineUser>,
        items: [
            {
                icon: <AiOutlineTool></AiOutlineTool>,
                nombre:"Total Pasivos"
            }, 
            {
                icon: <AiOutlineUngroup></AiOutlineUngroup>,

                nombre:"Corrientes"
            },
            {
                icon: <AiOutlineUpload></AiOutlineUpload>,

                nombre:"Ahorros"
            },
            {
                icon: <AiOutlineSnippets></AiOutlineSnippets>,

                nombre:"Depositos A Plazo"
            },
            {
                icon: <AiOutlineSolution></AiOutlineSolution>,
                nombre:"Cartera y Conrigente"
            }
     ] 
   },
   {
        nombre:"Cobertura", 
        icon: <AiOutlineShop></AiOutlineShop>,
        items: [
            {
                nombre:"Total Cobertura"
            }     
        ]
   },
    {
        nombre:"Informes", 
        icon: <AiOutlineSolution></AiOutlineSolution>,
        items: [
            {
                nombre:"opcion1"
            }, 
            {
                nombre:"opcion2"
            }]
   },
   {
       nombre:"Seguridad", 
       icon: <AiOutlineUnlock></AiOutlineUnlock>,
       items: [
           {
               nombre:"Usuarios"}, 
           {
               nombre:"Roles"}
        ] 
   },
   {
       nombre:"Configuraciones", 
       icon: <AiOutlineSetting></AiOutlineSetting>,
       items: [{nombre:"opcion1"}, {nombre:"opcion2"}]
   }
]

export default menu 