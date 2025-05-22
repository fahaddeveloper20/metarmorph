 document.addEventListener('DOMContentLoaded', function () {
            // Navigation Menu
            const openNavButton = document.getElementById('openNavButton');
            const closeNavButton = document.getElementById('closeNavButton');
            const overlayNav = document.getElementById('overlayNav');
            const navListItems = overlayNav.querySelectorAll('nav ul li');

            if (openNavButton && overlayNav) {
                openNavButton.addEventListener('click', function () {
                    overlayNav.classList.remove('translate-x-full');
                    overlayNav.classList.add('translate-x-0');
                    document.body.style.overflow = 'hidden';
                    navListItems.forEach((li, index) => {
                        li.style.animation = '';
                        setTimeout(() => {
                            li.style.opacity = '0';
                            li.style.transform = 'translateY(20px)';
                            li.style.animation = `fadeInUp 0.4s ease-out ${index * 0.07 + 0.25}s forwards`;
                        }, 50);
                    });
                });
            }

            function closeOverlay() {
                overlayNav.classList.remove('translate-x-0');
                overlayNav.classList.add('translate-x-full');
                document.body.style.overflow = '';
                navListItems.forEach((li) => {
                    li.style.animation = '';
                    li.style.opacity = '0';
                    li.style.transform = 'translateY(20px)';
                });
            }

            if (closeNavButton && overlayNav) {
                closeNavButton.addEventListener('click', closeOverlay);
            }

            const navLinks = overlayNav.querySelectorAll('nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (link.getAttribute('href').startsWith('#') || (!link.href.startsWith('http') && link.target !== '_blank')) {
                        closeOverlay();
                    }
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                });
            });

            // FAQ Accordion
            const faqContainer = document.getElementById('faq-container');
            if (faqContainer) {
                const faqItems = faqContainer.querySelectorAll('.faq-item');
                const initiallyOpenItem = faqContainer.querySelector('.faq-item-open');
                if (initiallyOpenItem) {
                    const initialArrow = initiallyOpenItem.querySelector('.arrow-icon');
                    if (initialArrow) initialArrow.style.transform = 'rotate(180deg)';
                }

                faqItems.forEach(item => {
                    const button = item.querySelector('button');
                    const answer = item.querySelector('.faq-answer');
                    const arrowIcon = item.querySelector('.arrow-icon');
                    const headerText = item.querySelector('h3');

                    function toggleItem() {
                        const isOpen = answer.classList.contains('open');
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('faq-item-open'); otherItem.classList.add('faq-item-closed');
                                otherItem.querySelector('.faq-answer').classList.remove('open');
                                const otherArrow = otherItem.querySelector('.arrow-icon');
                                if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
                                otherItem.querySelector('button').setAttribute('aria-expanded', 'false');
                                otherItem.classList.remove('p-4', 'sm:p-5'); otherItem.classList.add('p-3', 'sm:p-4');
                                const otherH3 = otherItem.querySelector('h3');
                                otherH3.classList.remove('text-base', 'sm:text-lg', 'font-semibold', 'text-white');
                                otherH3.classList.add('text-sm', 'sm:text-base', 'font-medium', 'text-gray-200');
                            }
                        });
                        if (isOpen) {
                            answer.classList.remove('open'); item.classList.remove('faq-item-open'); item.classList.add('faq-item-closed');
                            if (arrowIcon) arrowIcon.style.transform = 'rotate(0deg)';
                            button.setAttribute('aria-expanded', 'false');
                            item.classList.remove('p-4', 'sm:p-5'); item.classList.add('p-3', 'sm:p-4');
                            headerText.classList.remove('text-base', 'sm:text-lg', 'font-semibold', 'text-white');
                            headerText.classList.add('text-sm', 'sm:text-base', 'font-medium', 'text-gray-200');
                        } else {
                            answer.classList.add('open'); item.classList.remove('faq-item-closed'); item.classList.add('faq-item-open');
                            if (arrowIcon) arrowIcon.style.transform = 'rotate(180deg)';
                            button.setAttribute('aria-expanded', 'true');
                            item.classList.remove('p-3', 'sm:p-4'); item.classList.add('p-4', 'sm:p-5');
                            headerText.classList.remove('text-sm', 'sm:text-base', 'font-medium', 'text-gray-200');
                            headerText.classList.add('text-base', 'sm:text-lg', 'font-semibold', 'text-white');
                        }
                    }
                    item.addEventListener('click', toggleItem);
                });
            }

            // Dynamic Testimonials
            const testimonialsData = [
                { name: "Sophia M.", location: "— United States", image: "images/sofi1.png", alt: "Sophia M.", rating: 5, text: "Metamorph Solutions transformed our online presence! Their design and development services are top-notch, delivering a visually stunning and user-friendly website that perfectly aligns with our brand. Highly recommended!", avatarFirst: true },
                { name: "James L.", location: "— Canada", image: "images/sofi.png", alt: "James L.", rating: 5, text: "The team at Metamorph is incredibly talented. They took our vague ideas and crafted a brilliant brand identity and website. Their collaborative approach made the whole process a pleasure.", avatarFirst: false },
                { name: "Alina K.", location: "— Germany", image: "images/sofi.png", alt: "Alina K.", rating: 4, text: "Working with Metamorph Solutions was seamless. Their project management was excellent, and they delivered results that exceeded our expectations for our new mobile app.", avatarFirst: true },
                { name: "David R.", location: "— Australia", image: "images/sofi1.png", alt: "David R.", rating: 5, text: "As a startup, we needed a flexible and creative team. Metamorph provided just that, helping us launch our MVP with a fantastic design and solid backend. Will definitely work with them again!", avatarFirst: false },
                { name: "Priya S.", location: "— India", image: "images/sofi.png", alt: "Priya S.", rating: 5, text: "Their digital marketing insights combined with their design prowess gave our campaign a significant boost. The animated ad creatives were particularly effective.", avatarFirst: true },
                { name: "Kenji T.", location: "— Japan", image: "images/sofi1.png", alt: "Kenji T.", rating: 4, text: "The UI/UX improvements on our e-commerce platform led to a noticeable increase in conversion rates. The team was very responsive to feedback.", avatarFirst: false }
            ];

            const testimonialContainer = document.getElementById('testimonial-cards-container');
            const prevTestimonialButton = document.getElementById('prevTestimonial');
            const nextTestimonialButton = document.getElementById('nextTestimonial');
            let currentTestimonialIndex = 0;

            function createStarRatingHTML(rating) {
                let stars = '';
                for (let i = 0; i < 5; i++) {
                    stars += `<svg class="w-4 h-4 sm:w-5 sm:h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>`;
                }
                return stars;
            }

            function buildTestimonialCard(testimonial, isAvatarFirst) {
                const avatarHTML = `<img src="${testimonial.image}" alt="${testimonial.alt}" class="testimonial-avatar w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl object-cover flex-shrink-0 shadow-lg ${isAvatarFirst ? 'md:mr-8' : 'md:ml-8'}">`;
                const cardContentHTML = `
                    <div class="testimonial-card p-6 md:p-8 rounded-2xl w-full relative overflow-hidden">
                        <svg class="absolute right-4 bottom-4 w-20 h-20 md:w-24 md:h-24 text-white quote-icon-bg pointer-events-none" fill="currentColor" viewBox="0 0 32 32"><path d="M6 17.219L10.219 13L8.781 11.562L3.563 16.781L3.5 22H10V16C10 15.437 9.781 14.875 9.375 14.438L6 11.063V17.219Z"/><path d="M22 17.219L26.219 13L24.781 11.562L19.563 16.781L19.5 22H26V16C26 15.437 25.781 14.875 25.375 14.438L22 11.063V17.219Z"/></svg>
                        <div class="relative z-10">
                            <div class="flex justify-between items-start mb-3">
                                <div><h3 class="text-lg sm:text-xl font-semibold text-white">${testimonial.name}</h3><p class="text-xs sm:text-sm text-gray-400">${testimonial.location}</p></div>
                                <div class="flex space-x-0.5">${createStarRatingHTML(testimonial.rating)}</div>
                            </div>
                            <p class="text-sm sm:text-base text-gray-300 leading-relaxed">${testimonial.text}</p>
                        </div>
                    </div>`;
                
                let layoutClass = 'flex-col md:flex-row';
                if (!isAvatarFirst) layoutClass = 'flex-col-reverse md:flex-row';

                const itemDiv = document.createElement('div');
                itemDiv.className = `testimonial-item flex ${layoutClass} items-center md:items-start gap-6 md:gap-0`;
                itemDiv.innerHTML = isAvatarFirst ? avatarHTML + cardContentHTML : cardContentHTML + avatarHTML;
                return itemDiv;
            }

            function displayTestimonials() {
                if (!testimonialContainer) return;
                
                const existingItems = testimonialContainer.querySelectorAll('.testimonial-item');
                existingItems.forEach(item => {
                    item.classList.remove('testimonial-enter-active');
                    item.classList.add('testimonial-exit-active');
                });

                setTimeout(() => {
                    testimonialContainer.innerHTML = '';
                    const testimonial1Data = testimonialsData[currentTestimonialIndex];
                    const testimonial2Index = (currentTestimonialIndex + 1) % testimonialsData.length;
                    const testimonial2Data = testimonialsData[testimonial2Index];

                    if (testimonial1Data) {
                        const card1 = buildTestimonialCard(testimonial1Data, testimonial1Data.avatarFirst); // Use avatarFirst from data
                        card1.classList.add('mb-10', 'md:mb-0');
                        testimonialContainer.appendChild(card1);
                    }
                    if (testimonial2Data && testimonial1Data !== testimonial2Data) {
                         const card2 = buildTestimonialCard(testimonial2Data, testimonial2Data.avatarFirst); // Use avatarFirst from data
                        testimonialContainer.appendChild(card2);
                    }
                    
                    const newItems = testimonialContainer.querySelectorAll('.testimonial-item');
                    newItems.forEach((item, idx) => {
                        item.style.opacity = '0';
                        item.classList.add('testimonial-enter-active');
                        item.style.animationDelay = `${idx * 0.1}s`;
                    });
                }, 400); // Match CSS exit animation duration
            }

            if (prevTestimonialButton && nextTestimonialButton && testimonialContainer && testimonialsData.length > 0) {
                prevTestimonialButton.addEventListener('click', () => {
                    currentTestimonialIndex = (currentTestimonialIndex - 2 + testimonialsData.length) % testimonialsData.length;
                     if (testimonialsData.length % 2 === 0 && currentTestimonialIndex % 2 !== 0 && testimonialsData.length > 2) { // Adjust if even length and not starting at 0
                        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialsData.length) % testimonialsData.length;
                     }
                    displayTestimonials();
                });
                nextTestimonialButton.addEventListener('click', () => {
                    currentTestimonialIndex = (currentTestimonialIndex + 2) % testimonialsData.length;
                    displayTestimonials();
                });
                displayTestimonials(); // Initial display
            }
            
            // Footer Year
            const currentYearSpan = document.getElementById('currentYear');
            if (currentYearSpan) {
                currentYearSpan.textContent = new Date().getFullYear();
            }
        });