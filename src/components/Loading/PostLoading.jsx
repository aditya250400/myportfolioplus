import React from 'react';

export default function PostLoading() {
  return Array.from({ length: 5 }, (_, index) => {
    return (
      <section
        className="w-auto py-3 rounded-md h-fit sm:p-4 bg-eerieBlack sm:rounded-xl"
        key={index}
      >
        <div className="flex items-center gap-3 px-2 sm:px-0">
          <div>
            <div className=" h-5 rounded-full bg-slate-300 animate-pulse w-[200px]" />
            <div className=" h-3 rounded-full bg-slate-300 animate-pulse w-[150px] mt-2" />
          </div>
        </div>

        <div className="my-3">
          <div className="bg-slate-400 h-36 w-full mx-auto rounded-lg animate-pulse"></div>
          <div className="flex gap-2 px-2 my-3 sm:px-0">
            <div className=" h-5 rounded-full bg-slate-300 animate-pulse w-10" />
            <div className=" h-5 rounded-full bg-slate-300 animate-pulse w-10" />
          </div>
          <div className=" h-5 rounded-full bg-slate-300 animate-pulse w-full mt-2" />
          <div className=" h-5 rounded-full bg-slate-300 animate-pulse w-full mt-2" />
          <div className=" h-5 rounded-full bg-slate-300 animate-pulse w-full mt-2" />
          <div className=" h-5 rounded-full bg-slate-300 animate-pulse w-full mt-2" />
          <div className=" h-5 rounded-full bg-slate-300 animate-pulse w-full mt-2" />
        </div>

        <div className="w-full h-[2px] bg-[#262626]" />

        <div className="flex gap-5 px-2 my-2 sm:px-0 text-textPrimary">
          <div className="flex items-center gap-1">
            <div className=" h-5 rounded-full bg-slate-300 animate-pulse w-10" />
          </div>
          <div className=" h-5 rounded-full bg-slate-300 animate-pulse w-10" />
        </div>
      </section>
    );
  });
}
