import Course from "@/components/Course/Course";
import CourseHeader from "@/components/Course/CourseHeader";
import Footer from "@/components/shared/Footer";
import { getCourses } from "@/services/Courses";

export default async function Home(params: { searchParams: { lang: string } }) {
  const lang = params.searchParams.lang || "bn";


  const courseDatas = await getCourses(lang)


  return (
    <>
      <Course courseData={courseDatas?.data} lang={params.searchParams.lang} />
      <Footer />
    </>
  );
}
