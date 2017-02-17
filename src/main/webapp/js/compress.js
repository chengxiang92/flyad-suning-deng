/**
 * Created by 祥 on 2016/5/17.
 * 需引入megapix-image.js
 */
var COMPRESS={
    ratio:1,imgMinWidth:500,imgMinHeight:500,
    Init:function(fileId, imageId, canvasId, callback){
        var file = document.getElementById(fileId);
        var image = document.getElementById(imageId);
        var canvas = document.getElementById(canvasId);

        file.onchange = function () {
            var orientation = 0;
            EXIF.getData(file.files['0'], function() {
                EXIF.getAllTags(this);
                orientation = EXIF.getTag(this, 'Orientation');
                COMPRESS.GetFile(file, orientation, canvas, image, callback);
            });
        }
    },
    GetFile:function(fileElement, orientation, canvas, image, callback){
        var file = fileElement.files[0];
        if (window.FileReader) {
            var fr = new FileReader();
            fr.onloadend = function (e) {
                var url = e.target.result
                mpImg = new MegaPixImage(file);
                mpImg.render(canvas, {minWidth: COMPRESS.imgMinWidth, minHeight: COMPRESS.imgMinHeight, orientation: orientation});
                setTimeout(function () {
                    var imgBase64 = canvas.toDataURL("image/jpeg", COMPRESS.ratio);
                    callback(imgBase64);
                }, 500);
            };
            fr.readAsDataURL(file);
        }
    }
}