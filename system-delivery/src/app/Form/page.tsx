"use client"
import Titulo from "@/components/Titulo"
import { useRouter } from "next/navigation"
import React, { useState, FormEvent, useEffect } from "react"


interface FormProps {
    categoria: string,
    nome: string,
    telefone: number,
    endereco?: string,
    numero?: number,
    lote?: number,
}

interface FormSubmit {
    onSubmit: (
        newForm: any
    ) => void
}

const categ = [
    { "categoria": "Selecione..." },
    { "categoria": "Terra" },
    { "categoria": "Marte" }
]


export default function Form({ onSubmit }: FormSubmit) {
    const router = useRouter()
    const [erro, setErro] = useState<string>('')
    const [form, setForm] = useState<FormProps>({
        categoria: '',
        nome: '',
        telefone: 0,
        endereco: '',
        numero: 0,
        lote: 0,
    })
    const [formDados, setFormDados] = useState<FormProps[]>(() => {
        if (typeof window === 'undefined') {
            return []
        }
        const formDadosOnStorage = localStorage.getItem("formDadosHistory")

        if (formDadosOnStorage) {
            const dadosArray = JSON.parse(formDadosOnStorage) 
            return Array.isArray(dadosArray)? dadosArray: [dadosArray]
        }
        return []
    })

    function handleFormSubmit(newForm: FormProps) {
        const newFormDados = ([...formDados, newForm])
        setFormDados(newFormDados)
        localStorage.setItem("formDadosHistory", JSON.stringify(newFormDados))
        setFormDados([{
            categoria: '',
            nome: '',
            telefone: 0,
            endereco: '',
            numero: 0,
            lote: 0,
        }])
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        if(validateForm(form)){
            let formToSubmit: FormProps = {
                categoria: form.categoria,
                nome: form.nome,
                telefone: form.telefone,
            };
            if(form.categoria === 'Terra') {
                formToSubmit = {
                    ...formToSubmit,
                    endereco: form.endereco,
                    numero: form.numero,
                }
            } 
            if(form.categoria === 'Marte') {
                formToSubmit = {
                    ...formToSubmit,
                    lote: form.lote,
                }
            }
            handleFormSubmit(formToSubmit)
        }
    }
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {id, value} = e.currentTarget
        setForm({
            ...form,
            [id]: value
        });
    }
    

    function validateForm(form: FormProps){
        if (form.categoria === 'Marte' && form.nome && form.telefone && form.lote) {
            setErro('')
            return true
        }
        if (form.categoria === 'Terra' && form.nome && form.telefone && form.endereco && form.numero) {
            setErro('')
            return true
        }
        setErro('')
        return false
    }


    return (
        <div className="flex justify-center items-center w-full border-2 border-lime-600 h-screen">
            <form className="flex justify-around items-left gap-1 flex-col h-2/3 w-8/12 border-4 border-lime-600 p-3"  onSubmit={handleSubmit}>
                <Titulo texto="Preencha o formulário de cadastro" />
                {erro && <div className="text-red-600">{erro}</div>}
                <label htmlFor="" className="border-2 p-3 rounded-lg w-4/12">Categoria:
                    <select onChange={handleInputChange} className="ml-8 w-36 text-center border-2 border-lime-500" name="" id="categoria" value={form.categoria}>
                        {categ.map((cat, index) => (
                            <option key={index} value={cat.categoria}>{cat.categoria}</option>
                        ))}
                    </select>
                </label>
                <label className="border-2 p-3 rounded-lg" htmlFor="">Nome:
                    <input placeholder=" Digite seu nome completo" type="text" id="nome" onChange={handleInputChange} />
                </label>
                <label className="border-2 p-3 rounded-lg w-5/12" htmlFor="">Telefone:
                    <input placeholder=" (21)999999999" type="tel" id="telefone" onChange={handleInputChange} />
                </label>
                {form.categoria === 'Terra' && (
                    <>
                        <label className="border-2 rounded-lg p-3" htmlFor="">Endereço:
                            <input placeholder=" Rua da calopsita" type="text" id="endereco" onChange={handleInputChange} />
                        </label>
                        <label className="border-2 rounded-lg p-3 w-5/12" htmlFor="">Número:
                            <input placeholder=" 444" type="tel" id="numero" onChange={handleInputChange} />
                        </label>
                    </>
                )}
                {form.categoria === 'Marte' && (
                    <label className="border-2 rounded-lg p-3 w-5/12" htmlFor="">Lote:
                        <input placeholder=" 1234" type="number" id="lote" onChange={handleInputChange} />
                    </label>
                )}
            <button type="submit" className="p-3 border-4 w-1/12 bg-lime-100">Enviar</button>
            </form>
        </div>
    )
}