import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { testimonials } from './Reviews';


const ReviewCards = () => {
  return (
    <div className="rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
         items={testimonials}
         direction='left'
         speed='slow'
        />
    </div>
  )
}

export default ReviewCards;