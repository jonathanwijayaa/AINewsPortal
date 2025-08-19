import { Card } from "../components/ui/card";

export const LoadingCard = () => {
  return (
    <Card className="overflow-hidden shadow-card bg-card border-border">
      <div className="aspect-video bg-muted animate-pulse" />
      
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 bg-muted rounded-full animate-pulse" />
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <div className="h-6 bg-muted rounded animate-pulse" />
          <div className="h-6 w-4/5 bg-muted rounded animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </Card>
  );
};