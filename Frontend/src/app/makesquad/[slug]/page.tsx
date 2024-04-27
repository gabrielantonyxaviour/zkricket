export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <div className="bg-white px-16 py-6 sm:pt-32 lg:px-16 text-black">
        My Post: {params.slug}
      </div>
    </div>
  );
}
