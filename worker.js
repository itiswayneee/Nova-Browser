export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get('url');
    const query = url.searchParams.get('q');
    
    const SEARCH_ENGINE = 'https://itiswayneee.github.io/Wayne-Engine/';
    const PROXY_ORIGIN = url.origin;

    // List of domains to intercept and redirect to your search engine
    const SEARCH_BLOCKLIST = [
      'google.com', 'bing.com', 'duckduckgo.com', 
      'yahoo.com', 'baidu.com', 'yandex.com', 'ask.com'
    ];

    // 1. Handle explicit search queries (?q=)
    if (query) {
      return Response.redirect(`${SEARCH_ENGINE}#gsc.q=${encodeURIComponent(query)}`, 302);
    }

    // 2. Handle URL Parameter
    if (target) {
      let cleanedTarget = target.trim().toLowerCase();
      
      // Check if the target is one of the blocked search engines
      const isBlockedSearch = SEARCH_BLOCKLIST.some(domain => 
        cleanedTarget.includes(domain)
      );

      if (isBlockedSearch) {
        // Extract a search query if possible, or just open home
        const searchUrl = new URL(target.startsWith('http') ? target : 'https://' + target);
        const extractedQuery = searchUrl.searchParams.get('q') || searchUrl.searchParams.get('p') || "";
        return Response.redirect(`${SEARCH_ENGINE}#gsc.q=${encodeURIComponent(extractedQuery)}`, 302);
      }

      // Check for domain extensions (e.g., .com, .org, .net, .edu, .io, .gov)
      const hasDomainExtension = /\.[a-z]{2,}/i.test(cleanedTarget);
      const hasProtocol = /^https?:\/\//i.test(cleanedTarget);

      // Add https:// if it looks like a site but lacks protocol
      if (hasDomainExtension && !hasProtocol) {
        cleanedTarget = 'https://' + target.trim(); // Use original casing for fetch
      } 
      // If it doesn't look like a URL at all, treat it as a search query
      else if (!hasDomainExtension && !hasProtocol) {
        return Response.redirect(`${SEARCH_ENGINE}#gsc.q=${encodeURIComponent(target.trim())}`, 302);
      } else {
        cleanedTarget = target.trim(); // Use original casing
      }

      try {
        const response = await fetch(cleanedTarget, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
          redirect: 'follow'
        });

        const newHeaders = new Headers(response.headers);
        newHeaders.set('Access-Control-Allow-Origin', '*');
        newHeaders.delete('content-security-policy');
        newHeaders.delete('x-frame-options');

        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('text/html')) {
          let html = await response.text();
          const targetObj = new URL(cleanedTarget);
          
          // Inject <base> to resolve relative links and images
          html = html.replace('<head>', `<head><base href="${targetObj.origin}${targetObj.pathname}">`);
          
          // Rewrite links to go back through this proxy
          html = html.replace(/href="((?!http|#|javascript:)[^"]+)"/g, `href="${PROXY_ORIGIN}?url=${targetObj.origin}/$1"`);
          
          return new Response(html, { headers: newHeaders });
        }

        return new Response(response.body, { headers: newHeaders });

      } catch (e) {
        // Fallback to search if the URL is broken
        return Response.redirect(`${SEARCH_ENGINE}#gsc.q=${encodeURIComponent(target)}`, 302);
      }
    }

    // 3. Default fallback
    return Response.redirect(SEARCH_ENGINE, 302);
  }
};