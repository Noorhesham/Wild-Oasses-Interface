import Cabin from "@/app/components/Cabin";
import Reservation from "@/app/components/Reservation";
import Spinner from "@/app/components/Spinner";
import { getCabin } from "@/app/lib/data-service";
import { Suspense } from "react";

export async function generateMetaData({ params }: { params: any }) {
  const { name } = await getCabin(params.cabinId);
  return { title: name };
}
const page = async ({ params }: { params: any }) => {
  const cabin = await getCabin(params.cabinId);
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
