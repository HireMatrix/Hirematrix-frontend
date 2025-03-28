import React from "react";
import { useNavigate } from "react-router-dom";
import { blogs } from "../assets/blogs"; // Import the blogs array

// Social media icons (replace with local assets in a real project)
const facebookIcon = "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg";
const instagramIcon = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png";
const linkedinIcon = "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png";
const youtubeIcon = "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png";

const BlogPage = () => {
  const navigate = useNavigate();

  if (!blogs || blogs.length === 0) {
    return <div>No blog posts available</div>;
  }

  // Function to handle blog post click
  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div className="blog-container">
      {/* Blog Intro Section with Buttons */}
      <section className="blog-intro">
        <h1 className="blog-heading">Hiring Platform Blog</h1>
        <p className="blog-subheading">
          Unlock your potential with expert insights on top hiring trends and job opportunities.
        </p>
        <div className="header-buttons">
          <button 
            className="btn hire-btn" 
            onClick={() => navigate("/hire")}
            aria-label="Navigate to hiring page"
          >
            Want to Hire?
          </button>
          <button 
            className="btn job-btn" 
            onClick={() => navigate("/jobs")}
            aria-label="Navigate to jobs page"
          >
            Find a Job
          </button>
        </div>
      </section>

      {/* Latest Blogs Section - Now showing 6 posts */}
      <section className="latest-blogs">
        <h2 className="section-heading">The latest from the blog</h2>
        <div className="blog-grid">
          {blogs.slice(0, 6).map((blog, index) => (
            <div
              className="blog-card"
              key={index}
              onClick={() => handleBlogClick(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleBlogClick(index);
                }
              }}
              aria-label={`View blog post: ${blog.title}`}
            >
              <img 
                src={blog.image} 
                alt={blog.title} 
                loading="lazy"
                onError={(e) => {
                  e.target.src = "path/to/fallback-image.jpg"; // Add a fallback image
                }}
              />
              <div className="blog-info">
                <span className="blog-author">{blog.author}</span>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Most Popular Posts Section - Now showing 1 featured and 4 smaller posts */}
      <section className="popular-posts">
        <h2 className="section-heading">Most popular posts</h2>
        <div className="popular-posts-container">
          <div
            className="popular-featured"
            onClick={() => handleBlogClick(6)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleBlogClick(6);
              }
            }}
            aria-label={`View blog post: ${blogs[6].title}`}
          >
            <img 
              src={blogs[6].image} 
              alt={blogs[6].title} 
              loading="lazy"
              onError={(e) => {
                e.target.src = "path/to/fallback-image.jpg"; // Add a fallback image
              }}
            />
          </div>
          <div className="popular-list">
            {blogs.slice(6, 10).map((blog, index) => (
              <div
                className="popular-card"
                key={index}
                onClick={() => handleBlogClick(index + 6)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleBlogClick(index + 6);
                  }
                }}
                aria-label={`View blog post: ${blog.title}`}
              >
                <span className="blog-author">{blog.author}</span>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Button */}
      <button 
        className="floating-btn" 
        onClick={() => navigate("/jobs")}
        aria-label="Navigate to job search page"
      >
        Looking for a Job?
      </button>

     
    </div>
  );
};

export default BlogPage;