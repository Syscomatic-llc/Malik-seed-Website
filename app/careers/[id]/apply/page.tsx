import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplyPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/careers/${id}/apply/info`);
}
