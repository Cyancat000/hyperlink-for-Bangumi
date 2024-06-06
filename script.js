// 通用部分

const renderRatingCard = info =>{
    let ratingCard = document.createElement('div')
    ratingCard.className = "rating-card"
    ratingCard.innerHTML = `
      <hr/>
      <a href="${info.link}" target="_blank">
        <span>${info.title}</span>
        <br/>
        <img class="cover" src="${info.url}"/>
      </a>
      <p>${info.date}  <b class="num">${info.score}</b>  <small class="grey">${info.vote} votes</small></p>
      <p><small class="grey">${info.text[0]}  </small><small>${info.text[1]} </small><small class="grey">${info.text[2]} </small></p>
    `
    document.querySelector('#panelInterestWrapper').appendChild(ratingCard)
}

// VNDB部分


// 函数：返回格式化的VNDB请求参数
const getRequest = title => {
  return {
    "filters": [
      "search",
      "=",
      title
    ],
    "fields": "alttitle,title,released,languages,image{url,sexual,violence},rating,votecount,length,length_minutes,length_votes",
    "sort": "searchrank",
    "reverse": false,
    "results": 1,
    "page": 1,
    "count": false,
    "compact_filters": false,
    "normalized_filters": false
  }
}

// 函数：格式化游玩时长数据
const getLengthWord = length=>{
  if (length == 1){
    return "非常短"
  }else if(length == 2){
    return "短"
  }else if(length == 3){
    return "中等"
  }else if(length == 4){
    return "长"
  }else{
    return "非常长"
  }
}

const getLengthHour = min=>{
  return (min/60).toFixed(2)/1
}

// 获取VNDB数据
fetch('https://api.vndb.org/kana/vn', {
  // 設定為 POST 請求
  method: 'post',
  // 在 headers 加入 json 格式
  headers: {
    'Content-Type': 'application/json',
  },
  // 傳送內容須轉換為字串
  body: JSON.stringify(getRequest(document.querySelector('.nameSingle>a').innerText)),
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let results = data.results
    // 判断结果，渲染DOM
    if(results.length>0){
      renderRatingCard({
        link: 'https://vndb.org/'+results[0].id,
        title: results[0].alttitle?results[0].alttitle:results[0].title,
        url: results[0].image.url,
        date: results[0].released,
        score: (results[0].rating/10).toFixed(2)/1,
        vote: results[0].votecount,
        text: ['平均游玩时长: ', getLengthHour(results[0].length_minutes)+'Hours('+getLengthWord(results[0].length)+')', results[0].length_votes+' votes']
      })
    }
  })
  .catch((error) => {
    console.log(error);
  });
