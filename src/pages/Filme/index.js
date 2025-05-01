import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme.css';

import api from '../../services/api';
import { toast } from "react-toastify";

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilmes] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "f52a2a7bb34a5699eeee9686af8bd827",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilmes(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Filme não encontrado");
                navigate("/", { replace: true });
            });
        }

        loadFilme();

        return () => {
            console.log("Componente foi desmontado");
        };
    }, [navigate, id]);

    function SalvarFilme() {
        const minhaLista = localStorage.getItem("@primeFlix");
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilmes = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

        if (hasFilmes) {
            toast("FILME JÁ ADICIONADO");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
        toast("Filme salvo com sucesso!!");
    }

    if (loading) {
        return <div className="loading"><h2>Carregando detalhes...</h2></div>;
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Nota: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={SalvarFilme}>Salvar</button>
                <button>
                    <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;
