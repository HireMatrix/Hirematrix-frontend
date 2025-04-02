import React from "react";
import { useNavigate } from "react-router-dom";
import { blogs } from "../assets/blogs"; 

const BlogPage = () => {
  const navigate = useNavigate();

  if (!blogs || blogs.length === 0) {
    return <div>No blog posts available</div>;
  }

  
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

      {/* Latest Blogs Section */}
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
                  e.target.src = "path/to/fallback-image.jpg";
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

      {/* Most Popular Posts Section */}
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
                e.target.src = "path/to/fallback-image.jpg";
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
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;