document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.table-of-contents a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 20;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Add highlighting effect
                targetElement.style.transition = 'background-color 0.3s ease';
                targetElement.style.backgroundColor = 'rgba(0, 191, 174, 0.1)';
                
                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 2000);
            }
        });
    });
    
    // Add scroll progress indicator
    function addScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #00BFAE, #FFD700, #98FB98);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    addScrollProgress();
    
    // Add active section highlighting in navigation
    function highlightActiveSection() {
        const sections = document.querySelectorAll('.section[id]');
        const navLinks = document.querySelectorAll('.table-of-contents a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionHeight = section.offsetHeight;
                
                if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    highlightActiveSection();
    
    // Add CSS for active navigation links
    const style = document.createElement('style');
    style.textContent = `
        .table-of-contents a.active {
            background-color: #00BFAE !important;
            color: white !important;
            font-weight: 600;
            border-left-color: #FFD700 !important;
        }
    `;
    document.head.appendChild(style);
    
    // Add print functionality
    function addPrintButton() {
        const printButton = document.createElement('button');
        printButton.innerHTML = '📄 Печать документа';
        printButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00BFAE, #20c997);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 191, 174, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        printButton.addEventListener('mouseenter', () => {
            printButton.style.transform = 'translateY(-2px)';
            printButton.style.boxShadow = '0 6px 16px rgba(0, 191, 174, 0.4)';
        });
        
        printButton.addEventListener('mouseleave', () => {
            printButton.style.transform = 'translateY(0)';
            printButton.style.boxShadow = '0 4px 12px rgba(0, 191, 174, 0.3)';
        });
        
        printButton.addEventListener('click', () => {
            window.print();
        });
        
        document.body.appendChild(printButton);
    }
    
    addPrintButton();
    
    // Add back to top button
    function addBackToTopButton() {
        const backToTopButton = document.createElement('button');
        backToTopButton.innerHTML = '↑';
        backToTopButton.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: #FFD700;
            color: #333;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
        `;
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
        
        document.body.appendChild(backToTopButton);
    }
    
    addBackToTopButton();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.keyCode) {
                case 80: // Ctrl+P for print
                    e.preventDefault();
                    window.print();
                    break;
                case 72: // Ctrl+H for home (top)
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    break;
            }
        }
    });
    
    // Add section animations on scroll
    function animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
    
    animateOnScroll();
    
    // Add search functionality
    function addSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            position: sticky;
            top: 0;
            background: white;
            padding: 15px 0;
            border-bottom: 2px solid #00BFAE;
            z-index: 100;
            margin-bottom: 2rem;
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Поиск по документу...';
        searchInput.style.cssText = `
            width: 100%;
            padding: 12px 20px;
            border: 2px solid #e9ecef;
            border-radius: 25px;
            font-size: 16px;
            outline: none;
            transition: border-color 0.3s ease;
        `;
        
        searchInput.addEventListener('focus', () => {
            searchInput.style.borderColor = '#00BFAE';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.style.borderColor = '#e9ecef';
        });
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const textElements = document.querySelectorAll('.section-content p, .section-content li, .section-content h3, .section-content h4');
            
            textElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (searchTerm && text.includes(searchTerm)) {
                    element.style.backgroundColor = 'rgba(255, 215, 0, 0.3)';
                    element.style.transition = 'background-color 0.3s ease';
                } else {
                    element.style.backgroundColor = '';
                }
            });
        });
        
        searchContainer.appendChild(searchInput);
        
        const tableOfContents = document.querySelector('.table-of-contents');
        tableOfContents.parentNode.insertBefore(searchContainer, tableOfContents);
    }
    
    addSearchFunctionality();
    
    // Add reading time estimator
    function addReadingTime() {
        const content = document.querySelector('.main-content').textContent;
        const words = content.split(/\s+/).length;
        const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute
        
        const readingTimeElement = document.createElement('div');
        readingTimeElement.textContent = `📖 Время чтения: примерно ${readingTime} минут`;
        readingTimeElement.style.cssText = `
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            padding: 10px 20px;
            border-radius: 20px;
            text-align: center;
            margin: 1rem 0;
            font-size: 14px;
            color: #6c757d;
            border: 1px solid #dee2e6;
        `;
        
        const subtitle = document.querySelector('.subtitle');
        subtitle.parentNode.insertBefore(readingTimeElement, subtitle.nextSibling);
    }
    
    addReadingTime();
    
    console.log('📋 Гайд для трудовых мигрантов загружен успешно!');
    console.log('⌨️ Горячие клавиши: Ctrl+P - печать, Ctrl+H - наверх');
});
