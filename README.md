# Ultimate English At Home (UEAH)

Static GitHub Pages web app (no build step).  
MVP: pastel, responsive landing + Resources navigation (Age → Skill) with clean URLs.

## Routes
- `/` (Home)
- `/resources`
- `/resources/:age` where age is one of: `0-3`, `4-7`, `8-10`, `11-12`, `13-18`
- `/resources/:age/:skill` where skill is one of: `reading`, `listening`, `writing`, `speaking`

## Deep links on GitHub Pages
GitHub Pages is static hosting, so deep URLs would normally 404.

This repo includes `404.html` which redirects deep links to `/?r=<original path>`.  
Then `assets/js/app.js` restores the intended path and renders the route.

## Run locally (Windows PowerShell)
From the repo root:

```powershell
powershell -ExecutionPolicy Bypass -File ".\tools\serve.ps1" -Port 5173
