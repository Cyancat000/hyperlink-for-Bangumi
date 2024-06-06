// 函数：返回格式化的请求参数
const getRequest = title => {
  return {
    "filters": [
      "search",
      "=",
      title
    ],
    "fields": "alttitle,title,released,languages,image{url,sexual,violence},rating,votecount",
    "sort": "searchrank",
    "reverse": false,
    "results": 3,
    "page": 1,
    "count": false,
    "compact_filters": false,
    "normalized_filters": false
  }
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
    if(results.length>0){
      let vndbCard = document.createElement('div')
      vndbCard.className = "vndb-card"
      vndbCard.innerHTML = `
        <hr/>
        <a href="https://vndb.org/${results[0].id}" target="_blank">
          <span>${results[0].alttitle?results[0].alttitle:results[0].title}</span>
          <br/>
          <img class="cover" src="${results[0].image.url}"/>
        </a>
        <p>${results[0].released}  <b class="num">${results[0].rating}</b></p>
      `
      document.querySelector('#panelInterestWrapper').appendChild(vndbCard)
    }
    // 添加卡片到页面
  })
  .catch((error) => {
    console.log(error);
  });