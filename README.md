# chineseanimation

This is to create SVG animations of Chinese characters to look are behave hieroglyphically.

- First we have to make PNG files from the font 'wqy-microhei.ttc'.
- Secondly, we break the PNG into RGB files.
- Thirdly, we take the black parts out.
- Next, we find the concave hull of the disconnected parts.
- Then, we use the filled disconnected concave hulls to make an SVG.
- Carefully, we label the disconnected parts with an 'id'.
- Lastly, we animate the SVG to make it fit into the animation.
