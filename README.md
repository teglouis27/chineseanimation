# chineseanimation

This is to create SVG animations of Chinese characters to look are behave hieroglyphically.
This is unfinished as I had chosen to use Mathematica as it was easier.
Check out this webpage to see how: https://mathematica.stackexchange.com/questions/289553/converting-an-unicodes-image-into-polygon-data-for-an-svg

- First we have to make PNG files from the font 'wqy-microhei.ttc'.
- Secondly, we break the PNG into RGB files.
- Thirdly, we take the black parts out.
- Next, we find the concave hull of the disconnected parts.
- Then, we use the filled disconnected concave hulls to make an SVG.
- Carefully, we label the disconnected parts with an 'id'.
- Lastly, we animate the SVG to make it fit into the animation.
