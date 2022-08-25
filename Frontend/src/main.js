import GalleryScreen from "./screens/GalleryScreen.js";

const router = async () => {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = await GalleryScreen.render();
};
window.addEventListener("load", router);
