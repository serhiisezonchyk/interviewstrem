import { StarIcon } from 'lucide-react';
import { cn } from './utils';

export const renderStars = (rating: number, className?: string) => (
  <div className={cn('flex gap-0.5', className)}>
    {[1, 2, 3, 4, 5].map((starValue) => (
      <StarIcon
        key={starValue}
        className={`h-4 w-4 ${starValue <= rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
      />
    ))}
  </div>
);
