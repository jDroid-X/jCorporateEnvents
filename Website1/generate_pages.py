import os

# Template for the pages (Midnight Emerald Theme)
html_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Curated Leadership Conclave</title>
    <meta name="description" content="{meta_description}">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
    
    <!-- Split Stylesheets -->
    <link rel="stylesheet" href="{root}css/desktop.css">
    <link rel="stylesheet" href="{root}css/tablet.css" media="(max-width: 992px)">
    <link rel="stylesheet" href="{root}css/mobile.css" media="(max-width: 768px)">
    
    <style>
        /* Internal styles for content pages specific layout */
        .page-header {{
            background: radial-gradient(circle at 50% 50%, #1a4040 0%, #0f2e2e 100%);
            padding: 8rem 0 4rem;
            text-align: center;
        }}
        .page-cat {{ color: var(--text-gold); text-transform: uppercase; letter-spacing: 2px; font-size: 0.9rem; }}
        .page-h1 {{ font-size: 3.5rem; margin: 1rem 0; }}
        
        .content-split {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            padding: 6rem 0;
            align-items: center;
        }}
        
        @media (max-width: 992px) {{ .content-split {{ grid-template-columns: 1fr; gap: 2rem; }} }}
        
        .art-placeholder {{
            background-color: #111417;
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--text-gold);
            position: relative;
        }}
        .art-placeholder::after {{
            content: '';
            position: absolute;
            top: 10px; left: 10px; right: 10px; bottom: 10px;
            border: 1px solid rgba(214, 198, 168, 0.2);
        }}
        .art-label {{ font-family: var(--font-serif); font-style: italic; color: #444; font-size: 1.5rem; }}
        
        .content-block {{ margin-bottom: 3rem; }}
        .content-block h3 {{ color: var(--text-gold); font-size: 1.5rem; margin-bottom: 0.5rem; border-left: 2px solid var(--text-gold); padding-left: 1rem; }}
        .content-block p {{ color: var(--text-muted); font-size: 1.05rem; }}
        
        /* Ensure tile images are handled gracefully if missing */
        img {{ max-width: 100%; }}
    </style>
</head>
<body class="theme-institutional">

    <!-- Floating Register Button -->
    <a href="{root}index.html#register" class="floating-register">
        <img src="{root}images/floating_invite_button.png" alt="Request Invite">
    </a>

    <!-- Navigation -->
    <nav class="navbar">
        <div class="container nav-flex">
            <a href="{root}index.html" class="logo">CLC.</a>
            <div class="nav-links">
                <a href="{root}index.html">Home</a>
                <div class="nav-item dropdown nav-solutions">
                    <a href="{root}event-solutions/event-solutions.html" class="dropdown-trigger">Event Solutions <span class="chevron">?</span></a>
                    <div class="dropdown-menu">
                        <div class="dropdown-grid">
                            <div class="dropdown-col">
                                <h3 class="dropdown-header">Event Types</h3>
                                <ul class="dropdown-list">
                                    <li><a href="{root}event-solutions/events/event-conferences.html">Conferences</a></li>
                                    <li><a href="{root}event-solutions/events/event-incentive-trips.html">Incentive Trips</a></li>
                                    <li><a href="{root}event-solutions/events/event-channel-incentives.html">Channel Incentives</a></li>
                                    <li><a href="{root}event-solutions/events/event-sales-kickoffs.html">Sales Kickoffs</a></li>
                                    <li><a href="{root}event-solutions/events/event-strategic-meetings.html">Strategic Meetings</a></li>
                                    <li><a href="{root}event-solutions/event-solutions.html" class="view-all">See all solutions ?</a></li>
                                </ul>
                            </div>
                            <div class="dropdown-col">
                                <h3 class="dropdown-header">Industries</h3>
                                <ul class="dropdown-list">
                                    <li><a href="{root}event-solutions/industries/industry-franchise.html">Franchise</a></li>
                                    <li><a href="{root}event-solutions/industries/industry-home-services.html">Home Services</a></li>
                                    <li><a href="{root}event-solutions/industries/industry-manufacturing.html">Manufacturing</a></li>
                                    <li><a href="{root}event-solutions/industries/industry-technology.html">Technology</a></li>
                                    <li><a href="{root}event-solutions/industries/industry-transportation.html">Transportation</a></li>
                                </ul>
                            </div>
                            <div class="dropdown-col featured-col">
                                <div class="featured-card">
                                    <h3 class="featured-title">Governance First</h3>
                                    <p class="featured-desc">How consistent leadership frameworks define the modern enterprise.</p>
                                    <a href="#" class="btn btn-sm">Read Insight</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nav-item dropdown">
                    <a href="{root}our-work/our-work.html" class="dropdown-trigger">Our Work <span class="chevron">?</span></a>
                    <div class="dropdown-menu">
                        <div class="dropdown-grid">
                            <div class="dropdown-col">
                                <h3 class="dropdown-header">Services</h3>
                                <ul class="dropdown-list">
                                    <li><a href="{root}our-work/services/service-strategy.html">Event Strategy</a></li>
                                    <li><a href="{root}our-work/services/service-logistics.html">Logistics Management</a></li>
                                    <li><a href="{root}our-work/services/service-site-selection.html">Site Selection</a></li>
                                    <li><a href="{root}our-work/services/service-budgeting.html">Event Budgeting</a></li>
                                    <li><a href="{root}our-work/services/service-vendor.html">Vendor Management</a></li>
                                    <li><a href="{root}our-work/services/service-onsite.html">Onsite Management</a></li>
                                    <li><a href="{root}our-work/our-work.html" class="view-all">See all work ?</a></li>
                                </ul>
                            </div>
                            <div class="dropdown-col">
                                <h3 class="dropdown-header">Success Stories</h3>
                                <ul class="dropdown-list">
                                    <li><a href="{root}our-work/success-stories/work-multicity.html">Multi-city Conference</a></li>
                                    <li><a href="{root}our-work/success-stories/work-gamification.html">Conference Gamification</a></li>
                                    <li><a href="{root}our-work/success-stories/work-franchise-hosp.html">Franchise Hospitality</a></li>
                                    <li><a href="{root}our-work/success-stories/work-kickoff-expo.html">Annual Kickoff & Expo</a></li>
                                    <li><a href="{root}our-work/success-stories/work-ai-conf.html">AI User Conference</a></li>
                                </ul>
                            </div>
                            <div class="dropdown-col featured-col">
                                <div class="featured-card">
                                    <h3 class="featured-title">Legacy in Motion</h3>
                                    <p class="featured-desc">Creating a centennial celebration for a global banking institution.</p>
                                    <a href="#" class="btn btn-sm">Read Case Study</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nav-item dropdown">
                    <a href="{root}resources/resources.html" class="dropdown-trigger">Resources <span class="chevron">?</span></a>
                    <div class="dropdown-menu">
                        <div class="dropdown-grid">
                            <div class="dropdown-col">
                                <h3 class="dropdown-header">Insights</h3>
                                <ul class="dropdown-list">
                                    <li><a href="{root}resources/insights/resource-blog.html">Industry Blog</a></li>
                                    <li><a href="{root}resources/insights/resource-benchmarking.html">Benchmarking Reports</a></li>
                                    <li><a href="{root}resources/insights/resource-conf-costs.html">Cost Index</a></li>
                                    <li><a href="{root}resources/insights/resource-incentive-costs.html">Travel Costs</a></li>
                                    <li><a href="{root}resources/insights/resource-media.html">Event Media</a></li>
                                    <li><a href="{root}resources/resources.html" class="view-all">See all resources ?</a></li>
                                </ul>
                            </div>
                            <div class="dropdown-col">
                                <h3 class="dropdown-header">Guides</h3>
                                <ul class="dropdown-list">
                                    <li><a href="{root}resources/guides/resource-trends.html">2026 Trends</a></li>
                                    <li><a href="{root}resources/guides/resource-pricing.html">Pricing Strategy</a></li>
                                    <li><a href="{root}resources/guides/resource-buying.html">Venue Buying</a></li>
                                    <li><a href="{root}resources/guides/resource-site-visit.html">Site Visit Checklist</a></li>
                                    <li><a href="{root}resources/guides/resource-top-conf-dest.html">Top Destinations</a></li>
                                </ul>
                            </div>
                            <div class="dropdown-col featured-col">
                                <div class="featured-card">
                                    <h3 class="featured-title">The 2026 Outlook</h3>
                                    <p class="featured-desc">Exclusive report on the future of corporate gatherings.</p>
                                    <a href="#" class="btn btn-sm">Download PDF</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="{root}index.html#council">Council</a>
                <a href="{root}index.html#agenda">Agenda</a>
                <a href="{root}index.html#register" class="btn btn-gold-outline">Request Invitation</a>
            </div>
            <div class="menu-toggle"><span></span><span></span><span></span></div>
        </div>
    </nav>

    <!-- Page Header -->
    <header class="page-header">
        <div class="container fade-in">
            <span class="page-cat">{category}</span>
            <h1 class="page-h1">{title}</h1>
            <p style="max-width: 600px; margin: 0 auto; color: var(--text-white);">{description}</p>
        </div>
    </header>

    <!-- Content Section -->
    <section class="container">
        <div class="content-split">
            <div class="art-placeholder fade-in-scroll">
                <span class="art-label">{image_text}</span>
                <img src="{root}{image_path}" alt="{image_text}" style="width:100%; height:100%; object-fit:cover; opacity:0.6; position:absolute; top:0; left:0;" onerror="this.style.display='none'">
            </div>
            <div class="content-text fade-in-scroll delay-1">
                <div class="content-block">
                    <h3>{sub_head_1}</h3>
                    <p>{sub_text_1}</p>
                </div>
                <div class="content-block">
                    <h3>{sub_head_2}</h3>
                    <p>{sub_text_2}</p>
                </div>
                <a href="{root}index.html#register" class="btn btn-primary">Start Conversation</a>
            </div>
        </div>
        
        {grid_section}
        
    </section>

    <!-- Footer -->
    <footer class="footer-minimal section-padding" style="border-top: 1px solid #222;">
        <div class="container">
            <h2 class="footer-quote">"Leadership Is a Long-Term Responsibility."</h2>
            <div class="footer-meta">
                <span>© 2026 CLC.</span>
                <div class="footer-links">
                    <a href="#">Contact</a>
                    <a href="#">Privacy</a>
                </div>
            </div>
        </div>
    </footer>

    <div class="disclaimer-bar">
        <marquee behavior="scroll" direction="left">This is a demo website created for presentation purposes only. All content is fictional.</marquee>
    </div>

    <script src="{root}js/script.js"></script>
</body>
</html>
"""

# Include all the page data from Website2
pages = [
    # Event Solutions - Types
    {
        "filename": "event-solutions/events/event-conferences.html",
        "title": "Conferences",
        "meta_description": "Premier conference planning services for large-scale corporate gatherings.",
        "category": "Event Types",
        "description": "Orchestrating large-scale gatherings that drive industry conversation and foster global connection.",
        "sub_head_1": "Immersive Environments",
        "sub_text_1": "We design stages and spaces that amplify your message and maintain audience engagement.",
        "sub_head_2": "Seamless Logistics",
        "sub_text_2": "From registration to post-event analytics, every touchpoint is managed with precision.",
        "image_path": "images/event-solutions/conferences.jpg",
        "image_text": "Conference Hall"
    },
    {
        "filename": "event-solutions/events/event-incentive-trips.html",
        "title": "Incentive Trips",
        "meta_description": "Reward your top performers with unforgettable travel experiences.",
        "category": "Event Types",
        "description": "Designing once-in-a-lifetime travel experiences that motivate teams and build loyalty.",
        "sub_head_1": "Curated Destinations",
        "sub_text_1": "We find unique locations and exclusive activities that go beyond the ordinary.",
        "sub_head_2": "Personalized Itineraries",
        "sub_text_2": "Every guest feels like a VIP with tailored schedules and white-glove service.",
        "image_path": "images/event-solutions/incentive.jpg",
        "image_text": "Luxury Resort Pool"
    },
    {
        "filename": "event-solutions/events/event-channel-incentives.html",
        "title": "Channel Incentives",
        "meta_description": "Drive partner performance with strategic channel incentive programs.",
        "category": "Event Types",
        "description": "Programs designed to engage partners, distributors, and resellers to drive sales growth.",
        "sub_head_1": "Performance Tracking",
        "sub_text_1": "Integrated systems to track sales data and reward achievements in real-time.",
        "sub_head_2": "Exclusive Rewards",
        "sub_text_2": "Access to high-value events and experiences that strengthen partner relationships.",
        "image_path": "images/event-solutions/channel.jpg",
        "image_text": "Handshake Business Partners"
    },
    {
        "filename": "event-solutions/events/event-sales-kickoffs.html",
        "title": "Sales Kickoffs",
        "meta_description": "Energize your sales team and align them on goals for the year ahead.",
        "category": "Event Types",
        "description": "High-energy events that launch new products, set strategy, and motivate sales teams.",
        "sub_head_1": "Strategic Alignment",
        "sub_text_1": "Clear communication of company vision and goals to ensure everyone is on the same page.",
        "sub_head_2": "Team Building",
        "sub_text_2": "Interactive sessions and activities that foster collaboration and team spirit.",
        "image_path": "images/event-solutions/kickoff.jpg",
        "image_text": "Cheering Sales Team"
    },
    {
        "filename": "event-solutions/events/event-strategic-meetings.html",
        "title": "Strategic Meetings",
        "meta_description": "Facilitate critical decision-making with professionally managed strategic meetings.",
        "category": "Event Types",
        "description": "Focused gatherings for board meetings, executive retreats, and advisory councils.",
        "sub_head_1": "Confidential Environments",
        "sub_text_1": "Secure and private settings that allow for open and honest high-level discussions.",
        "sub_head_2": "Facilitation Support",
        "sub_text_2": "Professional facilitators and tools to guide the agenda and ensure productive outcomes.",
        "image_path": "images/event-solutions/strategic.jpg",
        "image_text": "Boardroom Meeting"
    },

    # Event Solutions - Industries
    {
        "filename": "event-solutions/industries/industry-franchise.html",
        "title": "Franchise",
        "meta_description": "Specialized event services for franchise systems and owner gatherings.",
        "category": "Industries",
        "description": "Events that unify brand vision and support franchisee success across your network.",
        "sub_head_1": "Brand Consistency",
        "sub_text_1": "Ensuring the brand message is clear and consistent across all franchise communications.",
        "sub_head_2": "Community Building",
        "sub_text_2": "Creating opportunities for franchisees to network, share best practices, and learn from each other.",
        "image_path": "images/event-solutions/franchise.jpg",
        "image_text": "Franchise Convention Floor"
    },
    {
        "filename": "event-solutions/industries/industry-home-services.html",
        "title": "Home Services",
        "meta_description": "Events tailored for the home services industry, from hvac to roofing.",
        "category": "Industries",
        "description": "Connecting contractors, suppliers, and dealers in the home improvement sector.",
        "sub_head_1": "Training Workshops",
        "sub_text_1": "Hands-on sessions for technical skills and business management for service providers.",
        "sub_head_2": "Supplier Expos",
        "sub_text_2": "Showcasing the latest products and technologies directly to the contractors who use them.",
        "image_path": "images/event-solutions/home_services.jpg",
        "image_text": "Construction Worker Presentation"
    },
    {
        "filename": "event-solutions/industries/industry-manufacturing.html",
        "title": "Manufacturing",
        "meta_description": "Corporate events for the manufacturing sector, focused on innovation and operations.",
        "category": "Industries",
        "description": "Showcasing innovation and operational excellence for manufacturing leaders.",
        "sub_head_1": "Product Launches",
        "sub_text_1": "Platforming new machinery and technologies with impactful demonstrations.",
        "sub_head_2": "Safety & Compliance",
        "sub_text_2": "Educational tracks focused on industry standards, safety protocols, and regulatory updates.",
        "image_path": "images/event-solutions/manufacturing.jpg",
        "image_text": "Factory Floor Discussion"
    },
    {
        "filename": "event-solutions/industries/industry-technology.html",
        "title": "Technology",
        "meta_description": "Fast-paced events for the tech industry, including user conferences and developer summits.",
        "category": "Industries",
        "description": "Cutting-edge experiences for software, hardware, and SaaS companies.",
        "sub_head_1": "Developer Summits",
        "sub_text_1": "Technical deep-dives, hackathons, and keynotes for the developer community.",
        "sub_head_2": "User Conferences",
        "sub_text_2": "Engaging end-users with product roadmaps, training, and customer success stories.",
        "image_path": "images/event-solutions/technology.jpg",
        "image_text": "Tech Conference Crowd"
    },
    {
        "filename": "event-solutions/industries/industry-transportation.html",
        "title": "Transportation",
        "meta_description": "Events for the transportation and logistics sectors.",
        "category": "Industries",
        "description": "Navigating the future of mobility and logistics through industry gatherings.",
        "sub_head_1": "Fleet Managment",
        "sub_text_1": "Discussions and exhibits focused on fleet efficiency, sustainability, and management.",
        "sub_head_2": "Supply Chain Networking",
        "sub_text_2": "Connecting shippers, carriers, and logistics providers to optimize global supply chains.",
        "image_path": "images/event-solutions/transportation.jpg",
        "image_text": "Trucks on Highway"
    },

    # Our Work - Services
    {
        "filename": "our-work/services/service-strategy.html",
        "title": "Event Strategy",
        "meta_description": "Comprehensive event strategy services to align events with business goals.",
        "category": "Services",
        "description": "Aligning your event portfolio with your broader business objectives for maximum ROI.",
        "sub_head_1": "Audience Analysis",
        "sub_text_1": "Understanding your attendees deeply to tailor the content and experience to their needs.",
        "sub_head_2": "Goal Setting & KPIs",
        "sub_text_2": "Defining clear, measurable success metrics for every event before planning begins.",
        "image_path": "images/our-work/strategy.jpg",
        "image_text": "Strategic Planning Session"
    },
    {
        "filename": "our-work/services/service-logistics.html",
        "title": "Logistics Management",
        "meta_description": "Flawless execution of event logistics, transport, and operations.",
        "category": "Services",
        "description": "Managing the complex moving parts of your event so you can focus on the content.",
        "sub_head_1": "Transportation & Housing",
        "sub_text_1": "Coordinating flights, shuttles, and hotels for thousands of attendees seamlessly.",
        "sub_head_2": "Registration Systems",
        "sub_text_2": "Implementing smooth, tech-enabled check-in processes to eliminate lines and wait times.",
        "image_path": "images/our-work/logistics.jpg",
        "image_text": "Event Registration Desk"
    },
    {
        "filename": "our-work/services/service-site-selection.html",
        "title": "Site Selection",
        "meta_description": "Global venue sourcing and contract negotiation services.",
        "category": "Services",
        "description": "Finding the perfect venue at the best price through our global network.",
        "sub_head_1": "Global Sourcing",
        "sub_text_1": "Leveraging our relationships to find hidden gems and major venues worldwide.",
        "sub_head_2": "Contract Negotiation",
        "sub_text_2": "Securing favorable terms and minimizing risk through expert contract review.",
        "image_path": "images/our-work/site_selection.jpg",
        "image_text": "Luxury Hotel Lobby"
    },
    {
        "filename": "our-work/services/service-budgeting.html",
        "title": "Event Budgeting",
        "meta_description": "Transparent financial management and budgeting for corporate events.",
        "category": "Services",
        "description": "Maximizing your spend with transparent financial tracking and cost-saving strategies.",
        "sub_head_1": "Cost Projection",
        "sub_text_1": "Detailed forecasting to prevent surprises and keep the project on financial track.",
        "sub_head_2": "Reconciliation",
        "sub_text_2": "Accurate and timely post-event financial reporting and billing.",
        "image_path": "images/our-work/budgeting.jpg",
        "image_text": "Calculator and Spreadsheets"
    },
    {
        "filename": "our-work/services/service-vendor.html",
        "title": "Vendor Management",
        "meta_description": "Sourcing and managing top-tier vendors for AV, catering, and decor.",
        "category": "Services",
        "description": "Curating a team of best-in-class partners to bring your event vision to life.",
        "sub_head_1": "Sourcing & RFP",
        "sub_text_1": "Finding the right partners for AV, catering, decor, and entertainment.",
        "sub_head_2": "On-site Coordination",
        "sub_text_2": "Managing all vendor load-in, setup, and strike schedules efficiently.",
        "image_path": "images/our-work/vendor.jpg",
        "image_text": "Catering Setup"
    },
    {
        "filename": "our-work/services/service-onsite.html",
        "title": "Onsite Management",
        "meta_description": "Professional onsite staffing and event management services.",
        "category": "Services",
        "description": "Our team on the ground ensuring everything runs according to the minute-by-minute plan.",
        "sub_head_1": "Staffing",
        "sub_text_1": "Experienced event directors and support staff to handle every guest request.",
        "sub_head_2": "Crisis Management",
        "sub_text_2": "Proactive problem solving to handle any unexpected issues instantly and quietly.",
        "image_path": "images/our-work/onsite.jpg",
        "image_text": "Event Staff with Headsets"
    },

    # Our Work - Success Stories
    {
        "filename": "our-work/success-stories/work-multicity.html",
        "title": "Multi-city Conference",
        "meta_description": "Case study of a successful multi-city roadshow series.",
        "category": "Success Stories",
        "description": "Executing a consistent brand experience across 12 cities in 3 months.",
        "sub_head_1": "Scalable Framework",
        "sub_text_1": "Creating an 'event-in-a-box' model that could be easily replicated in different venues.",
        "sub_head_2": "Local Adaptation",
        "sub_text_2": "Tailoring content and catering to local tastes while maintaining brand standards.",
        "image_path": "images/our-work/multicity.jpg",
        "image_text": "Map with Pins"
    },
    {
        "filename": "our-work/success-stories/work-gamification.html",
        "title": "Conference Gamification",
        "meta_description": "Increasing attendee engagement through app-based gamification.",
        "category": "Success Stories",
        "description": "Boosting attendee engagement by 40% through a custom event app game.",
        "sub_head_1": "Interactive Challenges",
        "sub_text_1": "Scavenger hunts and quizzes that encouraged attendees to visit sponsor booths.",
        "sub_head_2": "Real-time Leaderboards",
        "sub_text_2": "Driving competition and excitement with live updates on big screens.",
        "image_path": "images/our-work/gamification.jpg",
        "image_text": "Phone with App"
    },
    {
        "filename": "our-work/success-stories/work-franchise-hosp.html",
        "title": "Franchise Hospitality",
        "meta_description": "A case study on high-touch hospitality for franchise owners.",
        "category": "Success Stories",
        "description": "Delivering a 5-star resort experience for top-tier franchise owners.",
        "sub_head_1": "VIP Concierge",
        "sub_text_1": "Personalized booking and itinerary services for every attendee.",
        "sub_head_2": "Exclusive Excursions",
        "sub_text_2": "Private yacht charters and culinary tours for elite performers.",
        "image_path": "images/our-work/hospitality.jpg",
        "image_text": "Waiter serving drinks"
    },
    {
        "filename": "our-work/success-stories/work-kickoff-expo.html",
        "title": "Annual Kickoff & Expo",
        "meta_description": "Integrating a trade show expo into a sales kickoff event.",
        "category": "Success Stories",
        "description": "Merging a high-energy sales meeting with a practical product expo.",
        "sub_head_1": "Hybrid Layout",
        "sub_text_1": "Designing a flow that moved attendees seamlessly from general session to the expo floor.",
        "sub_head_2": "Demo Zones",
        "sub_text_2": "Hands-on areas for sales reps to practice with new products under expert guidance.",
        "image_path": "images/our-work/kickoff.jpg",
        "image_text": "Expo Floor"
    },
    {
        "filename": "our-work/success-stories/work-ai-conf.html",
        "title": "AI User Conference",
        "meta_description": "Launching a new user conference for an AI software startup.",
        "category": "Success Stories",
        "description": "From zero to 1,500 attendees: Launching a flagship user conference.",
        "sub_head_1": "Community Focus",
        "sub_text_1": "Building the event program around user contribution and networking.",
        "sub_head_2": "Tech Showcase",
        "sub_text_2": "A futuristic environment demonstrating the latest capabilities of the software.",
        "image_path": "images/our-work/ai-conf.jpg",
        "image_text": "Abstract Tech Background"
    },

    # Resources - Insights
    {
        "filename": "resources/insights/resource-blog.html",
        "title": "Industry Blog",
        "meta_description": "Latest news and articles from the world of corporate event planning.",
        "category": "Industry Insights",
        "description": "Thoughts, opinions, and news from our team of event experts.",
        "sub_head_1": "Thought Leadership",
        "sub_text_1": "Deep dives into the issues affecting the meetings and events industry today.",
        "sub_head_2": "Case Studies",
        "sub_text_2": "Behind-the-scenes looks at some of our most challenging and rewarding projects.",
        "image_path": "images/resources/blog.jpg",
        "image_text": "Typing on Laptop"
    },
    {
        "filename": "resources/insights/resource-benchmarking.html",
        "title": "Benchmarking Reports",
        "meta_description": "Data-driven reports on event industry standards and benchmarks.",
        "category": "Industry Insights",
        "description": "Compare your event performance against industry standards.",
        "sub_head_1": "Budget Benchmarks",
        "sub_text_1": "See how your spending compares to others in your industry and company size.",
        "sub_head_2": "Engagement Metrics",
        "sub_text_2": "Average attendance rates, app adoption, and survey scores across the sector.",
        "image_path": "images/resources/benchmarking.jpg",
        "image_text": "Graphs and Charts"
    },
    {
        "filename": "resources/insights/resource-conf-costs.html",
        "title": "Conference Cost Index",
        "meta_description": "Quarterly updates on the costs of running conferences in major cities.",
        "category": "Industry Insights",
        "description": "Tracking the changing costs of venues, F&B, and AV in major hub cities.",
        "sub_head_1": "City Comparisons",
        "sub_text_1": "Relative cost data to help you decide where to hold your next major event.",
        "sub_head_2": "Inflation Tracking",
        "sub_text_2": "Monitoring year-over-year price changes to aid in accurate budget forecasting.",
        "image_path": "images/resources/costs.jpg",
        "image_text": "Coins and Calculator"
    },
    {
        "filename": "resources/insights/resource-incentive-costs.html",
        "title": "Incentive Travel Costs",
        "meta_description": "Analysis of pricing trends in the luxury incentive travel market.",
        "category": "Industry Insights",
        "description": "The latest pricing trends for luxury resorts and airfare.",
        "sub_head_1": "Destination Trends",
        "sub_text_1": "Which regions are offering the best value versus which are at peak pricing.",
        "sub_head_2": "Flight Data",
        "sub_text_2": "Analysis of airfare trends to popular incentive destinations.",
        "image_path": "images/resources/travel.jpg",
        "image_text": "Airplane Wing"
    },
    {
        "filename": "resources/insights/resource-media.html",
        "title": "Event Media & Tech",
        "meta_description": "Insights into the latest technology for events.",
        "category": "Industry Insights",
        "description": "Exploring the newest tools for engagement, registration, and hybrid events.",
        "sub_head_1": "App Reviews",
        "sub_text_1": "Unbiased reviews of the leading mobile event apps and platforms.",
        "sub_head_2": "AV Innovations",
        "sub_text_2": "New display technologies and production techniques to wow your audience.",
        "image_path": "images/resources/media.jpg",
        "image_text": "Camera Lens"
    },

    # Resources - Guides
    {
        "filename": "resources/guides/resource-trends.html",
        "title": "2026 Event Trends",
        "meta_description": "Our annual guide to the most important trends in corporate events.",
        "category": "Guides",
        "description": "What to expect in the coming year: Sustainability, AI, and personalization.",
        "sub_head_1": "Sustainability",
        "sub_text_1": "Practical ways to reduce the carbon footprint of your large-scale events.",
        "sub_head_2": "AI Integration",
        "sub_text_2": "How artificial intelligence is changing everything from planning to attendee experience.",
        "image_path": "images/resources/trends.jpg",
        "image_text": "Future Cityscape"
    },
    {
        "filename": "resources/guides/resource-pricing.html",
        "title": "Pricing Strategy",
        "meta_description": "A guide to pricing your event tickets for maximum revenue and attendance.",
        "category": "Guides",
        "description": "How to price your conference tickets to maximize both revenue and attendance.",
        "sub_head_1": "Early Bird Strategy",
        "sub_text_1": "Structuring tiered pricing to drive early registrations and cash flow.",
        "sub_head_2": "Value Proposition",
        "sub_text_2": "Communicating the ROI of attendance to justify premium ticket prices.",
        "image_path": "images/resources/pricing.jpg",
        "image_text": "Price Tag"
    },
    {
        "filename": "resources/guides/resource-buying.html",
        "title": "Venue Buying Guide",
        "meta_description": "Tips for negotiating the best hotel and convention center (venue) contracts.",
        "category": "Guides",
        "description": "The insider's guide to negotiating hotel and convention center contracts.",
        "sub_head_1": "Concessions",
        "sub_text_1": "What freebies and discounts you should always ask for in your contract.",
        "sub_head_2": "Attrition Clauses",
        "sub_text_2": "Understanding and mitigating the risks of room block commitments.",
        "image_path": "images/resources/buying.jpg",
        "image_text": "Hand signing contract"
    },
    {
        "filename": "resources/guides/resource-site-visit.html",
        "title": "Site Visit Checklist",
        "meta_description": "A printable checklist for your next venue site inspection.",
        "category": "Guides",
        "description": "Don't miss a thing: A comprehensive checklist for your next venue inspection.",
        "sub_head_1": "Operations Check",
        "sub_text_1": "Verifying loading docks, freight elevators, and power capabilities.",
        "sub_head_2": "Guest Experience",
        "sub_text_2": "Walk the path of the attendee to spot potential bottlenecks or issues.",
        "image_path": "images/resources/checklist.jpg",
        "image_text": "Clipboard with Checklist"
    },
    {
        "filename": "resources/guides/resource-top-conf-dest.html",
        "title": "Top Conf Destinations",
        "meta_description": "A ranking of the best cities for hosting large conferences.",
        "category": "Guides",
        "description": "The top 10 cities in North America for hosting large-scale conferences.",
        "sub_head_1": "Infrastructure",
        "sub_text_1": "Rating cities based on hotel inventory, airlift, and convention center quality.",
        "sub_head_2": "Attendee Apeal",
        "sub_text_2": "Which destinations drive the highest attendance numbers due to their popularity.",
        "image_path": "images/resources/city.jpg",
        "image_text": "City Skyline"
    },
    {
        "filename": "resources/guides/resource-top-incentive-dest.html",
        "title": "Top Incentive Spots",
        "meta_description": "The most desirable destinations for incentive travel programs.",
        "category": "Guides",
        "description": "The most sought-after beaches, cities, and resorts for incentive winners.",
        "sub_head_1": "Luxury focus",
        "sub_text_1": "Destinations that offer true 5-star service and exclusive experiences.",
        "sub_head_2": "Safety & Accessibility",
        "sub_text_2": "Balancing the exotic appeal with the practical needs of corporate travel safety.",
        "image_path": "images/resources/beach.jpg",
        "image_text": "Tropical Beach"
    }
]

# Add Overview Pages
pages.append({
    "filename": "event-solutions/event-solutions.html",
    "title": "Event Solutions",
    "meta_description": "Our complete portfolio of event planning and management solutions.",
    "category": "Overview",
    "description": "From intimate board meetings to global summits, we have the expertise to deliver.",
    "sub_head_1": "Scalable Systems",
    "sub_text_1": "Our methodologies are designed to flex and scale to meet the unique needs of your program.",
    "sub_head_2": "End-to-End Service",
    "sub_text_2": "We handle everything from initial strategy to post-event reconciliation.",
    "image_path": "images/event-solutions/overview.jpg",
    "image_text": "Event Solutions Overview"
})

pages.append({
    "filename": "our-work/our-work.html",
    "title": "Our Work",
    "meta_description": "Case studies and success stories from our past projects.",
    "category": "Overview",
    "description": "See how we've helped other organizations achieve their event goals.",
    "sub_head_1": "Diverse Industries",
    "sub_text_1": "Experience in Technology, Franchise, Healthcare, Manufacturing, and more.",
    "sub_head_2": "Proven Results",
    "sub_text_2": "Read our case studies to see the real-world impact of our strategic approach.",
    "image_path": "images/our-work/overview.jpg",
    "image_text": "Portfolio Montage"
})

pages.append({
    "filename": "resources/resources.html",
    "title": "Resources",
    "meta_description": "Guides, insights, and tools for event planners.",
    "category": "Overview",
    "description": "Knowledge and tools to help you plan better, smarter events.",
    "sub_head_1": "Expert Insights",
    "sub_text_1": "Learn from our team of industry veterans through our blog and reports.",
    "sub_head_2": "Practical Tools",
    "sub_text_2": "Downloadable checklists and guides to support your day-to-day planning.",
    "image_path": "images/resources/overview.jpg",
    "image_text": "Library of Resources"
})


base_path = r"C:\Users\dell\jAnitGravity\jCorporateEvents\Website1"

for page in pages:
    # Calculate root path based on output filename depth
    # e.g. event-solutions/types/file.html -> depth 2 -> ../../
    depth = page["filename"].count("/")
    root_path = "../" * depth if depth > 0 else ""
    
    # Generate Tile Grid if it's an Overview Page
    grid_html = ""
    is_overview = False
    overview_path = ""
    
    if page["filename"].endswith("-solutions.html"):
        is_overview = True
        overview_path = "event-solutions/"
    elif page["filename"].endswith("our-work.html"):
        is_overview = True
        overview_path = "our-work/"
    elif page["filename"].endswith("resources.html"):
        is_overview = True
        overview_path = "resources/"
        
    if is_overview:


        # 1. Identify valid categories for this overview page
        # Event Solutions -> "Event Types" and "Industries"
        # Our Work -> "Services" and "Success Stories"
        # Resources -> "Industry Insights" and "Guides"
        
        # We need to filter separate lists for the columns
        overview_filename = page["filename"]

        
        # Define the category mapping for the two columns
        col1_pages = []
        col2_pages = []
        col1_title = ""
        col2_title = ""
        
        if "event-solutions.html" in overview_filename:
            col1_title = "Event Types"
            col2_title = "Industries"
            col1_pages = [p for p in pages if p.get("category") == "Event Types"]
            col2_pages = [p for p in pages if p.get("category") == "Industries"]




            
        elif "our-work.html" in overview_filename:
            col1_title = "Services"
            col2_title = "Success Stories"
            col1_pages = [p for p in pages if p.get("category") == "Services"]
            col2_pages = [p for p in pages if p.get("category") == "Success Stories"]
            
        elif "resources.html" in overview_filename:
            col1_title = "Industry Insights"
            col2_title = "Guides"
            col1_pages = [p for p in pages if p.get("category") == "Insights"] # Using "Insights" to match "Industry Insights" usage broadly
            if not col1_pages: col1_pages = [p for p in pages if p.get("category") == "Industry Insights"] # Just in case
            col2_pages = [p for p in pages if p.get("category") == "Guides"]
        
        # Helper to generate tile HTML for a list of pages
        def generate_tiles_html(page_list):
            html = ""
            for p in page_list:
                # Calculate relative path
                rel_path = os.path.relpath(p["filename"], os.path.dirname(page["filename"])).replace(os.sep, "/")
                
                # Image path relative
                img_path = p.get("image_path", "images/logo_placeholder.png")
                rel_img_path = os.path.relpath(img_path, os.path.dirname(page["filename"])).replace(os.sep, "/")
                
                html += f"""
                    <a href="{rel_path}" class="solution-tile">
                        <div class="tile-bg">
                            <img src="{rel_img_path}" alt="{p['title']}" loading="lazy" onerror="this.src='{root_path}images/logo_placeholder.png'">
                        </div>
                        <div class="tile-content">
                            <span class="tile-title">{p['title']}</span>
                            <span class="tile-arrow">-></span>
                        </div>
                    </a>
                """
            return html

        # Helper for INTERACTIVE tiles (with data attributes)
        def generate_interactive_tiles_html(page_list):
            html = ""
            for p in page_list:
                rel_path = os.path.relpath(p["filename"], os.path.dirname(page["filename"])).replace(os.sep, "/")
                img_path = p.get("image_path", "images/logo_placeholder.png")
                rel_img_path = os.path.relpath(img_path, os.path.dirname(page["filename"])).replace(os.sep, "/")
                
                # Escape quotes for data attributes
                desc = p.get('description', '').replace('"', '&quot;')
                title = p.get('title', '').replace('"', '&quot;')
                
                html += f"""
                    <a href="{rel_path}" class="solution-tile interactive-tile" 
                       data-title="{title}" 
                       data-desc="{desc}" 
                       data-image="{rel_img_path}" 
                       data-link="{rel_path}">
                        <div class="tile-bg">
                            <img src="{rel_img_path}" alt="{title}" loading="lazy" onerror="this.src='{root_path}images/logo_placeholder.png'">
                        </div>
                        <div class="tile-content">
                            <span class="tile-title">{title}</span>
                            <span class="tile-arrow">-></span>
                        </div>
                    </a>
                """
            return html

        # Generate Grid HTML based on page type
        if "event-solutions.html" in overview_filename:
            # INTERACTIVE LAYOUT: 4 Rows (Header, Tiles, Header, Tiles) + Preview
            
            # Default content for preview (first item or generic)
            default_img = "../images/event-solutions/overview.jpg" 
            default_title = "Events that define your brand."
            default_desc = "Select a solution above to explore how we can elevate your corporate gathering."
            default_link = "#"
            
            grid_html = f"""
            <div class="solutions-overview-grid container" style="display: flex; flex-direction: column; gap: 40px; padding-bottom: 4rem;">
                
                <!-- Row 1: Event Types Header -->
                <div class="row-header" style="text-align: left; border-bottom: 2px solid var(--text-gold); padding-bottom: 10px;">
                    <h2 class="column-title" style="font-size: 1.8rem; color: var(--text-gold); margin: 0;">{col1_title}</h2>
                </div>

                <!-- Row 2: Event Types Tiles -->
                <div class="solution-tiles-row" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px;">
                    {generate_interactive_tiles_html(col1_pages)}
                </div>

                <!-- Row 3: Industries Header -->
                <div class="row-header" style="text-align: left; border-bottom: 2px solid var(--text-gold); padding-bottom: 10px; margin-top: 20px;">
                    <h2 class="column-title" style="font-size: 1.8rem; color: var(--text-gold); margin: 0;">{col2_title}</h2>
                </div>

                <!-- Row 4: Industries Tiles -->
                <div class="solution-tiles-row" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px;">
                    {generate_interactive_tiles_html(col2_pages)}
                </div>
                
                <!-- Bottom: Dynamic Preview -->
                <div id="solution-preview" class="preview-section" style="border: 1px solid var(--text-gold); padding: 5px; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; background: rgba(0,0,0,0.2); margin-top: 40px;">
                    <!-- Preview Image -->
                    <div class="preview-image-container" style="height: 450px; position: relative; overflow: hidden;">
                         <img id="preview-img" src="{default_img}" style="width:100%; height:100%; object-fit: cover; transition: opacity 0.3s ease;">
                    </div>
                    
                    <!-- Preview Text -->
                    <div class="preview-content" style="padding: 40px 40px 40px 0; display: flex; flex-direction: column; justify-content: center;">
                        <span style="color: var(--text-gold); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 1rem; display:block;">Selected Solution</span>
                        <h2 id="preview-title" style="font-family: var(--font-heading); font-size: 2.5rem; margin-bottom: 1.5rem; line-height: 1.2;">{default_title}</h2>
                        <p id="preview-desc" style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; margin-bottom: 2.5rem;">{default_desc}</p>
                        <a id="preview-link" href="{default_link}" class="btn btn-primary" style="align-self: flex-start;">Explore Detail</a>
                    </div>
                </div>

            </div>

            <!-- Interaction Script -->
            <script>
                document.addEventListener('DOMContentLoaded', function() {{
                    const tiles = document.querySelectorAll('.interactive-tile');
                    const previewImg = document.getElementById('preview-img');
                    const previewTitle = document.getElementById('preview-title');
                    const previewDesc = document.getElementById('preview-desc');
                    const previewLink = document.getElementById('preview-link');

                    tiles.forEach(tile => {{
                        tile.addEventListener('click', function(e) {{
                            e.preventDefault(); // Stop navigation to show preview
                            
                            // Update content
                            const title = this.getAttribute('data-title');
                            const desc = this.getAttribute('data-desc');
                            const img = this.getAttribute('data-image');
                            const link = this.getAttribute('data-link');

                            // Fade out image
                            previewImg.style.opacity = '0.5';
                            
                            setTimeout(() => {{
                                previewTitle.textContent = title;
                                previewDesc.textContent = desc;
                                previewImg.src = img;
                                previewLink.href = link;
                                previewLink.textContent = "Explore " + title;
                                
                                // Fade in
                                previewImg.style.opacity = '1';
                            }}, 150);
                            
                            // Scroll to preview if needed (optional)
                            document.getElementById('solution-preview').scrollIntoView({{ behavior: 'smooth', block: 'center' }});
                        }});
                    }});
                }});
            </script>
            """
        else:
            # Standard 2-Column Grid Layout (Side-by-Side)
            grid_html = f"""
            <div class="solutions-overview-grid container">
                <!-- Column 1 -->
                <div class="solution-column" style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <div class="column-title-span">
                        <h2 class="column-title">{col1_title}</h2>
                    </div>
                    {generate_tiles_html(col1_pages)}
                </div>
                
                <!-- Column 2 -->
                <div class="solution-column" style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <div class="column-title-span">
                        <h2 class="column-title">{col2_title}</h2>
                    </div>
                    {generate_tiles_html(col2_pages)}
                </div>
            </div>
            """
        
        # The original code used `content = html_template.format(root=root_path, grid_section=grid_html, **page)`
        # The instruction implies `page_content` is already formatted.
        # For consistency with the original structure, we'll pass grid_html to the format call.
        # The instruction's `page_content = page_content.replace(...)` lines are not directly applicable here
        # as `content` is formatted once at the end of the loop.
        # We will ensure `grid_section` is correctly passed.

    # Inject root_path into template
    content = html_template.format(root=root_path, grid_section=grid_html, **page)
    
    file_path = os.path.join(base_path, page["filename"])
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {page['filename']}")
