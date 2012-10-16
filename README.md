Catitizer
=========

- Makes faces into cats. Or other things I guess, but why would you want to do that...
- Code needs alot of work still, go easy on meee.
- Faces that aren't getting catitized are not being detected by the framework below... It doesnt seem to like beards very much.

This works by proxying a website through the local domain. During the proxy process javascript, html and css are injected and links are redirected.

It pulls all the images off of the site to be Catitized and redirects the images on my proxy copy site to the "scraped" images.

This is done to avoid canvas "taint" when the face detection routine goes to work.



Good image to try: http://cva.stanford.edu/images/people/current/Group_April_2008.jpg



Stuff I Used
============
  - request : for grabbing websites
  - express : fast server setup
  - jsdom : virtual DOM on the server side to simulate jquery and inject code.
  - fs : filesystem access
  - http-get : for image scraping
  - now : more fun to use then ajax


Face Finder:
https://github.com/jaysalvat/jquery.facedetection

Progress Bar:
http://ivan.ly/