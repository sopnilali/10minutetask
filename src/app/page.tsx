import Course from "@/components/Course/Course";
import Footer from "@/components/shared/Footer";
import { getCourses } from "@/services/Courses";

export default async function Home() {


  const courseDatas = await getCourses("en");


  return (
    <>
      <Course courseData={courseDatas.data} />
      <Footer />
    </>
  );
}
