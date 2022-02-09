const apiBaseUrl = "http://localhost:3001";
// const apiBaseUrl = "https://buanastore-server.herokuapp.com";

export const apiURL = {
  urlProductCountAll: `${apiBaseUrl}/product-count`,
  urlProductCountCategory: `${apiBaseUrl}/product-count-category`,
  urlProductThumbnail: `${apiBaseUrl}/product-thumbnail/`,
  urlProductThumbnailCategory: `${apiBaseUrl}/product-thumbnail-category/`,
  urlProductDetail: `${apiBaseUrl}/product-detail`,
  urlSignup: `${apiBaseUrl}/signup`,
  urlSignin: `${apiBaseUrl}/signin`,
  urlAuthJWT: `${apiBaseUrl}/user-authentication`,
}