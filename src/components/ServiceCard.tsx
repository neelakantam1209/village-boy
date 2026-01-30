
import ImageWithFallback from "@/components/shared/image-with-fallback";

type Props = {
  title: string;
  image: string;
  rating: number;
  price: number;
  instant?: boolean;
};

export default function ServiceCard({
  title,
  image,
  rating,
  price,
  instant,
}: Props) {
  return (
    <div className="min-w-[220px] bg-white rounded-xl shadow-sm hover:shadow-md transition">
      <div className="relative h-40 w-full">
        <ImageWithFallback
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-xl"
        />
      </div>

      <div className="p-3 space-y-1">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>

        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span>⭐ {rating}</span>
          {instant && <span className="text-green-600 font-medium">⚡ Instant</span>}
        </div>

        <p className="text-sm font-semibold text-gray-900">₹{price}</p>
      </div>
    </div>
  );
}
