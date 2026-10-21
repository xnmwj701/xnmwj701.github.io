---
layout: modern
title: "Our Lab"
permalink: /lab/
page_class: lab-page
---

<header class="page-header lab-intro">
  <h1>{{ site.lab.name }}</h1>
  <p class="page-lead">{{ site.lab.full_name }}</p>
</header>

<section class="page-section lab-platforms" aria-labelledby="hardware-title">
  <div class="lab-platforms__heading">
    <h2 id="hardware-title">Laboratory Hardware Platform</h2>
  </div>

  <div class="lab-hardware">
    <div class="lab-hardware__vehicles">
      <figure class="hardware-card">
        <div class="hardware-card__media">
          <img src="{{ '/images/mobilerobot.jpg' | relative_url }}" alt="PadBot E1/E2 mobile robot" loading="lazy">
        </div>
        <figcaption class="hardware-card__body">
          <span class="hardware-card__accent" aria-hidden="true"></span>
          <h3>PadBot E1/E2</h3>
          <p>Compact mobile robotic platform for indoor research and experimentation.</p>
          <span class="hardware-card__badge">Mobile Robotics</span>
        </figcaption>
      </figure>
      <figure class="hardware-card">
        <div class="hardware-card__media">
          <img src="{{ '/images/car1.png' | relative_url }}" alt="AgileX SCOUT MINI mobile robot" loading="lazy">
        </div>
        <figcaption class="hardware-card__body">
          <span class="hardware-card__accent" aria-hidden="true"></span>
          <h3>AgileX SCOUT MINI</h3>
          <p>Agile mobile robotic platform for autonomous navigation and control research.</p>
          <span class="hardware-card__badge">Mobile Robotics</span>
        </figcaption>
      </figure>
    </div>
    <figure class="hardware-card hardware-card--wide">
      <div class="hardware-card__media">
        <img src="{{ '/images/robotarm.jpg' | relative_url }}" alt="Two UFACTORY xArm robotic arms at a workbench" loading="lazy">
      </div>
      <figcaption class="hardware-card__body">
        <span class="hardware-card__accent" aria-hidden="true"></span>
        <h3>UFACTORY xArm 6/7</h3>
        <p>Robotic manipulation platform for motion planning, learning, and control research.</p>
        <span class="hardware-card__badge">Robotic Manipulation</span>
      </figcaption>
    </figure>
  </div>
</section>
