---
name: add-testimonial
description: Add a testimonial/recommendation to the Testimonials carousel. Use when someone gives the user a recommendation (e.g. from LinkedIn) to display on the site. Adds a slide to the #testimonial-mf carousel in BOTH language pages and, optionally, bumps the "Testimonials" counter.
---

# Add a testimonial

Testimonials are slides inside `<div id="testimonial-mf" class="owl-carousel owl-theme">`.
Owl Carousel is configured in [`js/main.js`](../../../js/main.js) with `loop`, `dots`
and `nav`, so a new slide is picked up automatically — no JS change needed.

Add the SAME slide to **both** `index.html` and `index-pt-br.html`.

## Steps

1. **Add the author photo** to [`img/`](../../../img/) (square, e.g. `testimonial-06.webp`).
   A circular mask is applied by `.rounded-circle`.

2. **Insert a slide** as the last child inside `#testimonial-mf`:

   ```html
   <div class="testimonial-box">
     <div class="author-test">
       <a href="LINKEDIN_URL" target="_blank">
         <img src="img/testimonial-06.webp" alt="" class="rounded-circle b-shadow-a"
              width="150" height="150"></a>
       <span class="author">FULL NAME - ROLE - COMPANY</span>
     </div>
     <div class="content-test">
       <p class="description lead">
         THE TESTIMONIAL TEXT.
       </p>
       <span class="comit"><i class="fa fa-quote-right"></i></span>
     </div>
   </div>
   ```

3. **Keep the two pages in sync.** The slide markup is identical in both files
   (testimonial text is kept verbatim in whatever language it was written).

4. **(Optional) update the counter.** The "Testimonials" stat in the counters section
   is hard-coded (`<p class="counter">5</p>`). Bump it in both pages if you want it to
   match the new count.

5. **Verify** with the **preview-portfolio** skill: confirm the new slide appears, the
   dots count increased, and the carousel still loops.

## Notes

- Always set `width="150" height="150"` on the photo to reserve layout space.
- `.owl-item img` is width-constrained by the testimonial CSS; a non-square photo will
  be letterboxed inside the circle — crop to square first.
