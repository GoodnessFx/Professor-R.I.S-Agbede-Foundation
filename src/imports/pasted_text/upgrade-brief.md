You have already built the Professor R.I.S Agbede Foundation website. Now upgrade it 
significantly based on the following detailed specifications. Do NOT rebuild from scratch — 
enhance, replace, and add to what exists.

═══════════════════════════════════════════════════════════════
UPGRADE BRIEF: Typography, Navigation, Hero Content, Map, Contact
═══════════════════════════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. TYPOGRAPHY OVERHAUL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace all existing fonts with this pairing via next/font/google:

  Display / Hero Headlines: "Cormorant Garamond" — weight 600, 700
    → Elegant, editorial, carries gravitas. Used for all H1, H2 section titles.

  Secondary Headlines: "Libre Baskerville" — weight 400, 700
    → Authoritative. Used for H3, card titles, pull quotes.

  Body / UI: "Nunito Sans" — weight 300, 400, 600
    → Warm, readable, human. Used for body text, nav, buttons, labels.

Font sizing — scale UP across the board:
  Hero H1:        80px desktop / 52px tablet / 38px mobile
  Hero subtext:   22px desktop / 18px mobile
  Section H2:     56px desktop / 38px mobile
  Section H3:     32px desktop / 24px mobile
  Body text:      18px desktop / 16px mobile
  Nav links:      15px, letter-spacing: 0.08em, uppercase

Apply "font-feature-settings: 'liga' 1, 'kern' 1" to all display text.
Use "text-wrap: balance" on all headline elements.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. HERO SECTION — COPY REWRITE WITH IMPACT & EMPATHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace all hero text with copy that carries emotional weight and purpose:

  Eyebrow tag (small caps, gold, letter-spaced):
    "Changing Lives Across Nigeria — One Community At A Time"

  H1 (Cormorant Garamond, white, 80px):
    "Because Every Child
     Deserves a Fighting Chance"

  Subheadline (Nunito Sans, white 85%, 22px, max-width 620px):
    "In classrooms without roofs, in communities without doctors, in families 
     without hope — the Professor R.I.S Agbede Foundation shows up. We believe 
     potential is never scarce. Only opportunity is."

  CTA Row:
    Primary button: "See What We Do" → /programs
    Secondary button: "Join the Movement" → /donate

For all Unsplash images in the hero slider, use Nigerian/West African 
imagery specifically. Use these Unsplash search URLs:
  https://source.unsplash.com/1920x1080/?nigeria,school,children
  https://source.unsplash.com/1920x1080/?african,students,classroom
  https://source.unsplash.com/1920x1080/?black,children,education
  https://source.unsplash.com/1920x1080/?nigeria,community,health
  https://source.unsplash.com/1920x1080/?africa,youth,hope
  https://source.unsplash.com/1920x1080/?black,girl,reading,africa

All section content across the site — rewrite any generic copy to carry 
empathy and impact. Examples:

  Programs section H2: 
    "We Don't Just Fund Projects. We Fund People."

  Impact numbers label:
    "Students whose futures we refuse to give up on"
    "Communities that no longer feel forgotten"
    "Years of relentless, quiet work"

  Donation CTA headline: 
    "The Change Nigeria Needs Starts With You"

  Donation subtext:
    "Somewhere in Kogi State, a girl named Zainab just found out she got the 
     scholarship. Your ₦5,000 made that possible. Give today."

  Footer tagline:
    "We exist because someone believed. Now it's your turn."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. NAVBAR — COMPLETE REBUILD WITH MEGA DROPDOWNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rebuild the navbar to match this exact structure with dropdown menus.
The dropdown panels must be:
  - Semi-transparent dark background: rgba(15, 20, 35, 0.92)
  - Backdrop blur: blur(16px)
  - Full-width or anchored panel, NOT a tiny dropdown list
  - Appear on hover (desktop) with smooth fade+slide animation (150ms)
  - Each dropdown item is clickable and navigates to its own route

NAV STRUCTURE:

  WHO WE ARE ▾
    dropdown panel links:
    → About the Foundation    /about
    → Our Founder             /about#founder
    → Board of Trustees       /about#board
    → Our Vision & Values     /about#values
    → Annual Reports          /impact#reports

  PROGRAMMES ▾
    dropdown panel links:
    → Scholarship Programme    /programs#scholarship
    → Healthcare Initiative    /programs#healthcare
    → Community Development    /programs#community
    → Digital Literacy         /programs#digital
    → Apply for Support        /donate

  GRANTMAKING ▾
    dropdown panel links (mirror the TY Danjuma style):
    → Annual Grants             /programs#annual-grants
    → Discretionary Grants      /programs#discretionary
    → Partnerships              /programs#partnerships

  IMPACT
    → Direct link → /impact (no dropdown)

  NEWS & MEDIA ▾
    dropdown panel links:
    → Latest News              /news
    → Press Releases           /news#press
    → Gallery                  /gallery
    → Publications             /impact#reports

  CONTACT US
    → Direct link → /contact (no dropdown)

  SUPPORT OUR WORK
    → Styled as gold pill button → /donate

