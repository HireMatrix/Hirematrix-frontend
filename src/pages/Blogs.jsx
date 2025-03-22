import React from "react";
import { useNavigate } from "react-router-dom";

/* 
  Todo:
  1. use the local images or download the images and then use them.
  2. floating button is below the chatbot.
  3. agian here also same mistake don't use the main layout tags for designing the pages whole styling would get clumsy..!! don't use the tag's like main, header, footer, nav here..
  4. also remove the footer we will create a one for all the pages in future and also match this colors with the projects main color theme..
*/
const blogs = [
  {
    title: "Trends From Early AI Adoption in Recruitment Industry",
    author: "Neha Sharma",
    date: "March 25, 2024",
    description:
      "From writing computer code to creating jokes, AI is transforming industries. Learn how recruitment is evolving.",
    image: "https://apna.co/career-central/wp-content/uploads/2024/03/shutterstock_1431767984-4-1536x1045.jpg",
  },
  {
    title: "India’s Favorite Portal to Find Genuine Jobs – Now in 64 Cities",
    author: "HiringNews",
    date: "February 21, 2024",
    description:
      "Over 2 crore Indians are using this platform to find jobs. Explore career opportunities now!",
    image: "https://apna.co/career-central/wp-content/uploads/2024/03/shutterstock_1431767984-4-1536x1045.jpg",
  },
  {
    title: "Hiring Guide – How to Hire a Candidate Through the App?",
    author: "Recruitment Hub",
    date: "February 7, 2024",
    description:
      "Looking for the right candidate? Here's how you can hire faster and smarter.",
    image: "https://apna.co/career-central/wp-content/uploads/2024/03/shutterstock_1431767984-4-1536x1045.jpg",
  },
  {
    title: "Mastering Remote Hiring: Strategies for Success",
    author: "TalentPro",
    date: "January 15, 2024",
    description:
      "Remote hiring is becoming the new norm. Discover the best practices to find top talent online.",
    image: "https://apna.co/career-central/wp-content/uploads/2024/03/shutterstock_1431767984-4-1536x1045.jpg",
  },
  {
    title: "How Soft Skills Impact Your Career Growth",
    author: "Career Experts",
    date: "December 30, 2023",
    description:
      "Technical skills can get you the job, but soft skills will make you thrive in the workplace.",
    image: "https://apna.co/career-central/wp-content/uploads/2024/03/shutterstock_1431767984-4-1536x1045.jpg",
  },
  {
    title: "Top Resume Mistakes That Can Cost You The Job",
    author: "Resume Guru",
    date: "December 10, 2023",
    description:
      "Your resume is your first impression. Avoid these common mistakes to increase your hiring chances.",
    image: "https://apna.co/career-central/wp-content/uploads/2024/03/shutterstock_1431767984-4-1536x1045.jpg",
  },
  {
    title: "Why Company Culture Matters More Than Ever",
    author: "HR Insights",
    date: "November 15, 2023",
    description:
      "A strong company culture leads to better retention and productivity. Here's how you can build one.",
    image: "https://apna.co/career-central/wp-content/uploads/2024/03/shutterstock_1431767984-4-1536x1045.jpg",
  },
  {
    title: "Freelancing vs. Full-Time Jobs: Pros & Cons",
    author: "Career Coach",
    date: "October 5, 2023",
    description:
      "Should you go freelance or stick to full-time jobs? We break down the pros and cons for you.",
    image: "https://apna.co/career-central/wp-content/uploads/2024/03/shutterstock_1431767984-4-1536x1045.jpg",
  },
  {
    title: "Interview Preparation Tips That Actually Work",
    author: "Job Seeker Hub",
    date: "September 18, 2023",
    description:
      "Ace your next interview with these tried-and-tested preparation tips from hiring managers.",
    image: "https://apna.co/career-central/wp-content/uploads/2024/03/shutterstock_1431767984-4-1536x1045.jpg",
  },
  {
    title: "The Future of Work: What Jobs Will Look Like in 2030",
    author: "Tech Visionaries",
    date: "August 22, 2023",
    description:
      "AI, automation, and remote work are reshaping careers. Find out what the future holds.",
    image: "https://apna.co/career-central/wp-content/uploads/2024/03/shutterstock_1431767984-4-1536x1045.jpg",
  },
];

const BlogPage = () => {
  const navigate = useNavigate();

  return (
    <div className="blog-container">
      {/* Sticky Navbar without heading */}
      <header className="header">
        <div className="header-buttons">
          <button className="btn hire-btn" onClick={() => navigate("/hire")}>
            Want to Hire?
          </button>
          <button className="btn job-btn" onClick={() => navigate("/jobs")}>
            Find a Job
          </button>
        </div>
      </header>

      {/* Blog Section Heading */}
      <h1 className="blog-heading">Hiring Platform</h1>

      {/* Main Blog Section */}
      <main className="main-content">
        <section className="featured-blog">
          <img src={blogs[0].image} alt="Featured Blog" loading='lazy'/>
          <div className="featured-content">
            <h2>{blogs[0].title}</h2>
            <p>{blogs[0].description}</p>
            <span>
              {blogs[0].author} - {blogs[0].date}
            </span>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="blog-list">
          {blogs.slice(1).map((blog, index) => (
            <div className="blog-card" key={index}>
              <img src={blog.image} alt="Blog" loading='lazy'/>
              <div className="blog-info">
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <span>
                  {blog.author} - {blog.date}
                </span>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Floating Job Button */}
      <button className="floating-btn" onClick={() => navigate("/looking-for-job")}>
        Looking for a Job?
      </button>

      {/* Footer */}
      <footer className="footer">
        <p>Follow us on social media</p>
        <div className="icons">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" loading='lazy'/>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" loading='lazy'/>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" loading='lazy'/>
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" loading='lazy'/>
          </a>
        </div>
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-conditions">Terms & Conditions</a>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
