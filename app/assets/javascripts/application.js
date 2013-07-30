// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui.min
//= require jquery-fileupload
//= require_tree .
//
//= require bootstrap-dropdown
//= require bootstrap-transition
//= require bootstrap-collapse
//= require bootstrap-button
//= require bootstrap-tooltip
//
//= require bootstrap-colorpicker
//= require bootstrap-datetimepicker
//
//= require bootstrap-modal
//= require bootstrap-wysihtml5

//= require jquery.purr
//= require best_in_place
//= require codemirror
//= require codemirror/modes/python
//= require codemirror/addons/runmode/runmode
//= require codemirror/addons/edit/matchbrackets

$(document).ready(function() {

    $('.datetimepicker').datetimepicker({
        format: 'dd-MM-yyyy hh:mm:ss',
        language: 'pt-BR',
        startDate: new Date()
    });

    $('a[rel=tooltip]').tooltip();

    $('.colorpicker').colorpicker();


    $(function(){
        $(".jfdiCode").each(_jfdiFormatFunc);
    });

    $(function(){
        page_header = $(".page-header h1");
        if (page_header.size() <= 0)
            return;
        console.log(page_header);
        page_name =page_header[0].innerHTML.replace(/\s/g,"-");
        console.log(page_name);
        if (!page_name)
            return;
        //<input type="hidden" id="<%= item[:text] %>_count" value="<%= item[:count] %>">
        badge_count = $("#"+page_name+"_count");
        console.log(badge_count);
        if (badge_count.size() <= 0)
            return;
        new_items_seen = $(".new_"+page_name).size();
        console.log(new_items_seen);
        //<i class="<%= item[:icon] %>" id="badge_<%= item[:text] %>"></i>
        set_badge = $("#badge_"+page_name);
        if (new_items_seen >0 && set_badge.size() > 0) {
            console.log(set_badge);
            update_count = badge_count.val() - new_items_seen;
            console.log(update_count);
            set_badge[0].innerHTML = update_count > 0 ? update_count : "";
        }
    });

});

var _jfdiFormatFunc = function(i, d){

    if ($(d).data('jfdiFormatted')) return;
    $(d).data('jfdiFormatted', true);
    if($(d).hasClass("pythonCode")){
        CodeMirror.runMode($(d).text(), "python", d);
    }
}
function jfdiFormat(element){
    $(element).find(".jfdiCode").each(_jfdiFormatFunc);
}

String.prototype.nl2br = function(){
    return (this + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
};
