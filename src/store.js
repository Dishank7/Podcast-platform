import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./silces/userSlice";
import podcastReducer from "./silces/podcastSlice";
import episodeReducer from "./silces/episodeSlice";

export default configureStore({
    reducer:{
        user : userReducer,
        podcast : podcastReducer,
        episode : episodeReducer
    }
});