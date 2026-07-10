"use client";

import { useState } from "react";
import Image from "next/image";




const CATEGORIES = [
    "All Articles",
    "Festivals",
    "Real Estate",
    "Retail",
    "Sports",
    "Sustainability",
    "Wellness",
];

const ARTICLES = [
    { id: 1, date: "26 February 2026", title: "Blog Title Here", category: ["All Articles", "Festivals"], image: "/images/blog1.jpg" },
    { id: 2, date: "26 February 2026", title: "Blog Title Here", category: ["All Articles", "Real Estate"], image: "/images/blog2.jpg" },
    { id: 3, date: "26 February 2026", title: "Blog Title Here", category: ["All Articles", "Retail"], image: "/images/blog3.jpg" },
    { id: 4, date: "26 February 2026", title: "Blog Title Here", category: ["All Articles", "Sports"], image: "/images/blog4.jpg" },
    { id: 5, date: "26 February 2026", title: "Blog Title Here", category: ["All Articles", "Sustainability"], image: "/images/blog5.jpg" },
    { id: 6, date: "26 February 2026", title: "Blog Title Here", category: ["All Articles", "Wellness"], image: "/images/blog6.jpg" },
];

export default function BlogSection() {
    const [activeTab, setActiveTab] = useState("All Articles");

    const filteredArticles =
        activeTab === "All Articles"
            ? ARTICLES
            : ARTICLES.filter((article) => article.category.includes(activeTab));

    return (
        <section className="py-16">


            {/* Heading */}
            <div className="bg-primary-gradient py-24 px-6 md:px-10 ">
                <div className="max-w-5xl mx-auto">

                    <h2 className="text-2xl md:text-4xl font-black uppercase leading-snug tracking-tight text-[#0a0a2e] mb-8">
                        Here, we share our expert insights, <br /> industry trends, innovative ideas,
                        and <br /> the latest news from the world of events
                    </h2>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-4 py-2 rounded-full border text-base  transition-all duration-200 cursor-pointer focus:outline-none ${activeTab === cat
                                    ? "bg-primary text-white border-primary"
                                    : "  border-[#5686DA] hover:border-primary hover:text-primary"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto">

                {/* Articles Grid — strict 2-col matching screenshot */}
                {filteredArticles.length > 0 ? (
                    <div className="grid  lg:grid-cols-2  gap-y-15">
                        {filteredArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-16 text-[#363737] text-sm">
                        No articles found for this category.
                    </p>
                )}

                {/* Bottom rule */}
                <div className="mt-10 border-t border-gray-200 mx-4" />
            </div>
        </section >
    );
}

function ArticleCard({ article }) {
    return (
        <div className="group px-4">

            {/* Thumbnail */}
            <div className="h-[250px] relative mb-2">
                <Image
                    src={"/assets/articles.jpg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Date */}
            <p className="text-base  mt-6 leading-none">
                {article.date}
            </p>

            {/* Title + Learn More */}
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg md:text-2xl font-black uppercase leading-tight text-[#0a0a2e]">
                    {article.title}
                </h3>
                <button className="shrink-0 bg-transparent text-[#363737] text-md border border-[#5686DA]  px-4 py-1.5 rounded-full whitespace-nowrap hover:opacity-90 cursor-pointer transition-opacity focus:outline-none">
                    Learn More
                </button>
            </div>

        </div>
    );
}