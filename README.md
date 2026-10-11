Clinika: Care that feels personal

A modern, multi-area healthcare clinic website concept for Canada, covering General Care, Dental, Dermatology, Pediatrics and Diagnostics.

Live preview: https://am-oche.github.io/Clinika---Progress/

Status: work in progress. Pages, copy and images are being refined.

Overview

Clinika is a calm, editorial-style clinic website built around one idea: care that feels personal. The design pairs a clean sans-serif with italic serif accent words, deep teal gradients, frosted-glass cards and smooth motion.

Key sections
Hero: headline, call-to-action buttons, doctor portrait, floating glass cards
Specialty strip: quick links to the five areas of care
Our approach: the "listen, explain, plan" philosophy
Services: interactive list of the five areas of care with a changing image
Why Clinika: what the patient experience feels like
Areas of care: how General Care connects to the specialties
FAQ: accordion of common questions
Appointments CTA and footer with locations
Design system
Token	Value (approx.)
Hero / CTA teal	
#0B3535 to 
#1B5E5E
Primary teal	
#1B5A63
Accent mint	
#8FE3D4
Panel background	
#EEF4F3
Text	
#0E1A1A
Typography: neo-grotesk sans for headings and body, italic serif for one accent word per heading
Shape: large rounded images and panels, pill buttons, hairline dividers
Run locally
bash
# clone
git clone https://github.com/am-oche/Clinika---Progress.git
cd Clinika---Progress

# serve the folder with any static server, for example:
npx serve .
# or
python -m http.server 8000

Then open the local address shown in the terminal.

Deploy

The site is hosted on GitHub Pages. Push to the configured branch and it updates automatically:

Go to Settings > Pages in the repository.
Choose the branch and folder to publish.
Save and wait for the build to finish.
Customizing
Brand name, copy and contact details: edit the text in the page files.
Colors and fonts: change the color and font variables at the top of the stylesheet.
Images: replace files in the images/ folder, keeping the same file names (for example hero-doctor.jpg).
Locations: update the locations list in the footer and the locations section.
Images and credits

Photos are placeholders from free-license stock libraries (Unsplash, Pexels, Pixabay). Replace them with the client's own team and clinic photos before launch, and keep a credit and license note for any stock image you keep.

Before launch checklist
 Replace placeholder photos with real clinic and team photos
 Confirm all copy, services and locations with the client
 Connect the appointment form to email or the booking system
 Add privacy policy and terms (review wording with a lawyer for PIPEDA/PHIPA)
 Add an emergency notice ("If this is a medical emergency, call 911")
 Test on mobile, tablet and desktop
 Check accessibility (contrast, keyboard navigation, alt text)
 Add analytics and a custom domain if needed
Disclaimer

This site provides general information about the clinic and does not offer medical advice. In an emergency, call 911.

Design concept and build in progress by @am-oche.
