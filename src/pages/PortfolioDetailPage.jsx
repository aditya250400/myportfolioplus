import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePortfolioAsync,
  portfolioDetailAsync,
  portfoliosAsync,
} from "../states/portfolios/portfoliosThunk";
import { MdDelete } from "react-icons/md";
import { formattedDate, formattedTime } from "../utils";
import { myProfileAsync } from "../states/myProfile/myProfileThunk";
import { searchPost, setPageToOne } from "../states/posts/postsSlice";
import { setPageUserToOne } from "../states/user/userSlice";
import { BiEdit } from "react-icons/bi";
import {
  setDeleteConfirmId,
  setModalPortfolio,
} from "../states/modal/modalSlice";
import DeleteModal from "../components/Modal/DeleteModal";
import PortfolioInputModal from "../components/Modal/PortfolioInputModal";
import { setEditPortfolioStatus } from "../states/portfolios/portfoliosSlice";
import { ToastContainer } from "react-toastify";

export default function PortfolioDetailPage() {
  const { portfolio } = useSelector((state) => state.portfolios);
  const { myProfile } = useSelector((state) => state.myProfile);
  const { deleteConfirmId, modalPortfolio } = useSelector(
    (state) => state.modal
  );
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeletePortfolio = (portfolioId) => {
    dispatch(deletePortfolioAsync({ id: portfolioId, navigate }));
  };

  const onOpenModalPortfolio = () => {
    dispatch(setEditPortfolioStatus(true));
    dispatch(setModalPortfolio(true));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(myProfileAsync());
    dispatch(searchPost(""));
    dispatch(setPageToOne());
    dispatch(setPageUserToOne());
    dispatch(setDeleteConfirmId(null));
    dispatch(portfolioDetailAsync({ id }));
  }, [id]);

  return (
    <>
      <ToastContainer
        position="top-center"
        theme="dark"
        pauseOnHover={false}
        autoClose={3000}
      />
      <section>
        <div className=" flex justify-center pt-3 pb-10">
          {portfolio === null ? (
            ""
          ) : (
            <div className="flex flex-col items-center gap-5 p-5 lg:mx-52 rounded-xl">
              {portfolio?.user_id === myProfile?.id ? (
                <div className="flex justify-between w-full">
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-3 transition-opacity w-fit hover:opacity-80"
                  >
                    <CgArrowLeft className="text-2xl text-textPrimary" />
                    <h1 className="font-medium text-textPrimary">
                      Go back to profile
                    </h1>
                  </button>

                  <Link
                    to={portfolio.link}
                    target="_blank"
                    className="flex gap-2 font-semibold text-ufoGreen hover:text-opacity-80"
                  >
                    View Portfolio
                    <FaExternalLinkAlt className="text-xs text-[#A9A9A9] " />
                  </Link>
                </div>
              ) : (
                <div className="flex justify-between w-full">
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-3 transition-opacity w-fit hover:opacity-80"
                  >
                    <CgArrowLeft className="text-2xl text-textPrimary" />
                    <h1 className="font-medium text-textPrimary">
                      Go back to profile
                    </h1>
                  </button>
                </div>
              )}
              <img
                src={portfolio.image}
                alt={portfolio.title}
                className="w-full h-[30rem]  object-cover rounded-lg"
              />
              <div className="flex items-center justify-between w-full">
                <div className="flex w-full gap-2 px-2 sm:px-0">
                  <p className="text-[12px] font-medium text-[#A9A9A9]">
                    {formattedDate(portfolio.created_at)}
                  </p>
                  <p className="text-[12px] font-medium text-[#7A7A7A]">•</p>
                  <p className="text-[12px] font-medium text-[#A9A9A9]">
                    {formattedTime(portfolio.created_at)}
                  </p>
                </div>
                <div className="flex justify-end w-full ">
                  {portfolio?.user_id === myProfile?.id ? (
                    <div className="relative flex gap-2 text-white">
                      <button
                        onClick={onOpenModalPortfolio}
                        className="text-2xl"
                      >
                        {" "}
                        <BiEdit />
                      </button>
                      <button
                        className="text-2xl"
                        onClick={() =>
                          dispatch(
                            setDeleteConfirmId(
                              deleteConfirmId === portfolio?.id
                                ? null
                                : portfolio?.id
                            )
                          )
                        }
                      >
                        {" "}
                        <MdDelete />
                      </button>

                      <DeleteModal
                        id={portfolio.id}
                        onDeleteData={onDeletePortfolio}
                        targetName={"portfolio"}
                      />
                    </div>
                  ) : (
                    <Link
                      to={portfolio.link}
                      target="_blank"
                      className="flex gap-2 font-semibold text-ufoGreen hover:text-opacity-80"
                    >
                      View Portfolio
                      <FaExternalLinkAlt className="text-xs text-[#A9A9A9] " />
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full h-full gap-3 text-textPrimary">
                <h1 className="text-2xl font-semibold">{portfolio.title}</h1>
                <p className="text-base leading-relaxed whitespace-pre-wrap text-chineseWhite">
                  {portfolio.description}
                </p>
              </div>
            </div>
          )}
        </div>
        {modalPortfolio && (
          <PortfolioInputModal myProfile={myProfile} portfolio={portfolio} />
        )}
      </section>
    </>
  );
}
