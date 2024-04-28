const originalHref = Object.getOwnPropertyDescriptor(window.location, "href");

Object.defineProperty(window.location, "href", {
  set(newUrl) {
    const allowedUrls = [
      "https://your-website.com", // Add allowed URLs here
    ];
    if (allowedUrls.includes(newUrl)) {
      originalHref.set.call(window.location, newUrl);
    } else {
      console.log("Navigation blocked to:", newUrl);
    }
  },
  get() {
    return originalHref.get.call(window.location);
  },
});
