$(document).ready(() => {
    document.getElementById("logo").style.display = "block";
    document.getElementById("yazilar").style.display = "none";
    $.getJSON({ url: "https://teknotra.com/wp-json/wp/v2/posts?per_page=3" }).done(data => {
        if (data) {
            $(".news #ilkYaziResmi").src= getImageForPost("ilkYaziResmi","https://teknotra.com/wp-json/wp/v2/media/"+data[0].featured_media,function(err, data) {});
            $(".news #ikinciYaziResmi").src= getImageForPost("ikinciYaziResmi","https://teknotra.com/wp-json/wp/v2/media/"+data[1].featured_media,function(err, data) {});
            $(".news #ucuncuYaziResmi").src= getImageForPost("ucuncuYaziResmi","https://teknotra.com/wp-json/wp/v2/media/"+data[2].featured_media,function(err, data) {});
            ucuncuYaziResimLinki = "https://teknotra.com/wp-json/wp/v2/media/"+data[2].featured_media;
            if(data[0].title.rendered.length>57)
            {
                $(".news #ilkYaziBaslik").text(data[0].title.rendered.substring(0,60).replace("&#8211;","-")+"...");
            }
            else{
                $(".news #ilkYaziBaslik").text(data[0].title.rendered.replace("&#8211;","-"));
            }
            document.getElementById("ilkYaziLink").href = data[0].link;

            if(data[1].title.rendered.length>57)
            {
                $(".news #ikinciYaziBaslik").text(data[1].title.rendered.substring(0,60).replace("&#8211;","-")+"...");
            }
            else{
                $(".news #ikinciYaziBaslik").text(data[1].title.rendered.replace("&#8211;","-"));
            }
            document.getElementById("ikinciYaziLink").href = data[1].link;

            if(data[2].title.rendered.length>57)
            {
                 $(".news #ucuncuYaziBaslik").text(data[2].title.rendered.substring(0,60).replace("&#8211;","-")+"...");
            }
            else
            {
                $(".news #ucuncuYaziBaslik").text(data[2].title.rendered.replace("&#8211;","-"));
            }
            document.getElementById("ucuncuYaziLink").href = data[2].link;
        }
    });
});

var ucuncuYaziResimLinki = null;

var getImageForPost = function(elementName, url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
    
        var status = xhr.status;
        
        if (status == 200) {
            callback(null, xhr.response);
            if(ucuncuYaziResimLinki != null && url == ucuncuYaziResimLinki){
                document.getElementById("yazilar").style.display = "block";
                document.getElementById("logo").style.display = "none";
            }
            document.getElementById(elementName).src = xhr.response.link;
        } else {
            callback(status);
        }
    };
    
    xhr.send();
};
