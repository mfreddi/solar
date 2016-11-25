
var getRequest = (type, url, cb) => {
  var xhr = new XMLHttpRequest();
  xhr.open(type, url, true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      cb({error: xhr.status + ': ' + xhr.statusText });
    } else {
      cb(JSON.parse(xhr.responseText));
    }
  }

}

const base_url = 'https://query.yahooapis.com/v1/public/yql?q=';
const ygl_query = 'select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22|SYM|%22)';
const ygl_query_str = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
var query_str_final = (base_url + ygl_query + ygl_query_str);
var $code = document.getElementById('code');
var handleSubmit = () => {

  getYql(query_str_final.replace('|SYM|', $code.value));
  return false;
}
var getYql = (url) => {
  var chart = document.createElement("div");

  getRequest('GET', url, function(data){
    console.log(data.query.results.quote);
    chart.innerHTML  = JSON.stringify(data.query.results.quote);
    document.getElementById('charts').appendChild(chart)
  })

}
