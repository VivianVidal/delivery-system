interface TituloProps{
    texto:string
}

export default function Titulo(props: TituloProps){
    return(
        <h1 className="text-4xl font-serif p-6">{props.texto}</h1>
    )
}