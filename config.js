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
  SITE_URL: 'https://nuxt-js-demo-22.herokuapp.com',
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
  COUNTRY_CODE: '+91',
  DEFAULT_META_TITLE:
    'Centreal Bazaar Supermarket Kerala: Buy Groceries Online',
  DEFAULT_META_DESCRIPTION:
    'Buy Groceries Online from Centreal Bazaar Supermarket Kerala having a wide variety of fresh fruits & vegetables, Meat & Fish, baby care products, personal care products, Poultry products, Bakery Products at a discounted rate.',
  DEFAULT_META_KEYWORDS:
    'Centreal Bazaar, Centreal Bazaar Supermarket, Supermarket Kerala, Buy Groceries, Buy groceries online, Groceries Online, Discounted Rates, Online Grocery, Online Supermarket, order groceries online',
  DEFAULT_META_OGIMAGE: '/assets/img/Centreal Bazaar_Brand icon_.png'
}
