// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import request from 'sync-request'
import yaml from 'js-yaml'
export default function handler(req, res) {
  var { url } = req.query

  var openapi = request("GET", url).getBody("utf8")
  try {
      var json = JSON.parse(openapi);
      console.log(json)
      
  } catch (e) {
      var json = yaml.load(openapi);
      console.log(json)
  }
  for (var path in json.paths) {
    if(path.includes('.well-known')){
      delete json.paths[path]
    }
  }

  res.status(200).json(json)
}
