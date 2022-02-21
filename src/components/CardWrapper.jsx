import React, { useEffect, useState } from "react";
import Card from "./Card";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CardWrapper = () => {
  const [moviesList, setMoviesList] = useState([]);

  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US&page=1`,
    fetcher
  );

  useEffect(() => {
    setMoviesList(data?.results);
  }, [data]);

  if (error)
    return (
      <p className='text-xl font-bold grid place-items-center w-full min-h-screen'>
        failed to load...sry
      </p>
    );
  if (!data)
    return (
      <div className='flex items-center gap-4 md:gap-5 flex-wrap justify-center my-5'>
        {Array(20)
          .fill(null)
          .map((idx) => (
            <div
              key={new Date().getSeconds() * Math.random()}
              className='animate-pulse w-40 card h-60 md:w-56 bg-slate-900 shadow-xl'
            ></div>
          ))}
      </div>
    );

  return (
    <main className='flex items-center gap-4 md:gap-5 flex-wrap justify-center my-10 mt-5'>
      {moviesList &&
        moviesList.map((movieData, idx) => (
          <Card key={movieData?.id} movieData={movieData} />
        ))}
    </main>
  );
};

export default CardWrapper;
