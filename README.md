# 🔔 Toaster Notifications (Vanilla JS + TailwindCSS)
A lightweight, customizable toast notification system with swipe-to-dismiss, built using vanilla JavaScript and TailwindCSS.
Supports light/dark themes, different notification types, closable buttons, auto-dismiss, fade-out, and touch gestures.

---

## ✨ Features

- ⚡ No dependencies (only TailwindCSS for styling)

- 🎨 Light & Dark themes

- 🏷️ Types: success, error, info, warning, default

- 🕒 Auto-dismiss with fade-out animation

- ❌ Closable button support

- 📍 Custom positioning (top/bottom + left/right)

- 📱 Swipe-to-dismiss gesture (mobile & desktop)

- ♿ Accessible (role="status", aria-live="polite")

 ---

## 📦 Installation
1. Include TailwindCSS
   <script src="https://cdn.tailwindcss.com"></script>
2. Add the parent container

Place this inside <body>:
   <div class="fixed parent p-10 flex flex-col gap-4"></div>
3. Include the toaster script
   <script src="script.js"></script>
