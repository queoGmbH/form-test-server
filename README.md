# Form Test Server

This server is made to test forms. The form data get logged to the console. The Files get saved in /uploads/ . New files with the same name override the old ones.

## Routes

Sometimes servers have problemes and this should get tested.

*   GET to * to get an infopage
*   POST to / and get alternatly a 200 or 500 statuscode back
*   POST to /ok and get a 200
*   POST to /fail and get a 500

The formdata gets logged on all routes equaly.

## Install

Make a npm install && node app.js and put a POST request to localhost:4000 .

## CORS

Cors is enabled so you could post from every origin.

## Sample Code for a form

```html
<form action="http://localhost:4000/" method="POST" enctype="multipart/form-data">
    <input type="file" name="file" />
    <button type="submit">submit to localhost:4000/</button>
</form>
```