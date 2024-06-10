
// ===资源部分===

// 设置图标
const settingIconRes = `
  <svg class="setting" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 48 48">
<path fill="#444444" d="M 24 4 C 22.457143 4 20.866899 4.2150606 19.462891 4.5390625 A 1.50015 1.50015 0 0 0 18.308594 5.8457031 L 18.013672 8.6933594 C 17.872912 9.6653041 17.295767 10.565913 16.544922 11.003906 C 15.792476 11.442833 14.645356 11.515856 13.828125 11.138672 A 1.50015 1.50015 0 0 0 13.808594 11.128906 L 11.109375 9.9296875 A 1.50015 1.50015 0 0 0 9.4121094 10.267578 C 7.3537242 12.434299 5.7286939 15.138048 4.8574219 18.1875 A 1.50015 1.50015 0 0 0 5.4335938 19.824219 L 7.8320312 21.523438 A 1.50015 1.50015 0 0 0 7.8671875 21.548828 C 8.5871588 22.028809 9 22.928962 9 23.900391 C 9 24.798542 8.4918132 25.79369 7.8222656 26.283203 L 5.4335938 27.976562 A 1.50015 1.50015 0 0 0 4.8574219 29.611328 C 5.7312856 32.669851 7.3707183 35.27549 9.3886719 37.505859 A 1.50015 1.50015 0 0 0 11.109375 37.871094 L 13.808594 36.669922 A 1.50015 1.50015 0 0 0 13.828125 36.662109 C 14.671931 36.272661 15.659466 36.320391 16.587891 36.820312 C 17.4315 37.274564 17.939711 38.109074 18.003906 39.007812 A 1.50015 1.50015 0 0 0 18.007812 39.054688 L 18.308594 41.955078 A 1.50015 1.50015 0 0 0 19.486328 43.267578 C 20.953105 43.581887 22.457143 43.800781 24 43.800781 C 25.542857 43.800781 27.133101 43.585721 28.537109 43.261719 A 1.50015 1.50015 0 0 0 29.691406 41.964844 L 29.984375 39.3125 C 29.984375 39.3125 29.984375 39.310547 29.984375 39.310547 C 30.124031 38.33693 30.703107 37.434744 31.455078 36.996094 C 32.207524 36.557167 33.354644 36.484144 34.171875 36.861328 A 1.50015 1.50015 0 0 0 34.191406 36.871094 L 36.890625 38.070312 A 1.50015 1.50015 0 0 0 38.587891 37.732422 C 40.646276 35.565701 42.271306 32.861952 43.142578 29.8125 A 1.50015 1.50015 0 0 0 42.566406 28.175781 L 40.167969 26.476562 A 1.50015 1.50015 0 0 0 40.132812 26.451172 C 39.412846 25.971204 39 25.071038 39 24.099609 C 39 23.201458 39.508187 22.20631 40.177734 21.716797 L 42.566406 20.023438 A 1.50015 1.50015 0 0 0 43.142578 18.388672 C 42.268714 15.330149 40.629282 12.72451 38.611328 10.494141 A 1.50015 1.50015 0 0 0 36.890625 10.128906 L 34.191406 11.330078 A 1.50015 1.50015 0 0 0 34.171875 11.337891 C 33.328068 11.727352 32.340534 11.679608 31.412109 11.179688 C 30.5685 10.725435 30.060289 9.8909265 29.996094 8.9921875 A 1.50015 1.50015 0 0 0 29.992188 8.9550781 L 29.693359 5.8554688 A 1.50015 1.50015 0 0 0 28.513672 4.5332031 C 27.046895 4.2188938 25.542857 4 24 4 z M 24 7 C 24.913336 7 25.868726 7.178029 26.822266 7.3398438 L 27.003906 9.2070312 C 27.003906 9.2070312 27.003906 9.2089844 27.003906 9.2089844 C 27.140297 11.109529 28.23247 12.874877 29.988281 13.820312 C 31.659856 14.720391 33.67154 14.873051 35.427734 14.0625 L 37.019531 13.355469 C 38.239035 14.844925 39.199359 16.474788 39.851562 18.271484 L 38.433594 19.275391 A 1.50015 1.50015 0 0 0 38.417969 19.287109 C 36.889562 20.398683 36 22.199609 36 24.099609 C 36 25.928181 36.788721 27.827246 38.46875 28.947266 L 39.853516 29.931641 C 39.196311 31.75701 38.231604 33.410531 37.025391 34.847656 L 35.410156 34.128906 L 35.427734 34.138672 C 33.644966 33.315856 31.590913 33.443224 29.943359 34.404297 C 28.295806 35.36537 27.276436 37.062994 27.015625 38.888672 A 1.50015 1.50015 0 0 0 27.009766 38.933594 L 26.839844 40.460938 C 25.896438 40.623661 24.924092 40.800781 24 40.800781 C 23.084171 40.800781 22.126173 40.623556 21.169922 40.460938 L 20.996094 38.792969 C 20.860289 36.891708 19.76811 35.125436 18.011719 34.179688 C 16.340144 33.279609 14.32846 33.126949 12.572266 33.9375 L 10.980469 34.644531 C 9.760965 33.155075 8.8006424 31.525212 8.1484375 29.728516 L 9.5664062 28.724609 A 1.50015 1.50015 0 0 0 9.5820312 28.712891 C 11.110443 27.601321 12 25.800391 12 23.900391 C 12 22.071819 11.211279 20.172754 9.53125 19.052734 L 8.1464844 18.068359 C 8.8036885 16.24299 9.7683961 14.589469 10.974609 13.152344 L 12.589844 13.871094 L 12.572266 13.861328 C 14.355034 14.684144 16.409087 14.556776 18.056641 13.595703 C 19.704194 12.63463 20.723564 10.937006 20.984375 9.1113281 A 1.50015 1.50015 0 0 0 20.992188 9.0546875 L 21.169922 7.3378906 C 22.110575 7.1761157 23.079061 7 24 7 z M 24 16 C 19.599487 16 16 19.59949 16 24 C 16 28.40051 19.599487 32 24 32 C 28.400513 32 32 28.40051 32 24 C 32 19.59949 28.400513 16 24 16 z M 24 19 C 26.779194 19 29 21.220808 29 24 C 29 26.779192 26.779194 29 24 29 C 21.220806 29 19 26.779192 19 24 C 19 21.220808 21.220806 19 24 19 z"></path>
</svg>
`


