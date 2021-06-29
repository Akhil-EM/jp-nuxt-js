let vendorUrlKey = 'centrealkochi'
let pincodeid = ''
const locationInfo = {
  area: 'Edappally',
  pincodeId: 59,
  pincode: '682024',
  vendorUrlKey: 'centrealkochi'
}

if (locationInfo) {
  vendorUrlKey = locationInfo.vendorUrlKey
  pincodeid = locationInfo.pincodeId
}

export default {
  // BASE_URL: 'https://api.centrealbazaaronline.com/api/v2/',
  // SITE_URL: 'https://centrealbazaaronline.com',
  // WEB_ADMIN_URL: 'https://centrealbazaaronline.com/caroot/',
  // BASE_URL1: 'https://api.centrealbazaaronline.com/api/v2/',

  BASE_URL: 'https://wpr.intertoons.net/centrealapi/api/v2/',
  SITE_URL: 'https://nuxt-js-demo-22.herokuapp.com/',
  WEB_ADMIN_URL: 'http://wpr.intertoons.net/centrealadmin/',
  BASE_URL1: 'https://wpr.intertoons.net/centrealapi/api/v2/',

  // BASE_URL :'https://uatapi.centrealbazaaronline.com/api/v2/',
  // SITE_URL :'https://uat.centrealbazaaronline.com/',
  // WEB_ADMIN_URL:'https://uat.centrealbazaaronline.com/caroot/',
  // BASE_URL1 :'https://uatapi.centrealbazaaronline.com/api/v2/',

  CURRECNCY: '₹',
  STORE_NAME: 'centreal',
  PINCODE_ID: pincodeid,
  VENDOR_URL_KEY: vendorUrlKey,
  GOOGLE_MAPS_API_KEY: 'AIzaSyD8L237G-BLrf0hQtqaTdTiezwwqEzoq4A',
  ADMIN_API_HEADER: {
    headers: {
      vendorUrlKey: vendorUrlKey,
      token: '',
      lang: ''
    }
  },
  CUSTOMER_API_HEADER: {
    headers: {
      vendorUrlKey: vendorUrlKey,
      token: '11GSOM80VTFM9U1X',
      lang: ''
    }
  },
  COUNTRY_CODE: '+91'
}
