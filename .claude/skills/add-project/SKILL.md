---
name: add-project
description: Add a new project/work card to the portfolio "Projects" grid. Use when the user wants to showcase a new project, repo, or piece of work on the site. Ensures the card is added to BOTH language pages (index.html and index-pt-br.html) and that the image exists.
---

# Add a project card

Projects live in the `<section id="work">` grid. Each card is a `col-md-4` (three per
row). The SAME card must be added to **both** `index.html` (English) and
`index-pt-br.html` (Portuguese) — only the human text (`w-title`, `w-ctegory`) differs
by language; the link, image and date are identical.

## Steps

1. **Add the image.** Put a square image (~400×400) in [`img/`](../../../img/) as `.webp`
   (the site uses WebP; convert with `cwebp input.png -o img/name.webp` if needed).

2. **Insert the card** inside the `.row` of `<section id="work">`, keeping cards grouped
   in rows of three. Template (replace the ALL-CAPS placeholders):

   ```html
   <div class="col-md-4">
     <div class="work-box">
       <a href="PROJECT_URL" target="_blank">
         <div class="work-img">
           <img src="img/IMAGE.webp" alt="" class="img-fluid"
                style="width: 400px; height: 400px; margin: 0px;">
         </div>
         <div class="work-content">
           <div class="row">
             <div class="col-sm-8">
               <h2 class="w-title">PROJECT TITLE</h2>
               <div class="w-more">
                 <span class="w-ctegory">CATEGORY</span> / <span class="w-date">DD Mon. YYYY</span>
               </div>
             </div>
             <div class="col-sm-4">
               <div class="w-like">
                 <span class="ion-ios-plus-outline"></span>
               </div>
             </div>
           </div>
         </div>
       </a>
     </div>
   </div>
   ```

3. **Do it in both pages.** Add the identical card to `index-pt-br.html`, translating
   `w-title` and `w-ctegory` to Portuguese (the URL, image, date stay the same).

4. **Verify:**

   ```bash
   npm run check:links   # confirms img/IMAGE.webp resolves in both pages
   ```

   Then use the **preview-portfolio** skill to eyeball the new card.

## Notes

- `alt=""` is intentional (decorative thumbnail with a visible title beside it).
- Keep the `style="width:400px;height:400px"` inline sizing to match existing cards.
- `ion-ios-plus-outline` is the local Ionicons v2 font glyph — leave it as-is.
