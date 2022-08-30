import { createSlice } from "@reduxjs/toolkit";
import {httpConfig} from "../ui/shared/utils/httpConfig";

const slice = createSlice({
  name: "likes",
  initialState: {},
  reducers: {
    addLikes: (likes, action) => {
      likes[action.payload.likeTweetId] = action.payload.data
    },
    removeLike: (likes, action) => {
      // likes.filter(like => like !== action.payload)
      const index = likes[action.payload.likeTweetId].findIndex(like => action.payload.likeProfileId === like.likeProfileId)
      if (index) {
        delete likes[action.payload.likeTweetId][index]
      }
    }
  }
})

export const {addLikes} = slice.actions

export const fetchLikesByLikeTweetId = (likeTweetId) => async (dispatch) => {
  const {data} =  await httpConfig.get(`/apis/like/likeTweetId/${likeTweetId}`);
  const payload = {likeTweetId, data}
  dispatch(addLikes(payload));
};

export default slice.reducer