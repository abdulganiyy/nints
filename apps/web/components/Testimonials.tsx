import { Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  country: string;
  initials: string;
  rating: number;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Customer Name",
    role: "Early User",
    country: "Nigeria",
    initials: "CN",
    rating: 5,
    review:
      "Replace this placeholder with a real customer review before launch.",
  },
  {
    id: 2,
    name: "Customer Name",
    role: "Business Owner",
    country: "Lagos",
    initials: "CN",
    rating: 5,
    review:
      "Use authentic feedback collected from verified users after they complete transfers.",
  },
  {
    id: 3,
    name: "Customer Name",
    role: "Freelancer",
    country: "Abuja",
    initials: "CN",
    rating: 5,
    review:
      "Real testimonials help build trust more effectively than fictional ones.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            What Our Customers Say
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We believe trust is earned. Replace these placeholders with
            authentic reviews from verified customers as your platform grows.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="rounded-3xl border p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Quote className="h-10 w-10 text-emerald-600" />

              <div className="mt-6 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 leading-8 text-slate-600">
                "{testimonial.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                  {testimonial.initials}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">
                    {testimonial.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {testimonial.role} • {testimonial.country}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-slate-900 px-8 py-12 text-center text-white">
          <h3 className="text-3xl font-bold">Your Feedback Helps Us Improve</h3>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            After each completed transfer, customers can rate their experience
            and leave feedback. We use verified reviews to improve our service.
          </p>
        </div>
      </div>
    </section>
  );
}
