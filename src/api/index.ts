import request from '../utils/request.ts';


interface VNDBResults {
  results: {
    id: string;
    alttitle: string;
    title: string;
    image: { url: string };
    released: string;
    rating: number;
    votecount: string;
    length_minutes: number;
    length_votes: string;
    length: number
  }[];
}

/**
 * @description
 * 获取VNDB数据
 * @param {string} title - 标题
 */
export const reqVNDBData = (title: string): Promise<VNDBResults> => {
  return request.post('https://api.vndb.org/kana/vn', {
    filters: [
      "search",
      "=",
      title
    ],
    fields: "alttitle,title,released,languages,image{url,sexual,violence},rating,votecount,length,length_minutes,length_votes",
    sort: "searchrank",
    reverse: false,
    results: 1,
    page: 1,
    count: false,
    compact_filters: false,
    normalized_filters: false
  });
};

interface MALResults {
  data: {
    url: string;
    title_japanese: string;
    images: {
      jpg: {
        large_image_url: string;
      };
    },
    aired: {
      from: string;
    },
    score: string;
    scored_by: string;
    vote: string;
    rank: string;
  }[]
}

/**
 * @description
 * 获取MAL数据
 * @param {string} title - 标题
 */
export const reqMALData = (title: string): Promise<MALResults> => {
  return request.get('https://api.jikan.moe/v4/anime?limit=1&q=' + title);
};


/**
 * @description
 * query : 
 * query($search: String)  {
  Media(search: $search, type: ANIME) {
    coverImage {
      medium
    }
    averageScore
    rankings {
      rank
      context
      allTime
      type
      format
      year
    }
    startDate {
      day
      year
      month
    }
  }
}

  Variables
  {
  "search": "がっこうぐらし！"
}

  Response
  "data": {
    "Media": {
      "coverImage": {
        "medium": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx20754-e5JXeLpHoN7w.jpg"
      },
      "averageScore": 74,
      "rankings": [
        {
          "rank": 437,
          "context": "most popular all time",
          "allTime": true,
          "type": "POPULAR",
          "format": "TV",
          "year": null
        },
        {
          "rank": 39,
          "context": "highest rated",
          "allTime": false,
          "type": "RATED",
          "format": "TV",
          "year": 2015
        },
        {
          "rank": 38,
          "context": "most popular",
          "allTime": false,
          "type": "POPULAR",
          "format": "TV",
          "year": 2015
        },
        {
          "rank": 8,
          "context": "highest rated",
          "allTime": false,
          "type": "RATED",
          "format": "TV",
          "year": 2015
        },
        {
          "rank": 12,
          "context": "most popular",
          "allTime": false,
          "type": "POPULAR",
          "format": "TV",
          "year": 2015
        }
      ],
      "startDate": {
        "day": 9,
        "year": 2015,
        "month": 7
      }
    }
  }
 */
export interface AnilistResults {
  data: {
    Media: {
      coverImage: {
        large: string;
      };
      averageScore: number;
      rankings: {
        rank: number;
        context: string;
        allTime: boolean;
        type: string;
        format: string;
        year: number | null;
      }[];
      startDate: {
        day: number;
        year: number;
        month: number;
      };
      id: number,
      title: {
        native: string
      },
      favourites: number
    };
  };
}

/**
 * @description
 * 获取AniList API数据
 * @param {string} search - 搜索关键词
 */
export const reqAnilistData = (search: string): Promise<AnilistResults> => {
  const query = `
    query($search: String) {
      Media(search: $search, type: ANIME) {
        coverImage {
          large
        }
        averageScore
        rankings {
          rank
          context
          allTime
          type
          format
          year
        }
        startDate {
          day
          year
          month
        }
        id
        title {
          native
        }
        favourites
      }
    }
  `;

  return request.post<AnilistResults>('https://graphql.anilist.co', {
    query,
    variables: { search }
  });
};

