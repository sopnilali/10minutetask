import Course from "@/components/Course/Course";
import CourseHeader from "@/components/Course/CourseHeader";
import Footer from "@/components/shared/Footer";
import { getCourses } from "@/services/Courses";

export default async function Home(params: { searchParams: Promise<{ lang: string }> }) {
  const searchParams = await params.searchParams;
  const lang = searchParams.lang || "bn";


  const courseDatas = await getCourses(lang)


  return (
    <>
      <Course courseData={courseDatas?.data} lang={lang} />
      <Footer />
    </>
  );
}
