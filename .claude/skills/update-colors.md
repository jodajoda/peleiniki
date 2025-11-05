# Update Color Scheme

You are tasked with customizing the color scheme for a photography portfolio website.

## Objective

Update the Tailwind CSS configuration to reflect the client's brand colors while maintaining design consistency and accessibility.

## File to Modify

**Primary file:** `website/tailwind.config.js`

This file contains:
- Primary color palette (50-900 scale)
- Accent colors (named colors for special elements)
- Gradient backgrounds
- Shadow effects with color tints

## Information to Gather

Ask the client for their brand colors:

1. **Primary Brand Color** (main color, base tone)
   - "What's your main brand color? Please provide a hex code (e.g., #D4A574)"
   - This will be used to generate a full color scale (50-900)

2. **Accent Colors** (2-5 colors for highlights and CTAs)
   - "What accent colors would you like for buttons, links, and highlights?"
   - Examples: warm coral, sunset orange, golden yellow, rose pink, lavender purple

3. **Color Mood** (to help generate appropriate shades)
   - "What mood should your site convey? (warm/earthy, cool/modern, vibrant/energetic, soft/elegant)"

## Color Scale Generation

For the primary color, generate a full Tailwind-style scale (50-900):

- **50**: Very light tint (nearly white with hint of color)
- **100-300**: Light variations (backgrounds, subtle elements)
- **400-500**: Base colors (provided by client)
- **600-700**: Medium dark (hover states, borders)
- **800-900**: Very dark (text, strong accents)

### Example: Warm Earth Tones (Current)
```javascript
primary: {
  50: '#fdf8f6',   // Nearly white with warm tint
  100: '#f2e8e5',  // Very light
  200: '#eaddd7',  // Light
  300: '#e0cec7',  // Medium light
  400: '#d2bab0',  // Base light
  500: '#bfa094',  // Base (main brand color)
  600: '#a18072',  // Medium dark
  700: '#977669',  // Dark
  800: '#846358',  // Very dark
  900: '#43302b',  // Nearly black
}
```

### Example: Cool Blue Tones
```javascript
primary: {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',  // Base color
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
}
```

## Color Tools

Recommend these tools for generating color scales:
- [Tailwind Color Generator](https://uicolors.app/create)
- [Coolors Palette Generator](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)

## Step-by-Step Process

### 1. Gather Color Information

Ask the client:
```
"Let's customize your color scheme!

1. What's your primary brand color? (hex code)
2. What 2-3 accent colors would you like?
3. Should the overall feel be warm, cool, or neutral?

If you're unsure, I can suggest some combinations based on your industry."
```

### 2. Generate Color Scale

Based on the primary color provided:
1. Use a color tool to generate a full scale (50-900)
2. Ensure good contrast ratios for accessibility (WCAG AA)
3. Test the colors mentally for common uses:
   - Backgrounds (50-100)
   - Borders/dividers (200-300)
   - Text on light backgrounds (700-900)
   - Buttons/CTAs (500-700)

### 3. Update tailwind.config.js

Modify the `colors` section in `website/tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Replace with generated scale
    50: '#....',
    100: '#....',
    // ... through 900
  },
  accent: {
    // Update with client's accent colors
    // Use descriptive names
    warm: '#ff8a65',
    sunset: '#ffa726',
    gold: '#ffd93d',
    rose: '#f06292',
    lavender: '#ba68c8',
  },
},
```

### 4. Update Gradients (Optional)

If the color scheme changes significantly, update background gradients:

```javascript
backgroundImage: {
  'gradient-primary': 'linear-gradient(135deg, [primary-700] 0%, [primary-400] 100%)',
  'gradient-warm': 'linear-gradient(135deg, [accent-color-1] 0%, [accent-color-2] 100%)',
  // ... other gradients
},
```

### 5. Update Shadow Effects

Update glow effects to match new colors:

```javascript
boxShadow: {
  'glow': '0 0 25px rgba([primary-500-rgb], 0.5)',
  'glow-warm': '0 0 30px rgba([accent-warm-rgb], 0.4)',
},
```

Note: Convert hex to RGB for rgba() values.

### 6. Test the Changes

After updating colors:

1. **Run dev server:**
   ```bash
   cd website
   npm run dev
   ```

2. **Check these pages:**
   - Home page (hero section backgrounds)
   - Navigation (hover states)
   - Buttons (primary colors)
   - Portfolio (image overlays)
   - Contact form (focus states)

3. **Verify accessibility:**
   - Text contrast (use browser DevTools)
   - Hover/focus states are visible
   - Colors work in light and dark environments

## Common Color Schemes by Industry

### Warm & Earthy (Current - Wedding/Portrait Photography)
- Primary: Warm browns, taupes, beiges
- Accents: Coral, sunset orange, rose gold

### Cool & Modern (Architecture/Commercial Photography)
- Primary: Cool grays, slate blues
- Accents: Electric blue, teal, mint

### Vibrant & Energetic (Event/Sports Photography)
- Primary: Bold primaries (red, blue)
- Accents: Bright yellow, orange, magenta

### Soft & Elegant (Newborn/Family Photography)
- Primary: Soft pastels, blush pinks
- Accents: Lavender, mint, peach

### Bold & Artistic (Fashion/Editorial Photography)
- Primary: Deep blacks, rich purples
- Accents: Hot pink, electric blue, gold

## Accessibility Guidelines

Ensure all color combinations meet WCAG AA standards:

- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (18px+):** Minimum 3:1 contrast ratio
- **Interactive elements:** Clear focus indicators

Test contrast ratios: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Example Client Conversation

**You:** "Let's update your color scheme! What's your primary brand color?"

**Client:** "I use #6B4E71 (a dusty purple)"

**You:** "Beautiful! That's a sophisticated dusty purple. Let me generate a full color scale for you. What accent colors would complement this? Maybe some gold tones or soft pinks?"

**Client:** "Yes, gold would be great!"

**You:** "Perfect! I'll create a color scheme with dusty purple as the primary and gold as the accent. This will give your site an elegant, artistic feel. One moment while I update the configuration..."

[Update tailwind.config.js with new colors]

**You:** "Done! I've updated your color scheme. Let me start the dev server so you can preview it. The purple tones are used throughout the navigation, backgrounds, and text, while the gold appears on buttons and highlights."

## Rollback

If the client doesn't like the colors:
- Keep the old configuration commented out
- Easy to revert: `git checkout website/tailwind.config.js`

## Additional Customizations

After colors are approved, offer to customize:
- Typography (font families)
- Spacing/sizing
- Border radius (sharp vs. rounded)
- Animation speeds
