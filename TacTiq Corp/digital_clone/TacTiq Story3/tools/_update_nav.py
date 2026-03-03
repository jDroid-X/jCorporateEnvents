import re

with open('index.html', encoding='utf-8') as f:
    html = f.read()

# Add missing Large-Scale Deployment items
# Current list ends at Google-AMD-Redington Connect
# But I missed the 3 new ones: Growthon, Fighters, Omen Playground
large_list_old = """<li><a href="our-work/large-deployment/ignite-together.html">Ignite Together:
                                                16-City ESF Connect</a></li>
                                        <li><a href="our-work/brand-partner/redington-partner.html">Redington Partner
                                                Meet 2025</a></li>"""

large_list_new = """<li><a href="our-work/large-deployment/ignite-together.html">Ignite Together:
                                                16-City ESF Connect</a></li>
                                        <li><a href="our-work/large-deployment/growthon.html">Growthon – HP Partner Accelerator</a></li>
                                        <li><a href="our-work/large-deployment/fighters.html">Fighters: Tribute to Achievers</a></li>
                                        <li><a href="our-work/large-deployment/omen-playground.html">Omen Playground – Gaming Retail</a></li>
                                        <li><a href="our-work/brand-partner/redington-partner.html">Redington Partner
                                                Meet 2025</a></li>"""

html = html.replace(large_list_old, large_list_new)

# Add missing Media & Trailer Rollout items
# Current list: Escaype, Koffee, Sultan, Taaza
# Missing: Night Manager, Show Time, Good Luck Jerry
media_list_old = """<li><a href="media-trailer/escaype-live.html">Escaype Live</a></li>
                                        <li><a href="media-trailer/koffee-karan.html">Koffee with Karan (S6 &amp;
                                                S7)</a></li>
                                        <li><a href="media-trailer/sultan-of-delhi.html">Sultan of Delhi</a></li>
                                        <li><a href="media-trailer/taaza-khabar.html">Taaza Khabar</a></li>"""

media_list_new = """<li><a href="media-trailer/escaype-live.html">Escaype Live</a></li>
                                        <li><a href="media-trailer/koffee-karan.html">Koffee with Karan (S6 &amp; S7)</a></li>
                                        <li><a href="media-trailer/the-night-manager.html">The Night Manager</a></li>
                                        <li><a href="media-trailer/sultan-of-delhi.html">Sultan of Delhi</a></li>
                                        <li><a href="media-trailer/show-time-karma.html">Show Time &amp; Karma Calling</a></li>
                                        <li><a href="media-trailer/good-luck-jerry.html">Good Luck Jerry</a></li>
                                        <li><a href="media-trailer/taaza-khabar.html">Taaza Khabar</a></li>"""

html = html.replace(media_list_old, media_list_new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated index.html dropdowns with missing pages")
