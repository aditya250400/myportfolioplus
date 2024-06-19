import React from 'react';
import Animation404 from '../utils/NotFound.json';
import Lottie from 'lottie-react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { searchPost, setPageToOne } from '../states/posts/postsSlice';
import { useDispatch } from 'react-redux';

export default function NotFound() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchPost(''));
    dispatch(setPageToOne());
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <Lottie animationData={Animation404} className="w-96 sm:w-[40rem]" />
      <h1 className="text-3xl font-semibold sm:text-4xl text-chineseWhite">Page Not Found</h1>
      <p className="mt-5 mb-10 text-base font-medium text-center sm:text-lg text-textSecondary">
        Uh oh, we can’t seem to find the page you’re <br /> looking for. Try going back to the
        previous page
      </p>
      <Link to="/">
        <Button size="md" className="w-40 font-medium bg-fernGreen text-textPrimary">
          Go to your home
        </Button>
      </Link>
    </div>
  );
}
