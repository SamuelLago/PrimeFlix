import { Link } from "react-router-dom";
import "./error.css";

function Error(){
    return(
        <div className="not-found">
            <h1>Erro 404</h1>
            <h2>Pagina nao encontrada!</h2>
            <Link to="/">Veja todos os filmes clicando aqui!</Link>
        </div>
    )
}

export default Error;