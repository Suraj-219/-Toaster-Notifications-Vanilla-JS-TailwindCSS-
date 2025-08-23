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
-  <script src="https://cdn.tailwindcss.com"></script>
   
2. Add the parent container
Place this inside <body>:
-   <div class="fixed parent p-10 flex flex-col gap-4"></div>

3. Include the toaster script
-   <script src="script.js"></script>

---

## 🚀 Usage
1. Create a toaster instance
   
   let toaster = createToaster({
  positionX: "right",   // "left" or "right"
  positionY: "top",     // "top" or "bottom"
  theme: "light",       // "light" or "dark"
  duration: 3           // default auto-dismiss (seconds)
});

2. Show a toast
   
   toaster("File uploaded successfully!", { type: "success" });

---

## ⚙️ Options

When calling toaster(message, options):

| Option     | Type    | Default        | Description                                                             |
| ---------- | ------- | -------------- | ----------------------------------------------------------------------- |
| `type`     | string  | `"default"`    | Type of notification (`success`, `error`, `info`, `warning`, `default`) |
| `icon`     | string  | auto           | Custom emoji/icon (overrides default)                                   |
| `closable` | boolean | `false`        | Adds a close (×) button                                                 |
| `duration` | number  | config default | Auto-dismiss duration (seconds). Use `0` to disable auto dismiss        |

---

## 🎨 Examples

// Success toast
toaster("Download complete!", { type: "success" });

// Error toast with custom icon
toaster("Upload failed!", { type: "error", icon: "🚫" });

// Info toast with close button and no auto-dismiss
toaster("New update available!", { type: "info", closable: true, duration: 0 });

// Swipe left/right to dismiss (works automatically)
