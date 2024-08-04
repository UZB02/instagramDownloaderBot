const axios = require("axios");

async function downloaderMethod (videoURL){
    try{
        const options = {
          method: "GET",
          url: "https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/",
          params: {
            url: videoURL,
          },
          headers: {
            "x-rapidapi-key":
              "947e3fd34cmsh90e4aa928ec2044p151463jsn279b080fa588",
            "x-rapidapi-host":
              "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com",
          },
        };

    const response = await axios.request(options)
    const result={
        videoURL:response.data[0].url,
        caption:response.data[0].title
    }
    return result;
    }catch(err) {
        console.log(err);
    }
}

module.exports ={
    downloaderMethod}