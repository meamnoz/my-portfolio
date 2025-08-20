import React, { useState, useMemo } from 'react';
import { LuRss as Rss } from 'react-icons/lu';

// Mock Blog Post Data
const allPosts = [
    { id: '1', title: "AI's Role in Modernizing International Trade", category: "AI", date: "2025-08-10", image: "https://placehold.co/600x400/E2E8F0/4A5568?text=AI+in+Trade", excerpt: "How artificial intelligence is reshaping supply chains and market analysis...", content: `<p>... Detailed Content ...</p>` },
    { id: '2', title: "Navigating Emerging Market Risks", category: "Analysis", date: "2025-07-22", image: "https://placehold.co/600x400/D1D5DB/374151?text=Market", excerpt: "A deep dive into the political and economic risks in today's top emerging markets...", content: "<p>... Detailed Content ...</p>" },
    { id: '3', title: "Sustainable Supply Chains: A New Imperative", category: "Logistics", date: "2025-07-01", image: "https://placehold.co/600x400/9CA3AF/1F2937?text=Logistics", excerpt: "How green logistics is becoming a key competitive advantage in international trade...", content: "<p>... Detailed Content ...</p>" },
    { id: '4', title: "The Impact of Trade Agreements on Global Commerce", category: "Policy", date: "2025-06-15", image: "https://placehold.co/600x400/a5b4fc/1e3a8a?text=Policy", excerpt: "An overview of recent trade agreements and their potential effects on global markets.", content: "<p>... Detailed Content ...</p>" },
    // رفع خطا: 'ax' اضافی از انتهای این رشته حذف شد
    { id: '5', title: "Digitalization of Customs and Trade Documentation", category: "Technology", date: "2025-05-30", image: "https://placehold.co/600x400/93c5fd/1e40af?text=Docs", excerpt: "Exploring the shift from paper-based to digital documentation in international trade.", content: "<p>Detailed content about digitalization of customs...</p>" },
];

const PostCard = ({ post }) => (
    <div className="post-card bg-white rounded-xl shadow-md overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <p className="text-sm text-gray-500 mb-2">{post.category} • {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <button className="read-more-btn font-medium text-blue-600 hover:text-blue-800">Read More &rarr;</button>
        </div>
    </div>
);

const Blog = () => {
    const [sortOrder, setSortOrder] = useState('newest');

    const sortedPosts = useMemo(() => {
        return [...allPosts]
            .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
            })
            .slice(0, 3); // نمایش ۳ پست آخر
    }, [sortOrder]);

    return (
        <section id="blog" className="min-h-screen p-6 lg:p-16">
            <div className="max-w-6xl mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center mb-6 md:mb-0">
                        <Rss className="w-8 h-8 mr-3 text-blue-500" />
                        From The Blog
                    </h2>
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-full">
                        <button onClick={() => setSortOrder('newest')} className={`sort-btn ${sortOrder === 'newest' ? 'active' : ''}`}>Most Recent</button>
                        <button onClick={() => setSortOrder('oldest')} className={`sort-btn ${sortOrder === 'oldest' ? 'active' : ''}`}>Oldest First</button>
                    </div>
                </div>
                <div id="blog-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedPosts.map(post => <PostCard key={post.id} post={post} />)}
                </div>
            </div>
        </section>
    );
};

export default Blog;
