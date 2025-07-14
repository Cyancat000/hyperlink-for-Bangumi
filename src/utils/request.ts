// request.ts

// 定义一个接口来扩展 Error，使其可以包含 `response` 属性
interface CustomErrorWithResponse extends Error {
  response?: Response;
}

/**
 * 基础请求函数
 * @param url 请求地址
 * @param method 请求方法 (GET, POST等)
 * @param data 请求体数据 (仅POST/PUT等方法需要)
 * @param params URL查询参数 (仅GET方法需要)
 * @param headers 自定义请求头
 * @returns 返回Promise，resolve时携带响应数据
 */
const request = async <T>(
  url: string,
  method: string = 'GET',
  data: object | null = null,
  params: Record<string, string | number | boolean> | null = null, // params 允许更广的类型
  headers: Record<string, string> = {}
): Promise<T> => {
  const config: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json', // 默认Content-Type
      ...headers, // 允许覆盖或添加自定义headers
    },
  };

  // 处理GET请求的查询参数
  if (params && Object.keys(params).length > 0) {
    // URLSearchParams 构造函数接受 Record<string, string>，所以需要类型转换
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    url = `${url}?${queryString}`;
  }

  // 处理POST等请求的请求体
  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response: Response = await fetch(url, config);

    // 检查HTTP响应状态码
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      (error as CustomErrorWithResponse).response = response;
      throw error;
    }

    // 尝试解析JSON响应
    const result: T = await response.json();
    return result;
  } catch (error: unknown) { // 捕获到的错误类型默认为 unknown
    // 这里可以进一步处理错误，例如检查 error 是否为 CustomErrorWithResponse
    if (error instanceof Error) {
        console.error('Request failed:', error.message);
        if ((error as CustomErrorWithResponse).response) {
            console.error('Response status:', (error as CustomErrorWithResponse).response?.status);
        }
    } else {
        console.error('An unknown error occurred during request:', error);
    }
    throw error; // 重新抛出错误以便调用者捕获
  }
};

/**
 * 封装GET请求
 * @param url 请求地址
 * @param params URL查询参数
 * @param headers 自定义请求头
 * @returns 返回Promise
 */
const get = <T>(
  url: string,
  params: Record<string, string | number | boolean> = {},
  headers: Record<string, string> = {}
): Promise<T> => {
  return request<T>(url, 'GET', null, params, headers);
};

/**
 * 封装POST请求
 * @param url 请求地址
 * @param data 请求体数据
 * @param headers 自定义请求头
 * @returns 返回Promise
 */
const post = <T>(
  url: string,
  data: object = {},
  headers: Record<string, string> = {}
): Promise<T> => {
  return request<T>(url, 'POST', data, null, headers);
};

// 导出封装的请求方法
export default {
  get,
  post,
  // 如果需要，可以在这里添加 put, delete 等方法
};