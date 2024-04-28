import Pitch from "@/components/Pitch";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="pt-10 bg-white">
      <Pitch />
      <div className="bg-white px-16 py-6 sm:pt-32 lg:px-16 text-black">
        My Post: {params.slug}
      </div>
    </div>
  );
}
