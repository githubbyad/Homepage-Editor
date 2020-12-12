
   // BEGIN: Home Page Editor(hpeditor)
    
    $(document).ready(function(){ // Editor Button
        var xlngl = 'sp'
        var xpext = '.a' + xlngl;
        if(window.location.href.indexOf("/responsibility" + xpext) != -1){
            $('.smicon_links1').each(function(){
                if($(this).text() == "Home") {
                    var a = $(this).attr('href');
                    $('.my-form > center').html('<a class="sm-hp" title="Go to Home Page Editor" href="/hpeditor' + xpext + '">Home Page Editor</a>');
                }
            });
        }
        if(window.location.href.indexOf("pform=options_systems_staff") != -1){
            $('.my-form fieldset').addClass('ss_remove');
        }
    });
    function setIntervalLimited(callback, interval, x) {
        for (var i = 0; i < x; i++) {
            setTimeout(callback, i * interval);
        }
    }
    
    function OpenBLPopup(pageUrl, window_type, fwidth, fheight){
        $.magnificPopup.open({
        items: [ {
            src: pageUrl,
            type: window_type
        }
      ],   
      gallery: { enabled: true },
      modal: true,
      iframe: {markup: '<div class="hp-x-popup">'+'<div class="mfp-iframe-scaler" ><div class="hpe-loader"></div>'+'<div class="mfp-close"></div>'+'<iframe style="visibility:hidden;opacity:0;" class="mfp-iframe hpe-iframe" frameborder="0" allowfullscreen></iframe>'+'</div></div>'}
    });
    }
    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }
    
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    function eraseCookie(name) {
        createCookie(name,"",-1);
    }
    function confirm1(msg, url) { // Confirm Popup
        jConfirm(msg, 'Confirm', function(r) { if (r) OpenBLPopup('' + url + '','iframe') });
        return false;
    }
    $(document).ready(function(){
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
            return null;
        }
        return decodeURI(results[1]) || 0;
    }
    if($(document).width() > 1024){
        // vars
            var lx = 'list';
            var lngn = '2.a'
            var lngl = 'sp'
            var plist = lx + lngn + lngl + '?';
            var pext = '.a' + lngl;
            var fx = 'form';
            var dl1 = '<center>Do you want to delete current';
            var dl2 = '?<br><br>This operation cannot be undone.<br><br>Are you sure you want to delete?<br><br></center>';
            var pfist = fx + lngn + lngl + '?';

        // push state
        if(readCookie('hpe_session_error') == 'Yes' && window.location.href.indexOf("/login") != -1) { // session error
            eraseCookie('hpe_session_error');
            alert('<p style="color:red;">Your session has expired.</p>');
        }
        if(window.location.href.indexOf("?hle") != -1){
            var url= document.location.href;
            window.history.pushState({}, "", url.split("?hle")[0]);
            window.location.reload();
        }
        if(window.location.href.indexOf("?hp_editor") != -1 || window.location.href.indexOf("&hp_editor") != -1){
            createCookie('hpe_target_url',window.location.href);
            if (typeof MParameters == 'function') { // Home menu ID
                var mp = MParameters();
            }
            if (typeof SParameters == 'function') { // Home menu ID
                var sp = SParameters();
            }
            document.oncontextmenu = function() { // Disable Right Click
                alert('Right Click is not allowed in Homepage Editor')
                return false; 
            };
            window.addEventListener("auxclick", (event) => { // Disable mouse center button
                if (event.button === 1) event.preventDefault();
            });
            $('a').each(function(){ // Change link into editor link
                if($(this).attr('href')){
                    if($(this).attr('href').indexOf('hp_editor') == -1) {
                        if($(this).attr('href') == '#'){
                            $(this).attr('href', 'javascript:void(0);');
                        }
                        else if($(this).attr('href').indexOf('?') != -1){
                            $(this).attr('href', $(this).attr('href').trim() + '&hp_editor');
                        }
                        else {
                            $(this).attr('href', $(this).attr('href').trim() + '?hp_editor');
                        }
                        if($(this).attr('href').indexOf('target_service_package' + pext + '') != -1){ // Service Package
                            //spm = $(this).text();
                            //$(this).attr('href', $(this).attr('href') + '$$' + spm.replace(/'/g,"@@").replace(/ /g,"_"));
                        }
                        $(this).removeAttr('target');
                    }
                }
            });
            setIntervalLimited(function() { // Change link into editor link (5 Times)
                $('a').each(function(){ 
                    if($(this).attr('href')){
                        if($(this).attr('href').indexOf('hp_editor') == -1) {
                            if($(this).attr('href') == '#'){
                                $(this).attr('href', 'javascript:void(0);');
                            }
                            else if($(this).attr('href').indexOf('?') != -1){
                                $(this).attr('href', $(this).attr('href').trim() + '&hp_editor');
                            }
                            else {
                                $(this).attr('href', $(this).attr('href').trim() + '?hp_editor');
                            }
                            if($(this).attr('href').indexOf('target_service_package' + pext + '') != -1){ // Service Package
                                //spm = $(this).text();
                                //$(this).attr('href', $(this).attr('href') + '$$' + spm.replace(/'/g,"@@").replace(/ /g,"_"));
                            }
                            $(this).removeAttr('target');
                        }
                    }
                });
            }, 2000, 5);
    
            var pl; // Poll - Add Classes
            for (pl = 1; pl <= 100; pl++) {
                $('.polls1body[id="poll' + pl + '"]').addClass('hpe-poll' + pl);
            }
            $('.hpe-i-ad').each(function(){ // AdGroup Class for Verticle Ads
                if(!$(this).siblings('.hp-x').length) {
                    $(this).parent('tr').addClass('had-tr');
                }
            });
            $('.had-tr').each(function(){
                if($(this).siblings('.had-tr').length) {
                    $(this).children('.hpe-i-ad').addClass('hp-show-delete');
                }
            });
            if($('.hpe-i-ad').length){ // Weather Ad
                $('.hpe-i-ad').each(function() {
                    if($(this).attr('data-adnum') == '7'){
                        $(this).addClass('hpe-i-weather');
                        $(this).removeClass('hpe-i-ad');
                    }
                });
            }
            if($('.PhotoGallery1').children('script:first-child').text().indexOf('GetPhoto') != -1 && $('.PhotoGallery1').length) { // Old PhotoGallery1 - Add Classes
                $('.PhotoGallery1').addClass('hpe-old-photog');
              }
            if($('.PhotoGallery2').children('script:first-child').text().indexOf('GetPhoto') != -1 && $('.PhotoGallery2').length) { // Old PhotoGallery2 - Add Classes
                $('.PhotoGallery2').addClass('hpe-old-photog');
            }
            if($('.PhotoGallery3').children('script:first-child').text().indexOf('GetPhoto') != -1 && $('.PhotoGallery3').length) { // Old PhotoGallery3 - Add Classes
                $('.PhotoGallery3').addClass('hpe-old-photog');
              }
            if($('.PhotoGallery4').children('script:first-child').text().indexOf('GetPhoto') != -1 && $('.PhotoGallery4').length) { // Old PhotoGallery4 - Add Classes
                  $('.PhotoGallery4').addClass('hpe-old-photog');
            }
            $('.formbody').addClass('hpe-formbody'); // Add Form Class
            $('#IFrameContent[src*="target_service_package' + pext + '"]').parent('#MainContent').addClass('hpe-sp');// Add Service Package Class
            $('.hpe-sp').css('width','100%');
            $('#IFrameContent[src*="target_yellowpage.asp"]').parent('#MainContent').addClass('hpe-old-directory'); // Add Old Directory Class
            if(window.location.href.indexOf("hp_editor_eventx_detail") != -1) { //New Event Class
                $('.hpe-article-detail').addClass('hpe-event-detail'); 
                $('.hpe-event-detail').removeClass('hpe-article-detail'); 
            }
            $('.eventbody').addClass('hpe-old-event');// Add Old Event Class
            $('.hpe-old-event').css('width','100%');
            $('[class*="hpe-"]').addClass('hp-x');
            //$('#blbodymain').animate({opacity: 1}, 500);
            $('[class*="hpe-"]').prepend('<div class="hp-y"></div>');
    
            // Box width and Height (1st time)
                $('.hp-x').each(function(){
                    //$(this).addClass('hp-ppp'); // Add Class for box hover effect
                    $(this).mouseover(function() {
                        $(this).stop(true, true).removeClass('hp-ppp');
                    }).mouseout(function() {
                        $(this).stop(true, true).addClass('hp-ppp');
                    });
                    if ( $(this).css('float') != 'left') {
                        $(this).addClass('hpe-left');
                    }
                    $(this).children('.hp-y').css('width', $(this).outerWidth());
                    $(this).children('.hp-y').css('height', $(this).outerHeight());
                    $(this).children('.hp-y').removeClass('hp-smallh hp-longh hp-smallw');
                    $(this).removeClass('hp-show-lable hp-hide-delete');
                    if($(this).height() < 40) {
                        $(this).children('.hp-y').addClass('hp-smallh');
                    }
                    else if($(this).height() > 999) {
                        $(this).children('.hp-y').addClass('hp-longh');
                    }
                    if($(this).width() < 32) {
                        $(this).children('.hp-y').addClass('hp-smallw');
                    }
                    if($(this).width() > 290 && $(this).height() > 60) {
                        $(this).addClass('hp-show-lable');
                    }
                    if($(this).width() < 65) {
                        $(this).addClass('hp-hide-help');
                    }
                    else {
                        $(this).removeClass('hp-hide-help');
                    }
                    if($(this).width() >= 140) { // Box Header
                        if($(this).height() <= 55){
                            $(this).addClass('hp-show-hheader-3');
                            $(this).removeClass('hp-hide-delete hp-show-hheader-2 hp-show-hheader-1');
                        }
                        else if($(this).height() <= 75){
                            $(this).addClass('hp-show-hheader-2');
                            $(this).removeClass('hp-hide-delete hp-show-hheader-1 hp-show-hheader-3');
                        }
                        else if($(this).height() > 75){
                            $(this).addClass('hp-show-hheader-1');
                            $(this).removeClass('hp-hide-delete hp-show-hheader-3 hp-show-hheader-2');
                        }
                    }
                    else if($(this).height() <= 54){
                        $(this).addClass('hp-hide-hheader');
                        $(this).removeClass('hp-show-hheader-3 hp-show-hheader-2 hp-show-hheader-1');
                    }
                    if(!$(this).siblings('.hp-x').length) {
                        $(this).addClass('hp-hide-delete');
                    }
                    if($(this).parent('.had-tr').length) {
                        $(this).addClass('hp-hide-delete');
                    }
                    if($(this).parent('.hp-parent-div3').parent('.hp-parent-div2').parent('.hp-parent-div1').siblings('.hp-parent-div1').length) {
                        $(this).removeClass('hp-hide-delete');
                    }
                    if($(this).parent('.hp-parent-div2').parent('.hp-parent-div1').siblings('.hp-parent-div1').length) {
                        $(this).removeClass('hp-hide-delete');
                    }
                    if($(this).parent('.hp-parent-div1').siblings('.hp-parent-div1').length) {
                        $(this).removeClass('hp-hide-delete');
                    }
                    $('.hpe-in-menu').removeClass('hp-hide-delete');
                    $(this).removeClass('hpe-left');
                });
                
            var e = setInterval(function () {
                if(readCookie('hpe_page2') == 'Yes') {
                    eraseCookie('hpe_page2');
                    $('.mfp-close').click();
                    clearTimeout(e);
                    $('#blbodymain').css('opactiy',0);
                    window.location.reload();
                }
            }, 100);
            var l = setInterval(function () { // Popup Loader
                if($('.mfp-wrap').length) {
                    $('.mfp-wrap').css('z-index','99999');
                }
                if($('.hpe-loader').length) {
                    setTimeout(function(){
                        $('.hpe-loader').addClass('hpe-loader-start');
                    },1000);
                    //$('.hpe-iframe').load(function(){
                        setTimeout(function(){
                            $('.hpe-loader').animate({opacity: 0}, 400, function() {
                                $('.hpe-loader').css('visibility','hidden');
                            });
                            $('.hpe-iframe').css('visibility','visible');
                            $('.hpe-iframe').animate({opacity: 1}, 400);
                        },5000);
                    //});
                }
                if($('.hpe-iframe').length) { // If any error, show login page
                    if($('.hpe-iframe').contents().get(0).location.href.indexOf('/error' + pext + '?npage=/login') != -1) { 
                        clearInterval(l);
                            createCookie('hpe_session_error','Yes');
                            $('#blbodymain').css('opactiy',0);
                            top.window.location.reload(true);
                    }
                }
            }, 100);
    
    
    
    
            // Theme
                if (typeof SMThemeColor == 'function') { 
                    if(SMThemeColor() == 'Yellow') {$('.hp-x, #blbodymain').attr('data-theme','Yellow');}
                    if(SMThemeColor() == 'Blue') {$('.hp-x, #blbodymain').attr('data-theme','Blue');}
                    if(SMThemeColor() == 'Brown') {$('.hp-x, #blbodymain').attr('data-theme','Brown');}
                    if(SMThemeColor() == 'Purple') {$('.hp-x, #blbodymain').attr('data-theme','Purple');}
                    if(SMThemeColor() == 'Orange') {$('.hp-x, #blbodymain').attr('data-theme','Orange');}
                    if(SMThemeColor() == 'Olive') {$('.hp-x, #blbodymain').attr('data-theme','Olive');}
                    if(SMThemeColor() == 'Magenta') {$('.hp-x, #blbodymain').attr('data-theme','Magenta');}
                    if(SMThemeColor() == 'Green') {$('.hp-x, #blbodymain').attr('data-theme','Green');}
                    if(SMThemeColor() == 'Red') {$('.hp-x, #blbodymain').attr('data-theme','Red');}
                    if(SMThemeColor() == 'Black') {$('.hp-x, #blbodymain').attr('data-theme','Black');}
                }
    
                
        
            // LOGO - #logo
                if($('.hpe-logo').length){
                    $('.hpe-logo').each(function(){
                        $(this).addClass('hp-ppp');
                        var rw = $(this).attr('data-logo-width');
                        if(typeof rw !== "undefined" ){
                            var rwt = 'Recommended: ' + rw + 'px';
                        }
                        else {
                            var rwt = '';
                        }
                        if($(this).children('#logo').children('img').length){
                            var hlp = 'Upload logo image with recommended width showing on bottom right side.<br><b>NOTE:</b> There is no limit for the height.';
                            $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit Logo" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'pform=options_systems&pkeyname=sys_option_system_id&pkey=1&x=&hpe=Y#hpe_logo_img\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a class="hp-help hp-tt" href="#hp_editor" title="'+ hlp + '"><i class="fa fa-question-circle" aria-hidden="true"></i><b class="hp-llable">Help</b></a></div><header class="hp-hheader">Logo</header><cpanel></cpanel><rpanel>' + rwt + '</rpanel></div>');
                        }
                        else {
                            var hlp = 'Upload logo image with recommended width showing on bottom right side.<br><b>NOTE:</b> There is not limit for the height.';
                            $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit Logo" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'pform=options_systems&pkeyname=sys_option_system_id&pkey=1&x=&hpe=Y#hpe_logo_img\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a class="hp-help hp-tt" href="#hp_editor" title="'+ hlp + '"><i class="fa fa-question-circle" aria-hidden="true"></i><b class="hp-llable">Help</b></a></div><header class="hp-hheader">Logo</header><cpanel></cpanel><rpanel>Recommended: ' + rw + 'px</rpanel></div>');
                        }
                        /*else {
                            var hlp = 'This is logo text help';
                            $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit Logo" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'pform=options_systems&pkeyname=sys_option_system_id&pkey=1&x=&hpe=Y#hpe_logo\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a class="hp-help hp-tt" href="#hp_editor" title="'+ hlp + '"><i class="fa fa-question-circle" aria-hidden="true"></i><b class="hp-llable">Help</b></a></div><header class="hp-hheader">Logo</header><cpanel></cpanel><rpanel>Recommended: ' + rw + 'px</rpanel></div>');
                        }*/
                    });
                }
    
    
    
            // Menu
                if($('.hp-submenu').length){ // If there is no submenu, then add "ADD" button
                    $('.hp-submenu').each(function(){
                        mk = $(this).attr('data-menu');
                        if($(this).children('.hpe-in-submenu').length){
                            $('.hp-submenu').children('.hpe-in-submenu').each(function(){
                                if ($(this).css('display') == 'none') {
                                    $(this).removeClass('hpe-in-submenu');
                                }
                            });
                        }
                        if($(this).children('.hpe-in-submenu').length == 0){
                            $(this).addClass('hp-submenux-zero');
                            $(this).prepend('<submenu><div class="hpe-on-submenu hp-x"><sub>Add Submenu</sub><div class="hp-y"><div class="hp-z"><div class="hp-span"><a title="Add New Submenu" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=Menu&lid2=&level=1&pform=Sub-Menu&pkeyname=sys_menu_sub_id&pkey=&fkeyname=sys_menu_id&fkey=' + mk + '&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=100#hpe_in_new_submenu\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i></a></div></div></div></div></submenu>');
                            
                        }
                    });
                }
                if($('.hp-menu').length){ // Menu Delete Button when there is no submenu
                    $('.hp-menu').each(function(){
                        if($(this).children('.hp-submenux-zero').length){
                            $(this).children('.hpe-in-menu').addClass('hp-menux-delete');
                        }
                        if($(this).attr('data-menu') == mp) {
                            $(this).addClass('hp-homemenu');
                            $(this).children('.hpe-in-menu').addClass('hp-homemenu-child');
                            $(this).children('.hpe-in-menu').attr('data-homeurl','index' + sp + '.htm?hp_editor');
                        }
                    });
                }
                if($('.hpe-menu').length){ // Close box
                    $('.hpe-menu.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit Menu & SubMenu" href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=Menu&x=#hpe_menu\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a></div><div class="hp-span" title="Close Menu Editor to visit Menu/Submenu Pages" class="hp-close"></div></div>');
                }
                $('.hp-close').click(function(){ // Close Menu Editor
                    $(this).parent('.hp-z').parent('.hp-y').remove();
                });
                if($('.hpe-in-menu').length){ // Editor for specific Menu
                    var m = $('.hpe-in-menu').length; // Menu ORDERING BEGIN
                    for(i=0; i<m;i++){
                        $('.hpe-in-menu').eq(i).attr('data-count',i+1);
                        if(i+1 == m) {
                            $('.hpe-in-menu').eq(0).attr('data-order-prev','firstmenu');
                        }
                    }
                    $('.hpe-in-menu').each(function(){
                        if($(this).attr('data-order-prev') == 'firstmenu') { // first Menu
                            var a = parseFloat($(this).attr('data-order'));
                            var d = a - 0.0001;
                            $(this).attr('data-order-new',d.toFixed(4));
                        }
                        else {
                            v = parseInt($(this).attr('data-count')) - 1;
                            n = $('.hpe-in-menu[data-count="' + v + '"]').attr('data-order');
                            $(this).attr('data-order-prev', n);
                            var a = parseFloat($(this).attr('data-order'));
                            var b = parseFloat($(this).attr('data-order-prev'));
                            var c = (a+b);
                            var d = c/2;
                            $(this).attr('data-order-new',d.toFixed(4));
                        }
                    }); // Menu ORDERING END
                    $('.hpe-in-menu').each(function(){
                        var mk = $(this).attr('data-menu');
                        var dl = $(this).attr('data-link');
                        var mon = $(this).attr('data-order-new');
                        var dv = $(this).attr('data-view');
                        if (dl == '#' || dl.indexOf('javascript:void') != -1) {
                            if($(this).children('a').length == 2){
                                $(this).addClass('hp-show-menulink');
                                $(this).children('a').each(function(){
                                    if($(this).attr('href') != '#' || $(this).attr('href').indexOf('javascript:void') == -1) {
                                        dl = $(this).attr('href');  
                                    }
                                });
                                $(this).attr('data-link', dl);
                            }
                        }
                        var dk = $(this).attr('data-link');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit Menu" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=Menu&lid2=&level=1&pform=Menu&pkeyname=sys_menu_id&pkey=' + mk + '&fkeyname=&fkey=&wpage=&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_in_menu_x\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i></a><a title="Add New Menu" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=Menu&lid2=&level=1&pform=Menu&pkeyname=sys_menu_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=&hpe=Y&vpx=' + dv + '&fpx=' + mon + '#hpe_in_new_menu\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i></a><a class="hp-menudelete" title="Delete Menu" href="#hp_editor" onclick="return confirm1(\'' + dl1 + ' Menu' + dl2 + '\', \'/' + pfist + 'lid=Menu&lid2=&level=1&pform=Menu&pkeyname=sys_menu_id&pkey=' + mk + '&fkeyname=&fkey=&wpage=&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i></a><a class="hp-menulink" title="Visit Menu" href="' + dk + '"><i class="fa fa-external-link" aria-hidden="true"></i></a></div></div>');
                        if ($(this).attr('data-link') == '#' || $(this).attr('data-link').indexOf('javascript:void') != -1) { // If there is no link, then disable Menu Link button
                            $('.hp-menulink').css('display','none');
                        }
                        else {
                            $(this).addClass('hp-show-menulink');
                        }
                        if($(this).parent('div').length) {
                            if(!$(this).parent('div').siblings('div').length) {
                                $(this).addClass('hp-hide-delete');
                            }
                        }
                        if($(this).parent('li').length) {
                            if(!$(this).parent('li').siblings('li').length) {
                                $(this).addClass('hp-hide-delete');
                            }
                        }
                    });
                    $('.hpe-in-menu').hover(function(){
                        $('.hpe-in-submenu').each(function(){
                            if($(this).children('.hp-y').length){
                                if ( $(this).css('float') != 'left') { 
                                    $(this).addClass('hpe-left');
                                }
                                $(this).children('.hp-y').css('width', $(this).outerWidth());
                                $(this).children('.hp-y').css('height', $(this).outerHeight());
                                $(this).children('.hp-y').removeClass('hp-smallh hp-longh hp-smallw');
                                $(this).removeClass('hp-show-lable hp-hide-delete');
                                if($(this).height() < 40) {
                                    $(this).children('.hp-y').addClass('hp-smallh');
                                }
                                else if($(this).height() > 999) {
                                    $(this).children('.hp-y').addClass('hp-longh');
                                }
                                if($(this).width() < 32) {
                                    $(this).children('.hp-y').addClass('hp-smallw');
                                }
                                if($(this).width() > 290 && $(this).height() > 60) {
                                    $(this).addClass('hp-show-lable');
                                }
                                if($(this).width() < 65) {
                                    $(this).addClass('hp-hide-help');
                                }
                                else {
                                    $(this).removeClass('hp-hide-help');
                                }
                                if($(this).width() >= 140) { // Box Header
                                    if($(this).height() <= 55){
                                        $(this).addClass('hp-show-hheader-3');
                                        $(this).removeClass('hp-hide-delete hp-show-hheader-2 hp-show-hheader-1');
                                    }
                                    else if($(this).height() <= 75){
                                        $(this).addClass('hp-show-hheader-2');
                                        $(this).removeClass('hp-hide-delete hp-show-hheader-1 hp-show-hheader-3');
                                    }
                                    else if($(this).height() > 75){
                                        $(this).addClass('hp-show-hheader-1');
                                        $(this).removeClass('hp-hide-delete hp-show-hheader-3 hp-show-hheader-2');
                                    }
                                }
                                else if($(this).height() <= 54){
                                    $(this).addClass('hp-hide-hheader');
                                    $(this).removeClass('hp-show-hheader-3 hp-show-hheader-3 hp-show-hheader-1');
                                }
                                if(!$(this).siblings('.hp-x').length) {
                                    $(this).addClass('hp-hide-delete');
                                }
                                $(this).removeClass('hpe-left');
                            }
                        });
                    });
                }
                if($('.hp-homemenu-child').length) { // If home menu, then change home URL
                    $('.hp-homemenu-child .hp-y .hp-z .hp-span .hp-menulink').attr('href',$('.hp-homemenu-child').attr('data-homeurl'));
                }
                if($('.hpe-in-menu-only').length){ // Editor for specific Menu(Only Name Change)
                    $('.hpe-in-menu-only').each(function(){
                        var mk = $(this).attr('data-menu');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit Menu" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=Menu&lid2=&level=1&pform=Menu&pkeyname=sys_menu_id&pkey=' + mk + '&fkeyname=&fkey=&wpage=&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_in_menu_only\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i></a></div></div>');
                    });
                }
                if($('.hpe-in-submenu').length){ // Editor for specific SubMenu
                    $('.hpe-in-submenu').each(function(){ // SubMenu ORDERING BEGIN
                        if($(this).prev('.hpe-in-submenu').length) {
                           $(this).attr('data-order-prev', $(this).prev('.hpe-in-submenu').attr('data-order'));
                        }
                        else {
                            $(this).attr('data-order-prev','firstsubmenu');
                        }
                        if($(this).attr('data-order-prev') == 'firstsubmenu') { // First Submenu
                            var a = parseFloat($(this).attr('data-order'));
                            var d = a - 0.0001;
                            $(this).attr('data-order-new',d.toFixed(4));
                        }
                        else {
                            var a = parseFloat($(this).attr('data-order'));
                            var b = parseFloat($(this).attr('data-order-prev'));
                            var c = (a+b);
                            var d = c/2;
                            $(this).attr('data-order-new',d.toFixed(4));
                        }
                    }); // SubMenu ORDERING END
                    $('.hpe-in-submenu').each(function(){
                        var mk = $(this).attr('data-menu');
                        var sk = $(this).attr('data-submenu');
                        var dk = $(this).attr('data-link');
                        var smon = $(this).attr('data-order-new');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit Submenu" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=Menu&lid2=&level=1&pform=Sub-Menu&pkeyname=sys_menu_sub_id&pkey=' + sk + '&fkeyname=sys_menu_id&fkey=' + mk + '&wpage=&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_in_submenu_x\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i></a><a title="Add New Submenu" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=Menu&lid2=&level=1&pform=Sub-Menu&pkeyname=sys_menu_sub_id&pkey=&fkeyname=sys_menu_id&fkey=' + mk + '&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=' + smon + '#hpe_in_new_submenu\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i></a><a class="hp-submenudelete" title="Delete Submenu" href="#hp_editor" onclick="return confirm1(\'' + dl1 + ' Submenu' + dl2 + '\', \'/' + pfist + 'lid=Menu&lid2=&level=1&pform=Sub-Menu&pkeyname=sys_menu_sub_id&pkey=' + sk + '&fkeyname=sys_menu_id&fkey=' + mk + '&wpage=&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i></a><a title="Visit Submenu" href="' + dk + '"><i class="fa fa-external-link" aria-hidden="true"></i></a></div></div>');
                        
                    });
                }
                if($('.hpe-in-submenu-only').length){ // Editor for specific SubMenu(Only Name Change)
                    $('.hpe-in-submenu-only').each(function(){
                        var mk = $(this).attr('data-menu');
                        var sk = $(this).attr('data-submenu');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit SubMenu" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=Menu&lid2=&level=1&pform=Sub-Menu&pkeyname=sys_menu_sub_id&pkey=' + sk + '&fkeyname=sys_menu_id&fkey=' + mk + '&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_in_submenu_only\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i></a></div></div>');
                    });
                }
    
    
    
                // AdGroups
                var ag; // Whole AdGroup area
                for (ag = 1; ag <= 100; ag++) {
                    if($('.hpe-ag' + ag).length){
                        $('[class*="hpe-ag' + ag + ' hp-x"] .hp-y').each(function() {
                            $(this).append('<div class="hp-z"><div class="hp-span"><a title="Edit AdGroup ' + ag + '" href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=CustomersAdsGroups&lid2=&level=1&pkeyname=group_id&pkey=' + ag +'&wpage=1&hpath=AdGroup' + ag +'&smid=&u=&c=&lf=&x=#hpe_ag\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a></div></div>');
                        });
                    }
                }
                if($('.hpe-i-ad').length){ // Specific Ad
                    $('.hpe-i-ad').each(function() {
                        var adnum = $(this).attr('data-adnum');
                        var adid = $(this).attr('data-adid');
                        $(this).addClass('hp-ppp');
                        var rw = $('[data-adgroup="' + adnum +'"]').attr('data-ad-width');
                        if(typeof rw !== "undefined" ){
                            var rwt = 'Recommended: ' + rw + 'px';
                        }
                        else {
                            var rwt = '';
                        }
                        var hlp = 'This is Ads help';
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Ad" onclick="OpenBLPopup(\'/' + pfist + 'lid=CustomersAdsGroups&lid2=&level=1&pform=customers_ads&pkeyname=ar_customers_ads_id&pkey=' + adid + '&fkeyname=group_id&fkey=' + adnum + '&wpage=1&hpath=AdGroup' + adnum + '&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Ad" onclick="OpenBLPopup(\'/' + pfist + 'lid=CustomersAdsGroups&lid2=&level=1&pform=customers_ads&pkeyname=ar_customers_ads_id&pkey=&fkeyname=group_id&fkey=' + adnum + '&eflag=Yes&wpage=1&hpath=AdGroup' + adnum + '&smid=&u=&c=&lf=&x=&hpe=Y#hpe_newadx\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Ad" onclick="return confirm1(\'' + dl1 + ' Ad' + dl2 + '\', \'/' + pfist + 'lid=CustomersAdsGroups&lid2=&level=1&pform=customers_ads&pkeyname=ar_customers_ads_id&pkey=' + adid + '&fkeyname=group_id&fkey=' + adnum + '&wpage=1&hpath=AdGroup' + adnum + '&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a><a class="hp-help hp-tt" href="#hp_editor" title="'+ hlp + '"><i class="fa fa-question-circle" aria-hidden="true"></i><b class="hp-llable">Help</b></a></div><header class="hp-hheader">AdGroup - ' + adnum +'</header><cpanel></cpanel><rpanel>' + rwt + '</rpanel></div>');
                    });
                }
    
                setIntervalLimited(function() { // For ad Box issue
                    $('.hpe-i-ad').each(function() {
                        if ($(this).css('float') != 'left') { 
                            $(this).addClass('hpe-left');
                        }
                        $(this).children('.hp-y').css('width', $(this).outerWidth());
                        $(this).children('.hp-y').css('height', $(this).outerHeight());
                        $(this).children('.hp-y').removeClass('hp-smallh hp-longh hp-smallw');
                        $(this).removeClass('hp-show-lable hp-hide-delete');
                        if($(this).height() < 40) {
                            $(this).children('.hp-y').addClass('hp-smallh');
                        }
                        else if($(this).height() > 999) {
                            $(this).children('.hp-y').addClass('hp-longh');
                        }
                        if($(this).width() < 32) {
                            $(this).children('.hp-y').addClass('hp-smallw');
                        }
                        if($(this).width() > 290 && $(this).height() > 60) {
                            $(this).addClass('hp-show-lable');
                        }
                        if($(this).width() < 65) {
                            $(this).addClass('hp-hide-help');
                        }
                        else {
                            $(this).removeClass('hp-hide-help');
                        }
                        if($(this).width() >= 140) { // Box Header
                            if($(this).height() <= 55){
                                $(this).addClass('hp-show-hheader-3');
                                $(this).removeClass('hp-hide-delete hp-show-hheader-2 hp-show-hheader-1');
                            }
                            else if($(this).height() <= 75){
                                $(this).addClass('hp-show-hheader-2');
                                $(this).removeClass('hp-hide-delete hp-show-hheader-1 hp-show-hheader-3');
                            }
                            else if($(this).height() > 75){
                                $(this).addClass('hp-show-hheader-1');
                                $(this).removeClass('hp-hide-delete hp-show-hheader-3 hp-show-hheader-2');
                            }
                        }
                        else if($(this).height() <= 54){
                            $(this).addClass('hp-hide-hheader');
                            $(this).removeClass('hp-show-hheader-3 hp-show-hheader-2 hp-show-hheader-1');
                        }
                        if(!$(this).siblings('.hp-x').length) {
                            $(this).addClass('hp-hide-delete');
                        }
                        $(this).removeClass('hpe-left');
                    });
                }, 500, 5);
    
                setInterval(function(){
                    $('[id*="holddiv"]').each(function(){ // Ad Type = "SameSpotTime"
                        if(!$(this).children('.hp-y').length){
                            if($(this).children('a').length) { // A tag available
                                if($(this).children('a').children('img').length) {
                                    $(this).attr('data-adid-2', $(this).children('a').children('img').attr('data-title'));
                                }
                              }
                              if(!$(this).children('a').length) { // A tag not available
                                if($(this).children('img').length) {
                                    $(this).attr('data-adid-2', $(this).children('img').attr('data-title'));
                                }
                            }
                            if($(this).attr('data-adid-2')) {
                                var id1 = $(this).attr('data-adid');
                                var id2 = $(this).attr('data-adid-2');
                                id2 = id2.split('-').pop().split(')').shift();
                                if(id1 != id2) {
                                  $(this).attr('data-adid', id2);
                                } 
                              }
                              $(this).prepend('<div class="hp-y"></div>');
                            var adnum = $(this).attr('data-adnum');
                            var adid = $(this).attr('data-adid');
                            $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Ad" onclick="OpenBLPopup(\'/' + pfist + 'lid=CustomersAdsGroups&lid2=&level=1&pform=customers_ads&pkeyname=ar_customers_ads_id&pkey=' + adid + '&fkeyname=group_id&fkey=' + adnum + '&wpage=1&hpath=AdGroup' + adnum + '&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Ad" onclick="OpenBLPopup(\'/' + pfist + 'lid=CustomersAdsGroups&lid2=&level=1&pform=customers_ads&pkeyname=ar_customers_ads_id&pkey=&fkeyname=group_id&fkey=' + adnum + '&eflag=Yes&wpage=1&hpath=AdGroup' + adnum + '&smid=&u=&c=&lf=&x=&hpe=Y#hpe_newadx\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Ad" onclick="return confirm1(\'' + dl1 + ' Ad' + dl2 + '\', \'/' + pfist + 'lid=CustomersAdsGroups&lid2=&level=1&pform=customers_ads&pkeyname=ar_customers_ads_id&pkey=' + adid + '&fkeyname=group_id&fkey=' + adnum + '&wpage=1&hpath=AdGroup' + adnum + '&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a></div><header class="hp-hheader">AdGroup - ' + adnum +'</header></div>');
                            $('[class*="hpe-"].hp-x .hp-y .hp-z span a').click(function(){
                                setTimeout(function(){
                                    $('.hp-x-popup iframe.mfp-iframe').load(function(){
                                        $('.mfp-iframe-holder .mfp-close').css('visibility','visible');
                                        $('.mfp-iframe-holder .mfp-close').animate({'opacity': 1}, 300);
                                    });
                                }, 300);
                            });
                        }
                        if ( $(this).css('float') != 'left') { // Box width & Height
                            $(this).addClass('hpe-left');
                        }
                        $(this).children('.hp-y').css('width', $(this).outerWidth());
                        $(this).children('.hp-y').css('height', $(this).outerHeight());
                        $(this).children('.hp-y').removeClass('hp-smallh hp-longh hp-smallw');
                        $(this).removeClass('hp-show-lable hp-hide-delete');
                        if($(this).height() < 40) {
                            $(this).children('.hp-y').addClass('hp-smallh');
                        }
                        else if($(this).height() > 999) {
                            $(this).children('.hp-y').addClass('hp-longh');
                        }
                        if($(this).width() < 32) {
                            $(this).children('.hp-y').addClass('hp-smallw');
                        }
                        if($(this).width() > 290 && $(this).height() > 60) {
                            $(this).addClass('hp-show-lable');
                        }
                        if($(this).width() < 65) {
                            $(this).addClass('hp-hide-help');
                        }
                        else {
                            $(this).removeClass('hp-hide-help');
                        }
                        if($(this).width() >= 140) { // Box Header
                            if($(this).height() <= 55){
                                $(this).addClass('hp-show-hheader-3');
                                $(this).removeClass('hp-hide-delete hp-show-hheader-2 hp-show-hheader-1');
                            }
                            else if($(this).height() <= 75){
                                $(this).addClass('hp-show-hheader-2');
                                $(this).removeClass('hp-hide-delete hp-show-hheader-1 hp-show-hheader-3');
                            }
                            else if($(this).height() > 75){
                                $(this).addClass('hp-show-hheader-1');
                                $(this).removeClass('hp-hide-delete hp-show-hheader-3 hp-show-hheader-2');
                            }
                        }
                        else if($(this).height() <= 54){
                            $(this).addClass('hp-hide-hheader');
                            $(this).removeClass('hp-show-hheader-3 hp-show-hheader-3 hp-show-hheader-1');
                        }
                        if(!$(this).siblings('.hp-x').length) {
                            $(this).addClass('hp-hide-delete');
                        }
                        $(this).removeClass('hpe-left');
                    });   
                    $('div[id*="divDiffSpotTime"] .hpe-i-ad').addClass('divDiffSpotTime'); // Ad Type = "DiffSpotTime"
                    $('.divDiffSpotTime').each(function(){
                        if($(this).attr('class').indexOf('hp-x') == -1) {
                            $(this).addClass('hp-x');
                            $(this).prepend('<div class="hp-y"></div>');
                            var adnum = $(this).attr('data-adnum');
                            var adid = $(this).attr('data-adid');
                            $(this).addClass('hp-ppp');
                            $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Ad" onclick="OpenBLPopup(\'/' + pfist + 'lid=CustomersAdsGroups&lid2=&level=1&pform=customers_ads&pkeyname=ar_customers_ads_id&pkey=' + adid + '&fkeyname=group_id&fkey=' + adnum + '&wpage=1&hpath=AdGroup' + adnum + '&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Ad" onclick="OpenBLPopup(\'/' + pfist + 'lid=CustomersAdsGroups&lid2=&level=1&pform=customers_ads&pkeyname=ar_customers_ads_id&pkey=&fkeyname=group_id&fkey=' + adnum + '&eflag=Yes&wpage=1&hpath=AdGroup' + adnum + '&smid=&u=&c=&lf=&x=&hpe=Y#hpe_newadx\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Ad" onclick="return confirm1(\'' + dl1 + ' Ad' + dl2 + '\', \'/' + pfist + 'lid=CustomersAdsGroups&lid2=&level=1&pform=customers_ads&pkeyname=ar_customers_ads_id&pkey=' + adid + '&fkeyname=group_id&fkey=' + adnum + '&wpage=1&hpath=AdGroup' + adnum + '&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a></div><header class="hp-hheader">AdGroup - ' + adnum +'</header></div>');
                            if(!$(this).siblings('.hp-x').length) { 
                                $(this).parent('tr').addClass('had-tr');
                            }
                            if ( $(this).css('float') != 'left') { // Box width & Height
                                $(this).addClass('hpe-left');
                            }
                            $(this).children('.hp-y').css('width', $(this).outerWidth());
                            $(this).children('.hp-y').css('height', $(this).outerHeight());
                            $(this).children('.hp-y').removeClass('hp-smallh hp-longh hp-smallw');
                            $(this).removeClass('hp-show-lable hp-hide-delete');
                            if($(this).height() < 40) {
                                $(this).children('.hp-y').addClass('hp-smallh');
                            }
                            else if($(this).height() > 999) {
                                $(this).children('.hp-y').addClass('hp-longh');
                            }
                            if($(this).width() < 32) {
                                $(this).children('.hp-y').addClass('hp-smallw');
                            }
                            if($(this).width() > 290 && $(this).height() > 60) {
                                $(this).addClass('hp-show-lable');
                            }
                            if($(this).width() < 65) {
                                $(this).addClass('hp-hide-help');
                            }
                            else {
                                $(this).removeClass('hp-hide-help');
                            }
                            if($(this).width() >= 140) { // Box Header
                                if($(this).height() <= 55){
                                    $(this).addClass('hp-show-hheader-3');
                                    $(this).removeClass('hp-hide-delete hp-show-hheader-2 hp-show-hheader-1');
                                }
                                else if($(this).height() <= 75){
                                    $(this).addClass('hp-show-hheader-2');
                                    $(this).removeClass('hp-hide-delete hp-show-hheader-1 hp-show-hheader-3');
                                }
                                else if($(this).height() > 75){
                                    $(this).addClass('hp-show-hheader-1');
                                    $(this).removeClass('hp-hide-delete hp-show-hheader-3 hp-show-hheader-2');
                                }
                            }
                            else if($(this).height() <= 54){
                                $(this).addClass('hp-hide-hheader');
                                $(this).removeClass('hp-show-hheader-3 hp-show-hheader-2 hp-show-hheader-1');
                            }
                            if(!$(this).siblings('.hp-x').length) {
                                $(this).addClass('hp-hide-delete');
                            }
                            $(this).removeClass('hpe-left');
                        }
                    });
                    $('.had-tr').each(function(){
                        if($(this).siblings('.had-tr').length) {
                            $(this).children('.hpe-i-ad').addClass('hp-show-delete');
                        }
                    });
                    if (typeof SMThemeColor == 'function') { 
                        if(SMThemeColor() == 'Yellow') {$('.hp-x, #blbodymain').attr('data-theme','Yellow');}
                        if(SMThemeColor() == 'Blue') {$('.hp-x, #blbodymain').attr('data-theme','Blue');}
                        if(SMThemeColor() == 'Brown') {$('.hp-x, #blbodymain').attr('data-theme','Brown');}
                        if(SMThemeColor() == 'Purple') {$('.hp-x, #blbodymain').attr('data-theme','Purple');}
                        if(SMThemeColor() == 'Orange') {$('.hp-x, #blbodymain').attr('data-theme','Orange');}
                        if(SMThemeColor() == 'Olive') {$('.hp-x, #blbodymain').attr('data-theme','Olive');}
                        if(SMThemeColor() == 'Magenta') {$('.hp-x, #blbodymain').attr('data-theme','Magenta');}
                        if(SMThemeColor() == 'Green') {$('.hp-x, #blbodymain').attr('data-theme','Green');}
                        if(SMThemeColor() == 'Red') {$('.hp-x, #blbodymain').attr('data-theme','Red');}
                        if(SMThemeColor() == 'Black') {$('.hp-x, #blbodymain').attr('data-theme','Black');}
                    }	
                },200);
    
    
    
            // Poll
                var px;
                for (px = 1; px <= 100; px++) {
                    if($('.hpe-poll' + px).length){
                        var hlp = 'To delete this last poll and wish to add a new poll, add a new poll then delete sample poll. If you wish to remove the poll completely, please create a support ticket. ';
                        $('.polls1body[class*="hpe-poll' + px + ' hp-x"]').addClass('hp-ppp');
                        $('.polls1body[class*="hpe-poll' + px + ' hp-x"] .hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit Poll" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=Polls&lid2=&level=1&pform=polls&pkeyname=sys_poll_id&pkey=' + px + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_update_pollxy\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a title="Add New Poll" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=Polls&lid2=&level=1&pform=polls&pkeyname=sys_poll_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_new_polls\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a title="Delete Poll" href="#hp_editor" onclick="return confirm1(\'' + dl1 + ' Poll' + dl2 + '\', \'/' + pfist + 'lid=Polls&lid2=&level=1&pform=polls&pkeyname=sys_poll_id&pkey=' + px + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_delete_polls\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a><a class="hp-help hp-tt hp-poll-help" href="#hp_editor" title="' + hlp + '"><i class="fa fa-question-circle" aria-hidden="true"></i><b class="hp-llable">Help</b></a></div><header class="hp-hheader">Poll</header></div>');
                    }
                }	
    
    
    
            // Highlights
                var h;
                for (h = 1; h <= 20; h++) {
                    if($('.hpe-hl' + h).length){ // Whole Highlight area
                        $('[class*="hpe-hl' + h + ' hp-x"] .hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit Highlight ' + h + '"href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=Pages&x=#hpe_hl$'+ h +'\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a></div></div>');
                    }
                    if($('.hpe-in-hl' + h).length){ // Specific Article
                        $('.hpe-in-hl' + h).each(function(){
                            var haid = $(this).attr('data-article');
                            var isdate = $(this).attr('data-date');
                            var durl = $(this).attr('data-url');
                            $(this).addClass('hp-ppp');
                            $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Article" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&fpx=hlx' + h + '&x=&hpe=Y#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Article" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&isdate=' + isdate + '#hpe_hlx'+ h +'\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Article" onclick="return confirm1(\'' + dl1 + ' Article' + dl2 + '\', \'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_hldx' + h + '\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a><a title="Visit Article" href="' + durl + '"><i class="fa fa-external-link" aria-hidden="true"></i><b class="hp-llable">Visit</b></a></div><header class="hp-hheader">Highlight - ' + h +'</header></div>');
                            
                        });
                    }
                }
    
    
    
            // Previews
                if($('.hpe-prev').length){ // Whole Preview area
                    $('.hpe-prev.hp-x').each(function(){
                        var m = $(this).attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                        var s = $(this).attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit ' + s.replace(/@@/g,"'").replace(/_/g," ") + '" href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=Pages&x=#hpe_prev$$' + m + '&&' + s + '\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a></div></div>');
                    });
                }
                if($('.hpe-in-prev').length){ // Specific Article
                    $('.hpe-in-prev').each(function(){
                        var m = $(this).attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                        var s = $(this).attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                        var haid = $(this).attr('data-article');
                        var isdate = $(this).attr('data-date');
                        var durl = $(this).attr('data-url');
                        $(this).addClass('hp-ppp');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Article" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=preview#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Article" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&isdate=' + isdate + '#hpe_prevxy$$' + m + '&&' + s + '\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Article" onclick="return confirm1(\'' + dl1 + ' Article' + dl2 + '\', \'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a><a title="Visit Article" href="' + durl + '"><i class="fa fa-external-link" aria-hidden="true"></i><b class="hp-llable">Visit</b></a></div><header class="hp-hheader">Preview - ' + $(this).attr("data-submenu") +'</header></div>');	
                    });
                }
    
    
    
            // Previews (Highlight Excluded)
                if($('.hpe-xprev').length){ // Whole Preview Area
                    $('.hpe-xprev.hp-x').each(function(){
                        var m = $(this).attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                        var s = $(this).attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit ' + s.replace(/@@/g,"'").replace(/_/g," ") + '" href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=Pages&x=#hpe_xprev$$' + m + '&&' + s + '\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a></div></div>');
                    });
                }
                if($('.hpe-in-xprev').length){ // Specific Article
                    $('.hpe-in-xprev').each(function(){
                        var m = $(this).attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                        var s = $(this).attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                        var haid = $(this).attr('data-article');
                        var isdate = $(this).attr('data-date');
                        var durl = $(this).attr('data-url');
                        $(this).addClass('hp-ppp');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Article" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=preview#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Article" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&isdate=' + isdate + '#hpe_xprevxy$$' + m + '&&' + s + '\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Article" onclick="return confirm1(\'' + dl1 + ' Article' + dl2 + '\', \'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a><a title="Visit Article" href="' + durl + '"><i class="fa fa-external-link" aria-hidden="true"></i><b class="hp-llable">Visit</b></a></div><header class="hp-hheader">Preview - ' + $(this).attr("data-submenu") +'</header></div>');
                    });
                }
    
    
    
            // Sections
                if($('.hpe-section').length){
                    $('.hpe-section.hp-x').each(function(){
                        var m = $(this).attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                        var s = $(this).attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=Pages&x=#hpe_prev$$' + m + '&&' + s + '\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i> Edit ' + s.replace(/@@/g,"'").replace(/_/g," ") +' </a></div></div>');
                    });
                }
                if($('.hpe-in-section').length){ // Specific Article
                    $('.hpe-in-section').each(function(){
                        var m = $(this).attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                        var s = $(this).attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                        var haid = $(this).attr('data-article');
                        var isdate = $(this).attr('data-date');
                        var durl = $(this).attr('data-url');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Article" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=preview#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Article" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&isdate=' + isdate + '#hpe_prevxy$$' + m + '&&' + s + '\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Article" onclick="return confirm1(\'' + dl1 + ' Article' + dl2 + '\', \'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a><a title="Visit Article" href="' + durl + '"><i class="fa fa-external-link" aria-hidden="true"></i><b class="hp-llable">Visit</b></a></div></div>');
                    });
                    
                }
    
    
            // E-Editon or Archive #EEE
                if($('.hpe-in-edition').length){ // Specific Article
                    $('.hpe-in-edition').each(function(){
                        var m = $(this).attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                        var s = $(this).attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                        var haid = $(this).attr('data-article');
                        var isdate = $(this).attr('data-date');
                        //var durl = $(this).attr('data-url');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Edition" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=edition#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Edition" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=edition&isdate=' + isdate + '#hpe_prevxy$$' + m + '&&' + s + '\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Edition" onclick="return confirm1(\'' + dl1 + ' Edition' + dl2 + '\', \'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a></div></div>');
                    });
                }
    
            // Single Article on Homepage
                if($('.hpe-article-only').length){
                    $('.hpe-article-only').each(function(){
                        var daid = $(this).attr('data-article');
                        var durl = $(this).attr('data-url');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Article" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + daid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=art_detail#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a title="Visit Article" href="' + durl + '"><i class="fa fa-external-link" aria-hidden="true"></i><b class="hp-llable">Visit</b></a></div></div>');
                    });
                }
    
    
    
            // Details page Article
                if($('.hpe-article-detail').length){
                    $('.hpe-article-detail').each(function(){
                        var daid = $(this).attr('data-detailid');
                        var sbid = $(this).attr('data-submenu');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Article" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + daid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=art_detail#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" class="detail_delete" title="Delete Article" onclick="return confirm1(\'' + dl1 + ' Article' + dl2 + '\', \'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + daid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&fpx=detail_sm_'+ sbid + '&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a></div></div>');
                    });
                }
    
    
            // Details page Event
                if($('.hpe-event-detail').length){
                    $('.hpe-event-detail').each(function(){
                        var daid = $(this).attr('data-detailid');
                        var sbid = $(this).attr('data-submenu');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Event" onclick="OpenBLPopup(\'/' + pfist + 'lid=Events2&lid2=&level=1&pform=events2&pkeyname=sys_information_id&pkey=' + daid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=event_detail#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" class="detail_delete" title="Delete Article" onclick="return confirm1(\'' + dl1 + ' Event' + dl2 + '\', \'/' + pfist + 'lid=Events2&lid2=&level=1&pform=events2&pkeyname=sys_information_id&pkey=' + daid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&fpx=detail_sm_'+ sbid + '&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a></div></div>');
                    });
                }
    
    
    
            // Events (New)
                if($('.hpe-in-event').length){
                    $('.hpe-in-event.hp-x').each(function(){
                        var m = $(this).attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                        var s = $(this).attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                        var haid = $(this).attr('data-article');
                        var isdate = $(this).attr('data-date');
                        var eurl = $(this).attr('data-url');
                        $(this).addClass('hp-ppp');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Event" onclick="OpenBLPopup(\'/' + pfist + 'lid=Events2&lid2=&level=1&pform=events2&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&fpx=event&x=&hpe=Y#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Event" onclick="OpenBLPopup(\'/' + pfist + 'lid=Events2&lid2=&level=1&pform=events2&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&isdate=' + isdate + '#hpe_eventxy$$' + m + '&&' + s + '\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Event" onclick="return confirm1(\'' + dl1 + ' Event' + dl2 + '\', \'/' + pfist + 'lid=Events2&lid2=&level=1&pform=events2&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a><a title="Visit Event" href="' + eurl + '?hp_editor_eventx_detail"><i class="fa fa-external-link" aria-hidden="true"></i><b class="hp-llable">Visit</b></a></div><header class="hp-hheader">Event - ' + $(this).attr("data-submenu") +'</header></div>');
                    });
                }
    
    
    
            // Events (Old)
                if($('.hpe-old-event').length){
                    $('.hpe-old-event.hp-x').each(function(){
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=Events&x=#hpe_old_event\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i> Edit Events </a></div></div>');
                    });
                }
    
    
            // Directory (Old)
                if($('.hpe-old-directory').length){
                    $('.hpe-old-directory.hp-x').each(function(){
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=CustomersSetup&x=#hpe_old_directory\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i> Edit Directory </a></div></div>');
                    });
                }
    
    
            // Classified (Old)
                if($('.hpe-old-classified').length){
                    $('.hpe-old-classified.hp-x').each(function(){
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=Classifieds&x=#hpe_old_classified\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i> Edit Classified </a></div></div>');
                    });
                }
    
    
            // Videos - Gallery - YT(URL)
                if($('.hpe-video-g-yt-url').length){
                    var vm = $('.hpe-video-g-yt-url.hp-x').attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                    var vs = $('.hpe-video-g-yt-url.hp-x').attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                    $('.hpe-video-g-yt-url.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=Galleries&x=#hpe_video_g_yt_url$$' + vm + '&&' + vs + '\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i> Edit Videos </a></div></div>');
                }
                if($('.hpe-in-video-g-yt-url').length){ // Specific Video
                    $('.hpe-in-video-g-yt-url').each(function(){
                        var vm = $(this).attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                        var vs = $(this).attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                        var hvid = $(this).attr('data-article');
                        var isdate = $(this).attr('data-date');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Video" onclick="OpenBLPopup(\'/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=' + hvid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=hpe_video_g_yt_url#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Video" onclick="OpenBLPopup(\'/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&isdate=' + isdate + '#hpe_video_g_yt_urlxy' + vm + '&&' + vs + '\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Video" onclick="return confirm1(\'' + dl1 + ' Video' + dl2 + '\', \'/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=' + hvid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a></div><header class="hp-hheader">VideoGallery - ' + $(this).attr("data-submenu") +'</header></div>');
                    });
                }
    
    
    
            // Videos - Gallery - YT(Code)
                if($('.hpe-video-g-yt-code').length){
                    var vm = $('.hpe-video-g-yt-code.hp-x').attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                    var vs = $('.hpe-video-g-yt-code.hp-x').attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                    $('.hpe-video-g-yt-code.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=Galleries&x=#hpe_video_g_yt_code$$' + vm + '&&' + vs + '\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i> Edit Videos </a></div></div>');
                }
                if($('.hpe-in-video-g-yt-code').length){ // Specific Video
                    $('.hpe-in-video-g-yt-code').each(function(){
                        var vm = $(this).attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                        var vs = $(this).attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                        var hvid = $(this).attr('data-article');
                        var isdate = $(this).attr('data-date');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Video" onclick="OpenBLPopup(\'/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=' + hvid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=hpe_video_g_yt_code#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Video" onclick="OpenBLPopup(\'/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&isdate=' + isdate + '#hpe_video_g_yt_codexy' + vm + '&&' + vs + '\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Video" onclick="return confirm1(\'' + dl1 + ' Video' + dl2 + '\', \'/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=' + hvid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a></div><header class="hp-hheader">VideoGallery - ' + $(this).attr("data-submenu") +'</header></div>');
                    });
                }
    
    
    
            // Videos - Gallery - YT(ID)
                if($('.hpe-video-g-yt-id').length){ // Whole Video Area
                    var vm = $('.hpe-video-g-yt-id.hp-x').attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                    var vs = $('.hpe-video-g-yt-id.hp-x').attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                    $('.hpe-video-g-yt-id.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=Galleries&x=#hpe_video_g_yt_id$$' + vm + '&&' + vs + '\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i> Edit Videos </a></div></div>');
                }
                if($('.hpe-in-video-g-yt-id').length){ // Specific Video
                    $('.hpe-in-video-g-yt-id').each(function(){
                        var vm = $(this).attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                        var vs = $(this).attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                        var hvid = $(this).attr('data-article');
                        var isdate = $(this).attr('data-date');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Video" onclick="OpenBLPopup(\'/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=' + hvid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=hpe_video_g_yt_id#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Video" onclick="OpenBLPopup(\'/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&isdate=' + isdate + '#hpe_video_g_yt_idxy' + vm + '&&' + vs + '\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Video" onclick="return confirm1(\'' + dl1 + ' Video' + dl2 + '\', \'/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=' + hvid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a></div><header class="hp-hheader">VideoGallery - ' + $(this).attr("data-submenu") +'</header></div>');
                    });
                }
            
            // Photo - Gallery
                if($('.hpe-photo-g').length){ // Whole Photo Area
                    var pm = $('.hpe-photo-g.hp-x').attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                    var ps = $('.hpe-photo-g.hp-x').attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                    $('.hpe-photo-g.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=Galleries&x=#hpe_photo_g$$' + pm + '&&' + ps + '\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i> Edit Photos </a></div></div>');
                }
                if($('.hpe-in-photo-g').length){ // Specific Photo
                    $('.hpe-in-photo-g').each(function(){
                        var pm = $(this).attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                        var ps = $(this).attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                        var hpid = $(this).attr('data-article');
                        var isdate = $(this).attr('data-date');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Photo" onclick="OpenBLPopup(\'/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=' + hpid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Photo" onclick="OpenBLPopup(\'/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&isdate=' + isdate + '#hpe_photo_gxy' + pm + '&&' + ps + '\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Photo" onclick="return confirm1(\'' + dl1 + ' Photo' + dl2 + '\', \'/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=' + hpid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a></div><header class="hp-hheader">PhotoGallery - ' + $(this).attr("data-submenu") +'</header></div>');	
                    });
                }
    
    
            // Old PhotoGallery
                if($('.hpe-old-photog').length){
                    $('.hpe-old-photog.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + plist + 'lid=PhotoGallery&x=#hpe_old_photogx\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i> Edit Photos </a></div></div>');
                }
    
    
            // ArticleGroup
                if($('.hpe-in-artgroup').length){
                    $('.hpe-in-artgroup').each(function(){
                        var m = $(this).attr('data-menu').replace(/'/g,"@@").replace(/ /g,"_");
                        var s = $(this).attr('data-submenu').replace(/'/g,"@@").replace(/ /g,"_");
                        var haid = $(this).attr('data-article');
                        var isdate = $(this).attr('data-date');
                        var durl = $(this).attr('data-url');
                        $(this).addClass('hp-ppp');
                        $(this).children('.hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" title="Edit Article" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&fpx=preview#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a href="#hp_editor" title="Add New Article" onclick="OpenBLPopup(\'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y&isdate=' + isdate + '#hpe_prevxy$$' + m + '&&' + s + '\',\'iframe\');"><i class="fa fa-plus" aria-hidden="true"></i><b class="hp-llable">New</b></a><a href="#hp_editor" title="Delete Article" onclick="return confirm1(\'' + dl1 + ' Article' + dl2 + '\', \'/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haid + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&hpe=Y#hpe_deletex\');"><i class="fa fa-trash" aria-hidden="true"></i><b class="hp-llable">Delete</b></a><a title="Visit Article" href="' + durl + '"><i class="fa fa-external-link" aria-hidden="true"></i><b class="hp-llable">Visit</b></a></div><header class="hp-hheader">ArticleGroup - ' + $(this).attr("data-submenu") +'</header></div>');	
                    });
                }
                
            // Contact Information
                if($('.hpe-contactbody').length){
                    $('.hpe-contactbody.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'pform=options_systems&pkeyname=sys_option_system_id&pkey=1&x=#hpe_contactbody\',\'iframe\');" title="Edit Contact Information"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a></div><header class="hp-hheader">Contact Information</header></div>');
                }
            // Copyright
                if($('.hpe-copyright').length){
                    $('.hpe-copyright.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'pform=options_systems&pkeyname=sys_option_system_id&pkey=1&x=#hpe_copyright\',\'iframe\');" title="Edit Copyright"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a></div><header class="hp-hheader">Copyright</header></div>');
                }
            // Hitcounter
                if($('.hpe-hitcounter').length){
                    $('.hpe-hitcounter.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'pform=options_systems&pkeyname=sys_option_system_id&pkey=1&x=#hpe_hitcounter\',\'iframe\');" title="Edit Hit Counter"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a></div><header class="hp-hheader">Hit Counter</header></div>');
                }
            // Social
                if($('.hpe-social').length){
                    $('.hpe-social').addClass('hp-ppp');
                    var hlp = "Click on <b>'EDIT'</b> icon and provide us social media links.<br>We will update it within few minutes."
                    $('.hpe-social.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_social\',\'iframe\');" title="Edit Social Media Links"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a class="hp-help hp-tt" href="#hp_editor" title="'+ hlp + '"><i class="fa fa-question-circle" aria-hidden="true"></i><b class="hp-llable">Help</b></a></div><header class="hp-hheader">Social Links</header></div>');
                }
            // Bottom Links
                if($('.hpe-bottom-links').length){
                    $('.hpe-bottom-links').addClass('hp-ppp');
                    var hlp = "This is bottom links area.<br>You can write us to add/update/delete links.";
                    $('.hpe-bottom-links.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_bottom_links\',\'iframe\');" title="Edit Links"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a class="hp-help hp-tt" href="#hp_editor" title="' + hlp + '"><i class="fa fa-question-circle" aria-hidden="true"></i><b class="hp-llable">Help</b></a></div><header class="hp-hheader">Bottom Links</header></div>');
                }
            // Top Links
                if($('.hpe-top-links').length){
                    $('.hpe-top-links').addClass('hp-ppp');
                    var hlp = "This is top links area.<br>You can write us to add/update/delete links.";
                    $('.hpe-top-links.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_top_links\',\'iframe\');" title="Edit Links"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a class="hp-help hp-tt" href="#hp_editor" title="' + hlp + '"><i class="fa fa-question-circle" aria-hidden="true"></i><b class="hp-llable">Help</b></a></div><header class="hp-hheader">Top Links</header></div>');
                }
            // Google Custom Search
                if($('.hpe-gsearch').length){
                    $('.hpe-gsearch').addClass('hp-ppp');
                    var hlp = "This is Google Search Bar. Please write us if it will not show result from your site.";
                    $('.hpe-gsearch.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_gsearch\',\'iframe\');" title="Any issues with Search?"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a class="hp-help hp-tt" href="#hp_editor" title="' + hlp + '"><i class="fa fa-question-circle" aria-hidden="true"></i><b class="hp-llable">Help</b></a></div><header class="hp-hheader">Search Bar</header></div>');
                }
            // Forms
                if($('.hpe-formbody').length){
                    var fn = $.urlParam('pform');
                    createCookie('hpe_formname', fn);
                    $('.hpe-formbody.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_formbodys\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i> Edit ' + fn + '</a></div></div>');
                }
            // Service Package - EFD5B949B0C59BECF23E6823AF110A85
                if($('.hpe-sp').length){
                    //var spmn = $('.hpe-sp').children('#IFrameContent').attr('src').split('$$').pop();
                    //var spx = spmn.replace(/@@/g,"'").replace(/_/g," ");
                    //createCookie('hpe_spname', spx);
                    $('.hpe-sp.hp-x .hp-y').append('<div class="hp-z"><div class="hp-span"><a href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_spackages\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a></div></div>');
                }
            
            // Custom Sections
                var ch;
                for (ch = 1; ch <= 1000; ch++) {
                    if($('.hpe-custom-text-' + ch).length){ // TEXT
                        $('[class*="hpe-custom-text-' + ch + ' hp-x"] .hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=Sections&lid2=&level=1&pform=sections&pkeyname=section_id&pkey=' + ch + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&fpx=cust_text#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a></div></div>');
                    }
                    if($('.hpe-custom-html-' + ch).length){ // HTML
                        $('[class*="hpe-custom-html-' + ch + ' hp-x"] .hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=Sections&lid2=&level=1&pform=sections&pkeyname=section_id&pkey=' + ch + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&fpx=cust_html#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a></div></div>');
                    }
                    if($('.hpe-custom-img-' + ch).length){ // IMAGE
                        $('[class*="hpe-custom-img-' + ch + ' hp-x"] .hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=Sections&lid2=&level=1&pform=sections&pkeyname=section_id&pkey=' + ch + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&fpx=cust_img#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a></div></div>');
                    }
                    if($('.hpe-weather-' + ch).length){ // Weather Widget
                        var hlp = 'This is weather help.';
                        $('[class*="hpe-weather-' + ch + ' hp-x"] .hp-y').append('<div class="hp-z"><div class="hp-span"><a title="Edit" href="#hp_editor" onclick="OpenBLPopup(\'/' + pfist + 'lid=Sections&lid2=&level=1&pform=sections&pkeyname=section_id&pkey=' + ch + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=&fpx=weather#hpe_updatex\',\'iframe\');"><i class="fa fa-pencil" aria-hidden="true"></i><b class="hp-llable">Edit</b></a><a class="hp-help hp-tt" href="#hp_editor" title="'+ hlp + '"><i class="fa fa-question-circle" aria-hidden="true"></i><b class="hp-llable">Help</b></a></div><header class="hp-hheader">Weather</header></div>');
                    }
                }
    
        // Box width and Height (2nd time)
                $('.hp-x').each(function(){
                    //$(this).addClass('hp-ppp'); // Add Class for box hover effect
                    $(this).mouseover(function() {
                        $(this).stop(true, true).removeClass('hp-ppp');
                    }).mouseout(function() {
                        $(this).stop(true, true).addClass('hp-ppp');
                    });
                    if ( $(this).css('float') != 'left') {
                        $(this).addClass('hpe-left');
                    }
                    $(this).children('.hp-y').css('width', $(this).outerWidth());
                    $(this).children('.hp-y').css('height', $(this).outerHeight());
                    $(this).children('.hp-y').removeClass('hp-smallh hp-longh hp-smallw');
                    $(this).removeClass('hp-show-lable hp-hide-delete');
                    if($(this).height() < 40) {
                        $(this).children('.hp-y').addClass('hp-smallh');
                    }
                    else if($(this).height() > 999) {
                        $(this).children('.hp-y').addClass('hp-longh');
                    }
                    if($(this).width() < 32) {
                        $(this).children('.hp-y').addClass('hp-smallw');
                    }
                    if($(this).width() > 290 && $(this).height() > 60) {
                        $(this).addClass('hp-show-lable');
                    }
                    if($(this).width() < 65) {
                        $(this).addClass('hp-hide-help');
                    }
                    else {
                        $(this).removeClass('hp-hide-help');
                    }
                    if($(this).width() >= 140) { // Box Header
                        if($(this).height() <= 55){
                            $(this).addClass('hp-show-hheader-3');
                            $(this).removeClass('hp-hide-delete hp-show-hheader-2 hp-show-hheader-1');
                        }
                        else if($(this).height() <= 75){
                            $(this).addClass('hp-show-hheader-2');
                            $(this).removeClass('hp-hide-delete hp-show-hheader-1 hp-show-hheader-3');
                        }
                        else if($(this).height() > 75){
                            $(this).addClass('hp-show-hheader-1');
                            $(this).removeClass('hp-hide-delete hp-show-hheader-3 hp-show-hheader-2');
                        }
                    }
                    else if($(this).height() <= 54){
                        $(this).addClass('hp-hide-hheader');
                        $(this).removeClass('hp-show-hheader-3 hp-show-hheader-2 hp-show-hheader-1');
                    }
                    if(!$(this).siblings('.hp-x').length) {
                        $(this).addClass('hp-hide-delete');
                    }
                    if($(this).parent('.had-tr').length) {
                        $(this).addClass('hp-hide-delete');
                    }
                    if($(this).parent('.hp-parent-div3').parent('.hp-parent-div2').parent('.hp-parent-div1').siblings('.hp-parent-div1').length) {
                        $(this).removeClass('hp-hide-delete');
                    }
                    if($(this).parent('.hp-parent-div2').parent('.hp-parent-div1').siblings('.hp-parent-div1').length) {
                        $(this).removeClass('hp-hide-delete');
                    }
                    if($(this).parent('.hp-parent-div1').siblings('.hp-parent-div1').length) {
                        $(this).removeClass('hp-hide-delete');
                    }
                    $('.hpe-in-menu').removeClass('hp-hide-delete');
                    $(this).removeClass('hpe-left');
                });
    
            // Reload while closing popup window
                var s = setInterval(function () {
                    if(readCookie('hpe_hide_iframe') == 'Yes') {
                        eraseCookie('hpe_hide_iframe');
                        $('.mfp-iframe.hpe-iframe').addClass('hpe-iframe-close');
                        $('.hpe-loader.hpe-loader-start').addClass('hpe-loader-restart');
                    }
                    if(readCookie('hpe_poll_close') == 'Yes') {
                        $('.hpe-loader.hpe-loader-start').removeClass('hpe-loader-restart'); 
                        $('.hp-x-popup').addClass('hp-sslide2');
                        $('.hpe-iframe').animate({opacity: 0}, 400);
                        setTimeout(function(){
                            $('.hp-x-popup .mfp-close').click();
                        }, 500);
                    }
                    if(readCookie('hpe_cancel') == 'Yes') {
                        $('.hp-x-popup').addClass('hp-sslide2');
                        $('.hpe-iframe').animate({opacity: 0}, 400);
                        setTimeout(function(){
                            $('.hp-x-popup .mfp-close').click();
                        }, 500);
                    }
                    $('.hp-x-popup .mfp-close').click(function(){
                        eraseCookie('hpe_old_event');
                        eraseCookie('hpe_old_photogx');
                        eraseCookie('hpe_old_directory');
                        eraseCookie('hpe_old_classified');
                        if(readCookie('hpe_submit') == 'Yes') {
                            eraseCookie('hpe_submit');
                            var hr;
                            for (hr = 1; hr <= 20; hr++) {
                                if(readCookie('hpe_hlx' + hr) == 'Yes') {
                                    eraseCookie('hpe_hlx' + hr);
                                }
                            }
                            eraseCookie('hpe_menu');
                            eraseCookie('hpe_hide_iframe');
                            eraseCookie('hpe_cancel');
                            eraseCookie('hpe_prevx');
                            eraseCookie('hpe_xprevx');
                            eraseCookie('hpe_ms_prev');
                            eraseCookie('hpe_ms_xprev');
                            eraseCookie('hpe_delete_hl');
                            eraseCookie('hpe_updatex');
                            eraseCookie('hpe_update_setting');
                            eraseCookie('hpe_newx');
                            eraseCookie('hpe_newh');
                            eraseCookie('hpe_deletex');
                            eraseCookie('hpe_video_g_yt_urlx');
                            eraseCookie('hpe_ms_video');
                            eraseCookie('hpe_ms_photo');
                            eraseCookie('hpe_video_g_yt_codex');
                            eraseCookie('hpe_video_g_yt_idx');
                            eraseCookie('hpe_photo_gx');
                            eraseCookie('hpe_formname');
                            eraseCookie('hpe_spname');
                            eraseCookie('hpe_old_photogx');
                            eraseCookie('hpe_update_pollx');
                            eraseCookie('hpe_new_pollx');
                            eraseCookie('hpe_delete_pollx');
                            eraseCookie('hpe_ticket');
                            eraseCookie('hpe_xartgroupx');
                            eraseCookie('hpe_artgroupx');
                            eraseCookie('hpe_art_detailx');
                            eraseCookie('hpe_eventx');
                            eraseCookie('hpe_event_detailx');
                            eraseCookie('hpe_ms_event');
                            eraseCookie('hpe_old_event');
                            eraseCookie('hpe_old_directory');
                            eraseCookie('hpe_old_classified');
                            eraseCookie('hpe_in_menux');
                            if(readCookie('hpe_poll_close') == 'Yes') {
                                //var tr = readCookie('hpe_target_url');
                                clearTimeout(s);
                                eraseCookie('hpe_poll_close');
                                eraseCookie('hpe_art_detail_url');
                                eraseCookie('hpe_event_detail_url');
                                eraseCookie('hpe_rurl');
                                window.location.reload();
                                //window.location.href = tr;
                            }
                            if(readCookie('hpe_art_detail_url') && readCookie('hpe_rurl')){
                                clearTimeout(s);
                                var aurl = readCookie('hpe_art_detail_url');
                                eraseCookie('hpe_art_detail_url');
                                eraseCookie('hpe_rurl');
                                window.location.href = aurl + '&hpe_view=hp_editor';
                            }
                            if(readCookie('hpe_event_detail_url') && readCookie('hpe_rurl')){
                                clearTimeout(s);
                                var aurl = readCookie('hpe_event_detail_url');
                                eraseCookie('hpe_event_detail_url');
                                eraseCookie('hpe_rurl');
                                window.location.href = aurl + '&hpe_view=hp_editor_eventx_detail';
                            }
                            if(readCookie('hpe_detail_delete') && readCookie('hpe_rurl')){
                                clearTimeout(s);
                                var iurl = readCookie('hpe_detail_delete');
                                eraseCookie('hpe_detail_delete');
                                eraseCookie('hpe_rurl');
                                window.location.href = iurl;
                            }
                            if(!readCookie('hpe_rurl')) {
                                    eraseCookie('hpe_art_detail_url');
                                    eraseCookie('hpe_event_detail_url');
                                    eraseCookie('hpe_detail_delete');
                            }			
                        }
                    });
                }, 10);
                $('[class*="hpe-"].hp-x .hp-y .hp-z span a').click(function(){
                    setTimeout(function(){
                        $('.hp-x-popup iframe.mfp-iframe').load(function(){
                            $('.mfp-iframe-holder .mfp-close').css('visibility','visible');
                            $('.mfp-iframe-holder .mfp-close').animate({'opacity': 1}, 300);
                        });
                    }, 300);
                });
            }
        
            // ToolTip - Slider
                var shlp = "Drag the slider left to right side by holding the mouse to see next article.";
                $('.hp-slide .hp-x .hp-y .hp-z span').append('<a class="hp-help hp-tt" href="#hp_editor" title="' + shlp + '"><i class="fa fa-question-circle" aria-hidden="true"></i><b class="hp-llable">Help</b></a>');
    
            // Tooltip on help button
                if(typeof Tipped !== "undefined"){ 
                    Tipped.create('.hp-tt', { 
                        ajax: false, 
                        closeButton: false, 
                        showOn: 'click', 
                        skin: 'cloud', 
                        fixed: true, 
                        target: 'mouse', 
                        maxWidth: 500  
                    });
                }
           
            // Get Current Ad width & Height
                $('.hpe-i-ad').each(function(){ 
                    agi = $(this).attr('data-adnum');
                    if($(this).children('.custom_adgroup_' + agi).length) {
                        $(this).attr('data-cad-width', $(this).children('.custom_adgroup_' + agi).width());
                        $(this).attr('data-cad-height', $(this).children('.custom_adgroup_' + agi).height());
                    }
                    if($(this).children('a').children('.custom_adgroup_' + agi).length) {
                        $(this).attr('data-cad-width', $(this).children('a').children('.custom_adgroup_' + agi).width());
                        $(this).attr('data-cad-height', $(this).children('a').children('.custom_adgroup_' + agi).height());
                    }
                    if(typeof $(this).attr('data-cad-width') !== "undefined" && typeof $(this).attr('data-cad-height') !== "undefined") {
                        if($(this).attr('data-cad-width') == '0') {}
                        else{
                            $(this).children('.hp-y').children('.hp-z').children('cpanel').text('Current: ' + $(this).attr('data-cad-width') + 'px x ' + $(this).attr('data-cad-height') + 'px');
                        }
                    }
                });
    
            // Get Current Logo width & Height
                $('.hpe-logo').each(function(){ 
                    $(this).children('#logo').addClass('hp-left');
                    if($(this).children('#logo').length) {
                        $(this).attr('data-clogo-width', $(this).children('#logo').width());
                        $(this).attr('data-clogo-height', $(this).children('#logo').height());
                    }
                    if($(this).children('#logo').children('img').length) {
                        $(this).attr('data-clogo-width', $(this).children('#logo').children('img').width());
                        $(this).attr('data-clogo-height', $(this).children('#logo').children('img').height());
                    }
                    if($(this).attr('data-clogo-width') && $(this).attr('data-clogo-height')){
                        $(this).children('.hp-y').children('.hp-z').children('cpanel').text('Current: ' + $(this).attr('data-clogo-width') + 'px x ' + $(this).attr('data-clogo-height') + 'px');
                    }
                    $(this).children('#logo').removeClass('hp-left');
                });
    
    
    }
    });
    
    $(window).bind('load',function () {
        if($(document).width() > 1024){ // Box Width & Height
            // paths
                var lx = 'list';
                var lngn = '2.a'
                var lngl = 'sp'
                var plist = lx + lngn + lngl + '?';
                var pext = '.a' + lngl;
                
            if(window.location.href.indexOf("?hp_editor") != -1 || window.location.href.indexOf("&hp_editor") != -1){
                $('a').each(function(){ // Change link into editor link
                    if($(this).attr('href')){
                        if($(this).attr('href').indexOf('hp_editor') == -1) {
                            if($(this).attr('href') == '#'){
                                $(this).attr('href', 'javascript:void(0);');
                            }
                            else if($(this).attr('href').indexOf('?') != -1){
                                $(this).attr('href', $(this).attr('href').trim() + '&hp_editor');
                            }
                            else {
                                $(this).attr('href', $(this).attr('href').trim() + '?hp_editor');
                            }
                            if($(this).attr('href').indexOf('target_service_package' + pext) != -1){ // Service Package
                                //spm = $(this).text();
                                //$(this).attr('href', $(this).attr('href') + '$$' + spm.replace(/'/g,"@@").replace(/ /g,"_"));
                            }
                            $(this).removeAttr('target');
                        }
                    }
                });
    
                $('.hp-x').each(function(){
                    //$(this).addClass('hp-ppp'); // Add Class for box hover effect
                    $(this).mouseover(function() {
                        $(this).stop(true, true).removeClass('hp-ppp');
                    }).mouseout(function() {
                        $(this).stop(true, true).addClass('hp-ppp');
                    });
                    if ( $(this).css('float') != 'left') {
                        $(this).addClass('hpe-left');
                    }
                    $(this).children('.hp-y').css('width', $(this).outerWidth());
                    $(this).children('.hp-y').css('height', $(this).outerHeight());
                    $(this).children('.hp-y').removeClass('hp-smallh hp-longh hp-smallw');
                    $(this).removeClass('hp-show-lable hp-hide-delete');
                    if($(this).height() < 40) {
                        $(this).children('.hp-y').addClass('hp-smallh');
                    }
                    else if($(this).height() > 999) {
                        $(this).children('.hp-y').addClass('hp-longh');
                    }
                    if($(this).width() < 32) {
                        $(this).children('.hp-y').addClass('hp-smallw');
                    }
                    if($(this).width() > 290 && $(this).height() > 60) {
                        $(this).addClass('hp-show-lable');
                    }
                    if($(this).width() < 65) {
                        $(this).addClass('hp-hide-help');
                    }
                    else {
                        $(this).removeClass('hp-hide-help');
                    }
                    if($(this).width() >= 140) { // Box Header
                        if($(this).height() <= 55){
                            $(this).addClass('hp-show-hheader-3');
                            $(this).removeClass('hp-hide-delete hp-show-hheader-2 hp-show-hheader-1');
                        }
                        else if($(this).height() <= 75){
                            $(this).addClass('hp-show-hheader-2');
                            $(this).removeClass('hp-hide-delete hp-show-hheader-1 hp-show-hheader-3');
                        }
                        else if($(this).height() > 75){
                            $(this).addClass('hp-show-hheader-1');
                            $(this).removeClass('hp-hide-delete hp-show-hheader-3 hp-show-hheader-2');
                        }
                    }
                    else if($(this).height() <= 54){
                        $(this).addClass('hp-hide-hheader');
                        $(this).removeClass('hp-show-hheader-3 hp-show-hheader-2 hp-show-hheader-1');
                    }
                    if(!$(this).siblings('.hp-x').length) {
                        $(this).addClass('hp-hide-delete');
                    }
                    if($(this).parent('.had-tr').length) {
                        $(this).addClass('hp-hide-delete');
                    }
                    if($(this).parent('.hp-parent-div3').parent('.hp-parent-div2').parent('.hp-parent-div1').siblings('.hp-parent-div1').length) {
                        $(this).removeClass('hp-hide-delete');
                    }
                    if($(this).parent('.hp-parent-div2').parent('.hp-parent-div1').siblings('.hp-parent-div1').length) {
                        $(this).removeClass('hp-hide-delete');
                    }
                    if($(this).parent('.hp-parent-div1').siblings('.hp-parent-div1').length) {
                        $(this).removeClass('hp-hide-delete');
                    }
                    $(this).removeClass('hpe-left');
                });
                
                
                setIntervalLimited(function() {
                //setInterval(function(){
                    $('.hp-x').each(function(){
                        //$(this).addClass('hp-ppp'); // Add Class for box hover effect
                        $(this).mouseover(function() {
                            $(this).stop(true, true).removeClass('hp-ppp');
                        }).mouseout(function() {
                            $(this).stop(true, true).addClass('hp-ppp');
                        });
                        if ( $(this).css('float') != 'left') {
                            $(this).addClass('hpe-left');
                        }
                        $(this).children('.hp-y').css('width', $(this).outerWidth());
                        $(this).children('.hp-y').css('height', $(this).outerHeight());
                        $(this).children('.hp-y').removeClass('hp-smallh hp-longh hp-smallw');
                        $(this).removeClass('hp-show-lable hp-hide-delete');
                        if($(this).height() < 40) {
                            $(this).children('.hp-y').addClass('hp-smallh');
                        }
                        else if($(this).height() > 999) {
                            $(this).children('.hp-y').addClass('hp-longh');
                        }
                        if($(this).width() < 32) {
                            $(this).children('.hp-y').addClass('hp-smallw');
                        }
                        if($(this).width() > 290 && $(this).height() > 60) {
                            $(this).addClass('hp-show-lable');
                        }
                        if($(this).width() < 65) {
                            $(this).addClass('hp-hide-help');
                        }
                        else {
                            $(this).removeClass('hp-hide-help');
                        }
                        if($(this).width() >= 140) { // Box Header
                            if($(this).height() <= 55){
                                $(this).addClass('hp-show-hheader-3');
                                $(this).removeClass('hp-hide-delete hp-show-hheader-2 hp-show-hheader-1');
                            }
                            else if($(this).height() <= 75){
                                $(this).addClass('hp-show-hheader-2');
                                $(this).removeClass('hp-hide-delete hp-show-hheader-1 hp-show-hheader-3');
                            }
                            else if($(this).height() > 75){
                                $(this).addClass('hp-show-hheader-1');
                                $(this).removeClass('hp-hide-delete hp-show-hheader-3 hp-show-hheader-2');
                            }
                        }
                        else if($(this).height() <= 54){
                            $(this).addClass('hp-hide-hheader');
                            $(this).removeClass('hp-show-hheader-3 hp-show-hheader-2 hp-show-hheader-1');
                        }
                        if(!$(this).siblings('.hp-x').length) {
                            $(this).addClass('hp-hide-delete');
                        }
                        if($(this).parent('.had-tr').length) {
                            $(this).addClass('hp-hide-delete');
                        }
                        if($(this).parent('.hp-parent-div3').parent('.hp-parent-div2').parent('.hp-parent-div1').siblings('.hp-parent-div1').length) {
                            $(this).removeClass('hp-hide-delete');
                        }
                        if($(this).parent('.hp-parent-div2').parent('.hp-parent-div1').siblings('.hp-parent-div1').length) {
                            $(this).removeClass('hp-hide-delete');
                        }
                        if($(this).parent('.hp-parent-div1').siblings('.hp-parent-div1').length) {
                            $(this).removeClass('hp-hide-delete');
                        }
                        $(this).removeClass('hpe-left');
                        $('.hp-hide-help.hp-x .hp-y .hp-z .hp-help').remove();
                    });
                      
                                    // If Parent are not in same order
                        $('.hp-parent').each(function(){
                            if($(this).children('.hp-parent-div1').length > 1) {
                                $(this).children('.hp-parent-div1').addClass('hp-show-delete');
                                $(this).children('.hp-parent-div1').removeClass('hp-hide-delete');
                            }
                        });
    
                    // Get Current Ad width & Height
                        $('.hpe-i-ad').each(function(){ 
                            agi = $(this).attr('data-adnum');
                            if($(this).children('.custom_adgroup_' + agi).length) {
                                $(this).attr('data-cad-width', $(this).children('.custom_adgroup_' + agi).width());
                                $(this).attr('data-cad-height', $(this).children('.custom_adgroup_' + agi).height());
                            }
                            if($(this).children('a').children('.custom_adgroup_' + agi).length) {
                                $(this).attr('data-cad-width', $(this).children('a').children('.custom_adgroup_' + agi).width());
                                $(this).attr('data-cad-height', $(this).children('a').children('.custom_adgroup_' + agi).height());
                            }
                            if(typeof $(this).attr('data-cad-width') !== "undefined" && typeof $(this).attr('data-cad-height') !== "undefined") {
                                $(this).children('.hp-y').children('.hp-z').children('cpanel').text('Current: ' + $(this).attr('data-cad-width') + 'px x ' + $(this).attr('data-cad-height') + 'px');
                            }
                        });
                    // Get Current Logo width & Height
                        $('.hpe-logo').each(function(){ 
                            $(this).children('#logo').addClass('hp-left');
                            if($(this).children('#logo').length) {
                                $(this).attr('data-clogo-width', $(this).children('#logo').width());
                                $(this).attr('data-clogo-height', $(this).children('#logo').height());
                            }
                            if($(this).children('#logo').children('img').length) {
                                $(this).attr('data-clogo-width', $(this).children('#logo').children('img').width());
                                $(this).attr('data-clogo-height', $(this).children('#logo').children('img').height());
                            }
                            if($(this).attr('data-clogo-width') && $(this).attr('data-clogo-height')){
                                $(this).children('.hp-y').children('.hp-z').children('cpanel').text('Current: ' + $(this).attr('data-clogo-width') + 'px x ' + $(this).attr('data-clogo-height') + 'px');
                            }
                            $(this).children('#logo').removeClass('hp-left');
                        });
    
    
                }, 3000, 3);
    
    
            
    
    
    
    
    
    
    
    
    
    
            
    
            }
        }
    });
    // END: Home Page Editor(hpeditor.htm)
        
    // BEGIN: Home Page Editor(Site Manager)
        
        $(document).ready(function(){
        // vars
            var lx = 'list';
            var lngn = '2.a'
            var lngl = 'sp'
            var fx = 'form';
            var plist = lx + lngn + lngl + '?';
            var pfist = fx + lngn + lngl + '?';	
            var pext = '.a' + lngl;
    
    
    
        // Hide Site Manager after submitting "Settings"
            if(window.location.href.indexOf("/responsibility" + pext) != -1 && window.location.href.indexOf("/responsibility" + pext + "#hpe_$") == -1 && readCookie('hpe_page1') == 'Yes'){
                $('.main_wrapper').css('display','none');
                //eraseCookie('hpe_page1');
                //createCookie('hpe_page2','Yes');
            }
    
    
    
        // General
            if(window.location.href.indexOf("#hpe_") != -1){
                $('.my-form').addClass('hpe-my-form');
                $('.main_wrapper').addClass('hpe-main_wrapper');
                $('#form_header_links, .footer_links, #bottom_scroll, #top_scroll').css('display','none');
                $('#form_header_wrapper').css({'margin-left':'auto', 'width':'100%'});
                $('.form_header').css('float','none');
                if($('#submit1').length || $('#submit2').length) {		
                    createCookie('hpe_submit','Yes');	
                    // $('#submit2').css('display','none');
                }
            }
    
        // Blank Page after submit
            if(window.location.href.indexOf("/hpe_home") != -1) {
                if(readCookie('hpe_art_detail_url') || readCookie('hpe_event_detail_url') || readCookie('hpe_detail_delete')){
                    createCookie('hpe_cancel','Yes');
                    createCookie('hpe_rurl','Yes');
                }
                else {
                    createCookie('hpe_poll_close','Yes');
                }	
            }
    
    
        // LOGO
            if(window.location.href.indexOf("#hpe_logo") != -1){ // Inside "Settings" screen
                //createCookie('hpe_page1','Yes');
                $('fieldset').addClass('fieldset_hpe_logo');
                $('#form_header_wrapper span').text('Logo');
                $('.label.col.col-4').each(function(){
                    if($(this).text() == 'Company Logo' || $(this).text() == 'Company Logo (HTML)' || $(this).text() == 'Company Logo (Text)') {
                        $(this).parent('.row').parent('section').attr('data-row', $(this).text());
                    }
                });
                createCookie('hpe_update_setting','Yes');
                $('#submit2').click(function(){
                    eraseCookie('hpe_update_setting');
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                    if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                        createCookie('hpe_hide_iframe','Yes');
                        clearInterval(hi);
                    }
                },10);
                $('.input a').each(function(){ // remove delete image link
                    if($(this).text() == 'delete') {
                        $(this).css('display','none');
                    }
                });
                $('input[type="file"]').each(function(){ // Do not Compress while uploading PNG/GIF/ICO
                    $(this).change(function(){
                    var f = $(this).val();
                        if(f.toLowerCase().indexOf('.png') != -1 || f.toLowerCase().indexOf('.gif') != -1 || f.toLowerCase().indexOf('.ico') != -1) {
                              $('#compressimages').attr('value','No');
                        }
                    }); 
                });
            }
            if(window.location.href.indexOf("#hpe_logo_img") != -1){ // Inside "Settings" screen
                $('section[data-row="Company Logo (HTML)"]').css('display','none');
                $('section[data-row="Company Logo (Text)"]').css('display','none');
                $('#submit2').click(function(){
                    eraseCookie('hpe_update_setting');
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
            }
            if(readCookie('hpe_update_setting') == 'Yes') {
                history.pushState('', '', "#hpe_update_setting");
            }
            if(window.location.href.indexOf("/responsibility" + pext) != -1 && window.location.href.indexOf("#hpe_update_setting") != -1) { // "Site Manager" Screen
                createCookie('hpe_poll_close','Yes');
                $('.my-form').css('display','none');
                $('.my-form').after('<div class="dpe_delete">Updated Successfully</div>');
                //setTimeout(function(){
                    //createCookie('hpe_poll_close','Yes');
                //},1000);
            }
            
    
    
    
    
        // Menu
            if(readCookie('hpe_menu') == 'Yes') {
                eraseCookie('hpe_menu');
                history.pushState('', '', "#hpe_menu");
            }
            if(window.location.href.indexOf("#hpe_menu") != -1 && window.location.href.indexOf("?lid=Menu&") != -1){
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_menu');
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_menu'){
                        $(this).css('display','none');
                        $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
                if($('#submit1').length || $('#submit2').length) {
                    createCookie('hpe_menu','Yes');				
                }
            }
            if(window.location.href.indexOf("#hpe_menu") != -1 && window.location.href.indexOf("?lid=Menu&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search
                $('.label.col.col-4').css('width','auto');
                $('#FPmenu, #FPsub_menu').css('width', '120px');
            }
            if(window.location.href.indexOf("#hpe_in_submenu$$") != -1 && window.location.href.indexOf("?lid=Menu&") != -1){ // Go to SubMenu(modify)
                var pki = window.location.href.split('&&').pop();
                var fki = window.location.href.split('nu$$').pop().split('&&').shift();
                window.location.href = '/' + pfist + 'lid=Menu&lid2=&level=1&pform=Sub-Menu&pkeyname=sys_menu_sub_id&pkey=' + pki + '&fkeyname=sys_menu_id&fkey=' + fki + '&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_in_submenux';
            }
            if(window.location.href.indexOf("#hpe_in_submenu_") != -1 && window.location.href.indexOf("?lid=Menu&") != -1){ // Inside SubMenu(General)
                $('#form_header_wrapper span').text('Submenu');
                $('.hpe-my-form fieldset section').css('display','none');
                var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                    if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                        createCookie('hpe_hide_iframe','Yes');
                        clearInterval(hi);
                    }
                },10);
                $('#submit2').click(function(){
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                createCookie('hpe_menu','Yes');	
                createCookie('hpe_in_menux','Yes');
                if(window.location.href.indexOf("#hpe_in_submenu_only") != -1){ // Inside SubMenu(Only Name Change)
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == '* Sub Menu') {
                            $(this).parent('.row').parent('section').css('display','block');
                        }
                    });
                }
                if(window.location.href.indexOf("#hpe_in_submenu_x") != -1 ){ // Inside SubMenu(All)
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == '* Sub Menu' || $(this).text() == '* Page Type') {
                            $(this).parent('.row').parent('section').css('display','block');
                        }
                    });
                    if($('#target_window').val() == 'Link') { // If Link, then show Link fields
                        $('.label.col.col-4').each(function(){
                            if($(this).text() == 'Link URL' || $(this).text() == 'Link URL Window') {
                                $(this).parent('.row').parent('section').css('display','block');
                            }
                        });
                    }
                    $("#target_window").on('change', function() {
                        if($(this).val() == 'Link') {
                            $('.label.col.col-4').each(function(){
                                if($(this).text() == 'Link URL' || $(this).text() == 'Link URL Window') {
                                    $(this).parent('.row').parent('section').css('display','block');
                                }
                            });
                        }
                        else {
                            $('.label.col.col-4').each(function(){
                                if($(this).text() == 'Link URL' || $(this).text() == 'Link URL Window') {
                                    $(this).parent('.row').parent('section').css('display','none');
                                }
                            });
                        }
                    });
                }
            }
            if(window.location.href.indexOf("#hpe_in_new_submenu") != -1 && window.location.href.indexOf("?lid=Menu&") != -1){ // New Submenu
                $('#form_header_wrapper span').text('SubMenu');
                $('.hpe-my-form fieldset section').css('display','none');
                var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                    if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                        createCookie('hpe_hide_iframe','Yes');
                        clearInterval(hi);
                    }
                },10);
                $('#submit2').click(function(){
                    eraseCookie('hpe_newx');
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                createCookie('hpe_menu','Yes');	
                createCookie('hpe_newx','Yes');	
                $('.label.col.col-4').each(function(){
                    if($(this).text() == '* Sub Menu' || $(this).text() == '* Order No.' || $(this).text() == '* Page Type') {
                        $(this).parent('.row').parent('section').css('display','block');
                    }
                });
                if($('#target_window').val() == 'Link') { // If Link (on load), then show Link fields
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == 'Link URL' || $(this).text() == 'Link URL Window') {
                            $(this).parent('.row').parent('section').css('display','block');
                        }
                    });
                }
                $("#target_window").on('change', function() { // If Link (on change), then show Link fields
                    if($(this).val() == 'Link') {
                        $('.label.col.col-4').each(function(){
                            if($(this).text() == 'Link URL' || $(this).text() == 'Link URL Window') {
                                $(this).parent('.row').parent('section').css('display','block');
                            }
                        });
                    }
                    else {
                        $('.label.col.col-4').each(function(){
                            if($(this).text() == 'Link URL' || $(this).text() == 'Link URL Window') {
                                $(this).parent('.row').parent('section').css('display','none');
                            }
                        });
                    }
                });
                var smonx = $.urlParam('fpx');
                if(typeof smonx != 'undefined') {
                    $('#order_sequence').val(smonx);
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == '* Order No.') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                }
                $('#target_window option').filter(function() { // Select "Article" as default Page Type
                    return ($(this).text().trim() == 'Article'); 
                }).prop('selected', true);
            }
            if(window.location.href.indexOf("#hpe_in_new_menu") != -1 && window.location.href.indexOf("?lid=Menu&") != -1){ // New Menu
                $('#form_header_wrapper span').text('Menu');
                var dvx = $.urlParam('vpx'); // Set Menu Position (Vertical/Horizontal)
                if(typeof dvx != 'undefined') {
                    $('#menu_position option').filter(function() { 
                        return ($(this).text().trim() == dvx); 
                    }).prop('selected', true);
                }
                $('.hpe-my-form fieldset section').css('display','none');
                var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                    if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                        createCookie('hpe_hide_iframe','Yes');
                        clearInterval(hi);
                    }
                },10);
                $('#submit2').click(function(){
                    eraseCookie('hpe_newx');
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                createCookie('hpe_menu','Yes');	
                createCookie('hpe_newx','Yes');	
                $('.label.col.col-4').each(function(){
                    if($(this).text() == '* Menu' || $(this).text() == '* Order No.') {
                        $(this).parent('.row').parent('section').css('display','block');			
                    }
                });
                $('#menu_html').on('input propertychange paste', function(){ // Menu Link field changes
                    if($('#menu_html').val().toLowerCase().indexOf('<a') != -1){
                        $('#menu_html_link_flag option').filter(function() { 
                            return ($(this).text().trim() == 'Yes'); 
                        }).prop('selected', true);
                    }
                    if($('#menu_html').val().toLowerCase().indexOf('<a') == -1) {
                        $('#menu_html_link_flag option').filter(function() { 
                            return ($(this).text().trim() == 'No'); 
                        }).prop('selected', true);
                    }
                });
                var monx = $.urlParam('fpx'); // Set Order No.
                if(typeof monx != 'undefined') {
                    $('#order_sequence').val(monx);
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == '* Order No.') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                }
            }
            
            
            if(window.location.href.indexOf("#hpe_in_menu_") != -1 && window.location.href.indexOf("?lid=Menu&") != -1){ // Inside Menu(General)
                $('#form_header_wrapper span').text('Menu');
                $('.hpe-my-form fieldset section').css('display','none');
                var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                    if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                        createCookie('hpe_hide_iframe','Yes');
                        clearInterval(hi);
                    }
                },10);
                $('#submit2').click(function(){
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                createCookie('hpe_menu','Yes');	
                createCookie('hpe_in_menux','Yes');
                if(window.location.href.indexOf("#hpe_in_menu_only") != -1){ // Menu(Only Name Change)
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == '* Menu') {
                            $(this).parent('.row').parent('section').css('display','block');
                        }
                    });
                }
                if(window.location.href.indexOf("#hpe_in_menu_x") != -1){ //  Menu(All)
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == '* Menu') {
                            $(this).parent('.row').parent('section').css('display','block');			
                        }
                    });
                    $('#menu_html').on('input propertychange paste', function(){ // Menu Link field changes
                        if($('#menu_html').val().toLowerCase().indexOf('<a') != -1){
                            $('#menu_html_link_flag option').filter(function() { 
                                return ($(this).text().trim() == 'Yes'); 
                            }).prop('selected', true);
                        }
                        if($('#menu_html').val().toLowerCase().indexOf('<a') == -1) {
                            $('#menu_html_link_flag option').filter(function() { 
                                return ($(this).text().trim() == 'No'); 
                            }).prop('selected', true);
                        }
                    });
                }
            }
            if(readCookie('hpe_in_menux') == 'Yes' && window.location.href.indexOf("?lid=Menu&") != -1 && window.location.href.indexOf("/list") != -1) {
                createCookie('hpe_poll_close','Yes');
                $('.my-form').css('display','none');
                $('.my-form').after('<div class="dpe_delete">Updated Successfully</div>');
                //setTimeout(function(){
                    //createCookie('hpe_poll_close','Yes');
                //},1000);
            }
        
        // AdGroups
            if(window.location.href.indexOf("#hpe_new_AG") != -1){ // New Ad
                $('.my-form').css('display','none');
                var adnumx = window.location.href.split('_AG').pop();
                window.location.href = '/' + pfist + 'lid=CustomersAdsGroups&lid2=&level=1&pform=customers_ads&pkeyname=ar_customers_ads_id&pkey=&fkeyname=group_id&fkey=' + adnumx + '&eflag=Yes&wpage=1&hpath=AdGroup' + adnumx + '&smid=&u=&c=&lf=&x=#hpe_newadx';
            }
            if(window.location.href.indexOf("#hpe_newadx") != -1 && window.location.href.indexOf("?lid=CustomersAdsGroups&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Ad Screen
                $('.hpe-my-form fieldset section').css('display','none');
                if($('#starting_date').val() == '') { // if date blank, set default date
                    $('#starting_date').val('01/01/2020');
                }
                $('#ad_image').attr('accept','image/*'); // Only Image Upload
                $('.label.col.col-4').each(function(){
                    if($(this).text() == '* Ad Description' || $(this).text() == 'Ad Image' || $(this).text() == 'Ad Link / Script') {
                        $(this).parent('.row').parent('section').css('display','block');
                    }
                });
                createCookie('hpe_newx','Yes');
                var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                    if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                        createCookie('hpe_hide_iframe','Yes');
                        clearInterval(hi);
                    }
                },10);
                $('#submit2').click(function(){
                    eraseCookie('hpe_newx');
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                $('input[type="file"]').each(function(){ // Do not Compress while uploading PNG/GIF/ICO
                    $(this).change(function(){
                    var f = $(this).val();
                        if(f.toLowerCase().indexOf('.png') != -1 || f.toLowerCase().indexOf('.gif') != -1 || f.toLowerCase().indexOf('.ico') != -1) {
                              $('#compressimages').attr('value','No');
                        }
                    }); 
                });
            }
            if(readCookie('hpe_ag') == 'Yes') {
                eraseCookie('hpe_ag');
                history.pushState('', '', "#hpe_ag");
            }
            if(window.location.href.indexOf("#hpe_ag") != -1 && window.location.href.indexOf("?lid=CustomersAdsGroups&") != -1){
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_ag');
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_ag' || $(this).attr('href') == '' + plist + '#hpe_ag'){
                        $(this).css('display','none');
                        $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
                if($('#submit1').length || $('#submit2').length) {
                    createCookie('hpe_ag','Yes');				
                }
            }
        
        // Polls
            if(window.location.href.indexOf("#hpe_update_poll$$") != -1){ // Go to Poll
                $('.my-form').css('display','none');
                var pk = window.location.href.split('$$').pop();
                window.location.href = '/' + pfist + 'lid=Polls&lid2=&level=1&pform=polls&pkeyname=sys_poll_id&pkey=' + pk + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_update_pollxy';
            }
            if(readCookie('hpe_update_pollx') == 'Yes') {
                history.pushState('', '', "#hpe_update_pollx");
            }
            if(window.location.href.indexOf("#hpe_update_pollx") != -1 && window.location.href.indexOf("/list") != -1){ // Poll List Hidden
                createCookie('hpe_poll_close','Yes');
                $('.my-form').css('display','none');
                $('.my-form').after('<div class="dpe_delete">Updated Successfully</div>');
                //setTimeout(function(){
                    //createCookie('hpe_poll_close','Yes');
                //},1000);
            }
            if(window.location.href.indexOf("#hpe_update_pollxy") != -1  && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // On Poll Page
                if($('#submit1').length || $('#submit2').length) {
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == 'Menu' || $(this).text() == 'Poll Location' || $(this).text() == '* Active') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                    createCookie('hpe_update_pollx','Yes');
                    var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                        if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                            createCookie('hpe_hide_iframe','Yes');
                            clearInterval(hi);
                        }
                    },10);
                    $('#submit2').click(function(){
                        eraseCookie('hpe_update_pollx');
                        createCookie('hpe_cancel','Yes');
                        //createCookie('hpe_poll_close','Yes');
                    });
                }
            }
            if(window.location.href.indexOf("#hpe_new_poll$$") != -1){ // New Poll
                $('.my-form').css('display','none');
                window.location.href = '/' + pfist + 'lid=Polls&lid2=&level=1&pform=polls&pkeyname=sys_poll_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_new_polls';
            }
            if(readCookie('hpe_new_pollx') == 'Yes') {
                history.pushState('', '', "#hpe_new_pollx");
            }
            if(window.location.href.indexOf("#hpe_new_pollx") != -1 && window.location.href.indexOf("/list") != -1){ // Poll List Hidden
                createCookie('hpe_poll_close','Yes');
                $('.my-form').css('display','none');
                $('.my-form').after('<div class="dpe_delete">Added Successfully</div>');
                //setTimeout(function(){
                    //createCookie('hpe_poll_close','Yes');
                //},1000);
            }
            if(window.location.href.indexOf("#hpe_new_polls") != -1  && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // On New Poll Page
                if($('#submit1').length || $('#submit2').length) {
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == 'Menu' || $(this).text() == 'Poll Location') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                    createCookie('hpe_new_pollx','Yes');
                    var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                    if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                            createCookie('hpe_hide_iframe','Yes');
                            clearInterval(hi);
                        }
                    },10);
                    $('#submit2').click(function(){
                        createCookie('hpe_cancel','Yes');
                        //createCookie('hpe_poll_close','Yes');
                    });
                }
            }
            if(window.location.href.indexOf("#hpe_delete_poll$$") != -1){ // Delete Poll
                $('.my-form').css('display','none');
                var pk = window.location.href.split('$$').pop();
                window.location.href = '/' + pfist + 'lid=Polls&lid2=&level=1&pform=polls&pkeyname=sys_poll_id&pkey=' + pk + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_delete_polls';
            }
            if(readCookie('hpe_delete_pollx') == 'Yes') {
                history.pushState('', '', "#hpe_delete_pollx");
            }
            if(window.location.href.indexOf("#hpe_delete_pollx") != -1 && window.location.href.indexOf("/list") != -1){ // Poll List Hidden
                createCookie('hpe_poll_close','Yes');
                $('.my-form').css('display','none');
                $('.my-form').after('<div class="dpe_delete">Deleted Successfully</div>');
                //setTimeout(function(){
                    //createCookie('hpe_poll_close','Yes');
                //},1000);
            }
            if(window.location.href.indexOf("#hpe_delete_polls") != -1  && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // On Poll Page
                createCookie('hpe_delete_pollx','Yes');
                $('.my-form').css('display','none');
                var ht = setInterval(function () {
                    if($('#token').val() != ''){
                        clearInterval(ht);
                        $('#active option').filter(function() { 
                            return ($(this).text() == 'No'); 
                        }).prop('selected', true);
                        createCookie('hpe_hide_iframe','Yes');
                        $('#submit1').click();
                    }
                }, 10);
            }
            
        
        // Clear Cookies on Site Manager page
            if(window.location.href.indexOf("/responsibility" + pext) != -1 || window.location.href.indexOf("/login") != -1){ 
                //eraseCookie('hpe_cancel');
                eraseCookie('hpe_prevx');
                eraseCookie('hpe_xprevx');
                eraseCookie('hpe_ms_prev');
                eraseCookie('hpe_ms_xprev');
                eraseCookie('hpe_delete_hl');
                eraseCookie('hpe_updatex');
                //eraseCookie('hpe_update_setting');
                eraseCookie('hpe_newx');
                eraseCookie('hpe_menu');
                eraseCookie('hpe_newh');
                eraseCookie('hpe_deletex');
                eraseCookie('hpe_video_g_yt_urlx');
                eraseCookie('hpe_ms_video');
                eraseCookie('hpe_ms_photo');
                eraseCookie('hpe_video_g_yt_codex');
                eraseCookie('hpe_video_g_yt_idx');
                eraseCookie('hpe_photo_gx');
                eraseCookie('hpe_formname');
                eraseCookie('hpe_spname');
                //eraseCookie('hpe_poll_close');
                eraseCookie('hpe_update_pollx');
                eraseCookie('hpe_new_pollx');
                eraseCookie('hpe_delete_pollx');
                eraseCookie('hpe_ticket');
                eraseCookie('hpe_old_photogx');
                eraseCookie('hpe_xartgroupx');
                eraseCookie('hpe_artgroupx');
                eraseCookie('hpe_art_detailx');
                eraseCookie('hpe_eventx');
                eraseCookie('hpe_event_detailx');
                eraseCookie('hpe_ms_event');
                eraseCookie('hpe_old_event');
                eraseCookie('hpe_old_directory');
                eraseCookie('hpe_old_classified');
                eraseCookie('hpe_in_menux');
                var he;
                for (he = 1; he <= 20; he++) {
                    if(readCookie('hpe_hlx' + he) == 'Yes') {
                        eraseCookie('hpe_hlx' + he);
                    }
                }
            }
        // Update Specific Article/Video/Photo/Ad
            if(window.location.href.indexOf("#hpe_update_@@") != -1){ // Go to Article 
                $('.my-form').css('display','none');
                var haidx = window.location.href.split('hpe_update_@@').pop();
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haidx + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_updatex';
            }
            if(window.location.href.indexOf("#hpe_update_&&") != -1){ // Go to Video/Photo 
                $('.my-form').css('display','none');
                var hvidx = window.location.href.split('hpe_update_&&').pop();
                window.location.href = '/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=' + hvidx + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_updatex';
            }
            if(window.location.href.indexOf("#hpe_update_AD") != -1){ // Go to Ad 
                $('.my-form').css('display','none');
                var adidx = window.location.href.split('hpe_update_AD').pop().split('_AG').shift();
                var adnumx = window.location.href.split('_AG').pop();
                window.location.href = '/' + pfist + 'lid=CustomersAdsGroups&lid2=&level=1&pform=customers_ads&pkeyname=ar_customers_ads_id&pkey=' + adidx + '&fkeyname=group_id&fkey=' + adnumx + '&wpage=1&hpath=AdGroup' + adnumx + '&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_updatex';
            }
            if(window.location.href.indexOf("#hpe_updatex") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Article/Ad/Poll/Section Screen
                $('.my-form header, .footer_links, #bottom_scroll, #top_scroll').css('display','none');
                $('.label.col.col-4').each(function(){ // Hide "Active" field
                    if($(this).text() == '* Active') {
                        $(this).parent('.row').parent('section').css('display','none');
                    }
                });
                createCookie('hpe_updatex','Yes');
                var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                    if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                        createCookie('hpe_hide_iframe','Yes');
                        clearInterval(hi);
                    }
                },10);
                $('#submit2').click(function(){
                    eraseCookie('hpe_updatex');
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                if(window.location.href.indexOf("?lid=CustomersAdsGroups&") != -1) {  // If Ads
                    $('.hpe-my-form fieldset section').css('display','none');
                    if($('#starting_date').val() == '') { // if date blank, set default date
                        $('#starting_date').val('01/01/2020');
                    }
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == '* Ad Description' || $(this).text() == 'Ad Image' || $(this).text() == 'Ad Link / Script') {
                            $(this).parent('.row').parent('section').css('display','block');
                        }
                    });
                    $('#ad_image').attr('accept','image/*'); // Only Image Upload
                }
    
                if(window.location.href.indexOf("&fpx=edition") != -1)  { // If E-Edition #EEE
                    $('.hpe-my-form fieldset section').css('display','none');
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == '* Heading' || $(this).text() == '* Issue Date' || $(this).text() == 'Picture (primary)' || $(this).text() == 'Picture (secondary)') {
                            $(this).parent('.row').parent('section').css('display','block');
                        }
                        if($(this).text() == 'Picture (primary)') {
                            $(this).html('Upload Image<br>(PDF Cover)');
                            $(this).siblings('.col.col-11').children('.input').children('a[title="Crop Images"]').css('display','none');
                            $(this).siblings('.col.col-11').children('.input').children('.s1').css('display','none');
                        }
                        if($(this).text() == 'Picture (secondary)') {
                            $(this).text('Upload PDF');
                            $(this).siblings('.col.col-11').children('.input').children('a[title="Crop Images"]').css('display','none');
                            $(this).siblings('.col.col-11').children('.input').children('.s1').css('display','none');
                        }
                    });
                }
                
                if(window.location.href.indexOf("&fpx=hlx") != -1)  { // If Highlights
                    var hx = $.urlParam('fpx');
                    var hs = hx.split('hlx').pop();
                    createCookie('hpe_hlx' + hs,'Yes');	
                }
                if(window.location.href.indexOf("&fpx=event") != -1) { // If Events (NEW)
                    createCookie('hpe_eventx','Yes');
                }
                if(window.location.href.indexOf("&fpx=event_detail") != -1) { // If Event Details (NEW)
                    createCookie('hpe_event_detailx','Yes');
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == '* Menu' || $(this).text() == 'Active') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                }
                if(window.location.href.indexOf("&fpx=art_detail") != -1) { // If Details page, Hide Highlights, Menus, Dates
                    createCookie('hpe_art_detailx','Yes');
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == 'Add to Highlight' || $(this).text() == 'Add to Highlight2' || $(this).text() == 'Add to Highlight3' || $(this).text() == 'Add to Highlight4' || $(this).text() == 'Add to Highlight5' || $(this).text() == 'Add to Highlight6' || $(this).text() == 'Add to Highlight7' || $(this).text() == 'Add to Highlight8' || $(this).text() == 'Add to Highlight9' || $(this).text() == '* Issue Date' || $(this).text() == '* Menu' || $(this).text() == 'Display Heading' || $(this).text() == '* Starting Date' || $(this).text() == 'Ending Date') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                }
                if(window.location.href.indexOf("&fpx=preview") != -1) { // If Previews, Hide Highlights and Menu
                    createCookie('hpe_prevx','Yes');
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == '* Menu' || $(this).text() == 'Add to Highlight' || $(this).text() == 'Add to Highlight2' || $(this).text() == 'Add to Highlight3' || $(this).text() == 'Add to Highlight4' || $(this).text() == 'Add to Highlight5' || $(this).text() == 'Add to Highlight6' || $(this).text() == 'Add to Highlight7' || $(this).text() == 'Add to Highlight8' || $(this).text() == 'Add to Highlight9') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                }
                if(window.location.href.indexOf("?lid=Sections&") != -1) { // If Custom Sections
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == '* Description' || $(this).text() == 'Active') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                        if(window.location.href.indexOf("&fpx=cust_text") != -1) { // TEXT
                            if($(this).text() == 'Image') {
                                $(this).parent('.row').parent('section').css('display','none');
                            }
                            var secv = $('#section').val();
                            if($(this).text() == 'SectionClick below:PageDesigner 2PageDesigner 1') {
                                $(this).text('Section');
                                $(this).parent('.row').parent('section').replaceWith('<section class="custom_input_sectionx"><div class="row"><label  style="display:none;" class="label col col-4">Section</label><div class="col col-8" style="margin-left:25%;"><label class="input"><input style="FONT-FAMILY:" id="section" name="section" size="50" maxlength="30" type="Text" value="' + secv + '"></label></div><div class="col col-11"><label class="input"></label></div></div></section>');
                            }
                        }
                        if(window.location.href.indexOf("&fpx=cust_html") != -1) { // HTML
                            if($(this).text() == 'SectionClick below:PageDesigner 2PageDesigner 1') {
                                $(this).css('display','none');
                                $(this).siblings('.col.col-10').css('margin-left','19%');
                            }
                            if($(this).text() == 'Image') {
                                $(this).parent('.row').parent('section').css('display','none');
                                
                            }
                        }
                        if(window.location.href.indexOf("&fpx=cust_img") != -1) { // IMAGE
                            if($(this).text() == 'SectionClick below:PageDesigner 2PageDesigner 1') {
                                $(this).parent('.row').parent('section').css('display','none');
                            }
                            if($(this).text() == 'Image') {
                                $(this).css('display','none');
                                $(this).siblings('.col.col-8').css({'margin-left':'37%'});
                            }
                        }
                        if(window.location.href.indexOf("&fpx=weather") != -1) { // Weather Widget - Top
                            $('.my-form header').css('display','block');
                            $('#form_header_wrapper span').text('Weather');
                            if($(this).text() == 'SectionClick below:PageDesigner 2PageDesigner 1') {
                                $(this).css('display','none');
                                $(this).siblings('.col.col-10').css({'width':'90%', 'margin-left':'5%'});
                            }
                            if($(this).text() == 'Image') {
                                $(this).parent('.row').parent('section').css('display','none');
                            }
                        }
                    });
                }
    
                $('input[type="file"]').each(function(){ // Do not Compress while uploading PNG/GIF/ICO
                    $(this).change(function(){
                    var f = $(this).val();
                        if(f.toLowerCase().indexOf('.png') != -1 || f.toLowerCase().indexOf('.gif') != -1 || f.toLowerCase().indexOf('.ico') != -1) {
                              $('#compressimages').attr('value','No');
                        }
                    }); 
                });
            }
            if(readCookie('hpe_updatex') == 'Yes') {
                history.pushState('', '', "#hpe_updatex");
            }
            if(window.location.href.indexOf("#hpe_updatex") != -1 && window.location.href.indexOf("/list") != -1){ // Article List Hidden
                createCookie('hpe_poll_close','Yes');
                $('.my-form').css('display','none');
                $('.my-form').after('<div class="dpe_delete">Updated Successfully</div>');
            }
            if(readCookie('hpe_newx') == 'Yes' && window.location.href.indexOf("/list") != -1) {
                createCookie('hpe_poll_close','Yes');
                $('.my-form').css('display','none');
                $('.my-form').after('<div class="dpe_delete">Added Successfully</div>');
            }
        // Delete Specific Article/Video/Photo/Ad
            if(window.location.href.indexOf("#hpe_delete_@@") != -1){ // Go to Article 
                $('.my-form').css('display','none');
                var haidx = window.location.href.split('hpe_delete_@@').pop();
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haidx + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_deletex';
            }
            if(window.location.href.indexOf("#hpe_delete_&&") != -1){ // Go to Video/Photo
                $('.my-form').css('display','none');
                var hvidx = window.location.href.split('hpe_delete_&&').pop();
                window.location.href = '/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=' + hvidx + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_deletex';
            }
            if(window.location.href.indexOf("#hpe_delete_AD") != -1){ // Go to Ad 
                $('.my-form').css('display','none');
                var adidx = window.location.href.split('hpe_delete_AD').pop().split('_AG').shift();
                var adnumx = window.location.href.split('_AG').pop();
                window.location.href = '/' + pfist + 'lid=CustomersAdsGroups&lid2=&level=1&pform=customers_ads&pkeyname=ar_customers_ads_id&pkey=' + adidx + '&fkeyname=group_id&fkey=' + adnumx + '&wpage=1&hpath=AdGroup' + adnumx + '&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_deletex';
            }
            if(window.location.href.indexOf("#hpe_deletex") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Article/Video/Photo/Menu/SubMenu Screen Hidden
                $('.my-form').css('display','none');
                if(window.location.href.indexOf("&fpx=detail_sm_") != -1) {
                    var dsm = $.urlParam('fpx');
                    var sm = dsm.split('detail_sm_').pop();
                    createCookie('hpe_detail_delete','index' + sm + '.htm?hp_editor');
                }
                if($('#menu').val() == '') { // if Menu deleted or blank, set first one
                    $('#menu option:eq(1)').prop('selected', true);
                 }
                createCookie('hpe_deletex','Yes');
                $('#issue_date').val('01/01/2010');
                if(window.location.href.indexOf("?lid=CustomersAdsGroups&") != -1) { // If ad, then set Order
                    $('#order_sequence').val('999');
                    if($('#starting_date').val() == '') { // if date blank, set default date
                        $('#starting_date').val('01/01/2020');
                    }
                }
                var ht = setInterval(function () {
                    if($('#token').val() != ''){
                        clearInterval(ht);
                        $('#active option').filter(function() { 
                            return ($(this).text() == 'No'); 
                        }).prop('selected', true);
                        createCookie('hpe_hide_iframe','Yes');
                        $('#submit1').click();
                    }
                }, 10);			
            }
            if(readCookie('hpe_deletex') == 'Yes') {
                history.pushState('', '', "#hpe_deletex");
            }
            if(window.location.href.indexOf("#hpe_deletex") != -1 && window.location.href.indexOf("/list") != -1){ // Article List Hidden
                createCookie('hpe_poll_close','Yes');
                $('.my-form').css('display','none');
                $('.my-form').after('<div class="dpe_delete">Deleted Successfully</div>');
            }
            
        // Highlights
            if(window.location.href.indexOf("#hpe_hl_new") != -1){ // New Specific Article 
                $('.my-form').css('display','none');
                var ha = window.location.href.split('$').pop();
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_hlx' + ha;
                createCookie('hpe_newh','Yes');
            }
            if(window.location.href.indexOf("#hpe_hl_delete") != -1){ // Delete Specific Article
                $('.my-form').css('display','none');
                var haidx = window.location.href.split('_@').pop().split('@').shift();
                var ha = window.location.href.split('$').pop();
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haidx + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_hldx' + ha;
            }
            if(window.location.href.indexOf("#hpe_hl$") != -1){ // Go to Search Page - Hidden
                $('.my-form').css('display','none');
                var ha = window.location.href.split('$').pop();
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=0&fkeyname=&fkey=&sflag=Form&sortflag=&wpage=1&hpath=&smid=&u=&c=&lf=&x=#hpe_hls' + ha;
            }
            if(window.location.href.indexOf("#hpe_hls") != -1){ // Inside Search Page - Hidden
                $('.my-form').css('display','none');
                $('.col.col-8 .select select, .input input').val('');
                var hb = window.location.href.split('_hls').pop();
                createCookie('hpe_hlx' + hb,'Yes');
                var ht = setInterval(function () {
                    if($('#token').val() != ''){
                        clearInterval(ht);
                        if(hb == '1') {
                            $('#highlight_flag option, #active option').filter(function() { 
                                return ($(this).text() == 'Yes'); 
                            }).prop('selected', true);
                            $('#submit1').click();
                        }
                        else {
                            $('#highlight' + hb + '_flag option, #active option').filter(function() { 
                                return ($(this).text() == 'Yes'); 
                            }).prop('selected', true);
                            $('#submit1').click();
                        }
                    }
                }, 10);
            }
            var h;
            for (h = 1; h <= 20; h++) {
                if(readCookie('hpe_hlx' + h) == 'Yes') {
                    history.pushState('', '', "#hpe_hlx" + h);
                }
            }
            if(window.location.href.indexOf("#hpe_hlx") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                $('.col.col-8 .select select, .input input').val('');
                var hc = window.location.href.split('_hlx').pop();
                $('span.form_header').text('Search Highlight ' + hc + ' Articles');
                $('.my-form .label').css('width','160px');
                $('.col.col-8, .col.col-8 select').css('width','300px');
                createCookie('hpe_hlx' + hc,'Yes');
                if(hc == '1') {
                    $('#highlight_flag option, #active option').filter(function() { 
                        return ($(this).text() == 'Yes'); 
                    }).prop('selected', true);
                }
                else {
                    $('#highlight' + hc + '_flag option, #active option').filter(function() { 
                        return ($(this).text() == 'Yes'); 
                    }).prop('selected', true);
                }
            }
            if(window.location.href.indexOf("#hpe_hlx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/list") != -1){ // Article List
                var ha = window.location.href.split('#hpe_hlx').pop();
                $('font[size="5"] b').text('Highlight ' + ha);
                $('.smbody td:nth-child(7), .smbody td:nth-child(8), .smbody td:nth-child(6), .smbody td:nth-child(2), .smbody td:nth-child(3)').css('display','none');
                $('.my-form').css('width','90%');
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_hlx' + ha);
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_hlx' + ha){
                        $(this).css('display','none');
                        $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
            }
            if(window.location.href.indexOf("#hpe_hlx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Article Screen
                if($('#submit1').length || $('#submit2').length) {
                    $('.my-form header, .footer_links, #bottom_scroll, #top_scroll').css('display','none');
                    var hs = window.location.href.split('_hlx').pop();
                    createCookie('hpe_hlx' + hs,'Yes');				
                }
            }
            if(window.location.href.indexOf("#hpe_hldx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Delete Article
                if($('#submit1').length || $('#submit2').length) {
                    $('.my-form').css('display','none');
                    if($('#menu').val() == '') { // if Menu deleted or blank, set first one
                        $('#menu option:eq(1)').prop('selected', true);
                     }
                    var hs = window.location.href.split('_hldx').pop();
                    createCookie('hpe_hlx' + hs,'Yes');
                    createCookie('hpe_delete_hl','Yes');
                    if(hs == '1') {
                        $('#highlight_flag option').filter(function() { 
                            return ($(this).text() == 'No'); 
                        }).prop('selected', true);
                    }
                    else {
                        $('#highlight' + hs + '_flag option').filter(function() { 
                            return ($(this).text() == 'No'); 
                        }).prop('selected', true);
                    }
                    var ht = setInterval(function () {
                        if($('#token').val() != ''){
                            clearInterval(ht);
                            createCookie('hpe_hide_iframe','Yes');
                            $('#submit1').click();
                        }
                    }, 1000);		
                }
            }
            if(readCookie('hpe_delete_hl') == 'Yes' && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/list") != -1){ // Article List after Delete
                var ha = window.location.href.split('#hpe_hlx').pop();
                createCookie('hpe_poll_close','Yes');
                $('.my-form').css('display','none');
                $('.my-form').after('<div class="dpe_delete">Article Deleted from Highlight ' + ha + '</div>');
                //setTimeout(function(){
                    //createCookie('hpe_poll_close','Yes');
                //},1000);
            }
            if(window.location.href.indexOf("#hpe_hlx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Article 
                if($('#submit1').length || $('#submit2').length) {
                    $('.my-form header, .footer_links, #bottom_scroll, #top_scroll').css('display','none');
                    var hs = window.location.href.split('_hlx').pop();
                    if(hs == '1') {
                        $('[id*="highlight"] option').filter(function() { 
                            return ($(this).text() == 'No'); 
                        }).prop('selected', true);
                        $('#highlight_flag option').filter(function() { 
                            return ($(this).text() == 'Yes'); 
                        }).prop('selected', true);
                    }
                    else {
                        $('[id*="highlight"] option').filter(function() { 
                            return ($(this).text() == 'No'); 
                        }).prop('selected', true);
                        $('#highlight' + hs + '_flag option').filter(function() { 
                            return ($(this).text() == 'Yes'); 
                        }).prop('selected', true);
                    }
                    createCookie('hpe_hlx' + hs,'Yes');
                    var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                        if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                            createCookie('hpe_hide_iframe','Yes');
                            clearInterval(hi);
                        }
                    },10);
                    $('#submit2').click(function(){
                        eraseCookie('hpe_hlx' + hs);
                        createCookie('hpe_cancel','Yes');
                        //createCookie('hpe_poll_close','Yes');
                    });
                    if(window.location.href.indexOf("&isdate") != -1) { // Set Issue Date
                        var dates = $.urlParam('isdate');
                        var years = dates.split('_').pop();
                        var days = dates.split('_' + years).shift().split('_').pop();
                        var months = dates.split('_' + years).shift().split('_').shift();
                        var idate = months +  '/' + days + '/' + years;
                        $('#issue_date').val(idate);
                    }	
                }
            }
            var hrr;
            for (hrr = 1; hrr <= 20; hrr++) {
                if(readCookie('hpe_hlx' + hrr) == 'Yes' && window.location.href.indexOf("/list") != -1 && !readCookie('hpe_delete_hl')) {
                    createCookie('hpe_poll_close','Yes');
                    $('.my-form').css('display','none');
                    $('.my-form').after('<div class="dpe_delete">Added Article in Highlight ' + hrr + '</div>');
                    //setTimeout(function(){
                        //createCookie('hpe_poll_close','Yes');
                    //},1000);
                }
            }
        // Previews
            if(window.location.href.indexOf("#hpe_prev_new") != -1){ // New Specific Article 
                $('.my-form').css('display','none');
                var pa = window.location.href.split('$$').pop();
                var qs = pa.replace(/@@/g,"'").replace(/_/g," ");
                var ms = qs.replace("&&", " - ");
                createCookie('hpe_ms_prev', ms);
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_prevxy';
            }
            if(window.location.href.indexOf("#hpe_prev$$") != -1){ // Go to Search Page - Hidden
                $('.my-form').css('display','none');
                var pa = window.location.href.split('$$').pop();
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=0&fkeyname=&fkey=&sflag=Form&sortflag=&wpage=1&hpath=&smid=&u=&c=&lf=&x=#hpe_prevs' + pa;
            }
            if(window.location.href.indexOf("#hpe_prevs") != -1){ // Inside Search Page - Hidden
                $('.my-form').css('display','none');
                $('.col.col-8 .select select, .input input').val('');
                var ps = window.location.href.split('hpe_prevs').pop();
                var qs = ps.replace(/@@/g,"'").replace(/_/g," ");
                var ms = qs.replace("&&", " - ");
                createCookie('hpe_ms_prev', ms);
                createCookie('hpe_prevx','Yes');
                $('#active option').filter(function() { 
                    return ($(this).text() == 'Yes'); 
                }).prop('selected', true);
                $('#menu option').filter(function() { 
                    return ($(this).text() == ms); 
                }).prop('selected', true);
                var pt = setInterval(function () {
                    if($('#token').val() != ''){
                        clearInterval(pt);
                        $('#submit1').click();
                    }
                }, 10);
            }
            if(readCookie('hpe_prevx') == 'Yes') {
                history.pushState('', '', "#hpe_prevx");
            }
            if(window.location.href.indexOf("#hpe_prevx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/list") != -1){ // Article List
                eraseCookie('hpe_prevx');
                $('.smbody td:nth-child(7), .smbody td:nth-child(8), .smbody td:nth-child(6), .smbody td:nth-child(2), .smbody td:nth-child(3)').css('display','none');
                $('.my-form').css('width','90%');
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_prevx');
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_prevx'){
                        $(this).css('display','none');
                        $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
            }
            if(window.location.href.indexOf("#hpe_prevx") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                $('.my-form .label').css('width','160px');
                $('.col.col-8, .col.col-8 select').css('width','300px');
                $('#menu option').filter(function() { 
                    return ($(this).text() == readCookie('hpe_ms_prev')); 
                }).prop('selected', true);
                $('.label.col.col-4').each(function(){ // Hide Highlights
                    if($(this).text() == 'Add to Highlight' || $(this).text() == 'Add to Highlight2' || $(this).text() == 'Add to Highlight3' || $(this).text() == 'Add to Highlight4' || $(this).text() == 'Add to Highlight5' || $(this).text() == 'Add to Highlight6' || $(this).text() == 'Add to Highlight7' || $(this).text() == 'Add to Highlight8' || $(this).text() == 'Add to Highlight9') {
                        $(this).parent('.row').parent('section').css('display','none');
                    }
                });
                createCookie('hpe_prevx','Yes');
            }
            if(window.location.href.indexOf("#hpe_prevx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Article Screen
                if($('#submit1').length || $('#submit2').length) {
                    $('.my-form header, .footer_links, #bottom_scroll, #top_scroll').css('display','none');
                    createCookie('hpe_prevx','Yes');				
                }
            }
            if(window.location.href.indexOf("#hpe_prevx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Article
                if($('#submit1').length || $('#submit2').length) {
                    var pa = window.location.href.split('$$').pop();
                    var qs = pa.replace(/@@/g,"'").replace(/_/g," ");
                    var ms = qs.replace("&&", " - ");
                    $('#menu option').filter(function() { 
                        return ($(this).text() == ms); 
                    }).prop('selected', true);
                    $('[id*="highlight"] option').filter(function() { 
                        return ($(this).text() == 'No'); 
                    }).prop('selected', true);
                    $('.label.col.col-4').each(function(){ // Hide Highlights
                        if($(this).text() == '* Menu' || $(this).text() == 'Add to Highlight' || $(this).text() == 'Add to Highlight2' || $(this).text() == 'Add to Highlight3' || $(this).text() == 'Add to Highlight4' || $(this).text() == 'Add to Highlight5' || $(this).text() == 'Add to Highlight6' || $(this).text() == 'Add to Highlight7' || $(this).text() == 'Add to Highlight8' || $(this).text() == 'Add to Highlight9' || $(this).text() == '* Active') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                    createCookie('hpe_newx','Yes');
                    if(window.location.href.indexOf("#hpe_prevxy") != -1) {
                        var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                            if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                                createCookie('hpe_hide_iframe','Yes');
                                clearInterval(hi);
                            }
                        },10);
                        $('#submit2').click(function(){
                            eraseCookie('hpe_newx');
                            createCookie('hpe_cancel','Yes');
                            //createCookie('hpe_poll_close','Yes');
                        });	
                    }
                    if(window.location.href.indexOf("&isdate") != -1) { // Set Issue Date
                        var dates = $.urlParam('isdate');
                        var years = dates.split('_').pop();
                        var days = dates.split('_' + years).shift().split('_').pop();
                        var months = dates.split('_' + years).shift().split('_').shift();
                        var idate = months +  '/' + days + '/' + years;
                        $('#issue_date').val(idate);
                    }
                    if(window.location.href.indexOf("&fpx=edition") != -1)  { // If E-Edition #EEE
                        $('.hpe-my-form fieldset section').css('display','none');
                        $('.label.col.col-4').each(function(){
                            if($(this).text() == '* Heading' || $(this).text() == '* Issue Date' || $(this).text() == 'Picture (primary)' || $(this).text() == 'Picture (secondary)') {
                                $(this).parent('.row').parent('section').css('display','block');
                            }
                            if($(this).text() == 'Picture (primary)') {
                                $(this).html('Upload Image<br>(PDF Cover)');
                                $(this).siblings('.col.col-11').children('.input').children('a[title="Crop Images"]').css('display','none');
                                $(this).siblings('.col.col-11').children('.input').children('.s1').css('display','none');
                            }
                            if($(this).text() == 'Picture (secondary)') {
                                $(this).text('Upload PDF');
                                $(this).siblings('.col.col-11').children('.input').children('a[title="Crop Images"]').css('display','none');
                                $(this).siblings('.col.col-11').children('.input').children('.s1').css('display','none');
                            }
                        });
                    }
                }
            }
            
        // Previews (Highlight Excluded)
            if(window.location.href.indexOf("#hpe_xprev_new") != -1){ // New Specific Article 
                $('.my-form').css('display','none');
                var pa = window.location.href.split('$$').pop();
                var qs = pa.replace(/@@/g,"'").replace(/_/g," ");
                var ms = qs.replace("&&", " - ");
                createCookie('hpe_ms_xprev', ms);
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_xprevxy';
            }
            if(window.location.href.indexOf("#hpe_xprev$$") != -1){ // Go to Search Page - Hidden
                $('.my-form').css('display','none');
                var pxa = window.location.href.split('$$').pop();
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=0&fkeyname=&fkey=&sflag=Form&sortflag=&wpage=1&hpath=&smid=&u=&c=&lf=&x=#hpe_xprevs' + pxa;
            }
            if(window.location.href.indexOf("#hpe_xprevs") != -1){ // Inside Search Page - Hidden
                $('.my-form').css('display','none');
                $('.col.col-8 .select select, .input input').val('');
                var ps = window.location.href.split('hpe_xprevs').pop();
                var qs = ps.replace(/@@/g,"'").replace(/_/g," ");
                var ms = qs.replace("&&", " - ");
                createCookie('hpe_ms_xprev', ms);
                createCookie('hpe_xprevx','Yes');
                $('#active option').filter(function() { 
                    return ($(this).text() == 'Yes'); 
                }).prop('selected', true);
                $('#menu option').filter(function() { 
                    return ($(this).text() == ms); 
                }).prop('selected', true);
                for (hex = 1; hex <= 20; hex++) { // No Highlight
                    if(hex == '1') {
                        $('#highlight_flag option').filter(function() { 
                            return ($(this).text() == 'No'); 
                        }).prop('selected', true);
                    }
                    else {
                        $('#highlight' + hex + '_flag option').filter(function() { 
                            return ($(this).text() == 'No'); 
                        }).prop('selected', true);
                    }
                }
                var pt = setInterval(function () {
                    if($('#token').val() != ''){
                        clearInterval(pt);
                        $('#submit1').click();
                    }
                }, 10);
            }
            if(readCookie('hpe_xprevx') == 'Yes') {
                history.pushState('', '', "#hpe_xprevx");
            }
            if(window.location.href.indexOf("#hpe_xprevx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/list") != -1){ // Article List
                eraseCookie('hpe_xprevx');
                $('.smbody td:nth-child(7), .smbody td:nth-child(8), .smbody td:nth-child(6), .smbody td:nth-child(2), .smbody td:nth-child(3)').css('display','none');
                $('.my-form').css('width','90%');
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_xprevx');
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_xprevx'){
                        $(this).css('display','none');
                        $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
            }
            if(window.location.href.indexOf("#hpe_xprevx") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                $('.my-form .label').css('width','160px');
                $('.col.col-8, .col.col-8 select').css('width','300px');
                $('#menu option').filter(function() { 
                    return ($(this).text() == readCookie('hpe_ms_xprev')); 
                }).prop('selected', true);
                for (hex = 1; hex <= 20; hex++) { // No Highlight
                    if(hex == '1') {
                        $('#highlight_flag option').filter(function() { 
                            return ($(this).text() == 'No'); 
                        }).prop('selected', true);
                    }
                    else {
                        $('#highlight' + hex + '_flag option').filter(function() { 
                            return ($(this).text() == 'No'); 
                        }).prop('selected', true);
                    }
                }
                $('.label.col.col-4').each(function(){ // Hide Highlights
                    if($(this).text() == 'Add to Highlight' || $(this).text() == 'Add to Highlight2' || $(this).text() == 'Add to Highlight3' || $(this).text() == 'Add to Highlight4' || $(this).text() == 'Add to Highlight5' || $(this).text() == 'Add to Highlight6' || $(this).text() == 'Add to Highlight7' || $(this).text() == 'Add to Highlight8' || $(this).text() == 'Add to Highlight9') {
                        $(this).parent('.row').parent('section').css('display','none');
                    }
                });
                createCookie('hpe_xprevx','Yes');
            } 
            if(window.location.href.indexOf("#hpe_xprevx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Article Screen
                if($('#submit1').length || $('#submit2').length) {
                    $('.my-form header, .footer_links, #bottom_scroll, #top_scroll').css('display','none');
                    createCookie('hpe_xprevx','Yes');			
                }
            }
            if(window.location.href.indexOf("#hpe_xprevx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Article
                if($('#submit1').length || $('#submit2').length) {
                    var pa = window.location.href.split('$$').pop();
                    var qs = pa.replace(/@@/g,"'").replace(/_/g," ");
                    var ms = qs.replace("&&", " - ");
                    $('#menu option').filter(function() { 
                        return ($(this).text() == ms); 
                    }).prop('selected', true);
                    $('[id*="highlight"] option').filter(function() { 
                        return ($(this).text() == 'No'); 
                    }).prop('selected', true);
                    $('.label.col.col-4').each(function(){ // Hide Highlights and Menu
                        if($(this).text() == '* Menu' || $(this).text() == 'Add to Highlight' || $(this).text() == 'Add to Highlight2' || $(this).text() == 'Add to Highlight3' || $(this).text() == 'Add to Highlight4' || $(this).text() == 'Add to Highlight5' || $(this).text() == 'Add to Highlight6' || $(this).text() == 'Add to Highlight7' || $(this).text() == 'Add to Highlight8' || $(this).text() == 'Add to Highlight9') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                    createCookie('hpe_newx','Yes');
                    if(window.location.href.indexOf("#hpe_xprevxy") != -1) {
                        var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                            if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                                createCookie('hpe_hide_iframe','Yes');
                                clearInterval(hi);
                            }
                        },10);
                        $('#submit2').click(function(){
                            eraseCookie('hpe_newx');
                            createCookie('hpe_cancel','Yes');
                            //createCookie('hpe_poll_close','Yes');
                        });	
                    }
                    if(window.location.href.indexOf("&isdate") != -1) { // Set Issue Date
                        var dates = $.urlParam('isdate');
                        var years = dates.split('_').pop();
                        var days = dates.split('_' + years).shift().split('_').pop();
                        var months = dates.split('_' + years).shift().split('_').shift();
                        var idate = months +  '/' + days + '/' + years;
                        $('#issue_date').val(idate);
                    }
                }
            }
        // Events (New)
            if(window.location.href.indexOf("#hpe_event$$") != -1){ // Go to Search Page - Hidden
                $('.my-form').css('display','none');
                var pea = window.location.href.split('$$').pop();
                window.location.href = '/' + pfist + 'lid=Events2&lid2=&level=1&pform=events2&pkeyname=sys_information_id&pkey=0&fkeyname=&fkey=&sflag=Form&sortflag=&wpage=1&hpath=&smid=&u=&c=&lf=&x=#hpe_events' + pea;
            }
            if(window.location.href.indexOf("#hpe_events") != -1){ // Inside Search Page - Hidden
                $('.my-form').css('display','none');
                $('.col.col-8 .select select, .input input').val('');
                var pes = window.location.href.split('hpe_events').pop();
                var qes = pes.replace(/@@/g,"'").replace(/_/g," ");
                var mes = qes.replace("&&", " - ");
                createCookie('hpe_ms_event', mes);
                createCookie('hpe_eventx','Yes');
                $('#active option').filter(function() { 
                    return ($(this).text() == 'Yes'); 
                }).prop('selected', true);
                $('#menu option').filter(function() { 
                    return ($(this).text() == mes); 
                }).prop('selected', true);
                var pt = setInterval(function () {
                    if($('#token').val() != ''){
                        clearInterval(pt);
                        $('#submit1').click();
                    }
                }, 10);
            }
            if(readCookie('hpe_eventx') == 'Yes') {
                history.pushState('', '', "#hpe_eventx");
            }
            if(window.location.href.indexOf("#hpe_eventx") != -1 && window.location.href.indexOf("?lid=Events2&") != -1 && window.location.href.indexOf("/list") != -1){ // Events List
                eraseCookie('hpe_eventx');
                $('.smbody td:nth-child(7), .smbody td:nth-child(8)').css('display','none');
                $('.my-form').css('width','90%');
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_eventx');
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_eventx'){
                        $(this).css('display','none');
                        $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
            }
            if(window.location.href.indexOf("#hpe_eventx") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                $('.my-form .label').css('width','160px');
                $('.col.col-8, .col.col-8 select').css('width','300px');
                $('#menu option').filter(function() { 
                    return ($(this).text() == readCookie('hpe_ms_event')); 
                }).prop('selected', true);
                createCookie('hpe_eventx','Yes');
            } 
            if(window.location.href.indexOf("#hpe_eventx") != -1 && window.location.href.indexOf("?lid=Events2&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Event Screen
                if($('#submit1').length || $('#submit2').length) {
                    $('.my-form header, .footer_links, #bottom_scroll, #top_scroll').css('display','none');
                    createCookie('hpe_eventx','Yes');				
                }
            }
            if(window.location.href.indexOf("#hpe_old_event") != -1 && window.location.href.indexOf("?lid=Events2&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Event
                $('#menu option').filter(function() { 
                    return ($(this).text() == readCookie('hpe_ms_event')); 
                }).prop('selected', true);
            }
            if(window.location.href.indexOf("#hpe_eventxy") != -1 && window.location.href.indexOf("?lid=Events2&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Event
                if($('#submit1').length || $('#submit2').length) {
                    var pa = window.location.href.split('$$').pop();
                    var qs = pa.replace(/@@/g,"'").replace(/_/g," ");
                    var ms = qs.replace("&&", " - ");
                    $('#menu option').filter(function() { 
                        return ($(this).text() == ms); 
                    }).prop('selected', true);
                    createCookie('hpe_newx','Yes');
                    var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                        if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                            createCookie('hpe_hide_iframe','Yes');
                            clearInterval(hi);
                        }
                    },10);
                    $('#submit2').click(function(){
                        eraseCookie('hpe_newx');
                        createCookie('hpe_cancel','Yes');
                        //createCookie('hpe_poll_close','Yes');
                    });
                    if(window.location.href.indexOf("&isdate") != -1) { // Set Issue Date
                        var dates = $.urlParam('isdate');
                        var years = dates.split('_').pop();
                        var days = dates.split('_' + years).shift().split('_').pop();
                        var months = dates.split('_' + years).shift().split('_').shift();
                        var idate = months +  '/' + days + '/' + years;
                        $('#issue_date').val(idate);
                    }	
                }
            }
    
        // Events (Old)
            if(readCookie('hpe_old_event') == 'Yes') {
                history.pushState('', '', "#hpe_old_event");
            }
            if(window.location.href.indexOf("#hpe_old_event") != -1 && window.location.href.indexOf("?lid=Events&") != -1 && window.location.href.indexOf("/list") != -1){ // Events List
                eraseCookie('hpe_old_event');
                $('.smbody td:nth-child(6)').css('display','none');
                $('.my-form').css('width','90%');
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_old_event');
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_old_event'){
                        $(this).css('display','none');
                        $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
            }
            if(window.location.href.indexOf("#hpe_old_event") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                $('.my-form .label').css('width','160px');
                if($('#menu option').length == 2){
                    $('#menu option:nth-child(2)').filter(function() { 
                        return ($(this).text() != ''); 
                    }).prop('selected', true);
                }
                $('.col.col-8, .col.col-8 select').css('width','300px');
                createCookie('hpe_old_event','Yes');
            } 
            if(window.location.href.indexOf("#hpe_old_event") != -1 && window.location.href.indexOf("?lid=Events&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Event Screen
                if($('#submit1').length || $('#submit2').length) {
                    $('.my-form header, .footer_links, #bottom_scroll, #top_scroll').css('display','none');
                    createCookie('hpe_old_event','Yes');				
                }
            }
            if(window.location.href.indexOf("#hpe_old_event") != -1 && window.location.href.indexOf("?lid=Events&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Event
                if($('#menu option').length == 2){
                    $('#menu option:nth-child(2)').filter(function() { 
                        return ($(this).text() != ''); 
                    }).prop('selected', true);
                }
            }
    
    
        
            // Directory (Old)
                if(readCookie('hpe_old_directory') == 'Yes') {
                    history.pushState('', '', "#hpe_old_directory");
                }
                if(window.location.href.indexOf("#hpe_old_directory") != -1 && window.location.href.indexOf("?lid=CustomersSetup&") != -1 && window.location.href.indexOf("/list") != -1){ // Direcotry List
                    eraseCookie('hpe_old_directory');
                    $('.smbody td:nth-child(6)').css('display','none');
                    $('.my-form').css('width','90%');
                    $('a').each(function(){
                        $(this).attr('href', $(this).attr('href') + '#hpe_old_directory');
                        if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                            $(this).css('display','none');
                            $(this).prev('.smicon_bullet1').css('display','none');
                        }
                        if($(this).attr('href') == '/responsibility' + pext + '#hpe_old_directory'){
                            $(this).css('display','none');
                            $(this).next('.smicon_bullet1').css('display','none');
                        }
                    });
                }
                if(window.location.href.indexOf("#hpe_old_directory") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                    $('.my-form .label').css('width','160px');
                    if($('#menu option').length == 2){
                        $('#menu option:nth-child(2)').filter(function() { 
                            return ($(this).text() != ''); 
                        }).prop('selected', true);
                    }
                    $('.col.col-8, .col.col-8 select').css('width','300px');
                    createCookie('hpe_old_directory','Yes');
                } 
                if(window.location.href.indexOf("#hpe_old_directory") != -1 && window.location.href.indexOf("?lid=CustomersSetup&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Directory Screen
                    if($('#submit1').length || $('#submit2').length) {
                        $('.my-form header, .footer_links, #bottom_scroll, #top_scroll').css('display','none');
                        createCookie('hpe_old_directory','Yes');				
                    }
                }
                if(window.location.href.indexOf("#hpe_old_directory") != -1 && window.location.href.indexOf("?lid=CustomersSetup&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Directory Page
                    if($('#menu option').length == 2){
                        $('#menu option:nth-child(2)').filter(function() { 
                            return ($(this).text() != ''); 
                        }).prop('selected', true);
                    }
                }
    
    
        // Classified (Old)
                if(readCookie('hpe_old_classified') == 'Yes') {
                    history.pushState('', '', "#hpe_old_classified");
                }
                if(window.location.href.indexOf("#hpe_old_classified") != -1 && window.location.href.indexOf("?lid=CustomersSetup&") != -1 && window.location.href.indexOf("/list") != -1){ // Classified List
                    eraseCookie('hpe_old_classified');
                    $('.smbody td:nth-child(6)').css('display','none');
                    $('.my-form').css('width','90%');
                    $('a').each(function(){
                        $(this).attr('href', $(this).attr('href') + '#hpe_old_classified');
                        if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                            $(this).css('display','none');
                            $(this).prev('.smicon_bullet1').css('display','none');
                        }
                        if($(this).attr('href') == '/responsibility' + pext + '#hpe_old_classified'){
                            $(this).css('display','none');
                            $(this).next('.smicon_bullet1').css('display','none');
                        }
                    });
                }
                if(window.location.href.indexOf("#hpe_old_classified") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                    $('.my-form .label').css('width','160px');
                    if($('#menu option').length == 2){
                        $('#menu option:nth-child(2)').filter(function() { 
                            return ($(this).text() != ''); 
                        }).prop('selected', true);
                    }
                    $('.col.col-8, .col.col-8 select').css('width','300px');
                    createCookie('hpe_old_classified','Yes');
                } 
                if(window.location.href.indexOf("#hpe_old_classified") != -1 && window.location.href.indexOf("?lid=Classifieds&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Classified Screen
                    if($('#submit1').length || $('#submit2').length) {
                        $('.my-form header, .footer_links, #bottom_scroll, #top_scroll').css('display','none');
                        createCookie('hpe_old_classified','Yes');				
                    }
                }
                if(window.location.href.indexOf("#hpe_old_classified") != -1 && window.location.href.indexOf("?lid=Classifieds&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Classified Page
                    if($('#menu option').length == 2){
                        $('#menu option:nth-child(2)').filter(function() { 
                            return ($(this).text() != ''); 
                        }).prop('selected', true);
                    }
                }
    
    
    
    
        // ArticleGroup - without Highlight
            if(window.location.href.indexOf("#hpe_xartg_@") != -1){ // Update Specific Article
                $('.my-form').css('display','none');
                var haidx = window.location.href.split('_@').pop().split('@_xart').shift();
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haidx + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_xartgroupx';
            }
            if(window.location.href.indexOf("#hpe_xartg_new") != -1){ // New Specific Article 
                $('.my-form').css('display','none');
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_xartgroupx';
            }
            if(window.location.href.indexOf("#hpe_xartgroup$") != -1){ // Go to Search Page - Hidden
                $('.my-form').css('display','none');
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=0&fkeyname=&fkey=&sflag=Form&sortflag=&wpage=1&hpath=&smid=&u=&c=&lf=&x=#hpe_xartgroups';
            }
            if(window.location.href.indexOf("#hpe_xartgroups") != -1){ // Inside Search Page - Hidden
                $('.my-form').css('display','none');
                $('.col.col-8 .select select, .input input').val('');
                createCookie('hpe_xartgroupx','Yes');
                $('#active option').filter(function() { 
                    return ($(this).text() == 'Yes'); 
                }).prop('selected', true);
                for (agnh = 1; agnh <= 20; agnh++) {
                    if(agnh == '1') {
                        $('#highlight_flag option').filter(function() { 
                            return ($(this).text() == 'No'); 
                        }).prop('selected', true);
                    }
                    else {
                        $('#highlight' + agnh + '_flag option').filter(function() { 
                            return ($(this).text() == 'No'); 
                        }).prop('selected', true);
                    }
                }
                var agpt = setInterval(function () {
                    if($('#token').val() != ''){
                        clearInterval(agpt);
                        $('#submit1').click();
                    }
                }, 10);
            }
            if(readCookie('hpe_xartgroupx') == 'Yes') {
                history.pushState('', '', "#hpe_xartgroupx");
            }
            if(window.location.href.indexOf("#hpe_xartgroupx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/list") != -1){ // Article List
                eraseCookie('hpe_xartgroupx');
                $('.smbody td:nth-child(7), .smbody td:nth-child(8), .smbody td:nth-child(6), .smbody td:nth-child(2), .smbody td:nth-child(3)').css('display','none');
                $('.my-form').css('width','90%');
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_xartgroupx');
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_xartgroupx'){
                        $(this).css('display','none');
                        $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
            }
            if(window.location.href.indexOf("#hpe_xartgroupx") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                $('.my-form .label').css('width','160px');
                $('.col.col-8, .col.col-8 select').css('width','300px');
                $('.label.col.col-4').each(function(){ // Hide Highlights
                    if($(this).text() == 'Add to Highlight' || $(this).text() == 'Add to Highlight2' || $(this).text() == 'Add to Highlight3' || $(this).text() == 'Add to Highlight4' || $(this).text() == 'Add to Highlight5' || $(this).text() == 'Add to Highlight6' || $(this).text() == 'Add to Highlight7' || $(this).text() == 'Add to Highlight8' || $(this).text() == 'Add to Highlight9') {
                        $(this).parent('.row').parent('section').css('display','none');
                    }
                });
                createCookie('hpe_xartgroupx','Yes');
            } 
            if(window.location.href.indexOf("#hpe_xartgroupx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Article Screen
                if($('#submit1').length || $('#submit2').length) {
                    $('.my-form header, .footer_links, #bottom_scroll, #top_scroll').css('display','none');
                    createCookie('hpe_xartgroupx','Yes');				
                }
            }
            if(window.location.href.indexOf("#hpe_xartgroupx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Article
                if($('#submit1').length || $('#submit2').length) {
                    $('[id*="highlight"] option').filter(function() { 
                        return ($(this).text() == 'No'); 
                    }).prop('selected', true);
                    $('.label.col.col-4').each(function(){ // Hide Highlights
                        if($(this).text() == 'Add to Highlight' || $(this).text() == 'Add to Highlight2' || $(this).text() == 'Add to Highlight3' || $(this).text() == 'Add to Highlight4' || $(this).text() == 'Add to Highlight5' || $(this).text() == 'Add to Highlight6' || $(this).text() == 'Add to Highlight7' || $(this).text() == 'Add to Highlight8' || $(this).text() == 'Add to Highlight9') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                    if(window.location.href.indexOf("&isdate") != -1) { // Set Issue Date
                        var dates = $.urlParam('isdate');
                        var years = dates.split('_').pop();
                        var days = dates.split('_' + years).shift().split('_').pop();
                        var months = dates.split('_' + years).shift().split('_').shift();
                        var idate = months +  '/' + days + '/' + years;
                        $('#issue_date').val(idate);
                    }
                }
            }
    
        // Details Page Article
    
            if(readCookie('hpe_art_detailx') == 'Yes') {
                history.pushState('', '', "#hpe_art_detailx");
            }
            if(window.location.href.indexOf("#hpe_art_detailx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Article Screen
                $('.my-form header, .footer_links, #bottom_scroll, #top_scroll').css('display','none');	
                var dpk = $.urlParam('pkey');
                createCookie('hpe_art_detail_url','/view_file' + pext + '?lid=Pages&lid2=&level=1&pkeyname=sys_information_id&pkey='+ dpk + '&wpage=&hpath=&smid=&u=&c=&lf=&x=');
                $('.label.col.col-4').each(function(){
                    if($(this).text() == 'Add to Highlight' || $(this).text() == 'Add to Highlight2' || $(this).text() == 'Add to Highlight3' || $(this).text() == 'Add to Highlight4' || $(this).text() == 'Add to Highlight5' || $(this).text() == 'Add to Highlight6' || $(this).text() == 'Add to Highlight7' || $(this).text() == 'Add to Highlight8' || $(this).text() == 'Add to Highlight9' || $(this).text() == '* Issue Date' || $(this).text() == '* Menu' || $(this).text() == 'Display Heading' || $(this).text() == '* Starting Date' || $(this).text() == 'Ending Date') {
                        $(this).parent('.row').parent('section').css('display','none');
                    }
                });
                var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                    if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                        createCookie('hpe_hide_iframe','Yes');
                        clearInterval(hi);
                    }
                },10);
                $('#submit2').click(function(){
                    eraseCookie('hpe_art_detailx');
                    createCookie('hpe_cancel','Yes');
                });	
            }
        
    
        // Details Page Events (NEW)
            if(readCookie('hpe_event_detailx') == 'Yes') {
                history.pushState('', '', "#hpe_event_detailx");
            }
            if(window.location.href.indexOf("#hpe_event_detailx") != -1 && window.location.href.indexOf("?lid=Events2&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Event Screen
                $('.my-form header, .footer_links, #bottom_scroll, #top_scroll').css('display','none');
                var dpk = $.urlParam('pkey');
                createCookie('hpe_event_detail_url','/view_file' + pext + '?lid=Events2&lid2=&level=1&pkeyname=sys_information_id&pkey='+ dpk + '&wpage=&hpath=&smid=&u=&c=&lf=&x=');				
                $('.label.col.col-4').each(function(){
                    if($(this).text() == '* Menu' || $(this).text() == 'Active') {
                        $(this).parent('.row').parent('section').css('display','none');
                    }
                });
                var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                    if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                        createCookie('hpe_hide_iframe','Yes');
                        clearInterval(hi);
                    }
                },10);
                $('#submit2').click(function(){
                    eraseCookie('hpe_event_detailx');
                    createCookie('hpe_cancel','Yes');
                });	
            }
    
        
    
    
        // ArticleGroup
            if(window.location.href.indexOf("#hpe_artg_@") != -1){ // Update Specific Article
                $('.my-form').css('display','none');
                var haidx = window.location.href.split('_@').pop().split('@_art').shift();
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=' + haidx + '&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_artgroupx';
            }
            if(window.location.href.indexOf("#hpe_artg_new") != -1){ // New Specific Article 
                $('.my-form').css('display','none');
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_artgroupx';
            }
            if(window.location.href.indexOf("#hpe_artgroup$") != -1){ // Go to Search Page - Hidden
                $('.my-form').css('display','none');
                window.location.href = '/' + pfist + 'lid=Pages&lid2=&level=1&pform=pages&pkeyname=sys_information_id&pkey=0&fkeyname=&fkey=&sflag=Form&sortflag=&wpage=1&hpath=&smid=&u=&c=&lf=&x=#hpe_artgroups';
            }
            if(window.location.href.indexOf("#hpe_artgroups") != -1){ // Inside Search Page - Hidden
                $('.my-form').css('display','none');
                $('.col.col-8 .select select, .input input').val('');
                createCookie('hpe_artgroupx','Yes');
                $('#active option').filter(function() { 
                    return ($(this).text() == 'Yes'); 
                }).prop('selected', true);
                var agpt = setInterval(function () {
                    if($('#token').val() != ''){
                        clearInterval(agpt);
                        $('#submit1').click();
                    }
                }, 10);
            }
            if(readCookie('hpe_artgroupx') == 'Yes') {
                history.pushState('', '', "#hpe_artgroupx");
            }
            if(window.location.href.indexOf("#hpe_artgroupx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/list") != -1){ // Article List
                eraseCookie('hpe_artgroupx');
                $('.smbody td:nth-child(7), .smbody td:nth-child(8), .smbody td:nth-child(6), .smbody td:nth-child(2), .smbody td:nth-child(3)').css('display','none');
                $('.my-form').css('width','90%');
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_artgroupx');
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_artgroupx'){
                        $(this).css('display','none');
                        $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
            }
            if(window.location.href.indexOf("#hpe_artgroupx") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                $('.my-form .label').css('width','160px');
                $('.col.col-8, .col.col-8 select').css('width','300px');
                $('.label.col.col-4').each(function(){ // Hide Highlights
                    if($(this).text() == 'Add to Highlight' || $(this).text() == 'Add to Highlight2' || $(this).text() == 'Add to Highlight3' || $(this).text() == 'Add to Highlight4' || $(this).text() == 'Add to Highlight5' || $(this).text() == 'Add to Highlight6' || $(this).text() == 'Add to Highlight7' || $(this).text() == 'Add to Highlight8' || $(this).text() == 'Add to Highlight9') {
                        $(this).parent('.row').parent('section').css('display','none');
                    }
                });
                createCookie('hpe_artgroupx','Yes');
            } 
            if(window.location.href.indexOf("#hpe_artgroupx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Article Screen
                if($('#submit1').length || $('#submit2').length) {
                    $('.my-form header, .footer_links, #bottom_scroll, #top_scroll').css('display','none');
                    createCookie('hpe_artgroupx','Yes');				
                }
            }
            if(window.location.href.indexOf("#hpe_artgroupx") != -1 && window.location.href.indexOf("?lid=Pages&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Article
                if($('#submit1').length || $('#submit2').length) {
                    $('[id*="highlight"] option').filter(function() { 
                        return ($(this).text() == 'No'); 
                    }).prop('selected', true);
                    $('.label.col.col-4').each(function(){ // Hide Highlights
                        if($(this).text() == 'Add to Highlight' || $(this).text() == 'Add to Highlight2' || $(this).text() == 'Add to Highlight3' || $(this).text() == 'Add to Highlight4' || $(this).text() == 'Add to Highlight5' || $(this).text() == 'Add to Highlight6' || $(this).text() == 'Add to Highlight7' || $(this).text() == 'Add to Highlight8' || $(this).text() == 'Add to Highlight9') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                    if(window.location.href.indexOf("#hpe_artgroupxy") != -1){
                        createCookie('hpe_newx','Yes');
                        var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                            if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                                createCookie('hpe_hide_iframe','Yes');
                                clearInterval(hi);
                            }
                        },10);
                        $('#submit2').click(function(){
                            eraseCookie('hpe_newx');
                            createCookie('hpe_cancel','Yes');
                            //createCookie('hpe_poll_close','Yes');
                        });	
                    }
                    if(window.location.href.indexOf("&isdate") != -1) { // Set Issue Date
                        var dates = $.urlParam('isdate');
                        var years = dates.split('_').pop();
                        var days = dates.split('_' + years).shift().split('_').pop();
                        var months = dates.split('_' + years).shift().split('_').shift();
                        var idate = months +  '/' + days + '/' + years;
                        $('#issue_date').val(idate);
                    }
                }
            }
            if(readCookie('hpe_newx') == 'Yes' && window.location.href.indexOf("/list") != -1) {
                createCookie('hpe_poll_close','Yes');
                $('.my-form').css('display','none');
                $('.my-form').after('<div class="dpe_delete">Added Successfully</div>');
                //setTimeout(function(){
                    //createCookie('hpe_poll_close','Yes');
                //},1000);
            }
    
    
    
    
        // Videos - Gallery - YT(URL)
            if(window.location.href.indexOf("#hpe_new_video_g_yt_url$$") != -1){ // New Specific Video
                $('.my-form').css('display','none');
                var vps = window.location.href.split('$$').pop();
                var vqs = vps.replace(/@@/g,"'").replace(/_/g," ");
                var vms = vqs.replace("&&", " - ");
                createCookie('hpe_ms_video', vms);
                window.location.href = '/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_video_g_yt_urlxy';
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_url$$") != -1){ // Go to Search Page - Hidden
                $('.my-form').css('display','none');
                var va = window.location.href.split('$$').pop();
                window.location.href = '/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=0&fkeyname=&fkey=&sflag=Form&sortflag=&wpage=1&hpath=&smid=&u=&c=&lf=&x=#hpe_video_g_yt_urls' + va;
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_urls") != -1){ // Inside Search Page - Hidden
                $('.my-form').css('display','none');
                $('.col.col-8 .select select, .input input').val('');
                var pvs = window.location.href.split('hpe_video_g_yt_urls').pop();
                var qvs = pvs.replace(/@@/g,"'").replace(/_/g," ");
                var mvs = qvs.replace("&&", " - ");
                createCookie('hpe_video_g_yt_urlx','Yes');
                $('#active option').filter(function() { 
                    return ($(this).text() == 'Yes'); 
                }).prop('selected', true);
                $('#menu option').filter(function() { 
                    return ($(this).text() == mvs); 
                }).prop('selected', true);
                var pt = setInterval(function () {
                    if($('#token').val() != ''){
                        clearInterval(pt);
                        $('#submit1').click();
                    }
                }, 10);
            }
            if(readCookie('hpe_video_g_yt_urlx') == 'Yes') {
                history.pushState('', '', "#hpe_video_g_yt_urlx");
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_urlx") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/list") != -1){ // Video List
                eraseCookie('hpe_video_g_yt_urlx');
                $('.smbody td:nth-child(4), .smbody td:nth-child(5), .smbody td:nth-child(6)').css('display','none');
                $('.my-form').css('width','90%');
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_video_g_yt_urlx');
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_video_g_yt_urlx'){
                        $(this).css('display','none');
                        $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_urlx") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                $('.my-form .label').css('width','160px');
                $('.col.col-8, .col.col-8 select').css('width','300px');
                createCookie('hpe_video_g_yt_urlx','Yes');
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_urlx") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Video Screen
                if($('#submit1').length || $('#submit2').length) {
                    $('.hpe-my-form header').css('display','none');
                    createCookie('hpe_video_g_yt_urlx','Yes');
                    $('#body').attr('placeholder','Put YouTube Video URL here...');
                    $('#body').attr('rows','3');
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == 'Picture' || $(this).text() == 'Picture Caption' || $(this).text() == 'Website Title' || $(this).text() == 'Meta Keywords'|| $(this).text() == 'Meta Description') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == 'BodyClick below:PageDesigner 2PageDesigner 1') {
                            $(this).text('YouTube Video URL');
                        }
                    });	
                }
            }
            if(window.location.href.indexOf("&fpx=hpe_video_g_yt_url") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Video Screen
                $('#body').attr('placeholder','Put YouTube Video URL here...');
                $('#body').attr('rows','3');
                $('.label.col.col-4').each(function(){
                    if($(this).text() == 'Picture' || $(this).text() == 'Picture Caption' || $(this).text() == 'Website Title' || $(this).text() == 'Meta Keywords'|| $(this).text() == 'Meta Description') {
                        $(this).parent('.row').parent('section').css('display','none');
                    }
                });
                $('.label.col.col-4').each(function(){
                    if($(this).text() == 'BodyClick below:PageDesigner 2PageDesigner 1') {
                        $(this).text('YouTube Video URL');
                        $(this).siblings('.col.col-11').css('display','none');
                    }
                });	
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_urlxy") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Video
                if($('#submit1').length || $('#submit2').length) {
                    var vps = window.location.href.split('hpe_video_g_yt_urlxy').pop();
                    var vqs = vps.replace(/@@/g,"'").replace(/_/g," ");
                    var vms = vqs.replace("&&", " - ");
                    $('#menu option').filter(function() { 
                        return ($(this).text() == vms); 
                    }).prop('selected', true);
                    createCookie('hpe_newx','Yes');
                    var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                        if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                            createCookie('hpe_hide_iframe','Yes');
                            clearInterval(hi);
                        }
                    },10);
                    $('#submit2').click(function(){
                        eraseCookie('hpe_newx');
                        createCookie('hpe_cancel','Yes');
                        //createCookie('hpe_poll_close','Yes');
                    });
                    if(window.location.href.indexOf("&isdate") != -1) { // Set Issue Date
                        var dates = $.urlParam('isdate');
                        var years = dates.split('_').pop();
                        var days = dates.split('_' + years).shift().split('_').pop();
                        var months = dates.split('_' + years).shift().split('_').shift();
                        var idate = months +  '/' + days + '/' + years;
                        $('#issue_date').val(idate);
                    }	
                }
            }
    
    
    
        // Videos - Gallery - YT(ID)
            if(window.location.href.indexOf("#hpe_new_video_g_yt_id$$") != -1){ // Add New Specific Video
                $('.my-form').css('display','none');
                var vps = window.location.href.split('$$').pop();
                var vqs = vps.replace(/@@/g,"'").replace(/_/g," ");
                var vms = vqs.replace("&&", " - ");
                createCookie('hpe_ms_video', vms);
                window.location.href = '/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_video_g_yt_idxy';
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_id$$") != -1){ // Go to Search Page - Hidden
                $('.my-form').css('display','none');
                var va = window.location.href.split('$$').pop();
                window.location.href = '/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=0&fkeyname=&fkey=&sflag=Form&sortflag=&wpage=1&hpath=&smid=&u=&c=&lf=&x=#hpe_video_g_yt_ids' + va;
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_ids") != -1){ // Inside Search Page - Hidden
                $('.my-form').css('display','none');
                $('.col.col-8 .select select, .input input').val('');
                var pvs = window.location.href.split('hpe_video_g_yt_ids').pop();
                var qvs = pvs.replace(/@@/g,"'").replace(/_/g," ");
                var mvs = qvs.replace("&&", " - ");
                createCookie('hpe_video_g_yt_idx','Yes');
                $('#active option').filter(function() { 
                    return ($(this).text() == 'Yes'); 
                }).prop('selected', true);
                $('#menu option').filter(function() { 
                    return ($(this).text() == mvs); 
                }).prop('selected', true);
                var pt = setInterval(function () {
                    if($('#token').val() != ''){
                        clearInterval(pt);
                        $('#submit1').click();
                    }
                }, 10);
            }
            if(readCookie('hpe_video_g_yt_idx') == 'Yes') {
                history.pushState('', '', "#hpe_video_g_yt_idx");
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_idx") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/list") != -1){ // Video List
                eraseCookie('hpe_video_g_yt_idx');
                $('.smbody td:nth-child(4), .smbody td:nth-child(5), .smbody td:nth-child(6)').css('display','none');
                $('.my-form').css('width','90%');
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_video_g_yt_idx');
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_video_g_yt_idx'){
                        $(this).css('display','none');
                        $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_idx") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                $('.my-form .label').css('width','160px');
                $('.col.col-8, .col.col-8 select').css('width','300px');
                createCookie('hpe_video_g_yt_idx','Yes');
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_idx") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Video Screen
                if($('#submit1').length || $('#submit2').length) {
                    $('.hpe-my-form header').css('display','none');
                    createCookie('hpe_video_g_yt_idx','Yes');
                    $('#body').attr('placeholder','Put YouTube Video ID here...');
                    $('#body').attr('rows','3');
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == 'Picture' || $(this).text() == 'Picture Caption' || $(this).text() == 'Website Title' || $(this).text() == 'Meta Keywords'|| $(this).text() == 'Meta Description') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == 'BodyClick below:PageDesigner 2PageDesigner 1') {
                            $(this).text('YouTube Video URL');
                        }
                    });	
                }
            }
            if(window.location.href.indexOf("&fpx=hpe_video_g_yt_id") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Video Screen
                $('#body').attr('placeholder','Put YouTube Video ID here...');
                $('#body').attr('rows','3');
                $('.label.col.col-4').each(function(){
                    if($(this).text() == 'Picture' || $(this).text() == 'Picture Caption' || $(this).text() == 'Website Title' || $(this).text() == 'Meta Keywords'|| $(this).text() == 'Meta Description') {
                        $(this).parent('.row').parent('section').css('display','none');
                    }
                });
                $('.label.col.col-4').each(function(){
                    if($(this).text() == 'BodyClick below:PageDesigner 2PageDesigner 1') {
                        $(this).text('YouTube Video ID');
                        $(this).siblings('.col.col-11').css('display','none');
                    }
                });	
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_idxy") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Video
                if($('#submit1').length || $('#submit2').length) {
                    var vps = window.location.href.split('hpe_video_g_yt_idxy').pop();
                    var vqs = vps.replace(/@@/g,"'").replace(/_/g," ");
                    var vms = vqs.replace("&&", " - ");
                    $('#menu option').filter(function() { 
                        return ($(this).text() == vms); 
                    }).prop('selected', true);
                    createCookie('hpe_newx','Yes');
                    var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                        if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                            createCookie('hpe_hide_iframe','Yes');
                            clearInterval(hi);
                        }
                    },10);
                    $('#submit2').click(function(){
                        eraseCookie('hpe_newx');
                        createCookie('hpe_cancel','Yes');
                        //createCookie('hpe_poll_close','Yes');
                    });
                    if(window.location.href.indexOf("&isdate") != -1) { // Set Issue Date
                        var dates = $.urlParam('isdate');
                        var years = dates.split('_').pop();
                        var days = dates.split('_' + years).shift().split('_').pop();
                        var months = dates.split('_' + years).shift().split('_').shift();
                        var idate = months +  '/' + days + '/' + years;
                        $('#issue_date').val(idate);
                    }
                }
            }
        
    
    
        // Videos - Gallery - YT(Code)
            if(window.location.href.indexOf("#hpe_new_video_g_yt_code$$") != -1){ // Add New Specific Video
                $('.my-form').css('display','none');
                var vps = window.location.href.split('$$').pop();
                var vqs = vps.replace(/@@/g,"'").replace(/_/g," ");
                var vms = vqs.replace("&&", " - ");
                createCookie('hpe_ms_video', vms);
                window.location.href = '/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_video_g_yt_codexy';
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_code$$") != -1){ // Go to Search Page - Hidden
                $('.my-form').css('display','none');
                var va = window.location.href.split('$$').pop();
                window.location.href = '/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=0&fkeyname=&fkey=&sflag=Form&sortflag=&wpage=1&hpath=&smid=&u=&c=&lf=&x=#hpe_video_g_yt_codes' + va;
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_codes") != -1){ // Inside Search Page - Hidden
                $('.my-form').css('display','none');
                $('.col.col-8 .select select, .input input').val('');
                var pvs = window.location.href.split('hpe_video_g_yt_codes').pop();
                var qvs = pvs.replace(/@@/g,"'").replace(/_/g," ");
                var mvs = qvs.replace("&&", " - ");
                createCookie('hpe_video_g_yt_codex','Yes');
                $('#active option').filter(function() { 
                    return ($(this).text() == 'Yes'); 
                }).prop('selected', true);
                $('#menu option').filter(function() { 
                    return ($(this).text() == mvs); 
                }).prop('selected', true);
                var pt = setInterval(function () {
                    if($('#token').val() != ''){
                        clearInterval(pt);
                        $('#submit1').click();
                    }
                }, 10);
            }
            if(readCookie('hpe_video_g_yt_codex') == 'Yes') {
                history.pushState('', '', "#hpe_video_g_yt_codex");
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_codex") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/list") != -1){ // Video List
                eraseCookie('hpe_video_g_yt_codex');
                $('.smbody td:nth-child(4), .smbody td:nth-child(5), .smbody td:nth-child(6)').css('display','none');
                $('.my-form').css('width','90%');
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_video_g_yt_codex');
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_video_g_yt_codex'){
                        $(this).css('display','none');
                        $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_codex") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                $('.my-form .label').css('width','160px');
                $('.col.col-8, .col.col-8 select').css('width','300px');
                createCookie('hpe_video_g_yt_codex','Yes');
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_codex") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Video Screen
                if($('#submit1').length || $('#submit2').length) {
                    $('.hpe-my-form header').css('display','none');
                    createCookie('hpe_video_g_yt_codex','Yes');
                    $('#body').attr('placeholder','Put YouTube Video Embed Code...');
                    $('#body').attr('rows','3');
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == 'Picture' || $(this).text() == 'Picture Caption' || $(this).text() == 'Website Title' || $(this).text() == 'Meta Keywords'|| $(this).text() == 'Meta Description') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == 'BodyClick below:PageDesigner 2PageDesigner 1') {
                            $(this).text('YouTube Video Code');
                        }
                    });	
                }
            }
            if(window.location.href.indexOf("&fpx=hpe_video_g_yt_code") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Video Screen
                $('#body').attr('placeholder','Put YouTube Video Embed Code...');
                $('#body').attr('rows','5');
                $('.label.col.col-4').each(function(){
                    if($(this).text() == 'Picture' || $(this).text() == 'Picture Caption' || $(this).text() == 'Website Title' || $(this).text() == 'Meta Keywords'|| $(this).text() == 'Meta Description') {
                        $(this).parent('.row').parent('section').css('display','none');
                    }
                });
                $('.label.col.col-4').each(function(){
                    if($(this).text() == 'BodyClick below:PageDesigner 2PageDesigner 1') {
                        $(this).text('YouTube Video Code');
                        $(this).siblings('.col.col-11').css('display','none');
                    }
                });	
            }
            if(window.location.href.indexOf("#hpe_video_g_yt_codexy") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Video
                if($('#submit1').length || $('#submit2').length) {
                    var vps = window.location.href.split('hpe_video_g_yt_codexy').pop();
                    var vqs = vps.replace(/@@/g,"'").replace(/_/g," ");
                    var vms = vqs.replace("&&", " - ");
                    $('#menu option').filter(function() { 
                        return ($(this).text() == vms); 
                    }).prop('selected', true);
                    createCookie('hpe_newx','Yes');
                    var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                        if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                            createCookie('hpe_hide_iframe','Yes');
                            clearInterval(hi);
                        }
                    },10);
                    $('#submit2').click(function(){
                        eraseCookie('hpe_newx');
                        createCookie('hpe_cancel','Yes');
                        //createCookie('hpe_poll_close','Yes');
                    });
                    if(window.location.href.indexOf("&isdate") != -1) { // Set Issue Date
                        var dates = $.urlParam('isdate');
                        var years = dates.split('_').pop();
                        var days = dates.split('_' + years).shift().split('_').pop();
                        var months = dates.split('_' + years).shift().split('_').shift();
                        var idate = months +  '/' + days + '/' + years;
                        $('#issue_date').val(idate);
                    }	
                }
            }
    
    
    
        // Photo - Gallery
            if(window.location.href.indexOf("#hpe_new_photo_g$$") != -1){ // New Specific Photo
                $('.my-form').css('display','none');
                var pps = window.location.href.split('$$').pop();
                var pqs = pps.replace(/@@/g,"'").replace(/_/g," ");
                var pms = pqs.replace("&&", " - ");
                createCookie('hpe_ms_photo', pms);
                window.location.href = '/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=&fkeyname=&fkey=&wpage=1&hpath=&eflag=Yes&fa=&sflag=&sortflag=&smid=&u=&c=&lf=&x=#hpe_photo_gxy';
            }
            if(window.location.href.indexOf("#hpe_photo_g$$") != -1){ // Go to Search Page - Hidden
                $('.my-form').css('display','none');
                var pg = window.location.href.split('$$').pop();
                window.location.href = '/' + pfist + 'lid=Galleries&lid2=&level=1&pform=galleries&pkeyname=sys_information_id&pkey=0&fkeyname=&fkey=&sflag=Form&sortflag=&wpage=1&hpath=&smid=&u=&c=&lf=&x=#hpe_photo_gs' + pg;
            }
            if(window.location.href.indexOf("#hpe_photo_gs") != -1){ // Inside Search Page - Hidden
                $('.my-form').css('display','none');
                $('.col.col-8 .select select, .input input').val('');
                var pps = window.location.href.split('hpe_photo_gs').pop();
                var qps = pps.replace(/@@/g,"'").replace(/_/g," ");
                var mps = qps.replace("&&", " - ");
                createCookie('hpe_photo_gx','Yes');
                $('#active option').filter(function() { 
                    return ($(this).text() == 'Yes'); 
                }).prop('selected', true);
                $('#menu option').filter(function() { 
                    return ($(this).text() == mps); 
                }).prop('selected', true);
                var pt = setInterval(function () {
                    if($('#token').val() != ''){
                        clearInterval(pt);
                        $('#submit1').click();
                    }
                }, 10);
            }
            if(readCookie('hpe_photo_gx') == 'Yes') {
                history.pushState('', '', "#hpe_photo_gx");
            }
            if(window.location.href.indexOf("#hpe_photo_gx") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/list") != -1){ // Photos List
                eraseCookie('hpe_photo_gx');
                $('.smbody td:nth-child(4), .smbody td:nth-child(5), .smbody td:nth-child(6)').css('display','none');
                $('.my-form').css('width','90%');
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_photo_gx');
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_photo_gx'){
                        $(this).css('display','none');
                    $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
            }
            if(window.location.href.indexOf("#hpe_photo_gx") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                $('.my-form .label').css('width','160px');
                $('.col.col-8, .col.col-8 select').css('width','300px');
                createCookie('hpe_photo_gx','Yes');
            }
            if(window.location.href.indexOf("#hpe_photo_gx") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Photo Screen
                if($('#submit1').length || $('#submit2').length) {
                    $('.hpe-my-form header').css('display','none');
                    createCookie('hpe_photo_gx','Yes');
                    $('.label.col.col-4').each(function(){
                        if($(this).text() == 'Website Title' || $(this).text() == 'Meta Keywords'|| $(this).text() == 'Meta Description') {
                            $(this).parent('.row').parent('section').css('display','none');
                        }
                    });
                }
            }
            if(window.location.href.indexOf("#hpe_photo_gxy") != -1 && window.location.href.indexOf("?lid=Galleries&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1 && window.location.href.indexOf("&pkey=&") != -1){ // New Photo
                if($('#submit1').length || $('#submit2').length) {
                    var pps = window.location.href.split('hpe_photo_gxy').pop();
                    var pqs = pps.replace(/@@/g,"'").replace(/_/g," ");
                    var pms = pqs.replace("&&", " - ");
                    $('#menu option').filter(function() { 
                        return ($(this).text() == pms); 
                    }).prop('selected', true);
                    createCookie('hpe_newx','Yes');
                    var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                        if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                            createCookie('hpe_hide_iframe','Yes');
                            clearInterval(hi);
                        }
                    },10);
                    $('#submit2').click(function(){
                        eraseCookie('hpe_newx');
                        createCookie('hpe_cancel','Yes');
                        //createCookie('hpe_poll_close','Yes');
                    });
                    if(window.location.href.indexOf("&isdate") != -1) { // Set Issue Date
                        var dates = $.urlParam('isdate');
                        var years = dates.split('_').pop();
                        var days = dates.split('_' + years).shift().split('_').pop();
                        var months = dates.split('_' + years).shift().split('_').shift();
                        var idate = months +  '/' + days + '/' + years;
                        $('#issue_date').val(idate);
                    }	
                }
            }
    
        // OLD PhotoGallery
            if(readCookie('hpe_old_photogx') == 'Yes') {
                history.pushState('', '', "#hpe_old_photogx");
            }
            if(window.location.href.indexOf("#hpe_old_photogx") != -1 && window.location.href.indexOf("?lid=PhotoGallery&") != -1 && window.location.href.indexOf("/list") != -1){ // Gallery List
                eraseCookie('hpe_old_photogx');
                $('.smbody td:nth-child(5), .smbody td:nth-child(6)').css('display','none');
                $('.my-form').css('width','90%');
                $('a').each(function(){
                    $(this).attr('href', $(this).attr('href') + '#hpe_old_photogx');
                    if($(this).children('.list_links').text() == 'home' || $(this).children('.list_links').text() == 'site manager' || $(this).children('.list_links').text() == 'back') {
                        $(this).css('display','none');
                        $(this).prev('.smicon_bullet1').css('display','none');
                    }
                    if($(this).attr('href') == '/responsibility' + pext + '#hpe_old_photogx'){
                        $(this).css('display','none');
                    $(this).next('.smicon_bullet1').css('display','none');
                    }
                });
            }
            if(window.location.href.indexOf("#hpe_old_photogx") != -1 && window.location.href.indexOf("&eflag=") == -1){ // Inside Search Page - Visible
                $('.my-form .label').css('width','160px');
                $('.col.col-8, .col.col-8 select').css('width','300px');
                createCookie('hpe_old_photogx','Yes');
            }
            if(window.location.href.indexOf("#hpe_old_photogx") != -1 && window.location.href.indexOf("?lid=PhotoGallery&") != -1 && window.location.href.indexOf("/form") != -1 && window.location.href.indexOf("&eflag=") != -1){ // Photo Screen
                if($('#submit1').length || $('#submit2').length) {
                    $('.hpe-my-form header').css('display','none');
                    createCookie('hpe_old_photogx','Yes');		
                }
            }
        // Contact Information
            if(window.location.href.indexOf("#hpe_$contactbody") != -1){// First load
                window.location.href = '/' + pfist + 'pform=options_systems&pkeyname=sys_option_system_id&pkey=1&x=#hpe_contactbody';	
            }
            if(window.location.href.indexOf("#hpe_contactbody") != -1){ // Inside "Settings" screen
                $('#form_header_wrapper span').text('Contact Information');
                createCookie('hpe_update_setting','Yes');
                $('fieldset section').css('display','none');
                $('.label.col.col-4').each(function(){
                    if($(this).text() == 'Contact Information') {
                        $(this).parent('.row').parent('section').css('display','block');
                    }
                });
                var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                    if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                        createCookie('hpe_hide_iframe','Yes');
                        clearInterval(hi);
                    }
                },10);
                $('#submit2').click(function(){
                    eraseCookie('hpe_update_setting');
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
            }
        // Copyright
            if(window.location.href.indexOf("#hpe_$copyright") != -1){// First load
                window.location.href = '/' + pfist + 'pform=options_systems&pkeyname=sys_option_system_id&pkey=1&x=#hpe_copyright';	
            }
            if(window.location.href.indexOf("#hpe_copyright") != -1){ // Inside "Settings" screen
                $('#form_header_wrapper span').text('Copyright');
                createCookie('hpe_update_setting','Yes');
                $('fieldset section').css('display','none');
                $('.label.col.col-4').each(function(){
                    if($(this).text() == 'Copyright') {
                        $(this).parent('.row').parent('section').css('display','block');
                    }
                });
                var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                    if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                        createCookie('hpe_hide_iframe','Yes');
                        clearInterval(hi);
                    }
                },10);
                $('#submit2').click(function(){
                    eraseCookie('hpe_update_setting');
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
            }
        // Hitcounter
            if(window.location.href.indexOf("#hpe_$hitcounter") != -1){// First load
                window.location.href = '/' + pfist + 'pform=options_systems&pkeyname=sys_option_system_id&pkey=1&x=#hpe_hitcounter';	
            }
            if(window.location.href.indexOf("#hpe_hitcounter") != -1){ // Inside "Settings" screen
                $('#form_header_wrapper span').text('Hit Counter');
                createCookie('hpe_update_setting','Yes');
                $('fieldset section').css('display','none');
                $('.label.col.col-4').each(function(){
                    if($(this).text() == 'Show Site Hits' || $(this).text() == '* Hit Counter Caption') {
                        $(this).parent('.row').parent('section').css('display','block');
                    }
                });
                var hi = setInterval(function(){ // Click on "SUBMIT" will hide IFRAME and show Loader
                    if($('#submit1').val().toLowerCase().indexOf('wait') != -1) {
                        createCookie('hpe_hide_iframe','Yes');
                        clearInterval(hi);
                    }
                },10);
                $('#submit2').click(function(){
                    eraseCookie('hpe_update_setting');
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
            }
        // Email
            if(window.location.href.indexOf("#hpe_$email") != -1){// First load
                window.location.href = '/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_email';	
            }
            if(window.location.href.indexOf("#hpe_email") != -1){ // Inside Ticket Page
                $('#submit2').click(function(){
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                $('#submit1').click(function(){
                    createCookie('hpe_ticket','Yes');
                });
                $('fieldset section').css('display','none');
                $('#subject').val('Change Email on Homepage');
                $('#message').attr('placeholder','Write new Email here...');
                $('.label.col.col-4').each(function(){
                    if($(this).text() == '* Issue, Request or Question') {
                        $(this).parent('.row').parent('section').css('display','block');
                    }
                });
            }
            if(window.location.href.indexOf("/list") != -1 && window.location.href.indexOf("lid=SupportTickets&") != -1 && readCookie('hpe_ticket') == 'Yes'){ // Inside Ticket List
                createCookie('hpe_poll_close','Yes');
                $('.my-form').css('display','none');
                $('.my-form').after('<div class="dpe_delete">Your request has been successfully submitted</div>');
                //setTimeout(function(){
                    //createCookie('hpe_poll_close','Yes');
                //},2000);
            }
        // Social
            if(window.location.href.indexOf("#hpe_$social") != -1){// First load
                window.location.href = '/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_social';	
            }
            if(window.location.href.indexOf("#hpe_social") != -1){ // Inside Ticket Page
                $('#submit2').click(function(){
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                $('#submit1').click(function(){
                    createCookie('hpe_ticket','Yes');
                });
                $('fieldset section').css('display','none');
                $('#subject').val('Change Social media links on Homepage');
                $('#message').attr('placeholder','Write Social media links here...');
                $('.label.col.col-4').each(function(){
                    $(this).css('display','none');
                    $(this).siblings('.col.col-10').css({'width':'90%', 'margin-left':'5%'});
                    if($(this).text() == '* Issue, Request or Question') {
                        $(this).parent('.row').parent('section').css('display','block');
                    }
                });
            }
            
        // Phone
            if(window.location.href.indexOf("#hpe_$phone") != -1){// First load
                window.location.href = '/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_phone';	
            }
            if(window.location.href.indexOf("#hpe_phone") != -1){ // Inside Ticket Page
                $('#submit2').click(function(){
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                $('#submit1').click(function(){
                    createCookie('hpe_ticket','Yes');
                });
                $('fieldset section').css('display','none');
                $('#subject').val('Change Phone number on Homepage');
                $('#message').attr('placeholder','Write new Phone number here...');
                $('.label.col.col-4').each(function(){
                    $(this).css('display','none');
                    $(this).siblings('.col.col-10').css({'width':'90%', 'margin-left':'5%'});
                    if($(this).text() == '* Issue, Request or Question') {
                        $(this).parent('.row').parent('section').css('display','block');
                    }
                });
            }
        // Bottom Links
            if(window.location.href.indexOf("#hpe_$bottom_links") != -1){// First load
                window.location.href = '/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_bottom_links';	
            }
            if(window.location.href.indexOf("#hpe_bottom_links") != -1){ // Inside Ticket Page
                $('#submit2').click(function(){
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                $('#submit1').click(function(){
                    createCookie('hpe_ticket','Yes');
                });
                $('fieldset section').css('display','none');
                $('#subject').val('Bottom Links on Homepage');
                $('#message').attr('placeholder','Write issue/request regarding links here..');
                $('.label.col.col-4').each(function(){
                    $(this).css('display','none');
                    $(this).siblings('.col.col-10').css({'width':'90%', 'margin-left':'5%'});
                    if($(this).text() == '* Issue, Request or Question') {
                        $(this).parent('.row').parent('section').css('display','block');
                    }
                });
            }
        // Top Links
            if(window.location.href.indexOf("#hpe_$top_links") != -1){// First load
                window.location.href = '/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_top_links';	
            }
            if(window.location.href.indexOf("#hpe_top_links") != -1){ // Inside Ticket Page
                $('#submit2').click(function(){
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                $('#submit1').click(function(){
                    createCookie('hpe_ticket','Yes');
                });
                $('fieldset section').css('display','none');
                $('#subject').val('Top Links on Homepage');
                $('#message').attr('placeholder','Write issue/request regarding links here..');
                $('.label.col.col-4').each(function(){
                    $(this).css('display','none');
                    $(this).siblings('.col.col-10').css({'width':'90%', 'margin-left':'5%'});
                    if($(this).text() == '* Issue, Request or Question') {
                        $(this).parent('.row').parent('section').css('display','block');
                    }
                });
            }
        // Google Custom Search
            if(window.location.href.indexOf("#hpe_$gsearch") != -1){// First load
                window.location.href = '/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_gsearch';	
            }
            if(window.location.href.indexOf("#hpe_gsearch") != -1){ // Inside Ticket Page
                $('#submit2').click(function(){
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                $('#submit1').click(function(){
                    createCookie('hpe_ticket','Yes');
                });
                $('fieldset section').css('display','none');
                $('#subject').val('Search box on Homepage');
                $('#message').attr('placeholder','Write issue/request regarding Search box here..');
                $('.label.col.col-4').each(function(){
                    $(this).css('display','none');
                    $(this).siblings('.col.col-10').css({'width':'90%', 'margin-left':'5%'});
                    if($(this).text() == '* Issue, Request or Question') {
                        $(this).parent('.row').parent('section').css('display','block');
                    }
                });
            }
        // Forms
            if(window.location.href.indexOf("#hpe_$formbody$$") != -1){// First load
                //var fnn = window.location.href.split('$$').pop();
                window.location.href = '/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_formbodys';	
            }
            if(window.location.href.indexOf("#hpe_formbodys") != -1){ // Inside Ticket Page
                var tfn = readCookie('hpe_formname');
                $('#submit2').click(function(){
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                $('#submit1').click(function(){
                    createCookie('hpe_ticket','Yes');
                });
                $('fieldset section').css('display','none');
                $('#subject').val(tfn + ' Form');
                $('#message').attr('placeholder','Write issue/request regarding this Form...');
                $('.label.col.col-4').each(function(){
                    if($(this).text() == '* Issue, Request or Question' || $(this).text() == 'Attachment') {
                        $(this).parent('.row').parent('section').css('display','block');
                    }
                });
            }
        // Service Package
            if(window.location.href.indexOf("#hpe_$spackage$$") != -1){// First load
                window.location.href = '/' + pfist + 'lid=SupportTickets&lid2=&level=1&pform=support_tickets&pkeyname=ticket_id&pkey=&fkeyname=&fkey=&eflag=Yes&wpage=&hpath=&smid=&u=&c=&lf=&x=#hpe_spackages';	
            }
            if(window.location.href.indexOf("#hpe_spackages") != -1){ // Inside Ticket Page
                //var tspn = readCookie('hpe_spname');
                $('#submit2').click(function(){
                    createCookie('hpe_cancel','Yes');
                    //createCookie('hpe_poll_close','Yes');
                });
                $('#submit1').click(function(){
                    createCookie('hpe_ticket','Yes');
                });
                $('fieldset section').css('display','none');
                $('#subject').val('Service Package');
                $('#message').attr('placeholder','Write issue/request regarding this Service Package...');
                $('.label.col.col-4').each(function(){
                    if($(this).text() == '* Issue, Request or Question' || $(this).text() == 'Attachment') {
                        $(this).parent('.row').parent('section').css('display','block');
                    }
                });
            }
        }); 
        
    // END: Home Page Editor(Site Manager)
