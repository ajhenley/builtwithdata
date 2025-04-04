/**
 * main.js - Built with Data Landing Page
 * 
 * This file contains the JavaScript functionality for the Built with Data landing page,
 * including Vue.js components, navigation handling, and interactive elements.
 */

// Main Vue Instance
new Vue({
  el: '#app',
  data: {
    menuActive: false,
    currentTestimonial: 0,
    testimonialInterval: null,
    contactForm: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    // Services Data
    services: [
      {
        icon: 'fas fa-chart-line',
        title: 'Career Analytics',
        description: 'Detailed insights into your career trajectory with personalized growth recommendations based on market trends and your unique skillset.'
      },
      {
        icon: 'fas fa-search',
        title: 'Opportunity Finder',
        description: 'AI-powered job matching that connects you with positions aligned to your career goals, skills, and values.'
      },
      {
        icon: 'fas fa-brain',
        title: 'Skill Development',
        description: 'Personalized learning pathways that identify skill gaps and provide targeted resources to help you stay competitive.'
      },
      {
        icon: 'fas fa-users',
        title: 'Networking Intelligence',
        description: 'Strategic networking recommendations that identify key connections to accelerate your career growth.'
      }
    ],
    // Features Data
    features: [
      {
        icon: 'fas fa-tachometer-alt',
        title: 'Career Dashboard',
        description: 'An intuitive dashboard that visualizes your career progress, skill development, and market position.'
      },
      {
        icon: 'fas fa-bullseye',
        title: 'Goal Tracking',
        description: 'Set, monitor, and achieve your career milestones with data-backed strategies for success.'
      },
      {
        icon: 'fas fa-laptop-code',
        title: 'Skill Assessment',
        description: 'Comprehensive skill evaluations that benchmark your abilities against industry standards.'
      },
      {
        icon: 'fas fa-industry',
        title: 'Industry Insights',
        description: 'Real-time market data and industry trends to inform your career decisions.'
      },
      {
        icon: 'fas fa-lightbulb',
        title: 'Personalized Recommendations',
        description: 'AI-generated suggestions tailored to your unique career path and aspirations.'
      },
      {
        icon: 'fas fa-handshake',
        title: 'Mentorship Matching',
        description: 'Connect with mentors who have relevant experience in your desired career path.'
      }
    ],
    // Stats Data
    stats: [
      {
        value: '25,000+',
        label: 'Careers Enhanced'
      },
      {
        value: '1,500+',
        label: 'Companies Using Our Platform'
      },
      {
        value: '94%',
        label: 'Success Rate'
      },
      {
        value: '4.8/5',
        label: 'Client Satisfaction'
      }
    ],
    // Testimonials Data
    testimonials: [
      {
        quote: "Built with Data completely transformed my career approach. The personalized insights helped me identify my strengths and focus on developing skills that actually mattered in my industry.",
        name: "Sarah Johnson",
        position: "Marketing Director at TechGrowth",
        image: "app/public/images/testimonial-1.jpg"
      },
      {
        quote: "As a career changer, I was overwhelmed by options. Built with Data's analytics gave me clarity on which skills to focus on and connected me with opportunities I wouldn't have found otherwise.",
        name: "Michael Chen",
        position: "Software Engineer at InnovateCorp",
        image: "app/public/images/testimonial-2.jpg"
      },
      {
        quote: "The detailed insights into industry trends and skill demands helped me position myself for a leadership role. Within 6 months of using the platform, I secured a promotion and 30% salary increase.",
        name: "Jessica Rodriguez",
        position: "Product Manager at FutureWorks",
        image: "app/public/images/testimonial-3.jpg"
      }
    ]
  },
  methods: {
    // Navigation Methods
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
    closeMenu() {
      this.menuActive = false;
    },
    
    // Testimonial Slider Methods
    nextTestimonial() {
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
      this.resetTestimonialInterval();
    },
    prevTestimonial() {
      this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
      this.resetTestimonialInterval();
    },
    goToTestimonial(index) {
      this.currentTestimonial = index;
      this.resetTestimonialInterval();
    },
    startTestimonialInterval() {
      this.testimonialInterval = setInterval(() => {
        this.nextTestimonial();
      }, 5000);
    },
    resetTestimonialInterval() {
      clearInterval(this.testimonialInterval);
      this.startTestimonialInterval();
    },
    
    // Form Handling
    submitForm() {
      // In a real scenario, this would be connected to a backend service
      alert('Thank you for your message! We will get back to you soon.');
      // Reset form
      this.contactForm = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    },
    
    // Scroll Animation for Stats
    animateCounters() {
      const statElements = document.querySelectorAll('.counter');
      
      const options = {
        threshold: 0.5
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const value = target.innerHTML;
            
            // If the value contains a plus sign or other non-numeric characters
            if (isNaN(parseFloat(value))) {
              return;
            }
            
            let startValue = 0;
            const endValue = parseInt(value.replace(/[^0-9.-]+/g, ""));
            const duration = 2000;
            const counter = setInterval(() => {
              startValue += Math.ceil(endValue / (duration / 20));
              target.innerHTML = startValue + (value.includes('+') ? '+' : '');
              
              if (startValue >= endValue) {
                target.innerHTML = value;
                clearInterval(counter);
              }
            }, 20);
            
            observer.unobserve(target);
          }
        });
      }, options);
      
      statElements.forEach(stat => {
        observer.observe(stat);
      });
    }
  },
  mounted() {
    // Start testimonial auto-scroll
    this.startTestimonialInterval();
    
    // Handle navbar scroll state
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
    
    // Initialize countup animation for stats
    this.animateCounters();
    
    // Handle smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  },
  beforeDestroy() {
    // Clear intervals when component is destroyed
    clearInterval(this.testimonialInterval);
  }
}); 