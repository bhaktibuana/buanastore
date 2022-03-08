// const apiBaseUrl = "http://localhost:3001";
const apiBaseUrl = "https://buanastore-server.herokuapp.com";

export const apiURL = {
  urlProductCountAll: `${apiBaseUrl}/product/count`,
  urlProductCountCategory: `${apiBaseUrl}/product/category/count`,
  urlProductThumbnail: `${apiBaseUrl}/product/`,
  urlProductThumbnailCategory: `${apiBaseUrl}/product/category/`,
  urlProductDetail: `${apiBaseUrl}/product/detail`,
  urlSignup: `${apiBaseUrl}/signup`,
  urlSignin: `${apiBaseUrl}/signin`,
  urlAddWishlist: `${apiBaseUrl}/wishlist`,
  urlCheckSelectedWishlist: `${apiBaseUrl}/wishlist/checkSelected`,
  urlSoftDeleteWihslist: `${apiBaseUrl}/wishlist/softDelete`,
  urlGetWishlist: `${apiBaseUrl}/wishlist`,
  urlAddCart: `${apiBaseUrl}/cart`,
  urlCheckSelectedCart: `${apiBaseUrl}/cart/checkSelected`,
  urlSoftDeleteCart: `${apiBaseUrl}/cart/softDelete`,
  urlGetCart: `${apiBaseUrl}/cart`,
}