import { FilmeItemPoster, FilmeItemTextos, InnerContent, MovieItem, RankingENota, Styledlink, TituloAnoDuracao } from './styles';
import { CompactMovieDataInterface } from '../../Interfaces/CompactMovieDataInterface';



const MovieCard = ({ movie }: { movie: CompactMovieDataInterface }) => {

    const posterUrl = movie.poster.replace('original', 'w154');
    console.log(posterUrl);
    return (


        <MovieItem>
            <Styledlink to={`/filme/?s=${encodeURIComponent(movie.slug)}`}>
                <InnerContent >
                    <div>
                        <FilmeItemPoster
                            src={posterUrl}
                            alt={`Poster of ${movie.titulo_portugues}`}
                            loading="lazy"
                        />
                    </div>
                    <FilmeItemTextos>
                        <RankingENota>
                            <h2>{movie.rank} - {movie.nota} <span >&#9733;</span></h2>
                        </RankingENota>
                        <TituloAnoDuracao>
                            <h3>{movie.titulo_portugues}<br />({movie.ano_lancamento} - {movie.duracao}min)</h3>
                            {movie.tagline && <h5>{movie.tagline}</h5>}
                        </TituloAnoDuracao>

                    </FilmeItemTextos>
                </InnerContent>
            </Styledlink>
        </MovieItem>

    );
};

export default MovieCard;