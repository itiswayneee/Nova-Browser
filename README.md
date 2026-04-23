# Nova Browser

A modern, lightweight web browser built with HTML, CSS, and JavaScript. Features a sleek dark/light theme, bookmarks, navigation controls, and uses a Cloudflare Worker proxy to bypass CORS restrictions for embedding websites.

![Nova Browser](https://img.shields.io/badge/Nova-Browser-blue?style=flat-square)

## Features

- **Modern UI** - Clean, beautiful interface with smooth animations
- **Theme Support** - Dark and light mode toggle
- **Bookmarks** - Save and manage your favorite sites
- **Navigation** - Back, forward, refresh, and home buttons
- **Search** - Built-in search box with proxy integration
- **Quick Links** - One-click access to popular sites (Google, YouTube, GitHub, Twitter)
- **Downloads Panel** - Track downloaded files
- **Keyboard Shortcuts** - Quick actions via keyboard

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+L` | Focus address bar |
| `Ctrl+D` | Add bookmark |
| `Ctrl+R` | Refresh page |
| `Ctrl+H` | Go home |
| `Ctrl+B` | Go back |
| `Alt+Left` | Go back |
| `Alt+Right` | Go forward |
| `Escape` | Close modals |

## Quick Links

- Google
- YouTube
- GitHub
- Twitter

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, flexbox/grid
- **JavaScript** - Vanilla JS (no frameworks)
- **Cloudflare Workers** - CORS proxy

## File Structure

```
Search Engine/
├── index.html    # Main browser UI
├── worker.js    # Cloudflare Worker proxy
└── README.md    # This file
```

## Setup

### Running Locally

1. Clone the repository
2. Open `index.html` in your browser
3. Start browsing!

### Deploying the Proxy

1. Install [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/):
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Create a new worker:
   ```bash
   wrangler init nova-proxy
   ```

4. Copy the contents of `worker.js` to your worker's `src/index.js`

5. Deploy:
   ```bash
   wrangler deploy
   ```

6. Update `PROXY_URL` in `index.html` (line 802) with your worker URL

## Usage

### Searching

Type in the search box to search the web. Non-URL inputs are automatically converted to search queries.

### Adding Bookmarks

1. Navigate to a website
2. Click the bookmark icon in the toolbar or press `Ctrl+D`
3. Enter a title and save

### Managing Bookmarks

- Click a bookmark to navigate to it
- Hover over a bookmark and click the X to delete it
- Add new bookmarks via the "+" button on the bookmarks grid

## Customization

### Changing Quick Links

Edit the `.quick-links` section in `index.html`:

```html
<a class="quick-link" data-url="https://example.com">
    <div class="icon"><i class="fa-brands fa-example"></i></div>
    <span class="label">Example</span>
</a>
```

### Adding More Icons

Font Awesome 6 icons are supported. Check [Font Awesome](https://fontawesome.com/search?m=free) for available icons.

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT License - feel free to use this project for any purpose.

## Acknowledgments

- [Font Awesome](https://fontawesome.com/) for icons
- [Inter Font](https://fonts.google.com/specimen/Inter) for typography
- [Cloudflare Workers](https://workers.cloudflare.com/) for proxy infrastructure