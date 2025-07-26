"use server";

export const getCourses = async (language: string) => {
    const response = await fetch(`https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${language}`, {
        headers: {
            'Content-Type': 'application/json',
            'X-TENMS-SOURCE-PLATFORM': 'web'
        }
    });
    const data = await response.json();
    return data;
}