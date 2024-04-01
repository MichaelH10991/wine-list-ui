console.log(process.env)
module.exports = {
  wineListApi: {
    url: `http://${process.env.REACT_APP_WINE_LIST_API_HOST}:8080/wine-list/`
  }
}