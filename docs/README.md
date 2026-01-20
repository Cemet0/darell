# 🎮 Gaming Setup Link Profile

Modern dan interactive link profile dengan glassmorphism effect ala iPhone untuk showcase gaming setup dan PC specs.

![Preview](https://img.shields.io/badge/Status-Live-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- 🍎 **iPhone-style Glassmorphism** - Authentic frosted glass effect dengan backdrop blur
- 🎨 **Brand Colors** - AMD (Red), NVIDIA (Green), AORUS (Orange) dengan logo asli
- ✨ **Neon Glow Effects** - Interactive hover effects dengan glow di semua elemen
- 📱 **Fully Responsive** - Optimized untuk desktop, tablet, dan mobile
- ⚡ **Performance Optimized** - Smooth di semua device, dari flagship sampai low-end
- 🎭 **Smooth Animations** - Gradient shifts, hover effects, dan transitions
- ♿ **Accessible** - Support untuk prefers-reduced-motion
- 🔗 **Social Links** - Support Me, Discord, Top Up Game buttons
- 📋 **Copy Promo Code** - One-click copy dengan toast notification

## 🚀 Quick Start

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/gaming-setup-profile.git
   cd gaming-setup-profile
   ```

2. **Setup logo images**
   - Download logo AORUS dan simpan di `asset/img/aorus-logo.png`
   - Logo AMD dan NVIDIA sudah menggunakan CDN

3. **Open in browser**
   ```bash
   # Buka index.html di browser
   # Atau gunakan live server
   ```

## 📁 Project Structure

```
gaming-setup-profile/
├── index.html          # Main HTML file
├── script.js           # Interactive features
├── css/
│   ├── base.css        # Base styles & animations
│   ├── sidebar.css     # Sidebar & profile styles
│   ├── buttons.css     # Action buttons styles
│   ├── promo.css       # Promo section styles
│   ├── specs.css       # PC specs card styles
│   ├── setup.css       # Setup list styles
│   └── responsive.css  # Responsive & performance
├── asset/
│   └── img/
│       ├── aorus-logo.png
│       └── sociabuzz-logo.png
└── docs/
    └── README.md       # Documentation
```

## 🎨 Customization

### 1. Update Profile Info

Edit di `index.html`:

```html
<h1 class="username">@d4r311</h1>
<p class="bio">Gaming Setup Enthusiast</p>
```

### 2. Change PC Specs

```html
<div class="spec-name">AMD Ryzen™ 7 9800X3D</div>
<div class="spec-name">GeForce RTX™ 5070 Ti WINDFORCE OC</div>
```

### 3. Update Links

```html
<a href="YOUR_LINK" class="action-btn support">
<a href="YOUR_DISCORD" class="action-btn discord">
<a href="YOUR_STORE" class="action-btn topup">
```

### 4. Change Promo Code

Edit di `script.js`:

```javascript
function copyCode() {
    const code = 'YOUR_PROMO_CODE';
    // ...
}
```

### 5. Customize Colors

Edit di `css/base.css`:

```css
/* Background gradient */
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

Edit di `css/specs.css`:

```css
/* Card colors */
.spec-card.amd {
    background: rgba(255, 23, 68, 0.2); /* Red */
}
```

## 🎯 Performance

- **File Size**: ~15KB (HTML + CSS + JS)
- **Load Time**: < 0.5s
- **Lighthouse Score**: 95+
- **Mobile Optimized**: Blur reduction untuk low-end devices

### Performance Features:
- ✅ Hardware acceleration (GPU)
- ✅ Lazy loading images
- ✅ Deferred JavaScript
- ✅ Reduced animations on mobile
- ✅ Prefers-reduced-motion support

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

**Note**: Backdrop-filter requires modern browsers. Fallback provided untuk older browsers.

## 📱 Responsive Breakpoints

- **Desktop**: Full effects (blur 60px)
- **Tablet** (≤768px): Reduced blur (30px)
- **Mobile** (≤480px): Minimal blur (15px)

## 🎨 Color Palette

```css
/* Brand Colors */
AMD Red:     #FF1744
NVIDIA Green: #00FF88
AORUS Orange: #FF6B00
Sociabuzz:   #00C9FF → #92FE9D
Discord:     #5865F2
```

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Glassmorphism, animations, responsive
- **Vanilla JavaScript** - No dependencies
- **SVG** - Scalable icons

## 📝 License

MIT License - Feel free to use for personal or commercial projects

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📧 Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Discord: Your Discord
- Email: your.email@example.com

## 🙏 Credits

- Design inspiration: iOS glassmorphism
- Icons: SVG custom icons
- Logos: AMD, NVIDIA, AORUS, Sociabuzz

---

Made with ❤️ by [@d4r311](https://github.com/yourusername)

⭐ Star this repo if you like it!
