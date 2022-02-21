import React, { useState, useEffect } from "react";

import useSWR from "swr";
import MovieDetails from "./MovieDetails";
import YouTubeEmbbed from "./YouTubeEmbbed";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Card = ({
  movieData: { title, poster_path, release_date, id, genre_ids, vote_average },
}) => {
  const [showModal, setShowModal] = useState(false);
  const [toggleModalContent, setToggleModalContent] = useState(false);
  const [currentTriler, setCurreTriler] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [firstGenre, setFirstGenre] = useState("");

  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US&append_to_response=videos`,
    fetcher
  );

  const { data: genreList, error: genreError } = useSWR(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US`,
    fetcher
  );

  const toggleModal = () => {
    setShowModal((oldToggle) => !oldToggle);
  };

  const toggleDetails = () => {
    setToggleModalContent((old) => !old);
  };

  useEffect(() => {
    if (showModal) {
      setCurreTriler(
        data?.videos?.results.filter((list) => {
          if (list?.type === "Trailer") {
            return list?.key;
          }
        })
      );
      if (data?.id === id) {
        setMovieDetails({
          title: data?.title,
          original_title: data?.original_title,
          imdb_id: data?.imdb_id,
          overview: data?.overview,
          runtime: data?.runtime,
          revenue: data?.revenue,
          budget: data?.budget,
          tagline: data?.tagline,
          vote_average: data?.vote_average,
          production_companies: [...data?.production_companies],
        });
      }
    }
  }, [showModal, id]);

  useEffect(() => {
    setFirstGenre(
      genreList?.genres.filter((genre) => {
        if (genre?.id === genre_ids[0]) return genre?.name;
      })
    );
  }, [genreList]);

  return (
    <section>
      <div
        onClick={toggleModal}
        className='card w-40 md:w-56 bg-slate-900 shadow-xl'
      >
        <figure>
          <img
            className='w-full h-40 object-cover'
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
        </figure>
        <div className='card-body p-2'>
          <h2 className='card-title text-base md:text-xl line-clamp-1'>
            {title}
          </h2>
          <div className='flex items-center space-x-1 mb-2 md:mb-0 md:mt-0.5'>
            <button className='btn no-animation btn-xs text-[0.5rem] btn-outline'>
              {new Date(release_date).getFullYear()}
            </button>
            {firstGenre && genreList && (
              <button className='btn no-animation btn-xs text-[0.5rem] btn-outline'>
                {firstGenre[0]?.name}
              </button>
            )}
            {!genreList && (
              <button className='btn no-animation btn-xs text-[0.5rem] btn-outline'>
                ...
              </button>
            )}
            {genreError && !genreList && (
              <button className='btn btn-error no-animation btn-xs text-[0.5rem] btn-outline'>
                Error
              </button>
            )}
            <button className='btn no-animation btn-xs text-[0.5rem] btn-outline btn-accent'>
              {vote_average}
            </button>
          </div>
          <div className='justify-end card-actions'>
            <button className='btn btn-xs md:btn-sm btn-primary space-x-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span>Play</span>
            </button>
          </div>
        </div>
      </div>

      {showModal ? (
        <>
          <div className='justify-center bg-gray-800/50 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='card relative w-[40rem] bg-base-100 shadow-xl'>
              <div className='card-body p-0'>
                <h2 className='card-title items-center p-3 px-5'>
                  <p className='flex-1 w-full md:text-xl text-base text-slate-200'>
                    {!toggleModalContent ? "Details" : "Trailer"} : {title}
                  </p>
                  <button
                    onClick={toggleDetails}
                    className='btn btn-link btn-xs'
                  >
                    {toggleModalContent ? `View Detail` : `Watch Trailer`}
                  </button>
                </h2>
                <div className='grid place-items-center'>
                  {toggleModalContent ? (
                    <>
                      {currentTriler.length === 0 ? (
                        <p className='font-semibold text-xl py-10'>
                          No Trailer Found...sry
                        </p>
                      ) : (
                        <YouTubeEmbbed
                          trailerId={
                            currentTriler.length === 0
                              ? null
                              : currentTriler[0]?.key
                          }
                        />
                      )}
                    </>
                  ) : (
                    <MovieDetails movieInfo={movieDetails} />
                  )}
                </div>
                <div className='justify-end card-actions p-3 px-5'>
                  <button
                    onClick={toggleModal}
                    className='btn btn-primary btn-sm'
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </section>
  );
};

export default Card;