Dropdown panel design:
  - Each panel has 2 columns for multi-item dropdowns
  - Left column: list of nav links with right-arrow prefix (→)
  - Each link: 15px Nunito Sans, white, hover state = gold color + 2px left shift
  - Subtle divider between columns
  - Panel appears BELOW the navbar with 0 gap
  - On mobile: dropdowns become accordion-style in the full-screen menu overlay

The GRANTMAKING dropdown should visually match image 1 — the near-dark 
transparent panel with clean white text links for Annual Grants, 
Discretionary Grants, and Partnerships.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. GRANTMAKING PAGE — BUILD AS SEEN IN IMAGE 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create/replace the Grantmaking section or page to match image 2 exactly:

  HERO:
  - Full-width background: dark B&W photo of a Nigerian woman and child
    (Unsplash: https://source.unsplash.com/1920x600/?black,mother,child,nigeria)
  - Semi-dark overlay (rgba(0,0,0,0.55))
  - Center-aligned text on overlay:
      H1: "Grantmaking" (Cormorant Garamond, white, 60px)
      Body: "Our grantmaking approach is catalytic. We work with partners to deeply 
             understand the challenges facing communities — then design solutions 
             that actually fit. Our process is two-pronged: Annual Grants and 
             Discretionary Grants." (Nunito Sans, white, 18px, max-width 760px, centered)

  THREE CARDS BELOW (white background, top accent border):
  
  Card 1 — Annual Grants
    Top border: 4px solid #C8832A (gold)
    Title: "Annual Grants" (gold, Libre Baskerville, 22px)
    Body: "Every year, the Foundation partners with qualified organisations 
           across Nigeria to implement projects in our core focus areas of 
           education and health."
    CTA Button: "Apply for Grants" (outlined, dark border, hover: fill navy)

  Card 2 — Discretionary Grants
    Top border: 4px solid #2E9CCA (teal/blue)
    Title: "Discretionary Grants" (teal, Libre Baskerville, 22px)
    Body: "We provide discretionary grants to fund rapid humanitarian responses — 
           emergencies, short-term interventions, and urgent community needs in 
           health and education that cannot wait for an annual cycle."
    CTA Button: "Apply for Grants"

  Card 3 — Partnerships & Collaborations
    Top border: 4px solid #C8832A (gold)
    Title: "Partnerships & Collaborations" (gold, Libre Baskerville, 22px)
    Body: "Partnerships multiply our reach. We work with NGOs, government agencies, 
           corporates, and diaspora networks to co-create solutions and leverage 
           both human and material resources for deeper impact."
    CTA Button: "Learn More"

  Background of card section: very dark (near-black #0D1520) with the BW 
  photo continuing or fading into solid dark.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. GEOGRAPHICAL IMPACT SECTION — ADD TO IMPACT PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add an "Our Reach" section to the /impact page (and optionally the home page 
as a teaser strip) that shows geographic presence across Nigeria.

Build a custom interactive SVG map of Nigeria (NOT Google Maps embed) 
with the following states highlighted:

  Highlighted states (gold fill #C8832A at 70% opacity):
    Lagos, Abuja (FCT), Kogi, Enugu, Kano, Rivers, Delta, Oyo, Plateau, Taraba

  On hover of each highlighted state:
    - State fills to full gold (#C8832A)
    - Tooltip appears (Framer Motion AnimatePresence) showing:
        State name (bold)
        Primary programme active there
        Beneficiary count
    - Tooltip: white background, navy text, soft shadow, 12px border-radius

  State data to use:
    Lagos:    Education & Digital Literacy — 640 beneficiaries
    Abuja:    Foundation HQ — All Programmes — 320 beneficiaries
    Kogi:     Community Development — 180 beneficiaries
    Enugu:    Scholarship Programme — 210 beneficiaries
    Kano:     Healthcare Initiative — 290 beneficiaries
    Rivers:   Vocational Training — 155 beneficiaries
    Delta:    Women's Empowerment — 130 beneficiaries
    Oyo:      Education Outreach — 175 beneficiaries
    Plateau:  Healthcare — 120 beneficiaries
    Taraba:   Grantmaking Partner State — 95 beneficiaries

  Non-highlighted states: light gray (#D4D0C8)
  State borders: 1px solid white

  Section layout:
    Left (55%): SVG Nigeria map
    Right (45%): 
      H2: "We Work Where It Matters Most"
      Body: "Our programmes are active across 10 Nigerian states, reaching 
             communities that are often the last to receive support and the 
             first to bear the consequences of neglect."
      Stat strip: 10 States | 2,400+ Beneficiaries | 6 Geopolitical Zones
      Link: "View Full Impact Report →"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. CONTACT PAGE — REBUILD AS SEEN IN IMAGE 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Completely rebuild /contact to match image 3's layout exactly:

TOP SECTION — THREE OFFICE CARDS (horizontal row):

  Each card: white background, rounded corners (12px), subtle shadow, 
  blue location pin icon (SVG), clean typography

  Card 1 — Head Office (Lagos)
    📍 Head Office — Lagos
    22 Bode Thomas Street, Surulere,
    Lagos State, 23401, Nigeria
    Phone: +234 809 123 4567
    Email: info@agbedefoundation.org

  Card 2 — Abuja Office
    📍 Abuja Office
    Plot 14, Diplomatic Zone, Maitama,
    Abuja, FCT 900288, Nigeria
    Phone: +234 802 345 6789
    Email: abuja@agbedefoundation.org

  Card 3 — Kogi State Office
    📍 Kogi State Office
    12 Ibrahim Attah Road, 
    Lokoja, Kogi State, Nigeria
    Phone: +234 803 456 7890
    Email: kogi@agbedefoundation.org

MIDDLE SECTION — TWO COLUMN LAYOUT:

  Left column (55%): 
    Embed a static map using this iframe (Nigeria-centered Google Maps):
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7926689.7!2d3.3!3d9.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7da48d0d%3A0x99a8fe4168c50bc8!2sNigeria!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng"
      width="100%" height="420" style="border:0;border-radius:12px;" 
      allowfullscreen loading="lazy">
    </iframe>
    
    Below the map: small note "Serving communities across Nigeria's 36 states"

  Right column (45%):
    Section title: "Contact Us" (Cormorant Garamond, navy, 36px)
    Subtitle: "Thank you for your interest in the Foundation's work. 
               Fill in the form and our team will respond within 48 hours."
    
    Form fields (React Hook Form + Zod):
      Row 1: First Name* | Last Name*
      Row 2: Email Address* | Phone Number*
      Row 3: Your Organisation (optional, full width)
      Row 4: Subject (dropdown: General Enquiry | Grant Application | 
                      Partnership | Media | Donation | Volunteer)
      Row 5: Message* (textarea, 5 rows)
      Submit Button: "Send Message" (full width, gold background, navy text, 
                      hover: navy background, white text)

    Form validation:
      - Show inline red error messages on blur
      - On successful submit: replace form with success state:
          Green checkmark icon
          "Message Sent!" heading
          "We'll be in touch within 48 hours." subtext

FORM STYLING (match image 3 exactly):
  - Clean white/light gray input fields
  - 1px border #D1D5DB, focus: 2px border #1A3C5E (navy)
  - Labels: 13px, #374151, font-weight 500
  - Input padding: 12px 14px
  - Border radius: 6px
  - Required asterisk: red (#DC2626)
  - Overall section background: #F3F4F6 (light gray, exactly like image 3)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. IMAGES — USE BLACK/NIGERIAN PEOPLE THROUGHOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace ALL Unsplash image URLs across the entire site with these 
specifically-targeted queries that return Black/Nigerian/West African imagery:

  Hero slider images:
    ?nigeria,children,classroom,education
    ?black,girl,reading,school
    ?african,youth,technology,laptop
    ?nigeria,community,health,worker
    ?black,graduation,university,africa
    ?african,children,joyful,outdoors

  About page founder portrait placeholder:
    ?nigerian,professor,elderly,man — or use a warm gradient placeholder

  Programs page card images:
    ?black,students,nigeria — Education
    ?african,health,worker,community — Healthcare  
    ?nigeria,village,development — Community
    ?black,youth,coding,tech — Digital Literacy

  News page article images:
    ?nigeria,event,community
    ?african,school,award
    ?black,children,scholarship

  Gallery page:
    ?nigeria,children — x3
    ?africa,health,outreach — x2
    ?nigerian,graduation — x2
    ?africa,youth,technology — x2
    ?nigeria,community,water — x1
    ?black,women,empowerment,nigeria — x2

All images: use next/image with:
  - alt text that describes the scene meaningfully (not generic)
  - placeholder="blur" blurDataURL={shimmer placeholder}
  - sizes="(max-width: 768px) 100vw, 50vw" (adjust per context)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. FINAL POLISH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  - Ensure ALL pages use the new Cormorant Garamond + Nunito Sans font stack
  - Increase line-height on all body text to 1.85
  - Add subtle hover animations to ALL nav dropdown links (gold color shift + 2px left translate)
  - Ensure mobile hamburger menu shows ALL nav items with accordion dropdowns
  - The navbar on transparent (hero) state: white logo + white links + gold button
  - The navbar after scroll: white background + navy links + gold button + shadow
  - Add a "WhatsApp Chat" floating button (bottom-right, green #25D366):
      Links to: https://wa.me/2348091234567
      Tooltip on hover: "Chat with us on WhatsApp"
  - Ensure the footer has the three office addresses (Lagos, Abuja, Kogi)
  - Every page title tag format: "Page Name | Prof. R.I.S Agbede Foundation"

Build this as a senior creative engineer would — with intention, warmth, 
and technical excellence. No stubs. No placeholders for logic. Ship it.