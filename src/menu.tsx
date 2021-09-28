import React from 'react'
import { AiOutlineSetting, AiOutlineShop, AiOutlineSolution, AiOutlineUnlock, AiOutlineUser } from 'react-icons/ai'

const menu = [
    {
        nombre:"Activos y Pasivos", 
        icon: <AiOutlineUser></AiOutlineUser>,
        items: [
            {
                nombre:"Total Pasivos"
            }, 
            {
                nombre:"Corrientes"
            },
            {
                nombre:"Ahorros"
            },
            {
                nombre:"Depositos A Plazo"
            },
            {
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