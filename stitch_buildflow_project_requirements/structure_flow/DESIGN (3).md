# Design System Documentation: Precision & Clarity

## 1. Overview & Creative North Star
### The Creative North Star: "The Architectural Blueprint"
Construction management is an exercise in managing complexity with extreme precision. This design system departs from the "generic SaaS" look by adopting an editorial, architectural aesthetic. We move beyond the grid to embrace **The Architectural Blueprint**—a philosophy where white space is a structural element, and hierarchy is defined by light and layering rather than lines and boxes.

By utilizing high-contrast typography scales and intentional asymmetry, we create a digital environment that feels as high-end and permanent as the physical structures our users build.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a deep, authoritative Blue (`primary`) and a functional, construction-site Amber (`secondary`). 

### The "No-Line" Rule
To achieve a premium, futuristic feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts. 
*   **Example:** A `surface-container-low` (#f2f4f6) sidebar sitting against a `surface` (#f7f9fb) main content area.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials. We use "Tonal Layering" to define importance:
1.  **Base Layer:** `surface` (#f7f9fb) — The foundation of the application.
2.  **Sectioning:** `surface-container-low` (#f2f4f6) — Used for large structural blocks.
3.  **Actionable Content:** `surface-container-lowest` (#ffffff) — Reserved for cards and interactive modules to provide "natural lift."
4.  **Prominence:** `surface-container-high` (#e6e8ea) — Used for inactive states or recessed information.

### The "Glass & Gradient" Rule
Standard flat colors feel "out-of-the-box." To elevate the experience:
*   **Glassmorphism:** Use `surface` colors at 70-80% opacity with a `backdrop-blur` of 20px for floating navigation bars or modals.
*   **Signature Textures:** Apply a subtle linear gradient to primary CTAs (from `primary` #004ac6 to `primary-container` #2563eb at 135 degrees) to add depth and a "lit-from-within" quality.

---

## 3. Typography
We use **Inter** as our functional backbone, emphasizing extreme scale to create an editorial feel.

*   **Display (lg/md/sm):** Used for high-level dashboard metrics and landing moments. Letter-spacing should be set to `-0.02em` to feel tight and intentional.
*   **Headline (lg/md/sm):** Bold, authoritative. Use `headline-lg` (2rem) for page titles to command attention immediately.
*   **Body (lg/md/sm):** The workhorse. `body-md` (0.875rem) is the default for all data entry. Ensure a line-height of 1.5 for maximum readability in complex project logs.
*   **Label (md/sm):** Used for metadata. Always uppercase with `+0.05em` letter spacing when used in `label-sm` to ensure legibility against the `outline` color.

---

## 4. Elevation & Depth
In this system, depth is a tool for focus, not just decoration.

### The Layering Principle
Avoid shadows for static cards. Instead, place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f2f4f6) background. This creates a "soft lift" that feels architectural.

### Ambient Shadows
When an element must float (Modals, Dropdowns), use **Ambient Shadows**:
*   **Value:** `0px 12px 32px rgba(15, 23, 42, 0.06)`
*   The shadow color is a tinted version of `on-surface` (#191c1e) at very low opacity to mimic natural light.

### The "Ghost Border" Fallback
If accessibility requires a container boundary, use a **Ghost Border**:
*   `outline-variant` (#c3c6d7) at **20% opacity**.
*   Standard 100% opaque borders are strictly forbidden as they clutter the visual field.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), 12px-16px radius (`lg`), white text.
*   **Secondary:** `surface-container-highest` background with `primary` text. No border.
*   **Tertiary:** Ghost style. No background; `primary` text. Interaction is shown via a subtle `surface-container-low` hover state.

### Cards & Lists
*   **The Divider Rule:** Forbid the use of divider lines. Separate list items using `spacing-4` (1.4rem) of vertical white space or by alternating background tints between `surface` and `surface-container-low`.
*   **Radius:** Cards must use `rounded-xl` (1.5rem) to soften the professional tone and feel modern.

### Input Fields
*   **Style:** Minimalist. No bottom line or full border. Use a `surface-container-lowest` fill with a `ghost border`.
*   **Focus State:** A 2px "ring" using `primary` at 30% opacity, with no change to the internal border color.

### Contextual Components: "The Blueprint Pulse"
*   **Status Gauges:** For construction progress, use heavy-weight 8px strokes for progress bars with `rounded-full` caps.
*   **Timeline Nodes:** Use `secondary` (Amber) for active milestones and `primary-fixed` for future ones, creating a clear "heat map" of project health.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical layouts. A large `display-md` heading on the left balanced by a "glass" card on the right creates a premium feel.
*   **Do** use the full Spacing Scale. If in doubt, add more space. "Air" is a luxury signal.
*   **Do** ensure all interactive elements have a minimum 44px hit zone, even if the visual asset is smaller.

### Don't
*   **Don't** use pure black (#000000) for text. Always use `on-surface` (#191c1e) to maintain the tonal depth.
*   **Don't** use standard 1px borders to separate "Main Content" from "Sidebar." Use a background color shift.
*   **Don't** use high-intensity shadows. If the shadow is clearly visible at a glance, it is too dark. It should be felt, not seen.