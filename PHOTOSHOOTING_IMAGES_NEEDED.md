# Photoshooting Page - Additional Images Needed

The Photoshooting page has been updated to display a carousel/slideshow for most sections. Sections 1-5 now require **3 images** each, while section 6 ("Készen állsz?") keeps a single static image.

## Required Images

Please add the following images to the `assets/photoshooting/` directory:

### 1. A Lazább fotózás (Relaxed Photoshoot)
- ✅ `lazabb-fotozes.jpg` (already exists)
- ❌ `lazabb-fotozes-2.jpg` (NEW - needs to be added)
- ❌ `lazabb-fotozes-3.jpg` (NEW - needs to be added)

**Theme:** Natural, relaxed family moments at home - pajamas, messy hair, coffee in hand, comfortable atmosphere

---

### 2. Nincs póz, csak élet (No Pose, Just Life)
- ✅ `nincs-poz.jpg` (already exists)
- ❌ `nincs-poz-2.jpg` (NEW - needs to be added)
- ❌ `nincs-poz-3.jpg` (NEW - needs to be added)

**Theme:** Authentic emotions - genuine laughter, proud father's glance, tender mother's touch, tears and comforting hugs

---

### 3. A helyszín (The Location)
- ✅ `helyszin.jpg` (already exists)
- ❌ `helyszin-2.jpg` (NEW - needs to be added)
- ❌ `helyszin-3.jpg` (NEW - needs to be added)

**Theme:** Various photo locations - home, garden corners, favorite playgrounds, parks, meaningful places

---

### 4. A fotózás után (After the Photoshoot)
- ✅ `fotozes-utan.jpg` (already exists)
- ❌ `fotozes-utan-2.jpg` (NEW - needs to be added)
- ❌ `fotozes-utan-3.jpg` (NEW - needs to be added)

**Theme:** Post-production process - photo selection, editing software, online gallery, printed/framed photos

---

### 5. Képzeld el! (Imagine!)
- ✅ `kepzeld-el.jpg` (already exists)
- ❌ `kepzeld-el-2.jpg` (NEW - needs to be added)
- ❌ `kepzeld-el-3.jpg` (NEW - needs to be added)

**Theme:** Precious memories - looking back at photos years later, remembering the baby's smile, laughter, tender moments

---

### 6. Készen állsz? (Are You Ready?)
- ✅ `keszen-allsz.jpg` (already exists)

**Note:** This section uses a single static image (no carousel)

**Theme:** Call to action - families ready for photoshoot, excitement, anticipation, warmth and welcome

---

## Image Specifications

- **Format:** JPG or WebP
- **Recommended dimensions:** At least 1600px wide for desktop viewing
- **Aspect ratio:** 4:3 or 16:9 preferred
- **File size:** Optimize for web (ideally under 300KB per image)
- **Quality:** High-quality, professional photography

## Carousel Features

Once the images are added, sections 1-5 will display:
- Automatic slideshow (5 seconds per image)
- Manual navigation with left/right arrows (visible on hover)
- Dot indicators at the bottom
- Image counter (e.g., "1 / 3")
- Smooth slide transitions
- Responsive design (works on mobile, tablet, and desktop)

## Temporary Behavior

Currently, if an image file doesn't exist, the browser will show a broken image icon. The carousel will still function, but the missing images won't display properly.

**Options:**
1. Add the additional images as listed above
2. Reduce the images array to use only existing images (1 image per section)
3. Use placeholder images until final images are ready

## Summary

**Total images needed:**
- 5 sections with carousels (3 images each) = 15 images
- 1 section with static image = 1 image
- **Total: 16 images** (6 already exist, 10 need to be added)

## Next Steps

1. Gather or create the additional 10 images for sections 1-5
2. Optimize images for web (compress, resize if needed)
3. Add images to `assets/photoshooting/` or `public/assets/photoshooting/` directory
4. Test the carousel on the live site
5. Verify images load correctly on mobile and desktop
