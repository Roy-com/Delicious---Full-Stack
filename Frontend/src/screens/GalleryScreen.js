const GalleryScreen = {
  render: async () => {
    const token=localStorage.getItem("token");
    // fetching Gallery Heading
    const responseOfHeading = await fetch(
      "http://localhost:5000/api/gallery/allGalleryHeading",
      {
       
        headers: {
          "Content-Type": "application/json",
         
        },
      }
    );
    if (!responseOfHeading || !responseOfHeading.ok) {
     
      return `<div>Error in getting data</div>`;
    }
    const galleryHeading = await responseOfHeading.json();
    // fetching Gallery Image URl
    const responseOfImgUrl = await fetch(
      "http://localhost:5000/api/gallery/allGalleryImg",
      {
       
        headers: {
          "Content-Type": "application/json",
         
        },
      }
    );
    console.log(responseOfImgUrl)
    if (!responseOfImgUrl || !responseOfImgUrl.ok) {
      console.log(await response.json());
      return `<div>Error in getting data</div>`;
    }
    const galleryImageUrl = await responseOfImgUrl.json();
    console.log(galleryHeading);
    return `
      
      <div class="container-fluid">
      <div class="section-title">
        <h2>${galleryHeading[0].heading} <span>${
      galleryHeading[0].headingSpan
    }</span></h2>
        <p>
          ${galleryHeading[0].headingPara}
        </p>
      </div>
          <div class="row g-0">
            ${galleryImageUrl
              .map(
                (gallery) => ` <div class="col-lg-3 col-md-4">
                  <div class="gallery-item">
                      <a
                          href="${gallery.galleryImageurl}"
                          class="gallery-lightbox"
                      >
                          <img
                              src="${gallery.galleryImageurl}"
                              alt=""
                              class="img-fluid"
                          />
                      </a>
                  </div>
              </div>
              `
              )
              .join("\n")} 
          </div>
          </div>`;
  },
};
export default GalleryScreen;
