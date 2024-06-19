import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useExpand } from '../../hooks/useExpand';
import PropTypes from 'prop-types';

export default function PortfolioUser({ id, title, image, description, link }) {
  const { isExpanded, textRef } = useExpand();
  const navigate = useNavigate();

  const handleToggleExpanded = (portfolioId) => {
    navigate(`/portfolio-detail/${portfolioId}`);
  };

  return (
    <section className="relative block h-60 group sm:h-80 lg:h-72">
      <Link to={link} target="_blank">
        <img
          alt="images/portfolio"
          src={image}
          className="absolute inset-0 object-cover w-full h-full transition-all duration-500 rounded-md opacity-70 group-hover:opacity-50"
        />
        <div className="relative p-4 sm:p-6 ">
          <p className="text-lg font-bold text-textPrimary sm:text-xl">{title}</p>
        </div>
      </Link>
      <div className="mx-3 mt-16 sm:m-5 sm:mt-36 lg:mt-24">
        <div className="transition-all duration-500 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <p
            ref={textRef}
            className={`text-sm text-[#eaeaea] leading-5 px-2 sm:px-0 ${
              isExpanded ? '' : 'line-clamp-2'
            }`}
          >
            {description}
          </p>
          <button
            onClick={() => handleToggleExpanded(id)}
            className="text-[#A9A9A9] text-sm px-2 sm:px-0 font-normal"
          >
            ...See detail
          </button>
        </div>
      </div>
    </section>
  );
}

PortfolioUser.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};
