import { ExternalLink, Clock } from "lucide-react";
import { Card } from "../components/ui/card";

interface NewsCardProps {
  title: string;
  description?: string;
  url: string;
  publishedAt: string;
  source: string;
  imageUrl?: string;
}

export const NewsCard = ({ 
  title, 
  description, 
  url, 
  publishedAt, 
  source,
  imageUrl 
}: NewsCardProps) => {
  const parseDate = (dateString: string): string => {
  if (!dateString) return "Unknown date";

  const parsedDate = new Date(dateString);

  if (isNaN(parsedDate.getTime())) {
    return "Unknown date"; // fallback kalau tetap gagal
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border bg-card">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full"
      >
        {imageUrl && (
          <div className="aspect-video overflow-hidden bg-muted">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="px-2 py-1 bg-accent/10 text-accent rounded-full font-medium">
              {source}
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {parseDate(publishedAt)}
            </div>
          </div>
          
          <h3 className="font-semibold text-lg leading-tight group-hover:text-accent transition-colors line-clamp-2">
            {title}
          </h3>
          
          {description && (
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          )}
          
          <div className="flex items-center gap-1 text-accent text-sm font-medium pt-2">
            Read more
            <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </a>
    </Card>
  );
};