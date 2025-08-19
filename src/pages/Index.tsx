// import { useState, useEffect } from "react";
import { NewsCard } from "../components/NewsCard";
import { SearchBar } from "../components/SearchBar";
import { LoadingCard } from "../components/LoadingCard";
import { useNews } from "../hooks/useNews";
import { Newspaper, Sparkles } from "lucide-react";
import { Pagination } from "../components/ui/pagination";

const Index = () => {
  // Hook useNews sekarang mengelola semua state pagination
  const { articles, loading, searchNews, currentPage, setCurrentPage, totalPages } = useNews();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Header */}
      <header className="bg-news-gradient text-primary-foreground py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">AI News Portal</h1>
            <Sparkles className="w-8 h-8" />
          </div>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Stay updated with the latest news in Artificial Intelligence from top sources
          </p>
          <SearchBar onSearch={searchNews} />
        </div>
      </header>

      {/* News Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Latest AI Headlines</h2>
          <p className="text-muted-foreground">
            Curated from leading technology publications and research institutions
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && articles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or check back later for new content.
            </p>
          </div>
        )}

        {/* Articles & Pagination */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <NewsCard key={article.id} {...article} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 AI News Portal. Jonathan Wijaya</p>
          <p className="mt-1">Built with React, TypeScript, and TailwindCSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
