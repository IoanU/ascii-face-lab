# Design direction

ASCII Face Lab is a portrait-making tool for people who want to manipulate a 3D face and carry an interactive, character-based result into a website. The interface must explain the workflow as clearly as it demonstrates the material.

## Tokens

| Token | Value | Role |
| --- | --- | --- |
| Ice | `#edf4f7` | Studio-like page background |
| Paper | `#ffffff` | Reading and control surfaces |
| Ink | `#142f43` | Text and portrait observation chamber |
| Slate | `#5d7180` | Secondary text |
| Teal | `#126b64` | Primary actions and focus |
| Mist | `#dceaf0` | Dividers and quiet diagram surfaces |

Manrope carries headings and reading copy. IBM Plex Mono is reserved for the ASCII rendering, keyboard keys, and export examples. Both are self-hosted, with their original font licenses included.

## Layout

The portrait is the memorable object. Keep the surrounding copy left-aligned and quiet. Use a sculptural, deep-blue observation chamber rather than a dashboard-card hero. The guide is a readable article with a desktop contents rail. The studio is a working interface with a large preview and a compact tools sidebar.

```text
Overview                            Guide
brand / navigation / open studio    brand / navigation / open studio
headline       interactive portrait  contents | getting started
description    view + zoom controls           | eight ASCII angle studies
start / guide                                | fit / sculpt / camera
photo > sculpt > export                      | export / troubleshooting
capability explorer                         | keyboard reference
working export examples
FAQ / credits
```

## Review against the brief

Keep the ASCII portrait interactive rather than substituting a promotional photograph. Avoid stock imagery, fabricated customer quotes, arbitrary statistics, decorative gradients, and repeated feature-card grids. Numbering is used only for the actual workflow. All demos come from the licensed reference scan already included in the editor. No photographs from Downloads are included or used to create the demonstrations.

The site is static and works from a project subdirectory. Photo fitting remains local to the visitor's browser; model/runtime downloads are lazy. No analytics or photo-upload endpoint is added. The private repository is not automatically published to GitHub Pages.
