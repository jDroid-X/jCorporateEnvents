import os
import requests

# Mapping of file paths to specific keywords/moods for better placeholder matching
# Using unsplash source directly if possible, or reliable placeholder service
image_map = {
    # Homepage
    "images/floating_invite_button.png": "https://images.unsplash.com/photo-1542393545-bbc8436cd268?w=300&h=600&fit=crop&q=80", # Abstract Gold/Dark
    "images/council/member1.jpg": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&q=80", # Executive Man
    "images/council/member2.jpg": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&q=80", # Executive Woman
    "images/council/member3.jpg": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&q=80", # Executive Man B&W
    
    # Event Solutions
    "images/event-solutions/conferences.jpg": "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80", # Dark Auditorium
    "images/event-solutions/incentive.jpg": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80", # Luxury Resort
    "images/event-solutions/channel.jpg": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80", # Handshake
    "images/event-solutions/kickoff.jpg": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80", # Cheering Crowd
    "images/event-solutions/strategic.jpg": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", # Boardroom
    "images/event-solutions/franchise.jpg": "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80", # Convention
    "images/event-solutions/home_services.jpg": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80", # Industrial/Construction
    "images/event-solutions/manufacturing.jpg": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", # Factory
    "images/event-solutions/technology.jpg": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", # Tech
    "images/event-solutions/transportation.jpg": "https://images.unsplash.com/photo-1586155638217-101150c28362?w=800&q=80", # Supply Chain
    
    # Our Work
    "images/our-work/strategy.jpg": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", # Strategy
    "images/our-work/logistics.jpg": "https://images.unsplash.com/photo-1580674285054-bed6d2b5d72f?w=800&q=80", # Logistics
    "images/our-work/site_selection.jpg": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", # Hotel Lobby
    "images/our-work/budgeting.jpg": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80", # Finance
    "images/our-work/vendor.jpg": "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80", # Meeting
    "images/our-work/onsite.jpg": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80", # Event Staff
    "images/our-work/multicity.jpg": "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=800&q=80", # Map
    "images/our-work/gamification.jpg": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80", # App/Phone
    "images/our-work/hospitality.jpg": "https://images.unsplash.com/photo-1562059390-a761a084768e?w=800&q=80", # Champagne
    "images/our-work/kickoff.jpg": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", # Confetti
    "images/our-work/ai-conf.jpg": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80", # Robot/AI
    
    # Resources
    "images/resources/blog.jpg": "https://images.unsplash.com/photo-1499750310159-52980e98cbe4?w=800&q=80", # Laptop
    "images/resources/benchmarking.jpg": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", # Graphs
    "images/resources/costs.jpg": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80", # Money
    "images/resources/travel.jpg": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80", # Airplane
    "images/resources/media.jpg": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", # Camera
    "images/resources/trends.jpg": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80", # City
    "images/resources/pricing.jpg": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80", # Numbers
    "images/resources/buying.jpg": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80", # Contract
    "images/resources/checklist.jpg": "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=800&q=80", # Checklist
    "images/resources/city.jpg": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80", # Chicago/City
    "images/resources/beach.jpg": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", # Beach
    
    # Overview Pages
    "images/event-solutions/overview.jpg": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80", # Event Generic
    "images/our-work/overview.jpg": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80", # Office/Work
    "images/resources/overview.jpg": "https://images.unsplash.com/photo-1507842217121-9e8dc9f77f56?w=800&q=80" # Library
}

def download_image(url, filepath):
    try:
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        print(f"Downloading {url} to {filepath}...")
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print("Success.")
        else:
            print(f"Failed to download: Status {response.status_code}")
    except Exception as e:
        print(f"Error downloading {filepath}: {e}")

if __name__ == "__main__":
    for filepath, url in image_map.items():
        download_image(url, filepath)
