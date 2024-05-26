import datetime

# Template for the sitemap
sitemap_template = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.deimar.co/</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://www.deimar.co/index.html</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.deimar.co/assets/marketing_deck/202401_Deimar%20Gutierrez_Introduction.pdf</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.deimar.co/index.html#hero</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.deimar.co/index.html#about</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.deimar.co/index.html#services</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.deimar.co/index.html#portfolio</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.deimar.co/index.html#testimonials</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.deimar.co/index.html#clients</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.deimar.co/index.html#work-process</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.deimar.co/index.html#pricing</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.deimar.co/index.html#faq</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.deimar.co/index.html#contact</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>http://blog.deimar.co</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.80</priority>
  </url>
</urlset>
'''

# Function to generate the sitemap
def generate_sitemap():
    current_date = datetime.datetime.utcnow().isoformat() + "+00:00"
    sitemap_content = sitemap_template.format(lastmod=current_date)
    with open("/path/to/your/repository/sitemap.xml", "w") as file:  # Replace this path with your actual path
        file.write(sitemap_content)

if __name__ == "__main__":
    generate_sitemap()
