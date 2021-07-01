// import Config from  './config';
// import axios from "axios";

module.exports = {
  getCategorylist() {
    return 'hi'
  },
  calculatePercentage(capital, portion) {
    return (portion * 100) / capital
  },
  isLoginedUser() {
    const customerID = localStorage.getItem('custId')
    if (customerID != null) {
      return true
    } else {
      return false
    }
  },
  truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  },

  backtoTop() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  },
  logout() {
    localStorage.removeItem('custId')
    localStorage.removeItem('customer_token')
    location.reload()
  }
}
