import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { CompactMovieDataInterface } from '../../Interfaces/CompactMovieDataInterface';
import { PaginationDataInterface } from '../../Interfaces/PaginationDataInterface';
import Pagination from '../Pagination';
import { CardsHoldingContainer, CoverDiv, CoverImg, PaginationDiv, TextContentDiv } from './styles';
import MovieCard from '../MovieCard';

const BestMoviesOfLastYear = () => {
    const [movieList, setMovielist] = useState<CompactMovieDataInterface[]>([]);
    const [paginationData, setPaginationData] = useState<PaginationDataInterface | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Reference for the CardsHoldingContainer
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    const fetchMovies = (page: number) => {
        const bestOfLastYearUrl = `http://127.0.0.1:8000/api/best-movies-of-last-year?page=${page}`;
        axios.get(bestOfLastYearUrl)
            .then(response => {
                if (response.status === 200) {
                    const { data, ...pagination } = response.data;
                    setMovielist(data);
                    setPaginationData(pagination);
                    setCurrentPage(page);

                    // Scroll to the CardsHoldingContainer
                    if (cardsContainerRef.current) {
                        cardsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                    }

                } else {
                    console.log('Something went wrong');
                }
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    };

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    return (
        <div>
            <div>
                <div>
                    <div>
                        {currentPage === 1 && <CoverDiv>
                            <CoverImg src="https://top100filmes.com.br/assets/melhores-do-ano/capaMelhores2023-2.webp" alt="Melhores Filmes 2023" />
                        </CoverDiv>}
                        <h1>Melhores filmes de 2023!</h1>

                        {currentPage === 1 && <TextContentDiv>
                            <p>
                                2023 foi um ano com bastante lançamentos, apesar da greve dos atores e roteiristas uma grande
                                quantidade de filmes foram lançados, alguns, memoráveis e que com certeza entrarão para a história do cinema. Mas como nem tudo são flores, tivemos alguns filmes que foram no mínimo decepcionantes, e outros que... bem...Digamos que pra serem ruins ainda teriam que melhorar muito.
                            </p>
                            <br />
                            <p>
                                Nesse top especial de fim de ano não iremos citar os piores filmes de 2023, apenas os melhores, o "crème de la crème", com algumas ressalvas, onde os últimos colocados são os "menos piores" e não necessariamente fazem parte dos melhores...e você concorda com o top? Seu filme favorito ficou de fora? Comente nas redes sociais, deixe seu voto aqui no site, compartilhe com amigos, participe!
                            </p>
                            <p>
                                Sem mais delongas, vamos aos filmes
                            </p>
                        </TextContentDiv>}

                        <CardsHoldingContainer ref={cardsContainerRef}>
                            {movieList && movieList.map((movie) => (
                                <MovieCard movie={movie} key={movie.rank} />
                            ))}
                        </CardsHoldingContainer>

                        {paginationData && (
                            <PaginationDiv>
                                <Pagination
                                    currentPage={paginationData.current_page}
                                    lastPage={paginationData.last_page}
                                    onPageChange={(page) => fetchMovies(page)}
                                />
                            </PaginationDiv>
                        )}
                    </div>
                </div>
            </div>

            <div id="disqus_thread"></div>
            <noscript>
                Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
            </noscript>
        </div>
    );
};

export default BestMoviesOfLastYear;