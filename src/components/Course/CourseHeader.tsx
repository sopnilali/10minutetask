
'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CourseHeaderProps {
  courseData: any;
  lang: Promise<string> | string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ courseData, lang }) => {
  const [currentLang, setCurrentLang] = useState<string>('en');

  // Handle async lang prop
  useEffect(() => {
    if (typeof lang === 'string') {
      setCurrentLang(lang);
    } else if (lang instanceof Promise) {
      lang.then(setCurrentLang).catch(() => setCurrentLang('en'));
    }
  }, [lang]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Toggle between 'en' and 'bn'
  const handleLangToggle = () => {
    const nextLang = currentLang === 'en' ? 'bn' : 'en';
    // Build new search params
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('lang', nextLang);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {/* Sticky Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-xl font-semibold text-gray-800">
                <Link href="/">
                  <Image src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg" alt="10 Minutes School" width={100} height={100} />
                </Link>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language Toggle Button */}
              <button
                className={`px-6 py-2 rounded-lg transition-colors ${
                  currentLang === 'en'
                    ? 'bg-pink-600 text-white hover:bg-pink-700'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
                onClick={handleLangToggle}
                aria-label="Toggle language"
              >
                {currentLang === 'en' ? 'BN' : 'EN'}
              </button>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-4 py-8 z-20 bg-gray-100 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          {/* Left Content */}
          <div className="lg:col-span-2 ">
            {/* Course Title and Rating */}
            <div className="rounded-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{courseData.title}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">(82.6% শিক্ষার্থী কোর্স শেষে এ রেটিং নিয়েজেন্ট)</span>
              </div>
              <div className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: courseData.description }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseHeader; 