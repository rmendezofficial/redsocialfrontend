import axios from 'axios'

export default axios.create({baseURL:'https://redsocial-avxo.onrender.com'})

export const URLBASE='http://localhost:8000'

export let loged='false'


export function IsLoged(){
    let username=sessionStorage.getItem('username')
    let email=sessionStorage.getItem('email')
    let id=sessionStorage.getItem('id')

    if (username!='' && id!='' && email!='') {loged='true'}else{loged='false'}
}