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

export const useNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data Dummy nnti diganti dengan API
  const mockNews: NewsArticle[] = [
    {
      id: "1",
      title: "OpenAI Releases Revolutionary GPT-5 Model with Advanced Reasoning Capabilities",
      description: "The latest iteration of ChatGPT shows unprecedented improvements in logical reasoning and complex problem-solving across multiple domains.",
      url: "#",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: "TechCrunch",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=smart"
    },
    {
      id: "2", 
      title: "Google DeepMind Breakthrough in Protein Folding Leads to New Drug Discoveries",
      description: "AlphaFold 3 enables researchers to predict protein structures with 99.7% accuracy, accelerating pharmaceutical research.",
      url: "#",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      source: "Nature",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=smart"
    },
    {
      id: "3",
      title: "Meta Introduces Advanced AI-Powered AR Glasses for Consumer Market",
      description: "The new Meta Ray-Ban Smart Glasses 2.0 feature real-time AI translation and contextual information overlay.",
      url: "#",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      source: "The Verge",
      imageUrl: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&h=400&fit=crop&crop=smart"
    },
    {
      id: "4",
      title: "Tesla's Full Self-Driving AI Achieves Level 5 Autonomy in Controlled Tests",
      description: "Extensive testing shows Tesla's FSD v12 successfully navigating complex urban environments without human intervention.",
      url: "#",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      source: "Reuters",
      imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&crop=smart"
    },
    {
      id: "5",
      title: "Microsoft Copilot Gets Major Update with Enhanced Code Generation",
      description: "GitHub Copilot now supports 15 new programming languages and can generate complete applications from natural language descriptions.",
      url: "#",
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      source: "GitHub Blog",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&crop=smart"
    },
    {
      id: "6",
      title: "AI-Powered Climate Model Predicts Weather Patterns 14 Days in Advance",
      description: "Scientists develop neural network that outperforms traditional meteorological models in accuracy and computational efficiency.",
      url: "#",
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      source: "Science",
      imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&crop=smart"
    },
    {
      id: "7",
      title: "Anthropic's Claude 3 Demonstrates Human-Level Performance on Complex Reasoning Tasks",
      description: "New benchmark tests show Claude 3 matching human experts in mathematical proofs and scientific literature analysis.",
      url: "#",
      publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
      source: "AI Research",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&crop=smart"
    },
    {
      id: "8",
      title: "Robotics Company Boston Dynamics Unveils Humanoid Robot for Healthcare",
      description: "Atlas Healthcare Edition can assist medical professionals with patient care and perform basic diagnostic procedures.",
      url: "#",
      publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
      source: "IEEE Spectrum",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=smart"
    }
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setArticles(mockNews);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const searchNews = (query: string) => {
    if (!query.trim()) {
      setArticles(mockNews);
      return;
    }

    const filtered = mockNews.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description?.toLowerCase().includes(query.toLowerCase()) ||
      article.source.toLowerCase().includes(query.toLowerCase())
    );

    setArticles(filtered);
  };

  return { articles, loading, error, searchNews };
};