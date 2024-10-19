export interface GoogleTrendsResponse {
  status: number;
  data: Data;
}

export interface Data {
  search_metadata: SearchMetadata;
  search_parameters: SearchParameters;
  daily_searches: DailySearch[];
  serpapi_pagination: SerpapiPagination;
}

interface SearchMetadata {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  google_trends_trending_now_url: string;
  raw_html_file: string;
  prettify_html_file: string;
  total_time_taken: number;
}

interface SearchParameters {
  engine: string;
  hl: string;
  date: string;
  geo: string;
  frequency: string;
}

interface DailySearch {
  date: string;
  searches: Search[];
}

interface Search {
  query: string;
  google_trends_link: string;
  serpapi_google_trends_link: string;
  traffic: number;
  related_queries?: RelatedQuery[];
  articles: Article[];
}

interface RelatedQuery {
  query: string;
  google_trends_link: string;
  serpapi_google_trends_link: string;
}

export interface Article {
  title: string;
  link: string;
  snippet: string;
  source: string;
  date: string;
  thumbnail?: string;
}

interface SerpapiPagination {
  current_date: string;
  next_date: string;
  next: string;
}
