/// <reference types="googlemaps" />
export function geoMarker(){
  let inputText = 　arguments[0];
  let link      =   arguments[1];
 return new Promise(function(resolve,reject){
     //ジオコーディング
     var geocoder;

      // alert(inputText);
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({'address': inputText},
          (result,status)=>{
              // console.log(result);
              if(status === google.maps.GeocoderStatus.OK){
                  latlng = result[0].geometry.location;
                  // console.log(latlng.lat());
                  // console.log(latlng.lng());
                  //promiseで実行するための
                  resolve(latlng);

                  var address = result[0].formatted_address;
                  $('.output1').text(address);

                  //Maker pinを作り
                   marker = new google.maps.Marker({
                      position: latlng,
                      map:map1,
                      icon: "http://maps.google.com/mapfiles/ms/micons/blue-dot.png"

                  });

                  markers.push(marker);
                  // 地図表示領域をマーカー位置に合わせて拡大

                  var infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
                      content: '<div class="sample">'+ inputText +'<br><a href="'+link+'" target="_blank">検索</a></div>' // 吹き出しに表示する内容
                  });


                  marker.addListener('click', function() { // マーカーをクリックしたとき
                      if(displayInfo){
                          displayInfo.close();
                      }
                      displayInfo = infoWindow;

                      infoWindow.open(map, marker); // 吹き出しの表示

                  });


              }else{
                  alert(status);
              };//if
          })
