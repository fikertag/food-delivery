import { Star } from "lucide-react";
import Topic from "./Topic";

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    review:
      "Amazing food and super fast delivery! I love how fresh everything is. Highly recommend! 🍕🚀",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michael Smith",
    review:
      "Fantastic service and delicious meals. Ordering was so easy, and the food arrived hot and tasty! 😋",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    review:
      "Great selection of restaurants and quick delivery. Definitely my go-to food app now! ❤️",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-8 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <Topic Mainhedder={"Testimony"} />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          What Our Customers Say 💬
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-secondary/10 p-6 rounded-2xl shadow-md text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-gray-300"
                />
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <div className="flex text-yellow-500">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
