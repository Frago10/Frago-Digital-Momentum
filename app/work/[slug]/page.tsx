import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCase } from "@/lib/cases";
import { CaseStudyView } from "@/components/CaseStudyView";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: `${c.client} — ${c.title}`,
    description: c.subtitle,
    openGraph: {
      title: `${c.client} — Case Study`,
      description: c.subtitle,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();
  return <CaseStudyView study={study} />;
}
