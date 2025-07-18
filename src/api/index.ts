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
    published: {
      from: string;
    }
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
export const reqMALData = (title: string, type: string): Promise<MALResults> => {
  return request.get(`https://api.jikan.moe/v4/${type.toLowerCase()}?limit=1&q=` + title);
};

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
export const reqAnilistData = (search: string, type: string): Promise<AnilistResults> => {
  const query = `
    query($search: String) {
      Media(search: $search, type: ${type.toUpperCase()}) {
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

