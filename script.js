let slideIndex = 1,
    autoAdvanceInterval,
    userInteracted = !1;
function currentSlide(e) {
    showSlides(slideIndex = e), resetAutoAdvance()
}
function showSlides(e) {
    let t, n = document.getElementsByClassName("mySlides"),
        d = document.getElementsByClassName("dot");
    for (e > n.length && (slideIndex = 1), e < 1 && (slideIndex = n.length), t = 0; t < n.length; t++) n[t].style.display = "none";
    for (t = 0; t < d.length; t++) d[t].className = d[t].className.replace(" active", "");
    n[slideIndex - 1].style.display = "block", d[slideIndex - 1].className += " active"
}
function resetAutoAdvance() {
    clearInterval(autoAdvanceInterval), userInteracted || startAutoAdvance()
}
function startAutoAdvance() {
    autoAdvanceInterval = setInterval(() => {
        userInteracted || (slideIndex++, showSlides(slideIndex))
    }, 1e4)
}
function handleInteraction() {
    userInteracted = !0, clearInterval(autoAdvanceInterval)
}
showSlides(slideIndex), startAutoAdvance(), document.querySelectorAll(".mySlides iframe").forEach(e => {
    e.addEventListener("load", () => {
        e.contentWindow.addEventListener("click", handleInteraction), e.contentWindow.addEventListener("touchstart", handleInteraction)
    })
}), document.addEventListener("visibilitychange", () => {
    document.hidden ? clearInterval(autoAdvanceInterval) : userInteracted || startAutoAdvance()
}), document.querySelectorAll(".dot").forEach(e => {
    e.addEventListener("click", () => {
        userInteracted = !1, resetAutoAdvance()
    })
});

// Lazy load iframes
document.addEventListener('DOMContentLoaded', function() {
    const iframes = document.querySelectorAll('iframe[data-src]');
    const loadIframe = iframe => {
        if (iframe.getAttribute('src') === 'about:blank') {
            iframe.setAttribute('src', iframe.getAttribute('data-src'));
        }
    };
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadIframe(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    iframes.forEach(iframe => observer.observe(iframe));
});