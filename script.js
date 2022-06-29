function GetData() {

    console.log("Call GetData")
    
    const data = getAllUrlParams()

    if (data.userToken) {
      return JSON.stringify({
        userToken: data.userToken,
        getUserToken: 'https://tttmp.herokuapp.com/api/getGame/',
        saveGame: 'https://tttmp.herokuapp.com/api/saveGame',
      })
    }

    return JSON.stringify({
      error: 'No user data provide'
    })
}

function getAllUrlParams() {

  const url = window.location;
  const search = (url.search) ? url.search.replace(/^(\S*\?)/, '') : (url.hash) ? url.hash.replace(/^(\S*\?)/, '') : '';
  
  const params = search ? JSON.parse(
    '{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', 
    function(key, value) { return key === "" ? value : decodeURIComponent(value) })
    : {}

  return params

}