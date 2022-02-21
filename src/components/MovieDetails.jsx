import React from "react";

const MovieDetails = ({ movieInfo }) => {
  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hour(s) and " + rminutes + " minute(s).";
  }

  return (
    <div className='w-full md:h-[30rem] h-[20rem] text-left px-5'>
      <div className='flex items-start space-y-1 md:space-y-2 flex-col line-clamp-none'>
        <p className='font-medium text-base'>
          <span className='text-green-500'>Original Title : </span>
          <span>
            {movieInfo?.original_title ? movieInfo?.original_title : ""}
          </span>
        </p>
        <p className='font-medium text-base'>
          <span className='text-green-500'>Title : </span>
          <span>{movieInfo?.title ? movieInfo?.title : "-"}</span>
        </p>
        <p className='font-medium text-base'>
          <span className='text-green-500'>Tagline : </span>
          <span>{movieInfo?.tagline ? movieInfo?.tagline : "-"}</span>
        </p>
        <p className='font-medium text-base'>
          <span className='text-green-500'>Runtime : </span>
          <span>
            {movieInfo?.runtime ? timeConvert(movieInfo?.runtime) : "-"}
          </span>
        </p>
        <p className='font-medium text-base'>
          <span className='text-green-500'>Budget : </span>
          <span>
            {movieInfo?.budget
              ? movieInfo?.budget.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "INR",
                })
              : "-"}
          </span>
        </p>
        <p className='font-medium text-base'>
          <span className='text-green-500'>Revenue : </span>
          <span>
            {movieInfo?.revenue
              ? movieInfo?.revenue.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "INR",
                })
              : "-"}
          </span>
        </p>
        <p className='font-medium text-base'>
          <span className='text-green-500'>Production Companies : </span>
          <span>
            {movieInfo?.production_companies
              ? `${movieInfo?.production_companies[0]?.name} (${movieInfo?.production_companies[0]?.origin_country})`
              : "-"}
          </span>
        </p>
        <p className='font-medium text-base md:line-clamp-none line-clamp-5'>
          <span className='text-green-500'>Overview : </span>
          <span>{movieInfo?.overview ? movieInfo?.overview : "-"}</span>
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
