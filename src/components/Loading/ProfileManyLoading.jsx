import React from 'react';
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';

export default function ProfileManyLoading() {
  return Array.from({ length: 6 }, (_, index) => {
    return (
      <article className={`pb-5 w-full sm:rounded-xl bg-eerieBlack border `} key={index}>
        <div className="w-full h-32 rounded-t-xl sm:rounded-t-xl bg-slate-300 animate-pulse" />
        <div className="flex flex-col px-2 sm:px-4">
          <div className="flex gap-2 mb-2 h-fit">
            <img
              src={placeholderPhotoProfile}
              alt={`avatar`}
              className="relative object-cover border-4 rounded-full h-14 w-14 -top-3 border-eerieBlack animate-pulse"
            />
            <div className="flex flex-col pt-1">
              <div className="w-44 h-4 bg-slate-300 rounded-full animate-pulse" />
              <div className="w-20 h-3 bg-slate-300 rounded-full animate-pulse mt-2" />
            </div>
          </div>
          <div className="flex items-center gap-4 px-2 text-sm font-medium text-textPrimary">
            <div className="w-20 h-4 bg-slate-300 rounded-full animate-pulse" />

            <p>|</p>
            <div className="w-20 h-4 bg-slate-300 rounded-full animate-pulse" />
          </div>
          <div className="w-full mt-5 h-10 rounded-lg bg-slate-300 animate-pulse" />
        </div>
      </article>
    );
  });
}
