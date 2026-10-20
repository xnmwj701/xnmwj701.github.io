(function () {
  "use strict";

  const SUPABASE_URL = "https://rlodqpavodofexjjmsta.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wtOi0UkYyJliziF4olAFXw_WEDCwrmh";
  const STORAGE_KEY = "metric_lab_liked_v1";
  const COUNT_STORAGE_KEY = "metric_lab_like_count_v1";
  const HEADERS = { apikey: SUPABASE_PUBLISHABLE_KEY };

  function parseCount(value) {
    if (value === null || value === undefined || value === "") return null;
    if (Array.isArray(value)) return parseCount(value[0]);
    if (value && typeof value === "object") {
      return parseCount(value.likes !== undefined ? value.likes : value.increment_metric_lab_like);
    }
    const count = Number(value);
    return Number.isSafeInteger(count) && count >= 0 ? count : null;
  }

  function initMetricLike() {
    const components = Array.from(document.querySelectorAll("[data-metric-like]"));
    if (!components.length) return;

    let liked = false;
    let pending = false;
    let countVersion = 0;
    let displayedCount = null;
    try {
      liked = window.localStorage.getItem(STORAGE_KEY) === "true";
      displayedCount = parseCount(window.localStorage.getItem(COUNT_STORAGE_KEY));
    } catch (_) {
      // The button and live count still work when browser storage is unavailable.
    }

    function renderLiked() {
      components.forEach(function (component) {
        const button = component.querySelector("[data-like-button]");
        button.setAttribute("aria-pressed", String(liked));
        button.disabled = liked || pending;
        component.querySelector("[data-like-label]").textContent =
          liked ? "Liked METRIC Lab" : "Give METRIC Lab a Like";
      });
    }

    function renderCount(count) {
      displayedCount = count;
      components.forEach(function (component) {
        component.querySelector("[data-like-count]").textContent =
          count === null ? "—" : String(count);
        component.querySelector(".metric-like__count").setAttribute(
          "aria-label",
          "METRIC Lab likes: " + (count === null ? "unavailable" : count)
        );
      });
      if (count !== null) {
        try {
          window.localStorage.setItem(COUNT_STORAGE_KEY, String(count));
        } catch (_) {
          // Keep showing the count even when storage is unavailable.
        }
      }
    }

    async function loadCount() {
      const version = countVersion;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          const response = await fetch(
            SUPABASE_URL + "/rest/v1/lab_stats?id=eq.metric_lab&select=likes",
            { headers: HEADERS, cache: "no-store" }
          );
          if (!response.ok) throw new Error("Like count request failed");
          const count = parseCount(await response.json());
          if (count === null) throw new Error("Invalid like count");
          if (version === countVersion) renderCount(count);
          return;
        } catch (_) {
          if (attempt === 1 && version === countVersion && displayedCount === null) {
            renderCount(null);
          }
        }
      }
    }

    async function giveLike() {
      if (liked || pending) return;
      try {
        if (window.localStorage.getItem(STORAGE_KEY) === "true") {
          liked = true;
          renderLiked();
          return;
        }
      } catch (_) {
        // Continue without persistence when storage is unavailable.
      }

      pending = true;
      countVersion += 1;
      renderLiked();
      try {
        const response = await fetch(
          SUPABASE_URL + "/rest/v1/rpc/increment_metric_lab_like",
          {
            method: "POST",
            headers: Object.assign({ "Content-Type": "application/json" }, HEADERS),
            body: "{}"
          }
        );
        if (!response.ok) throw new Error("Like request failed");
        liked = true;
        try {
          window.localStorage.setItem(STORAGE_KEY, "true");
        } catch (_) {
          // This session still remains liked.
        }
        let count = null;
        try {
          const body = await response.text();
          if (body) {
            count = parseCount(JSON.parse(body));
          }
        } catch (_) {
          // The RPC succeeded even if its response format is unexpected.
        }
        if (count === null) {
          await loadCount();
        } else {
          renderCount(count);
        }
      } catch (_) {
        if (!liked) await loadCount();
      } finally {
        pending = false;
        renderLiked();
      }
    }

    components.forEach(function (component) {
      component.querySelector("[data-like-button]").addEventListener("click", giveLike);
    });
    renderLiked();
    if (displayedCount !== null) renderCount(displayedCount);
    loadCount();
  }

  initMetricLike();
})();
