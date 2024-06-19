import React from 'react';
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';

export default function SuggestedDeveloperLoading() {
  return Array.from({ length: 5 }, (_, index) => {
    return (
      <div key={index}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={placeholderPhotoProfile}
                alt=""
                className="object-cover w-10 h-10 rounded-full animate-pulse"
              />
              <div>
                <div className="font-medium bg-slate-300 h-3 w-44 animate-pulse rounded-full" />
                <div className="font-medium bg-slate-300 h-2 w-36 mt-1 animate-pulse rounded-full" />
              </div>
            </div>
            <div className="font-medium transition-all duration-300 border border-textPrimary animate-pulse w-10 h-10 bg-slate-300 rounded-lg focus:ring-0" />
          </div>
          <div className="w-full h-[2px] bg-[#262626]" />
        </div>
      </div>
    );
  });
}
