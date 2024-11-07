import { useState, useRef, useEffect } from "react";
import axios from "axios";

export function CreatePost() {
    
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    const [photo, setPhoto]=useState('')

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (fileInputRef.current) {
            fileInputRef.current.addEventListener('change', handleFileChange);
        }
        return () => {
            if (fileInputRef.current) {
                fileInputRef.current.removeEventListener('change', handleFileChange);
            }
        };
    }, []);

    const handleFileChange = (e) => {
        const files = e.target.files;
        leerArchivo(files);
    };

    const leerArchivo = (files) => {
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.addEventListener('load', (e) => {
                let newImg = document.querySelector('.resultadoimg');
                newImg.classList.add('resultadoimg2');
                newImg.src = e.currentTarget.result; 
                setPhoto(e.currentTarget.result);
            });
        }
    };

    const createPost = async () => {
        try {
            let user_id = sessionStorage.getItem('id');

            let cuerpo = { "name": name, "description": description, "photo": photo, "user_id": user_id };
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
            };
            const response = await axios.post('https://redsocial-avxo.onrender.com/posts/create_post', cuerpo, { headers, withCredentials: true });
            
            if (response) {
                alert('Post successfully created');
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                createPost();
            }}>
                <input onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <button className="BotonCrear">Subir</button>
            </form>
            
            <label className="SubirLabel">Imagen</label>
            <label htmlFor="file-upload" className="custom-file-upload">
                <span>Subir Archivo</span>
                <input
                    className="Imagen"
                    placeholder="Imagen"
                    type="file"
                    id="file-upload"
                    ref={fileInputRef}  
                />
            </label>
            <div className="resultado">
                <img className="resultadoimg" alt="Preview" />
            </div>
        </div>
    );
}
