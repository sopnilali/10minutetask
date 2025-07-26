'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ReactPlayer from 'react-player'
import CourseHeader from './CourseHeader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Course = ({ courseData }: { courseData: any }) => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  // FAQ Accordion with toggle, show 4 by default, "See all" button
  const [showAllFaq, setShowAllFaq] = useState(false);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [playingVideos, setPlayingVideos] = useState<{ [key: number]: boolean }>({});
  const [selectedVideo, setSelectedVideo] = useState<string>('');

  console.log(courseData)


  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">Failed to load course data</div>
      </div>
    );
  }



  const faqs = courseData.sections[15].values || [];
  const visibleFaqs = showAllFaq ? faqs : faqs.slice(0, 4);

  const handleToggle = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx)
        ? prev.filter((i) => i !== idx)
        : [...prev, idx]
    );
  }; console.log();

  const mainVideo = courseData.media.find((m: any) => m.name === 'preview_gallery' && m.resource_type === 'video');
  const thumbnail = courseData.media.find((m: any) => m.name === 'thumbnail');
  const squareImage = courseData.media.find((m: any) => m.name === 'sqr_img');

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className=" mx-auto min-h-screen relative z-20">
      <CourseHeader courseData={courseData} />

      {/* Main Content Container */}
      <div className="container mx-auto  z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg p-6 mb-6 z-20">

              {/* Tab Content */}
              <h2 className="mb-4 text-xl font-semibold md:text-2xl">{courseData.sections[2].name}</h2>
              <div className="mt-6">
                <div className="flex items-center md:rounded-md md:border md:p-5"><div><div className="rounded-[50%] overflow-hidden opacity-0 transition-opacity duration-300 ease-in-out" style={{ fontSize: '0px', opacity: 1 }}>
                  <Image alt="Instructor Munzereen Shahid" data-original-src={courseData.sections[2].values[0].image} loading="lazy" width="73" height="73" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src={courseData.sections[2].values[0].image} />
                </div>
                </div>
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg">
                      <Link className="flex items-center hover:text-green" href="https://10minuteschool.com/skills/instructors/munzereen-shahid/"> {courseData.sections[2].values[0].name} <span className="ml-2 pb-[2px]"></span></Link>
                    </h3>
                    <div>
                      <div dangerouslySetInnerHTML={{ __html: courseData.sections[2].values[0].description }} />
                    </div>
                  </div>
                </div>


                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900">{courseData.sections[3].name}</h3>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 mb-12 mt-4 bg-gray-800 rounded-2xl p-4 my">
                  {courseData.sections[3].values.map((item: any, index: any) => (
                    <div key={index} className=" text-white p-4 rounded-lg flex items-start gap-4 py-6">
                      <div className="text-2xl mb-2">
                        <img src={item.icon} alt={item.title} />
                      </div>
                      <div className='flex-1'>
                        <h4 className="font-semibold mb-1 text-lg">{item.title}</h4>
                        <p className="text-sm text-gray-300">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Free PDF Section */}

                {courseData.sections[4].values.length > 0 && (
                  <div
                    style={{
                      backgroundImage: `url(${courseData.sections[4].values[0].background.image})`,
                      backgroundSize: 'cover',
                    }}
                    className="flex flex-col md:flex-row gap-4 p-4 mb-8 overflow-hidden rounded-xl md:p-8 md:mb-12"
                  >
                    <div className="flex-1 space-y-4 flex flex-col justify-center">
                      <div className="flex items-center justify-center md:justify-start mb-2">
                        <span className="text-lg font-semibold">
                          <Image
                            src={courseData.sections[4].values[0].top_left_icon_img}
                            alt="Free PDF"
                            width={120}
                            height={120}
                            className=" object-cover rounded-full"
                          />
                        </span>
                      </div>
                      <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1">
                        {courseData.sections[4].values[0].title}
                      </h3>
                      <div className="text-gray-200 text-sm md:text-base mb-4">
                        <div dangerouslySetInnerHTML={{ __html: courseData.sections[4].values[0].description }} />
                      </div>
                      <button
                        onClick={() =>
                          window.open(
                            courseData.sections[4].values[0].cta.clicked_url,
                            '_blank'
                          )
                        }
                        className="flex items-center justify-center bg-gradient-to-r from-[#1CBF73] to-[#3EDC8A] text-white px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold shadow hover:from-[#179e5d] hover:to-[#2bbf6e] transition-colors w-full sm:w-auto"
                      >
                        <svg className="mr-2" width="20" height="20" fill="none" viewBox="0 0 20 20">
                          <rect width="20" height="20" rx="4" fill="#fff" fillOpacity="0.15" />
                          <path d="M10 4v8m0 0l-3-3m3 3l3-3m-7 7h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {courseData.sections[4].values[0].cta.text}
                      </button>
                    </div>
                    <div className="w-full h-40 sm:h-48 md:w-56 md:h-48 flex-shrink-0 mt-4 md:mt-0 flex items-center justify-center">
                      <Image
                        src="https://cdn.10minuteschool.com/images/catalog/product/pointer/Thumbnail_for_IELTS_Course_by_MS_1732621023962.jpg"
                        alt="IELTS PDF Preview"
                        className="rounded-lg object-cover w-full h-full border border-white/10 shadow"
                        style={{ background: "#fff" }}
                        width={500}
                        height={500}
                      />
                    </div>
                  </div>
                )}


                {/* What you will learn by doing the course Section */}

                <div className="bg-white rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4">{courseData.sections[5].name}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4 space-y-4">
                  {courseData?.sections[5]?.values?.map((item: any, index: any) => (
                    <div key={index} className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">{courseData.sections[7].name}</h3>
              <Accordion type='single' collapsible className='w-full space-y-2 border border-gray-200 rounded-lg p-4' defaultValue='item-1'>
                {courseData.sections[7].values.map((item: any, index: any) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index + 1}`}
                    className=' rounded-md py-2 border-b-0 border-gray-200  text-left '
                  >
                    <AccordionTrigger className='px-5 text-base hover:cursor-pointer'>
                      <span dangerouslySetInnerHTML={{ __html: item.title }} />
                    </AccordionTrigger>
                    <AccordionContent className='text-base px-5'>
                      <div dangerouslySetInnerHTML={{ __html: item.description }} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Course Exclusive Features */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">{courseData.sections[8].name}</h3>
              <div className="space-y-8">
                {/* Video Lectures Section */}
                {courseData.sections[8].values.map((item: any, index: any) => (
                  <div key={index} className="flex flex-col items-start justify-between gap-3 py-5 md:flex-row border border-gray-200 rounded-lg p-4 ">
                    <div className="flex-1">
                      <h4 className="font-semibold text-base mb-2">{item.title}</h4>
                      <ul className="space-y-2">
                        {item.checklist.map((item: any, idx: any) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <svg className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-800 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-4 mx-auto max-w-[200px] transition-opacity duration-300 ease-in-out">
                      <Image width="250" height="200" src={item.file_url} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Technical Requirements */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">{courseData.sections[13].name}</h3>
              <ul className="space-y-2">
                {courseData.sections[13].values.map((item: any, index: any) => (
                  <li key={index} className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item.title || item.description || item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Payment Process */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">{courseData?.sections[14].name}</h3>
              <p className="text-gray-700 mb-4">{courseData?.sections[14]?.values?.description}</p>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-6">{courseData?.sections[12].name}</h3>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                }}
                className="testimonials-swiper"
              >
                {courseData.sections[12].values.map((testimonial: any, idx: number) => (
                  <SwiperSlide key={idx}>
                    <div className="border border-gray-200 rounded-lg p-4 bg-white h-full flex flex-col">
                      <div className="mb-4 relative rounded-lg overflow-hidden">
                        {testimonial.video_url ? (
                          playingVideos[idx] ? (
                            <ReactPlayer
                              src={`https://www.youtube.com/watch?v=${testimonial.video_url}`}
                              width="100%"
                              height="176px"
                              controls={true}
                              playing={false}

                            />
                          ) : (
                            <>
                              <Image width={500} height={500} src={testimonial.thumb} alt={testimonial.name} className="w-full h-44 object-cover rounded-lg" />
                              <button
                                className="absolute inset-0 flex items-center justify-center"
                                onClick={() => setPlayingVideos(prev => ({ ...prev, [idx]: true }))}
                                type="button"
                              >
                                <span className="bg-white bg-opacity-80 rounded-full p-3 shadow">
                                  <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" fill="white" />
                                    <polygon points="10,8 16,12 10,16" fill="#ef4444" />
                                  </svg>
                                </span>
                              </button>
                            </>
                          )
                        ) : (
                          <Image width={500} height={500} src={testimonial.profile_image} alt={testimonial.name} className="w-full h-44 object-cover rounded-lg" />
                        )}
                      </div>
                      {/* Name and Score */}
                      <div className="flex items-center mt-auto pt-4">
                        <Image width={500} height={500} src={testimonial.profile_image || 'default-avatar.png'} alt={testimonial.name} className="w-10 h-10 rounded-full mr-3" />
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-xs text-gray-500">{testimonial.testimonial}</div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* FAQ Section */}

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{courseData.sections[15].name}</h3>
              <div className="space-y-2">
                {visibleFaqs.map((faq: any, index: number) => {
                  // Use the index in the full faqs array for openIndexes
                  const globalIdx = showAllFaq ? index : index;
                  const isOpen = openIndexes.includes(globalIdx);
                  return (
                    <div key={globalIdx} className="border border-gray-200 rounded-lg">
                      <button
                        type="button"
                        className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50"
                        onClick={() => handleToggle(globalIdx)}
                      >
                        <span className="font-medium text-sm">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4">
                          <div
                            className="text-sm text-gray-700"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
                {!showAllFaq && faqs.length > 4 && (
                  <button
                    className="text-green-600 font-medium hover:underline"
                    onClick={() => setShowAllFaq(true)}
                    type="button"
                  >
                    See all
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Video Player */}
              <div className="bg-white rounded-lg p-4 mb-6">
                <div className="relative w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                  {selectedVideo ? (
                    <ReactPlayer
                      src={`https://www.youtube.com/watch?v=${selectedVideo}`}
                      width="100%"
                      height="100%"
                      controls
                      style={{ borderRadius: '0.5rem', overflow: 'hidden', position: 'absolute', top: 0, left: 0 }}
                    />
                  ) : mainVideo ? (
                    <ReactPlayer
                      src={`https://www.youtube.com/watch?v=${mainVideo.resource_value}`}
                      width="100%"
                      height="100%"
                      controls
                      style={{ borderRadius: '0.5rem', overflow: 'hidden', position: 'absolute', top: 0, left: 0 }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{courseData.title}</h3>
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={8}
                  slidesPerView={4}
                  className="w-full"
                  breakpoints={{
                    320: {
                      slidesPerView: 2,
                    },
                    480: {
                      slidesPerView: 3,
                    },
                    640: {
                      slidesPerView: 4,
                    },
                  }}
                >
                  {courseData.media.slice(0, 8).map((media: any, index: any) => (
                    <SwiperSlide key={index}>
                      {media.resource_type === "image" ? (
                        <Image
                          width={500}
                          height={500}
                          src={media.thumbnail_url || media.resource_value}
                          alt={media.name}
                          className="w-16 h-12 object-cover rounded bg-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedVideo(media.resource_value)}
                        />
                      ) : media.resource_type === "video" ? (
                        <div
                          className="w-16 h-12 flex items-center justify-center bg-gray-200 rounded cursor-pointer hover:opacity-80 transition-opacity relative"
                          onClick={() => setSelectedVideo(media.resource_value)}
                        >
                          <Image
                            width={500}
                            height={500}
                            src={media.thumbnail_url}
                            alt={media.name}
                            className="w-16 h-12 object-cover rounded bg-gray-200"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <div className="w-16 h-12 bg-gray-200 rounded"></div>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-green-600">৳3850</span>
                    <span className="text-lg text-gray-500 line-through">৳5000</span>
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">৳1150 ছাড়</span>
                  </div>
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Enroll
                  </button>
                </div>
              </div>

              {/* Course Inclusions */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">এই কোর্সে যা থাকছে</h3>
                <div className="space-y-3">
                  {courseData.checklist?.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Image width={500} height={500} src={item.icon} alt={item.text} className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course; 