// ===前置执行内容===

let subjectType = document.querySelector('#navMenuNeue a.focus').innerText

let nameSingle = document.querySelector('.nameSingle>a').innerText

// ===通用函数===

// 函数: 判断内容， 返回空值
const isNull = (value, flag) => {
  if (value == flag) {
    return '-'
  } else {
    return value
  }
}

// 函数: 渲染内容卡片
const renderRatingCard = info => {
  let ratingCard = document.createElement('div')
  ratingCard.className = "rating-card"
  ratingCard.innerHTML = `
  <a href="${info.link}" target="_blank">
  <span class="title">
  <img class="favicon" src="${info.icon}" style="display: ${localStorage.getItem('favicon') == 'true' ? 'inline' : 'none'};" />
  ${info.title}
  </span>
  <img class="cover" src="${info.url}"/>
  </a>
  <p>${info.date}  <b class="num">${info.score}</b>  <small class="grey">${info.vote} votes</small></p>
      <p><small class="grey">${info.text[0]}  </small><small>${info.text[1]} </small><small class="grey">${info.text[2]} </small></p>
    `
  document.querySelector('#panelInterestWrapper').appendChild(ratingCard)
  renderSettingCard()
}

// 函数: 渲染设置卡片
const renderSettingCard = () => {
  // 设置图标
  let settingIcon = document.createElement('span')
  settingIcon.innerHTML = settingIconRes
  document.querySelector('.rating-card').appendChild(settingIcon)

  // 设置卡片
  let settingCard = document.createElement('div')
  settingCard.className = 'setting-card'
  settingCard.innerHTML = `
    <input type="checkbox" id="faviconDisplay" name="faviconDisplay" ${localStorage.getItem('favicon') == 'true' ? 'checked' : ''}/>
    <label for="faviconDisplay">显示Favicon</label>
    `
  document.querySelector('.rating-card').appendChild(settingCard)

  // 点击事件
  settingIcon.onclick = () => {
    settingCard.style.display = settingCard.style.display == 'block' ? 'none' : 'block'
  }

  // 修改内容时间监听
  let faviconDisplay = document.querySelector('#faviconDisplay')
  faviconDisplay.onchange = input => {
    let checked = input.target.checked
    localStorage.setItem('favicon', checked)
    document.querySelector('.favicon').style.display = checked ? 'inline' : 'none'
  }

}

