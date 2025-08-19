import { useState } from "react";
import { NewsCard } from "../components/NewsCard";
import { SearchBar } from "../components/SearchBar";
import { LoadingCard } from "../components/LoadingCard";
import { useNews } from "../hooks/useNews";
import { Newspaper, Sparkles } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "../components/ui/pagination";


const Index = () => {
  const { articles, loading, searchNews } = useNews();

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // hitung index untuk slice
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="bg-news-gradient text-primary-foreground py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">AI News Portal</h1>
            <Sparkles className="w-8 h-8" />
          </div>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Stay update with the latest news in Artificial Intelligence from sources
          </p>
          <SearchBar onSearch={searchNews} />
        </div>
      </header>

      {/* News Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Latest AI Headlines</h2>
          <p className="text-muted-foreground">
            Curated from leading technology publications and research institutions
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  url={article.url}
                  publishedAt={article.publishedAt}
                  source={article.source}
                  imageUrl={article.imageUrl}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination className="mt-6">
        <PaginationContent>
          {/* Tombol Previous */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) setCurrentPage(currentPage - 1)
              }}
            />
          </PaginationItem>

          {/* Nomor halaman */}
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === index + 1}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage(index + 1)
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Tombol Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) setCurrentPage(currentPage + 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
              </div>
            )}
          </>
        ) : (
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
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 AI News Portal. Jonathan Wijaya</p>
            <p className="mt-1">Dibuat dengan React, TypeScript, dan Tailwindcss</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
