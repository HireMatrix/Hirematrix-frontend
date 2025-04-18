import React, { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogs } from "../../assets/blogs"; 

const BlogDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const blog = blogs[id]; 

  
  const sectionRefs = useRef(
    blog?.toc.reduce((acc, item) => {
      acc[item.key] = React.createRef();
      return acc;
    }, {}) || {}
  );

  const ctaRef = useRef(null);
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const blogContent = document.querySelector(".blog-content");
      const scrollPosition = window.scrollY + window.innerHeight;
      const blogBottom = blogContent.offsetTop + blogContent.offsetHeight;

      if (scrollPosition >= blogBottom) {
        scrollToSection(ctaRef);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!blog) {
    return <div className="blog-detail-container">Blog not found</div>;
  }

  return (
    <div className="blog-detail-container">
      {/* Header Section */}
      <div className="blog-header">
        <h1>{blog.title}</h1>
      </div>

      {/* Main Content Section */}
      <div className="blog-content-wrapper">
        {/* Blog Content */}
        <div className="blog-content">
          <div className="back-to-articles">
            <button onClick={() => navigate("/blogs")} aria-label="Back to all articles">
              ← Back to all articles
            </button>
          </div>

          {/* Dynamically render sections based on the toc */}
          {blog.toc.map((section, index) => (
            <section key={section.key} id={section.key} ref={sectionRefs.current[section.key]}>
              <h2>{section.title}</h2>
              <p>{blog.content[section.key]}</p>
            </section>
          ))}
        </div>

        {/* Table of Contents */}
        <aside className="table-of-contents">
          <h3>TABLE OF CONTENTS</h3>
          <div className="toc-list">
            <ul>
              {blog.toc.map((section) => (
                <li
                  key={section.key}
                  onClick={() => scrollToSection(sectionRefs.current[section.key])}
                >
                  {section.title}
                </li>
              ))}
            </ul>
          </div>
         
        </aside>
      </div>
    </div>
  );
};

export default BlogDetail;