import { useState, useEffect } from "react";

export interface NewsArticle {
  id: string;
  title: string;
  description?: string;
  url: string;
  publishedAt: string;
  source: string;
  imageUrl?: string;
}

const API_KEYS = {
  newsdata: import.meta.env.VITE_NEWSDATA_API_KEY,
  newsapi: import.meta.env.VITE_NEWSAPI_KEY,
  gnews: import.meta.env.VITE_GNEWS_API_KEY,
};

const ITEMS_PER_PAGE = 6;

export const useNews = () => {
  const [allArticles, setAllArticles] = useState<NewsArticle[]>([]);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsdataURL = `https://newsdata.io/api/1/news?apikey=${API_KEYS.newsdata}&q=artificial+intelligence&language=en`;
        const newsapiURL = `https://newsapi.org/v2/everything?q=artificial+intelligence&language=en&apiKey=${API_KEYS.newsapi}`;
        const gnewsURL = `https://gnews.io/api/v4/search?q=artificial+intelligence&lang=en&token=${API_KEYS.gnews}`;

        const [res1, res2, res3] = await Promise.allSettled([
          fetch(newsdataURL).then(r => r.json()),
          fetch(newsapiURL).then(r => r.json()),
          fetch(gnewsURL).then(r => r.json()),
        ]);

        const merged: NewsArticle[] = [];

        if (res1.status === "fulfilled" && res1.value?.results) {
          merged.push(
            ...res1.value.results.map((item: any, idx: number) => ({
              id: item.article_id || `nd-${idx}`,
              title: item.title,
              description: item.description,
              url: item.link,
              publishedAt: item.pubDate,
              source: item.source_id || "NewsData",
              imageUrl: item.image_url,
            }))
          );
        }

        if (res2.status === "fulfilled" && res2.value?.articles) {
          merged.push(
            ...res2.value.articles.map((item: any, idx: number) => ({
              id: item.url || `na-${idx}`,
              title: item.title,
              description: item.description,
              url: item.url,
              publishedAt: item.publishedAt,
              source: item.source?.name || "NewsAPI",
              imageUrl: item.urlToImage,
            }))
          );
        }

        if (res3.status === "fulfilled" && res3.value?.articles) {
          merged.push(
            ...res3.value.articles.map((item: any, idx: number) => ({
              id: item.url || `gn-${idx}`,
              title: item.title,
              description: item.description,
              url: item.url,
              publishedAt: item.publishedAt,
              source: item.source?.name || "GNews",
              imageUrl: item.image,
            }))
          );
        }

        // filter hanya yang ada image
        const filtered = merged.filter(
          (a) => a.imageUrl && a.imageUrl.trim() !== ""
        );

        // urutkan berdasarkan waktu terbaru
        filtered.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );

        setAllArticles(filtered);
        setCurrentPage(1); // reset ke halaman pertama
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // update articles tiap kali ganti halaman
  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setArticles(allArticles.slice(start, end));
  }, [allArticles, currentPage]);

  const searchNews = (query: string) => {
    if (!query.trim()) {
      setAllArticles(allArticles); // reset
      setCurrentPage(1);
      return;
    }

    const filtered = allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description?.toLowerCase().includes(query.toLowerCase()) ||
        article.source.toLowerCase().includes(query.toLowerCase())
    );

    setAllArticles(filtered);
    setCurrentPage(1); // balik ke halaman pertama setelah search
  };

  return {
    articles,
    loading,
    searchNews,
    currentPage,
    setCurrentPage,
    totalPages: Math.ceil(allArticles.length / ITEMS_PER_PAGE),
  };
};
