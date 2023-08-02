# chineseanimation

This is to create SVG animations of Chinese characters to look are behave hieroglyphically.

- First we have to make PNG files from the font.
- Secondly, we break the PNG into RGBA files.
- Thirdly, we take the black parts out.
- Next, we find the concave hull of the disconnected parts.
- Then, we use the filled disconnected concave hulls to make an SVG.
- Carefully, we label the disconnectived parts with an 'id'.
- Lastly, we animate the SVG to make it fit into the animation.
