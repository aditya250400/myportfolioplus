import React from 'react';
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';

export default function ProfileHomePageLoading() {
  return (
    <article className={`pb-5 w-full sm:rounded-xl bg-eerieBlack `}>
      <div className="w-full h-32 rounded-t-xl sm:rounded-t-xl bg-slate-300 animate-pulse" />
      <div className="flex flex-col px-2 sm:px-4">
        <div className="flex gap-2 mb-2 h-fit">
          <img
            src={placeholderPhotoProfile}
            alt={`avatar`}
            className="relative object-cover border-4 rounded-full h-14 w-14 -top-3 border-eerieBlack animate-pulse"
          />
          <div className="flex flex-col pt-1">
            <div className="h-4 rounded-full w-44 bg-slate-300 animate-pulse" />
            <div className="w-20 h-3 mt-2 rounded-full bg-slate-300 animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-4 px-2 text-sm font-medium text-textPrimary">
          <div className="w-20 h-4 rounded-full bg-slate-300 animate-pulse" />

          <p>|</p>
          <div className="w-20 h-4 rounded-full bg-slate-300 animate-pulse" />
        </div>
        <div className="w-full h-10 mt-5 rounded-lg bg-slate-300 animate-pulse" />
      </div>
    </article>
  );
}
