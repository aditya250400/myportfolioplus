import { createSlice } from "@reduxjs/toolkit";
import {
  createPostAsync,
  downVotesPostAsync,
  getDetailPostAsync,
  getMyPostAsync,
  getUserPostAsync,
  mostLikedPostsAsync,
  postsAsync,
  updatePostAsync,
  upVotesPostAsync,
} from "./postThunk";
import { logoutUser } from "../authUser/authUserThunk";
import { createCommentAsync } from "../comments/commentsThunk";

const initialState = {
  posts: [],
  mostLikedPosts: [],
  currentPost: null,
  selectedPost: "All Posts",
  status: "idle",
  searchInput: "",
  page: 1,
  current_page: 1,
  last_page: 1,
  votes: null,
  error: null,
  loading: false,
  loadingWhenCreatingPost: false,
  loadingWhenCreatingComment: false,
  loadingPaginate: false,
  loadingLikedPosts: false,
  loadingCurrentPost: false,
  editPostStatus: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    searchPost: (state, action) => {
      state.searchInput = action.payload;
    },
    setPage: (state) => {
      state.page += 1;
    },
    setPageToOne: (state) => {
      state.page = 1;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    setEditPostStatus: (state, action) => {
      state.editPostStatus = action.payload;
    },
    upVotes: (state, action) => {
      const { user_id, post_id } = action.payload;
      const post = state.posts.find((post) => post.id === post_id);
      if (post) {
        const upvoteIndex = post.post_up_votes.findIndex(
          (upvote) => upvote.user_id === user_id
        );
        if (upvoteIndex >= 0) {
          post.post_up_votes.splice(upvoteIndex, 1);
        } else {
          post.post_up_votes.push({ user_id, post_id });
        }
      }
    },
    upVotesMostLikedPosts: (state, action) => {
      const { user_id, post_id } = action.payload;
      const post = state.mostLikedPosts.find((post) => post.id === post_id);
      if (post) {
        const upvoteIndex = post.post_up_votes.findIndex(
          (upvote) => upvote.user_id === user_id
        );
        if (upvoteIndex >= 0) {
          post.post_up_votes.splice(upvoteIndex, 1);
        } else {
          post.post_up_votes.push({ user_id, post_id });
        }
      }
    },
    upVotesDetailPost: (state, action) => {
      const { user_id, post_id } = action.payload;
      const post = state.posts.find((post) => post.id === post_id);

      if (post) {
        const upvoteIndex = state.currentPost.post_up_votes.findIndex(
          (upvote) => upvote.user_id === user_id
        );
        if (upvoteIndex >= 0) {
          state.currentPost.post_up_votes.splice(upvoteIndex, 1);
          post.post_up_votes.splice(upvoteIndex, 1);
        } else {
          state.currentPost.post_up_votes.push({ user_id, post_id });
          post.post_up_votes.push({ user_id, post_id });
        }
      }
      
    },
    setCurrentPostToNull: (state) => {
      state.currentPost = null;
    },
    onAddComment: (state, action) => {
      const {post_id, user_id, content} = action.payload;
      const post = state.posts.find((post) => post.id === post_id);

      if(post) {
        post.comments.push({post_id, user_id, content});
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postsAsync.pending, (state) => {
        state.status = "loading";
        state.loading = state.page === 1 ? true : false;
        state.votes = null;
        state.loadingPaginate = state.page === 1 ? false : true;
      })
      .addCase(postsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.loadingPaginate = false;
        state.error = null;
        state.current_page = action.payload.current_page;
        state.last_page = action.payload.last_page;

        if (state.current_page === 1) {
          state.posts = action.payload.posts;
        } else {
          state.posts = [...state.posts, ...action.payload.posts];
        }
      })
      .addCase(postsAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.loadingPaginate = false;
        state.error = action.payload;
        state.current_page = 1;
      })
      .addCase(mostLikedPostsAsync.pending, (state) => {
        state.status = "loading";
        state.loadingLikedPosts = state.votes === null ? true : false;
      })
      .addCase(mostLikedPostsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loadingLikedPosts = false;
        state.error = null;
        state.mostLikedPosts = action.payload.data;
      })
      .addCase(mostLikedPostsAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.loadingLikedPosts = false;
        state.error = action.payload;
      })
      .addCase(getMyPostAsync.pending, (state) => {
        state.status = "loading";
        state.loading = state.page === 1 ? true : false;
        state.loadingPaginate = state.page === 1 ? false : true;
      })
      .addCase(getMyPostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.loadingPaginate = false;
        state.error = null;
        state.current_page = action.payload.current_page;
        state.last_page = action.payload.last_page;

        if (state.current_page === 1) {
          state.posts = action.payload.posts;
        } else {
          state.posts = [...state.posts, ...action.payload.posts];
        }
      })
      .addCase(getMyPostAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserPostAsync.pending, (state) => {
        state.status = "loading";
        state.loading = state.page === 1 ? true : false;
        state.loadingPaginate = state.page === 1 ? false : true;
      })
      .addCase(getUserPostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.loadingPaginate = false;
        state.error = null;
        state.current_page = action.payload.current_page;
        state.last_page = action.payload.last_page;

        if (state.current_page === 1) {
          state.posts = action.payload.posts;
        } else {
          state.posts = [...state.posts, ...action.payload.posts];
        }
      })
      .addCase(getUserPostAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDetailPostAsync.pending, (state) => {
        state.status = "loading";
        state.loadingCurrentPost = !state.postModal && !state.loadingWhenCreatingComment ? true : false;
      })
      .addCase(getDetailPostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loadingCurrentPost = false;
        state.error = null;
        state.currentPost = action.payload;
      })
      .addCase(getDetailPostAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.loadingCurrentPost = false;
        state.error = action.payload;
        state.currentPost = null;
      })
      .addCase(createPostAsync.pending, (state) => {
        state.status = "loading";
        state.current_page = 1;
        state.page = 1;
        state.loadingWhenCreatingPost = true;
        state.searchInput = "";
        state.selectedPost = "All Posts";
      })
      .addCase(createPostAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.loadingWhenCreatingPost = false;
        state.error = null;
      })
      .addCase(createPostAsync.rejected, (state) => {
        state.status = "rejected";
        state.loadingWhenCreatingPost = false;
      })

      .addCase(updatePostAsync.pending, (state) => {
        state.status = "loading";
        state.current_page = 1;
        state.page = 1;
        state.loadingWhenCreatingPost = true;
        state.searchInput = "";
        state.selectedPost = "All Posts";
      })
      .addCase(updatePostAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.loadingWhenCreatingPost = false;
        state.error = null;
      })
      .addCase(updatePostAsync.rejected, (state) => {
        state.status = "rejected";
        state.loadingWhenCreatingPost = false;
      })

      .addCase(upVotesPostAsync.pending, (state) => {
        state.status = "pending";
        state.votes = "";
      })
      .addCase(upVotesPostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.error = null;
        state.votes = action.payload;
      })
      .addCase(upVotesPostAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(downVotesPostAsync.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.votes = null;
      })
      .addCase(downVotesPostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.error = null;
        state.votes = action.payload;
      })
      .addCase(downVotesPostAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCommentAsync.pending, (state) => {
        state.loadingWhenCreatingComment = true;
      })
      .addCase(createCommentAsync.fulfilled, (state) => {
        state.loadingWhenCreatingComment = false;
      })
      .addCase(createCommentAsync.rejected, (state) => {
        state.loadingWhenCreatingComment = false;


      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.posts = [];
        state.mostLikedPosts = [];
        state.currentPost = null;
        state.selectedPost = "All Posts";
        state.status = "idle";
        state.searchInput = "";
        state.page = 1;
        state.current_page = 1;
        state.last_page = 1;
        state.votes = null;
        state.error = null;
        state.loading = false;
        state.loadingPaginate = false;
        state.loadingWhenCreatingPost = false;
        state.loadingWhenCreatingComment = false;
        state.loadingLikedPosts = false;
      });
  },
});
export const {
  searchPost,
  setPage,
  setSelectedPost,
  setPageToOne,
  upVotes,
  upVotesMostLikedPosts,
  setCurrentPostToNull,
  setEditPostStatus,
  upVotesDetailPost,
  onAddComment,
} = postsSlice.actions;
export default postsSlice.reducer;
