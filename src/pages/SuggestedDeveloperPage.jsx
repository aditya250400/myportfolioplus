import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Index";
import { useDispatch, useSelector } from "react-redux";
import MostActiveUsersProfile from "../components/Card/MostActiveUsersProfile";
import { getMostActiveUsers } from "../states/user/userThunk";
import { myProfileAsync } from "../states/myProfile/myProfileThunk";
import { searchPost, setPageToOne } from "../states/posts/postsSlice";
import ProfileManyLoading from "../components/Loading/ProfileManyLoading";
import ButtonPaginate from "../components/Card/ButtonPaginate";
import { setPage, setPageUserToOne } from "../states/user/userSlice";
import WriteProgressInputModal from "../components/Modal/WriteProgressInputModal";
import PortfolioInputModal from "../components/Modal/PortfolioInputModal";
import { ToastContainer } from "react-toastify";
import { setDeleteConfirmId } from "../states/modal/modalSlice";

export default function SuggestedDeveloperPage() {
  const dispatch = useDispatch();
  const {
    mostActiveUsers,
    loading,
    loadingPaginate,
    current_page,
    last_page,
    page,
  } = useSelector((state) => state.users);
  const { myProfile } = useSelector((state) => state.myProfile);
  const { modalProgress, modalPortfolio } = useSelector((state) => state.modal);

  const onPaginateExtend = () => {
    dispatch(setPage());
  };
  useEffect(() => {
    dispatch(getMostActiveUsers({ page }));
  }, [page]);

  useEffect(() => {
    dispatch(getMostActiveUsers());
    dispatch(myProfileAsync());
    dispatch(setPageToOne());
    dispatch(setPageUserToOne());
    dispatch(searchPost(""));
    dispatch(setDeleteConfirmId(null))
    dispatch(getMostActiveUsers({ page: 1 }));
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <ToastContainer
        position="top-center"
        theme="dark"
        pauseOnHover={false}
        autoClose={3000}
        pauseOnFocusLoss={false}
      />
      <section className=" text-textPrimary">
        <Navbar myProfile={myProfile} />
        <div className="container flex w-full pb-16 sm:py-10 2xl:px-52">
          <div className="w-full p-2 rounded-md sm:p-10 bg-eerieBlack">
            <h1>Most Active Users</h1>
            <div className="grid flex-1 w-full grid-cols-1 gap-5 mt-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
              {loading ? (
                <ProfileManyLoading />
              ) : mostActiveUsers.length > 0 ? (
                mostActiveUsers.map((userProfile) => (
                  <>
                    <MostActiveUsersProfile
                      key={userProfile.id}
                      userProfile={userProfile}
                      useBorder="border rounded-xl border-[#464646]"
                    >
                      {userProfile.id === myProfile.id
                        ? "My Profile"
                        : "See Profile"}
                    </MostActiveUsersProfile>
                  </>
                ))
              ) : (
                ""
              )}
            </div>
            <div className=" w-1/4 mx-auto mt-5">
              <ButtonPaginate
                onPaginateExtend={onPaginateExtend}
                loadingPaginate={loadingPaginate}
                current_page={current_page}
                last_page={last_page}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </section>

      {modalProgress && <WriteProgressInputModal myProfile={myProfile} />}
      {modalPortfolio && <PortfolioInputModal />}
    </>
  );
}
