const express = require("express");
const router = express.Router();
const GalleryCollections = require("../model/Gallery");
const checkAuth = require("../middlewares/CheckAuth");
const GalleryHeading = GalleryCollections.GalleryHeading;
const GalleryImgUrl = GalleryCollections.GalleryImgUrl;

// Gallery heading
router.get("/allGalleryHeading", (req, res) => {
  GalleryHeading.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
router.post("/addGalleryHeading", checkAuth, (req, res) => {
  try {
    const GalleryHeadingdata = req.body;
    // console.log("a=", GalleryHeadingdata);
    const newEntry = new GalleryHeading({
      heading: GalleryHeadingdata.heading,
      headingSpan: GalleryHeadingdata.headingSpan,
      headingPara: GalleryHeadingdata.headingPara,
    });
    console.log(newEntry);
    newEntry
      .save()
      .then((data) => {
        // console.log(data);
        GalleryHeading.find({}, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res
              .status(201)
              .send({ message: "Succefully Created a heading", data: data });
            // res.status(200).send(data)
          }
        });
      })
      .catch((err) => res.status(500).send({ message: err }));
  } catch (error) {
    console.log(error);
  }
});
router.put("/updateGalleryHeading/:id", checkAuth, (req, res) => {
  const GalleryHeadingdata = req.body;
  // console.log(GalleryHeadingdata);
  // console.log(req.params.id);

  const heading = GalleryHeadingdata.heading;
  const headingSpan = GalleryHeadingdata.headingSpan;
  const headingPara = GalleryHeadingdata.headingPara;

  GalleryHeading.findOneAndUpdate(
    { _id: req.params.id },
    { heading: heading, headingSpan: headingSpan, headingPara: headingPara },

    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        GalleryHeading.find({}, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res
              .status(200)
              .send({ message: "Succefully Updated a Heading", data: data });
            // res.status(200).send(data)
          }
        });
      }
    }
  );
});
router.delete("/delGalleryHeading/:id", checkAuth, (req, res) => {
  GalleryHeading.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      GalleryHeading.find({}, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send({ message: "Successfully deleted", data: data });
          // res.status(200).send(data)
        }
      });
    }
  });
});
// Gallery Image UrL
router.get("/allGalleryImg", (req, res) => {
  GalleryImgUrl.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
router.post("/addGalleryImg", checkAuth, (req, res) => {
  const GalleryImagedata = req.body;
  const newEntry = new GalleryImgUrl({
    galleryImageurl: GalleryImagedata.galleryImageurl,
  });

  newEntry
    .save()
    .then((data) => {
      GalleryImgUrl.find({}, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res
            .status(201)
            .send({ message: "Succefully Created a Url", data: data });
          // res.status(200).send(data)
        }
      });
    })
    .catch((err) => res.status(500).send({ message: "Already exists" }));
});
router.put("/updateGalleryImg/:id", checkAuth, (req, res) => {
  const GalleryImagedata = req.body;
  const galleryImageurl = GalleryImagedata.galleryImageurl;

  GalleryImgUrl.findOneAndUpdate(
    { _id: req.params.id },
    { galleryImageurl: galleryImageurl },

    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        GalleryImgUrl.find({}, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res
              .status(200)
              .send({ message: "Succefully Updated a URL", data: data });
            // res.status(200).send(data)
          }
        });
      }
    }
  );
});
router.delete("/delGalleryImg/:id", checkAuth, (req, res) => {
  GalleryImgUrl.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      GalleryImgUrl.find({}, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send({ message: "Successfully deleted", data: data });
          // res.status(200).send(data)
        }
      });
    }
  });
});
module.exports = router;
