Catitizer
=========

- Makes faces into cats.
- Code needs alot of work still, go easy on meee.
- Faces that aren't getting catitized are not being detected by the framework below... It doesnt seem to like beards very much.

This works by proxying a website through my domain, during the proxy process links are redirected and javascript, html and css are injected.

It pulls all the images off of the site to be Catitized and redirects the images on my proxy copy site to the "scraped" images.

This is done to avoid canvas "taint" when the face detection routine goes to work.



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