// 函数: 查询内容为空
const renderNoData = () => {
  let blankCard = document.createElement('small')
  blankCard.className = "grey rating-card"
  blankCard.innerHTML = `数据库中没有查询到该${subjectType}`
  document.querySelector('#panelInterestWrapper').appendChild(blankCard)
}


// ===VNDB函数===

// 函数：返回格式化的VNDB请求参数
const getVNDBRequest = title => {
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

// 函数: 格式化游玩时长数据
const getLengthWord = length => {
  if (length == 1) {
    return "非常短"
  } else if (length == 2) {
    return "短"
  } else if (length == 3) {
    return "中等"
  } else if (length == 4) {
    return "长"
  } else if (length == 5) {
    return "非常长"
  } else {
    return '-'
  }
}

// 函数: 格式化时长
const getLengthHour = min => {
  if (min == null) {
    return '-'
  } else {
    return (min / 60).toFixed(2) / 1 + 'Hours'
  }
}

// 函数: 获取VNDB数据并渲染
const renderVNDB = () => {
  fetch('https://api.vndb.org/kana/vn', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(getVNDBRequest(nameSingle)),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let results = data.results
      // 判断结果，渲染DOM
      if (results.length > 0) {
        renderRatingCard({
          link: 'https://vndb.org/' + results[0].id,
          icon: 'https://vndb.org/favicon.ico',
          title: results[0].alttitle ? results[0].alttitle : results[0].title,
          url: results[0].image.url,
          date: results[0].released,
          score: isNull((results[0].rating / 10).toFixed(2) / 1, 0),
          vote: results[0].votecount,
          text: ['平均游玩时长: ', getLengthHour(results[0].length_minutes) + '(' + getLengthWord(results[0].length) + ')', results[0].length_votes + ' votes']
        })
      } else if (results.length == 0) {
        renderNoData()
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// ===MAL部分===

// 函数: 获取MAL数据并渲染
const renderMAL = () => {
  fetch('https://api.jikan.moe/v4/anime?limit=1&q=' + nameSingle, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let results = data.data
      console.log(results)
      // 判断结果，渲染DOM
      if (results.length > 0) {
        renderRatingCard({
          link: results[0].url,
          icon: 'https://myanimelist.net/favicon.ico',
          title: results[0].title_japanese,
          url: results[0].images.jpg.large_image_url,
          date: results[0].aired.from.substr(0, 10),
          score: isNull(results[0].score, 0),
          vote: results[0].scored_by,
          text: ['MyAnimeList Anime Ranked: ', '#' + results[0].rank, '']
        })
      } else if (results.length == 0) {
        renderNoData()
      }
    })
    .catch((error) => {
      console.log(error);
    });
}


// ===执行部分===

if (subjectType == '游戏') {
  renderVNDB()
} else if (subjectType == '动画') {
  renderMAL()
}
