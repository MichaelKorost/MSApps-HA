// making a common function to map the photo objects with only the properties we need
const mapPhotoObjects = (photoObjects) => {
  return photoObjects.map((photo) => ({
    id: photo.id,
    imgUrl: photo.webformatURL,
    views: photo.views,
    downloads: photo.downloads,
    collection: photo.collections,
    likes: photo.likes,
    tags: photo.tags,
    user: photo.user,
    userImgUrl: photo.userImageURL,
  }));
};

module.exports = { mapPhotoObjects };
