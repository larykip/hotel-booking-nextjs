import ReviewCards from "./ReviewCards";

const ReviewsSection = () => {
  return (
    <section>
        <h1 className='text-3xl font-bold my-4 text-blue-700'>
            Testimonials
        </h1>
        <div>
            <ReviewCards/>
        </div>

    </section>
  )
}

export default ReviewsSection;