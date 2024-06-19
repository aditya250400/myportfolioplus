import React from 'react';
import SmallCardPost from './SmallCardPost';
import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import PostLoading from '../Loading/PostLoading';

export default function MostLikedPost() {
  const { mostLikedPosts, loadingLikedPosts } = useSelector((state) => state.posts);
  return loadingLikedPosts ? (
    <PostLoading />
  ) : (
    <section className="flex flex-col gap-5 p-5 w-96 h-fit bg-eerieBlack rounded-xl">
      <h2 className="text-lg font-semibold text-textPrimary">Most Liked Post</h2>
      {mostLikedPosts.length > 0
        ? mostLikedPosts.slice(0, 3).map((post) => {
            {
              return <SmallCardPost key={post.id} post={post} />;
            }
          })
        : ''}
    </section>
  );
}
