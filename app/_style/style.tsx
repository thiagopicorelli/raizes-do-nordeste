const black = "#0e0e0d";
const white = "#f0ece4";
const grey = "#6b6860";

const color_background_primary = "#faf7f2";

const font_main = "'DM Sans', sans-serif";
const font_header = "'DM Serif Display', serif";

const main_div_class = "flex flex-1 justify-center items-center";
const main_div_inner_class = "flex flex-1 flex-col justify-center items-center";
const main_div_style = {fontFamily: font_main, backgroundColor: black};

const header_style = {color: white, fontFamily: font_header};

const textbox_label_class = `mb-1.5 block text-[11px] uppercase tracking-widest text-[${grey}]`;
const textbox_class = "w-full rounded-md border border-[#2e2d29] bg-[#1a1917] px-3.5 py-2.5 text-sm text-[#e8e4da] placeholder-[#3d3d39] outline-none transition-colors focus:border-[#6b5f45]";

const button_style = `w-full rounded-md py-2.5 text-sm font-medium transition-colors hover:bg-[#d9d3c6]`;

const small_text_style = "text-xs text-[#5a5850] hover:text-[#b5a98e]";

export const style = {
  black,
  white,
  grey,
  color_background_primary,
  font_main,
  font_header,
  main_div_class,
  main_div_inner_class,
  main_div_style,
  header_style,
  textbox_label_class,
  textbox_class,
  button_style,
  small_text_style
}