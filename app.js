// Register the service worker.
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/bandhavya.github.io/service.js', {scope : '/bandhavya.github.io/'}).then (function(serviceReg) {

        if(serviceReg.installing) {
            console.log('Service worker installing');
        } else if(serviceReg.waiting) {
            console.log('Service worker installed');
        } else if(serviceReg.active) {
            console.log('Service worker active');
        }

        // Check for showNotification support.
        if (!(serviceReg.showNotification)) {
            console.log('Notifications aren\'t supported on service workers.');
        } else {
            console.log('Notifications are supported on service workers.');
        }

    }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
}



var imgURLs = ['images/heidi.jpg', 'images/heidiImg.jpg', 'images/nature.jpg', 'images/rose.jpg'];


// sample code to load the images via xhr.
function imgLoad(url) {
    var executor = function (resolve, reject) {
        var xhrReq = new XMLHttpRequest();

        xhrReq.open('GET', url);

            xhrReq.onload = function(response) {
            if(xhrReq.status === 200) {
                resolve(url);
            } else {
                reject('image is not loaded ');
            }
        };

        xhrReq.onerror = function(){
            reject('There was a network error.');
        };
        xhrReq.send();
    };

    var promise = new Promise(executor);

    return promise;

}

window.onload = function () {
  for(var i = 0; i < imgURLs.length; i++) {
          imgLoad(imgURLs[i]).then(function (responseUrl) {
              console.log('response ' + responseUrl);
              var imgEle = document.createElement('img');
              imgEle.src = responseUrl;
              document.getElementById('imgContainer').appendChild(imgEle);
          });
      }
};