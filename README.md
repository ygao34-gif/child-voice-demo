# Child Voice Differentiation Website

This is a static one-page website for the graduation thesis presentation demo.
It can be hosted directly with GitHub Pages.

## Folder structure

```text
index.html
style.css
script.js
assets/
  images/
  audio/
```

## How to preview locally

Open `index.html` in your browser.

For the most reliable audio behaviour, you can also run a tiny local server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## How to publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload all files and folders from this website package.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Save and wait for GitHub to publish the site.

## Replacing the images

Replace files inside:

```text
assets/images/
```

Keep the same filenames if you do not want to edit the HTML:

```text
classroom-hero.png
logo-avatar.png
child-a.png
child-b.png
child-c.png
child-d.png
```

## Replacing the audio

Replace placeholder files inside:

```text
assets/audio/
```

Recommended filenames:

```text
tts-adult.wav
source-speech.wav
target-reference.wav
child-a.wav
child-b.wav
child-c.wav
child-d.wav
```

The current audio files are harmless placeholder tones. Replace them with your final thesis/demo audio before presentation.

## Editing text

Most visible website text is in `index.html`.
Pipeline popup descriptions are in `script.js` inside the `stageText` object.

## Notes

The classroom and avatar images are illustrative design assets for the presentation website. Replace them with approved VR project screenshots or institutional assets if needed.

## Update note
This version includes the University of Groningen logo downloaded from the official RUG logo database. If your supervisors prefer a faculty/Campus Fryslân variant, replace `assets/images/rug-logo.png` with the approved logo file and keep the same filename.

The three problem cards are expandable. To edit their titles or expanded text, open `index.html` and search for `data-modal-title` and `data-modal-text`.
