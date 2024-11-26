import ConfigDB from "@/Config/ThemeConfig";
import { createSlice } from "@reduxjs/toolkit";

const ThemeCustomizerSlice = createSlice({
  name: "themeCustomizer",
  initialState: {
    layout: ConfigDB.data.settings.layout_class,
    mix_layout: ConfigDB.data.settings.mix_layout_type,
    layoutType: ConfigDB.data.settings.layout_type,
    sidebarIconType: "",
  },
  reducers: {
    setMixLayoutType: (state, action) => {
      if (action.payload === "light") {
        state.mix_layout = action.payload;
        document.body.classList.add("light");
        document.documentElement.setAttribute("data-theme", "light");
        document.body.classList.remove("dark");
        document.body.classList.remove("dark-sidebar");
      } else if (action.payload === "dark") {
        state.mix_layout = action.payload;
        document.documentElement.setAttribute("data-theme", "dark");
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        document.body.classList.remove("dark-sidebar");
      } else if (action.payload === "dark-sidebar") {
        document.body.classList.add("dark-sidebar");
        document.documentElement.setAttribute("data-theme", "dark-sidebar");
        document.body.classList.remove("light");
        document.body.classList.remove("dark");
      }
    },
    setLayout: (state, action) => {
      if (action.payload === "vertical") {
        localStorage.setItem("layout", "compact-wrapper");
        state.layout = "compact-wrapper";
      } else {
        state.layout = "horizontal-sidebar";
        localStorage.setItem("layout", "horizontal-sidebar");
      }
    },
    setLayoutType: (state, action) => {
      state.layoutType = action.payload;
      if (action.payload === "rtl") {
        document.body.classList.add("rtl");
        document.body.classList.remove("ltr");
        document.body.classList.remove("box-layout");
        document.documentElement.dir = "rtl";
      } else if (action.payload === "ltr") {
        document.body.classList.add("ltr");
        document.body.classList.remove("rtl");
        document.body.classList.remove("box-layout");
        document.documentElement.dir = "ltr";
      } else if (action.payload === "box") {
        document.body.classList.remove("ltr");
        document.body.classList.remove("rtl");
        document.body.classList.add("box-layout");
        document.body.classList.remove("offcanvas");
        document.documentElement.dir = "";
      }
    },
    addSidebarIconType: (state, action) => {
      ConfigDB.data.settings.sidebar.iconType = action.payload;
      state.sidebarIconType = action.payload;
    },
  },
});

export const { setLayout, setMixLayoutType, addSidebarIconType, setLayoutType } = ThemeCustomizerSlice.actions;
export default ThemeCustomizerSlice.reducer;
