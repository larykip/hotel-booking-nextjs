import ReviewCards from "./ReviewCards";

const ReviewsSection = () => {
  return (
    <section className="flex flex-col px-8 text-center md:text-left max-w-[1200px] mx-auto">
        <h1 className='text-xl md:text-3xl font-bold my-4 text-blue-700'>
            Testimonials
        </h1>
        <div>
            <ReviewCards/>
        </div>

    </section>
  )
}

export default ReviewsSection;