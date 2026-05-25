(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initializeWidgets();
  });

  if (document.readyState === "complete" || document.readyState === "interactive") {
    initializeWidgets();
  }

  document.addEventListener("shopify:section:load", function () {
    initializeWidgets(true);
  });
  
  document.addEventListener("shopify:section:select", function () {
    initializeWidgets(true);
  });

  function initializeWidgets(forceReload = false) {
    const selector = forceReload ? ".testicraft-widget-root" : ".testicraft-widget-root:not(.testicraft-initialized)";
    const widgets = document.querySelectorAll(selector);
    
    widgets.forEach(function (widget) {
      widget.classList.add("testicraft-initialized");
      const shop = widget.getAttribute("data-shop") || window.TestiCraft?.shop;
      
      if (!shop) {
        renderError(widget, "Shop configuration missing.");
        return;
      }
      fetchWidgetData(widget, shop);
    });
  }

  function fetchWidgetData(container, shop) {
    const proxyUrl = `/apps/testicraft?shop=${encodeURIComponent(shop)}`;
    fetch(proxyUrl)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        if (data.error) throw new Error(data.error);
        renderWidget(container, data.widget);
      })
      .catch(error => {
        console.error("TestiCraft widget failed to load:", error);
        renderError(container, "Could not load testimonials. Please try again later.");
      });
  }

  function renderWidget(container, widgetData) {
    const testimonials = widgetData.testimonials || [];
    if (testimonials.length === 0) {
      container.innerHTML = `<div style="padding: 40px; text-align: center; color: #6b7280;">No testimonials added yet.</div>`;
      return;
    }

    container.style.setProperty("--tc-text", widgetData.textColor || "#1f2937");
    container.style.setProperty("--tc-accent", widgetData.accentColor || "#f59e0b");
    container.style.setProperty("--tc-bg", widgetData.cardBgColor || "#ffffff");
    container.style.setProperty("--tc-section-bg", widgetData.sectionBgColor || "#f9fafb");
    if (widgetData.fontFamily && widgetData.fontFamily !== "Inter") {
      container.style.setProperty("--tc-font", `'${widgetData.fontFamily}', system-ui, sans-serif`);
    }

    const designId = widgetData.activeDesign || "design-1";
    let designClass = "testicraft-d1";
    switch (designId) {
      case "design-2": designClass = "testicraft-d2"; break;
      case "design-3": designClass = "testicraft-d3"; break;
      case "design-4": designClass = "testicraft-d4"; break;
      case "design-5": designClass = "testicraft-d5"; break;
      case "design-6": designClass = "testicraft-d6"; break;
      case "design-7": designClass = "testicraft-d7"; break;
      case "design-8": designClass = "testicraft-d8"; break;
      default: designClass = "testicraft-d1";
    }

    const quoteIcon = `
      <svg class="testicraft-quote-icon" width="64" height="64" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.017 21L16.439 14.99H11.5V3H21.5V14.99L19.078 21H14.017ZM2.517 21L4.939 14.99H0V3H10V14.99L7.578 21H2.517Z" />
      </svg>
    `;

    let cardsHtml = "";
    testimonials.forEach(item => {
      let starsHtml = "";
      for (let i = 1; i <= 5; i++) {
        const fillClass = i <= item.rating ? "testicraft-star-filled" : "testicraft-star-empty";
        starsHtml += `
          <svg class="testicraft-star ${fillClass}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
          </svg>
        `;
      }

      cardsHtml += `
        <div class="testicraft-card ${designClass}">
          ${quoteIcon}
          <div class="testicraft-card-content">
            <div class="testicraft-stars">${starsHtml}</div>
            <p class="testicraft-quote">"${escapeHtml(item.quote)}"</p>
          </div>
          <div class="testicraft-author">
            <img class="testicraft-avatar" src="${escapeHtml(item.avatarUrl)}" alt="${escapeHtml(item.authorName)}" loading="lazy">
            <div class="testicraft-info">
              <h4 class="testicraft-name">${escapeHtml(item.authorName)}</h4>
              <span class="testicraft-designation">${escapeHtml(item.designation)}</span>
            </div>
          </div>
        </div>
      `;
    });

    let gridHtml = "";
    const colsClass = `testicraft-cols-${widgetData.columns || 3}`;

    if (designId === "design-4") {
      gridHtml = `<div class="testicraft-d4-wrapper">${cardsHtml}</div>`;
    } else if (designId === "design-5") {
      gridHtml = `<div class="testicraft-d5-container"><div class="testicraft-grid ${colsClass}">${cardsHtml}</div></div>`;
    } else if (designId === "design-6") {
      gridHtml = `<div class="testicraft-d6-grid">${cardsHtml}</div>`;
    } else if (designId === "design-7") {
      gridHtml = `<div class="testicraft-d7-grid">${cardsHtml}</div>`;
    } else if (designId === "design-8") {
      gridHtml = `<div class="testicraft-d8-grid">${cardsHtml}</div>`;
    } else {
      gridHtml = `<div class="testicraft-grid ${colsClass}">${cardsHtml}</div>`;
    }

    const widgetHtml = `
      <section class="testicraft-section">
        <div class="testicraft-container">
          <div class="testicraft-header">
            <h2 class="testicraft-heading">${escapeHtml(widgetData.heading)}</h2>
            <p class="testicraft-subheading">${escapeHtml(widgetData.subheading)}</p>
          </div>
          ${gridHtml}
        </div>
      </section>
    `;

    container.style.opacity = 0;
    container.innerHTML = widgetHtml;
    
    setTimeout(() => {
      container.style.transition = "opacity 0.5s ease-out";
      container.style.opacity = 1;
    }, 50);
  }

  function renderError(container, message) {
    container.innerHTML = `
      <div style="padding: 30px; border-radius: 12px; border: 1px dashed #ef4444; background-color: #fef2f2; text-align: center; color: #b91c1c; font-family: system-ui, sans-serif;">
        <span style="font-weight: 600; font-size: 0.95rem;">${escapeHtml(message)}</span>
      </div>
    `;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
})();
