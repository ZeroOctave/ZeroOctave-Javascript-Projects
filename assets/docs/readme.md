# How to document a Project? 🤔
With the recently added feature the gives a little overview about particular projects in Zero-Octave, It would be very cool to document your own or other good projects so the begginers can get better value from it

## Steps to Document

1.  Write a Documentation and save it as `project-name.md` in `assets/docs` directory
2. Link your markdown it to cards.json file 
```
	 {
		"name": "Project XYZ",
		"image": "assets/Images/project-img.png",
		"link": "Public/project-code.html",
		"docs": "assets/docs/project-name.md",
	},
```
3. Send a Pull Request

## What to document?

There is no fixed structure but it should somewhat go in the order of
- Overview / About Project
- What to learn
- Useful Resources to Build the project
- Small guide to tackle the most challenging aspects of a particular build
git