---
layout: modern
permalink: /
title: false
page_class: home-page
---

{% assign campus_images = site.data.home.campus_gallery %}
<section class="home-hero" aria-labelledby="home-title">
  <div class="campus-carousel{% if campus_images.size < 2 %} has-single-slide{% endif %}" data-carousel data-carousel-label="Campus image" data-carousel-autoplay="true" role="region" aria-label="Campus gallery" tabindex="0">
    <div class="home-hero__media campus-carousel__viewport">
      {% for campus_image in campus_images %}
        <figure class="campus-carousel__slide{% if forloop.first %} is-active{% endif %}" data-carousel-slide aria-hidden="{% if forloop.first %}false{% else %}true{% endif %}" style="--campus-object-position: {{ campus_image.position | default: 'center center' }};">
          <img src="{{ campus_image.image | relative_url }}" alt="{{ campus_image.alt | escape }}" {% unless forloop.first %}loading="lazy"{% endunless %}>
        </figure>
      {% endfor %}
      <div class="home-hero__shade" aria-hidden="true"></div>
      <div class="home-hero__copy">
        <h1 id="home-title">{{ site.lab.name }}</h1>
        <p class="home-hero__full-name">{{ site.lab.full_name }}</p>
        <p class="home-hero__statement">{{ site.lab.mission }}</p>
      </div>
    </div>
    <div class="campus-carousel__controls">
      <button class="campus-carousel__arrow" type="button" data-carousel-prev aria-label="Previous campus image" title="Previous campus image"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>
      <div class="campus-carousel__dots" aria-label="Choose a campus image">
        {% for campus_image in campus_images %}
          <button class="campus-carousel__dot{% if forloop.first %} is-active{% endif %}" type="button" data-carousel-dot data-carousel-index="{{ forloop.index0 }}" aria-label="Go to campus image {{ forloop.index }}" aria-current="{% if forloop.first %}true{% else %}false{% endif %}"></button>
        {% endfor %}
      </div>
      <button class="campus-carousel__arrow" type="button" data-carousel-next aria-label="Next campus image" title="Next campus image"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>
    </div>
    <p class="screen-reader-text" data-carousel-status aria-live="polite">Campus image 1 of {{ campus_images.size }}</p>
  </div>
</section>

<section class="home-themes" aria-labelledby="themes-title">
  <div class="section-heading"><h2 id="themes-title">Research Themes</h2></div>
  <div class="home-themes__grid">
    <article class="home-theme"><i class="fas fa-project-diagram" aria-hidden="true"></i><h3>Modeling</h3><p>Learning-based and principled models for complex dynamical systems.</p></article>
    <article class="home-theme"><i class="fas fa-chart-line" aria-hidden="true"></i><h3>Evolution</h3><p>Understanding and predicting how dynamical systems evolve over time.</p></article>
    <article class="home-theme"><i class="fas fa-route" aria-hidden="true"></i><h3>Trajectory Planning</h3><p>Planning feasible and efficient motions for robotic systems.</p></article>
    <article class="home-theme"><i class="fas fa-robot" aria-hidden="true"></i><h3>Robotics</h3><p>Learning, modeling, and control for real-world robotic systems.</p></article>
    <article class="home-theme"><i class="fas fa-layer-group" aria-hidden="true"></i><h3>Integration</h3><p>Connecting modeling, prediction, planning, and control into unified systems.</p></article>
    <article class="home-theme"><i class="fas fa-sliders-h" aria-hidden="true"></i><h3>Control</h3><p>Reliable control methods for complex dynamical and robotic systems.</p></article>
  </div>
</section>

{% assign selected_publications = site.data.publications | where: "selected", true | sort: "selected_order" %}
<section class="home-featured" aria-labelledby="featured-title">
  <div class="section-heading">
    <h2 id="featured-title">Selected Publications</h2>
    <a class="text-link" href="{{ '/publications/' | relative_url }}">View all publications <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
  </div>
  <div class="featured-carousel" data-carousel data-carousel-multi="true" data-carousel-label="Selected publication" role="region" aria-label="Selected publications carousel" tabindex="0">
    <button class="featured-carousel__arrow" type="button" data-carousel-prev aria-label="Previous selected publications" title="Previous publications"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>
    <div class="featured-carousel__viewport">
      {% for publication in selected_publications %}
        <article class="home-work-card featured-carousel__slide" data-carousel-slide>
          {% if publication.image %}
            <a class="home-work-card__media" href="{{ publication.image | relative_url }}" data-publication-image aria-haspopup="dialog" aria-label="Preview figure for {{ publication.title | escape }}"><img src="{{ publication.image | relative_url }}" alt="Figure for {{ publication.title | escape }}" loading="lazy"></a>
          {% endif %}
          <div class="home-work-card__body">
            <div class="home-work-card__badges"><span>{{ publication.venue }} · {{ publication.year }}</span>{% if publication.badges %}{% for badge in publication.badges limit: 1 %}<span>{{ badge }}</span>{% endfor %}{% endif %}</div>
            <h3><a href="{{ '/publications/' | relative_url }}#publication-{{ publication.title | slugify }}">{{ publication.title }}</a></h3>
            <p class="home-work-card__authors">{% include publication-authors.html publication=publication %}</p>
            <div class="publication-links publication-links--compact">
              {% if publication.doi %}<a href="https://doi.org/{{ publication.doi }}" target="_blank" rel="noopener">DOI</a>{% endif %}
              {% for link in publication.links %}<a href="{{ link.url | relative_url }}" {% if link.url contains '://' %}target="_blank" rel="noopener"{% endif %}>{{ link.label }}</a>{% endfor %}
            </div>
          </div>
        </article>
      {% endfor %}
    </div>
    <button class="featured-carousel__arrow" type="button" data-carousel-next aria-label="Next selected publications" title="Next publications"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>
    <p class="screen-reader-text" data-carousel-status aria-live="polite"></p>
  </div>
</section>

<section id="news" class="home-news" aria-labelledby="news-title">
  <div class="section-heading"><h2 id="news-title">Latest News</h2></div>
  <div class="home-news__list">
    {% assign news_groups = site.data.news | group_by: "display_date" | sort: "name" | reverse %}
    {% for news_group in news_groups %}
      {% for item in news_group.items %}
        <article class="home-news__item">
          <time>{{ item.display_date }}</time>
          <span class="home-news__tag" aria-hidden="true">{{ item.icon }}</span>
          <p>{{ item.text }}</p>
          {% if item.source %}<a class="home-news__source" href="{{ item.source }}" target="_blank" rel="noopener" aria-label="Open news source" title="Open source"><i class="fas fa-external-link-alt" aria-hidden="true"></i></a>{% endif %}
        </article>
      {% endfor %}
    {% endfor %}
  </div>
</section>

{% include publication-lightbox.html %}
<script defer src="{{ '/assets/js/featured-carousel.js' | relative_url }}?v={{ site.time | date: '%s' }}"></script>
