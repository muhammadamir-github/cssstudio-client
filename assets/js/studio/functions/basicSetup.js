function basicSetup(element){

    var previewbox = document.getElementById('previewbox');
    previewbox.style.display = 'block';

    // ---------------------- Edit Buttons -----------------------

    var editbuttons = document.createElement('div');
    editbuttons.setAttribute('class','eb');

    if(element == 'video' || element == 'image'){

        var editbutton_src = document.createElement('label');
        editbutton_src.addEventListener('click',function(){
            document.getElementsByClassName('sourcechangediv')[0].style.display = 'block';
        });
        editbutton_src.innerText = 'Src';
        
        var changesourcediv = document.createElement('div');
        changesourcediv.classList.add('sourcechangediv');

        var changesourcediv_input = document.createElement('input');
        changesourcediv_input.classList.add('input');
        changesourcediv_input.setAttribute('placeholder',"Enter "+element+" source here");
        changesourcediv_input.addEventListener('keyup',function(){

            var ele = document.getElementById('preview'+element);
            ele.setAttribute('src',this.value);

        });

        var changesource_ul = document.createElement('ul');
        var changesource_li = document.createElement('li');
        changesource_li.addEventListener('click',function(){
            changesourcediv.style.display = 'none';
        });
        changesource_ul.appendChild(changesource_li);

        changesourcediv.appendChild(changesourcediv_input);
        changesourcediv.appendChild(changesource_ul);

        previewbox.appendChild(changesourcediv);
        editbuttons.appendChild(editbutton_src);

    }else{

        var editbutton_text = document.createElement('label');
        editbutton_text.addEventListener('click',function(){
            document.getElementsByClassName('textchangediv')[0].style.display = 'block';
        });
        editbutton_text.innerText = 'Text';

        var changetextdiv = document.createElement('div');
        changetextdiv.classList.add('textchangediv');

        var changetext_input = document.createElement('input');
        changetext_input.classList.add('input');
        changetext_input.setAttribute('placeholder',"Enter text here");
        changetext_input.addEventListener('keyup',function(){
            var ele = document.getElementById('preview'+element);

            if(this.value == ''){

                if(element == 'input'){
                    ele.value = 'Preview '+element;
                }else{
                    ele.innerText = 'Preview '+element;
                }

            }else{

                if(element == 'input'){
                    ele.value = this.value;
                }else{
                    ele.innerText = this.value;
                }

            }

        });

        var changetext_ul = document.createElement('ul');
        var changetext_li = document.createElement('li');
        changetext_li.addEventListener('click',function(){
            changetextdiv.style.display = 'none';
        });
        changetext_ul.appendChild(changetext_li);

        changetextdiv.appendChild(changetext_input);
        changetextdiv.appendChild(changetext_ul);

        previewbox.appendChild(changetextdiv);
        editbuttons.appendChild(editbutton_text);

    }

    var editbutton_shape = document.createElement('label');
    editbutton_shape.addEventListener('click',function(){

        document.getElementsByClassName('shapechangediv')[0].style.display = 'block';
        document.getElementsByClassName('spinner')[0].style.display = 'block';

        setTimeout(function(){
            document.getElementsByClassName('shapechangediv')[0].style.opacity = '1';
            document.getElementsByClassName('spinner')[0].style.display = 'none';
        },500);

    });
    editbutton_shape.innerText = 'Shape';

    var changeshapediv = document.createElement('div');
    changeshapediv.classList.add('shapechangediv');

    var changeshapediv_ul = document.createElement('ul');

    var changeshapediv_ul_square = document.createElement('li');
    changeshapediv_ul_square.innerText = 'Square';
    changeshapediv_ul_square.addEventListener('click',function(){
        shape(element,'square');
    });

    var changeshapediv_ul_rectangle = document.createElement('li');
    changeshapediv_ul_rectangle.innerText = 'Rectangle';
    changeshapediv_ul_rectangle.addEventListener('click',function(){
        shape(element,'rectangle');
    });

    var changeshapediv_ul_circle = document.createElement('li');
    changeshapediv_ul_circle.innerText = 'Circle';
    changeshapediv_ul_circle.addEventListener('click',function(){
        shape(element,'circle');
    });

    var changeshapediv_ul_oval = document.createElement('li');
    changeshapediv_ul_oval.innerText = 'Oval';
    changeshapediv_ul_oval.addEventListener('click',function(){
        shape(element,'oval');
    });

    var changeshapediv_ul_trapezoid = document.createElement('li');
    changeshapediv_ul_trapezoid.innerText = 'Trapezoid';
    changeshapediv_ul_trapezoid.addEventListener('click',function(){
        shape(element,'trapezoid');
    });

    var changeshapediv_ul_parallelogram = document.createElement('li');
    changeshapediv_ul_parallelogram.innerText = 'Parallelogram';
    changeshapediv_ul_parallelogram.addEventListener('click',function(){
        shape(element,'parallelogram');
    });

    var changeshapediv_ul_triangle = document.createElement('li');
    changeshapediv_ul_triangle.innerText = 'Triangle';
    changeshapediv_ul_triangle.addEventListener('click',function(){
        shape(element,'triangle');
    });

    var changeshapediv_ul_warning = document.createElement('li');
    changeshapediv_ul_warning.innerText = 'Some styling properties might get reversed after changing the shape.';

    changeshapediv_ul.appendChild(changeshapediv_ul_square);
    changeshapediv_ul.appendChild(changeshapediv_ul_rectangle);
    changeshapediv_ul.appendChild(changeshapediv_ul_circle);
    changeshapediv_ul.appendChild(changeshapediv_ul_oval);
    changeshapediv_ul.appendChild(changeshapediv_ul_parallelogram);

    if(element == 'div' || element == 'button'){
        changeshapediv_ul.appendChild(changeshapediv_ul_triangle);
    }

    if(element == 'div'){
        changeshapediv_ul.appendChild(changeshapediv_ul_trapezoid);
    }

    changeshapediv_ul.appendChild(changeshapediv_ul_warning);
    changeshapediv.appendChild(changeshapediv_ul);

    previewbox.appendChild(changeshapediv);
    editbuttons.appendChild(editbutton_shape);

    //-------------------Edit Buttons End---------------------

    var previewboxbanner = document.createElement('banner');
    previewboxbannertext = document.createElement('h5');
    previewboxbannertext.innerText = 'Preview';
    previewboxbanner.appendChild(previewboxbannertext);
    previewbox.appendChild(previewboxbanner);

    var basicdivbanner = document.createElement('banner');
    basicdivbannertext = document.createElement('h5');
    basicdivbannertext.innerText = 'Basic';
    basicdivbanner.appendChild(basicdivbannertext);

    var basicdiv = document.createElement('div');
    basicdiv.setAttribute('id','basicdiv');
    basicdiv.appendChild(basicdivbanner);

    //-------FontSize--------

    var fontsize = document.createElement('combobox');
    fontsize.setAttribute('id','fontsize');
    fontsize.style.left = '10px';

    var fontsize_customedit = document.createElement('input');
    fontsize_customedit.classList.add('custom');

    var fontsize_selected = document.createElement('selected');
    var fontsize_selected_a = document.createElement('a');
    var fontsize_selected_a_span = document.createElement('span');
    fontsize_selected_a_span.innerText = 'Font Size';

    var fontsize_options = document.createElement('options');
    var fontsize_options_ul = document.createElement('ul');

    //------------------FontSize Options--------------------
    //-------------------------1----------------------------

    var fontsize_options_1 = document.createElement('li');

    var fontsize_options_1_a = document.createElement('a');
    fontsize_options_1_a.innerText = '8px';

    var fontsize_options_1_a_span = document.createElement('span');
    fontsize_options_1_a_span.innerText = '8';
    fontsize_options_1_a_span.setAttribute('class','value');

    fontsize_options_1_a.appendChild(fontsize_options_1_a_span);
    fontsize_options_1.appendChild(fontsize_options_1_a);

    fontsize_options_1.addEventListener('click',function(){
        tb(element,'fs',fontsize_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var fontsize_options_2 = document.createElement('li');
    var fontsize_options_2_a = document.createElement('a');
    fontsize_options_2_a.innerText = '12px';

    var fontsize_options_2_a_span = document.createElement('span');
    fontsize_options_2_a_span.innerText = '12';
    fontsize_options_2_a_span.setAttribute('class','value');

    fontsize_options_2_a.appendChild(fontsize_options_2_a_span);
    fontsize_options_2.appendChild(fontsize_options_2_a);

    fontsize_options_2.addEventListener('click',function(){
        tb(element,'fs',fontsize_options_2_a.innerText);
    });

    //-------------------------3----------------------------

    var fontsize_options_3 = document.createElement('li');
    var fontsize_options_3_a = document.createElement('a');
    fontsize_options_3_a.classList.add('lastoption');
    fontsize_options_3_a.innerText = '16px';

    var fontsize_options_3_a_span = document.createElement('span');
    fontsize_options_3_a_span.innerText = '16';
    fontsize_options_3_a_span.setAttribute('class','value');

    fontsize_options_3_a.appendChild(fontsize_options_3_a_span);
    fontsize_options_3.appendChild(fontsize_options_3_a);

    fontsize_options_3.addEventListener('click',function(){
        tb(element,'fs',fontsize_options_3_a.innerText);
    });

    //---------------FontSize Options End---------------------

    fontsize_selected_a.appendChild(fontsize_selected_a_span);
    fontsize_selected.appendChild(fontsize_selected_a);
    fontsize_selected.appendChild(fontsize_customedit);

    fontsize_options_ul.appendChild(fontsize_options_1);
    fontsize_options_ul.appendChild(fontsize_options_2);
    fontsize_options_ul.appendChild(fontsize_options_3);

    fontsize_options.appendChild(fontsize_options_ul);

    fontsize.appendChild(fontsize_selected);
    fontsize.appendChild(fontsize_options);

    //-----------------Event Handlers--------------------

    fontsize_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(fontsize_options.style.display == 'block'){

                fontsize_options.style.display = 'none';
                fontsize_options_ul.style.display = 'none';
                fontsize_customedit.style.display = 'none';
                fontsize_selected_a_span.style.textAlign = '';

            }else{

                fontsize_options.style.display = 'block';
                fontsize_options_ul.style.display = 'block';
                fontsize_customedit.style.display = 'block';
                fontsize_selected_a_span.style.textAlign = 'left';

            }

        }else{

        }

    });

    fontsize_customedit.addEventListener('keyup',function(){
        fontsize_selected_a_span.innerText = 'Font Size: ' + this.value+'px';
        updateElement(element,'fontsize',this.value+'px');
    });

    //-------End FontSize--------

    //------FontFamily-------

    var fontfamily = document.createElement('combobox');
    fontfamily.setAttribute('id','fontfamily');
    fontfamily.style.left = '200px';

    var fontfamily_selected = document.createElement('selected');
    var fontfamily_selected_a = document.createElement('a');
    var fontfamily_selected_a_span = document.createElement('span');
    fontfamily_selected_a_span.innerText = 'Font Family';

    var fontfamily_options = document.createElement('options');
    var fontfamily_options_ul = document.createElement('ul');

    //------------------FontFamily Options--------------------
    //-------------------------1----------------------------

    var fontfamily_options_1 = document.createElement('li');

    var fontfamily_options_1_a = document.createElement('a');
    fontfamily_options_1_a.innerText = 'Sans';
    fontfamily_options_1_a.style.fontFamily = 'Sans';

    var fontfamily_options_1_a_span = document.createElement('span');
    fontfamily_options_1_a_span.innerText = 'Sans';
    fontfamily_options_1_a_span.setAttribute('class','value');

    fontfamily_options_1_a.appendChild(fontfamily_options_1_a_span);
    fontfamily_options_1.appendChild(fontfamily_options_1_a);

    fontfamily_options_1.addEventListener('click',function(){
        tb(element,'ff',fontfamily_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var fontfamily_options_2 = document.createElement('li');
    var fontfamily_options_2_a = document.createElement('a');
    fontfamily_options_2_a.innerText = 'Sans-Serif';
    fontfamily_options_2_a.style.fontFamily = 'Sans-Serif';

    var fontfamily_options_2_a_span = document.createElement('span');
    fontfamily_options_2_a_span.innerText = 'Sans-Serif';
    fontfamily_options_2_a_span.setAttribute('class','value');

    fontfamily_options_2_a.appendChild(fontfamily_options_2_a_span);
    fontfamily_options_2.appendChild(fontfamily_options_2_a);

    fontfamily_options_2.addEventListener('click',function(){
        tb(element,'ff',fontfamily_options_2_a.innerText);
    });

    //-------------------------3----------------------------

    var fontfamily_options_3 = document.createElement('li');
    var fontfamily_options_3_a = document.createElement('a');
    fontfamily_options_3_a.innerText = 'Helvectia';
    fontfamily_options_3_a.style.fontFamily = 'Helvectia';

    var fontfamily_options_3_a_span = document.createElement('span');
    fontfamily_options_3_a_span.innerText = 'Helvectia';
    fontfamily_options_3_a_span.setAttribute('class','value');

    fontfamily_options_3_a.appendChild(fontfamily_options_3_a_span);
    fontfamily_options_3.appendChild(fontfamily_options_3_a);

    fontfamily_options_3.addEventListener('click',function(){
        tb(element,'ff',fontfamily_options_3_a.innerText);
    });

    //-------------------------4----------------------------

    var fontfamily_options_4 = document.createElement('li');
    var fontfamily_options_4_a = document.createElement('a');
    fontfamily_options_4_a.innerText = 'Monospace';
    fontfamily_options_4_a.style.fontFamily = 'Monospace';

    var fontfamily_options_4_a_span = document.createElement('span');
    fontfamily_options_4_a_span.innerText = 'Monospace';
    fontfamily_options_4_a_span.setAttribute('class','value');

    fontfamily_options_4_a.appendChild(fontfamily_options_4_a_span);
    fontfamily_options_4.appendChild(fontfamily_options_4_a);

    fontfamily_options_4.addEventListener('click',function(){
        tb(element,'ff',fontfamily_options_4_a.innerText);
    });

    //-------------------------5----------------------------

    var fontfamily_options_5 = document.createElement('li');
    var fontfamily_options_5_a = document.createElement('a');
    fontfamily_options_5_a.innerText = 'Cursive';
    fontfamily_options_5_a.style.fontFamily = 'Cursive';

    var fontfamily_options_5_a_span = document.createElement('span');
    fontfamily_options_5_a_span.innerText = 'Cursive';
    fontfamily_options_5_a_span.setAttribute('class','value');

    fontfamily_options_5_a.appendChild(fontfamily_options_5_a_span);
    fontfamily_options_5.appendChild(fontfamily_options_5_a);

    fontfamily_options_5.addEventListener('click',function(){
        tb(element,element,'ff',fontfamily_options_5_a.innerText);
    });

    //-------------------------6----------------------------

    var fontfamily_options_6 = document.createElement('li');
    var fontfamily_options_6_a = document.createElement('a');
    fontfamily_options_6_a.classList.add('lastoption');
    fontfamily_options_6_a.innerText = 'Fantasy';
    fontfamily_options_6_a.style.fontFamily = 'Fantasy';

    var fontfamily_options_6_a_span = document.createElement('span');
    fontfamily_options_6_a_span.innerText = 'Fantasy';
    fontfamily_options_6_a_span.setAttribute('class','value');

    fontfamily_options_6_a.appendChild(fontfamily_options_6_a_span);
    fontfamily_options_6.appendChild(fontfamily_options_6_a);

    fontfamily_options_6.addEventListener('click',function(){
        tb(element,'ff',fontfamily_options_6_a.innerText);
    });

    //---------------FontFamily Options End---------------------

    fontfamily_selected_a.appendChild(fontfamily_selected_a_span);
    fontfamily_selected.appendChild(fontfamily_selected_a);

    fontfamily_options_ul.appendChild(fontfamily_options_1);
    fontfamily_options_ul.appendChild(fontfamily_options_2);
    fontfamily_options_ul.appendChild(fontfamily_options_3);
    fontfamily_options_ul.appendChild(fontfamily_options_4);
    fontfamily_options_ul.appendChild(fontfamily_options_5);
    fontfamily_options_ul.appendChild(fontfamily_options_6);

    fontfamily_options.appendChild(fontfamily_options_ul);

    fontfamily.appendChild(fontfamily_selected);
    fontfamily.appendChild(fontfamily_options);

    //-----------------Event Handlers--------------------

    fontfamily_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(fontfamily_options.style.display == 'block'){

                fontfamily_options.style.display = 'none';
                fontfamily_options_ul.style.display = 'none';

            }else{

                fontfamily_options.style.display = 'block';
                fontfamily_options_ul.style.display = 'block';

            }

        }else{

        }

    });

    //-----End FontFamily------

    //------FontWeight-------

    var fontweight = document.createElement('combobox');
    fontweight.setAttribute('id','fontweight');
    fontweight.style.left = '390px';

    var fontweight_selected = document.createElement('selected');
    var fontweight_selected_a = document.createElement('a');
    var fontweight_selected_a_span = document.createElement('span');
    fontweight_selected_a_span.innerText = 'Font Weight';

    var fontweight_options = document.createElement('options');
    var fontweight_options_ul = document.createElement('ul');

    //------------------FontWeight Options--------------------
    //-------------------------1----------------------------

    var fontweight_options_1 = document.createElement('li');
    var fontweight_options_1_a = document.createElement('a');
    fontweight_options_1_a.innerText = 'Normal';
    fontweight_options_1_a.style.fontWeight = 'Normal';

    var fontweight_options_1_a_span = document.createElement('span');
    fontweight_options_1_a_span.innerText = 'Normal';
    fontweight_options_1_a_span.setAttribute('class','value');

    fontweight_options_1_a.appendChild(fontweight_options_1_a_span);
    fontweight_options_1.appendChild(fontweight_options_1_a);

    fontweight_options_1.addEventListener('click',function(){
        tb(element,'fw',fontweight_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var fontweight_options_2 = document.createElement('li');
    var fontweight_options_2_a = document.createElement('a');
    fontweight_options_2_a.classList.add('lastoption');
    fontweight_options_2_a.innerText = 'Bold';
    fontweight_options_2_a.style.fontWeight = 'Bold';

    var fontweight_options_2_a_span = document.createElement('span');
    fontweight_options_2_a_span.innerText = 'Bold';
    fontweight_options_2_a_span.setAttribute('class','value');

    fontweight_options_2_a.appendChild(fontweight_options_2_a_span);
    fontweight_options_2.appendChild(fontweight_options_2_a);

    fontweight_options_2.addEventListener('click',function(){
        tb(element,'fw',fontweight_options_2_a.innerText);
    });


    //---------------FontWeight Options End---------------------

    fontweight_selected_a.appendChild(fontweight_selected_a_span);
    fontweight_selected.appendChild(fontweight_selected_a);

    fontweight_options_ul.appendChild(fontweight_options_1);
    fontweight_options_ul.appendChild(fontweight_options_2);

    fontweight_options.appendChild(fontweight_options_ul);

    fontweight.appendChild(fontweight_selected);
    fontweight.appendChild(fontweight_options);

    //-----------------Event Handlers--------------------

    fontweight_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(fontweight_options.style.display == 'block'){

                fontweight_options.style.display = 'none';
                fontweight_options_ul.style.display = 'none';

            }else{

                fontweight_options.style.display = 'block';
                fontweight_options_ul.style.display = 'block';

            }

        }else{

        }

    });

    //-----End FontWeight------

    //------FontStyle-------

    var fontstyle = document.createElement('combobox');
    fontstyle.setAttribute('id','fontstyle');
    fontstyle.style.left = '580px';

    var fontstyle_selected = document.createElement('selected');
    var fontstyle_selected_a = document.createElement('a');
    var fontstyle_selected_a_span = document.createElement('span');
    fontstyle_selected_a_span.innerText = 'Font Style';

    var fontstyle_options = document.createElement('options');
    var fontstyle_options_ul = document.createElement('ul');

    //------------------FontStyle Options--------------------
    //-------------------------1----------------------------

    var fontstyle_options_1 = document.createElement('li');
    var fontstyle_options_1_a = document.createElement('a');
    fontstyle_options_1_a.innerText = 'Normal';
    fontstyle_options_1_a.style.fontStyle = 'Normal';

    var fontstyle_options_1_a_span = document.createElement('span');
    fontstyle_options_1_a_span.innerText = 'Normal';
    fontstyle_options_1_a_span.setAttribute('class','value');

    fontstyle_options_1_a.appendChild(fontstyle_options_1_a_span);
    fontstyle_options_1.appendChild(fontstyle_options_1_a);

    fontstyle_options_1.addEventListener('click',function(){
        tb(element,'fst',fontstyle_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var fontstyle_options_2 = document.createElement('li');
    var fontstyle_options_2_a = document.createElement('a');
    fontstyle_options_2_a.classList.add('lastoption');
    fontstyle_options_2_a.innerText = 'Italic';
    fontstyle_options_2_a.style.fontStyle = 'Italic';

    var fontstyle_options_2_a_span = document.createElement('span');
    fontstyle_options_2_a_span.innerText = 'Italic';
    fontstyle_options_2_a_span.setAttribute('class','value');

    fontstyle_options_2_a.appendChild(fontstyle_options_2_a_span);
    fontstyle_options_2.appendChild(fontstyle_options_2_a);

    fontstyle_options_2.addEventListener('click',function(){
        tb(element,'fst',fontstyle_options_2_a.innerText);
    });


    //---------------FontStyle Options End---------------------

    fontstyle_selected_a.appendChild(fontstyle_selected_a_span);
    fontstyle_selected.appendChild(fontstyle_selected_a);

    fontstyle_options_ul.appendChild(fontstyle_options_1);
    fontstyle_options_ul.appendChild(fontstyle_options_2);

    fontstyle_options.appendChild(fontstyle_options_ul);

    fontstyle.appendChild(fontstyle_selected);
    fontstyle.appendChild(fontstyle_options);

    //-----------------Event Handlers--------------------

    fontstyle_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(fontstyle_options.style.display == 'block'){

                fontstyle_options.style.display = 'none';
                fontstyle_options_ul.style.display = 'none';

            }else{

                fontstyle_options.style.display = 'block';
                fontstyle_options_ul.style.display = 'block';

            }

        }else{

        }

    });

    //-----End FontStyle------

    //------FontVariant-------

    var fontvariant = document.createElement('combobox');
    fontvariant.setAttribute('id','fontvariant');
    fontvariant.style.left = '770px';

    var fontvariant_selected = document.createElement('selected');
    var fontvariant_selected_a = document.createElement('a');
    var fontvariant_selected_a_span = document.createElement('span');
    fontvariant_selected_a_span.innerText = 'Font Variant';

    var fontvariant_options = document.createElement('options');
    var fontvariant_options_ul = document.createElement('ul');

    //------------------FontVariant Options--------------------
    //-------------------------1----------------------------

    var fontvariant_options_1 = document.createElement('li');
    var fontvariant_options_1_a = document.createElement('a');
    fontvariant_options_1_a.innerText = 'Normal';
    fontvariant_options_1_a.style.fontVariant = 'Normal';

    var fontvariant_options_1_a_span = document.createElement('span');
    fontvariant_options_1_a_span.innerText = 'Normal';
    fontvariant_options_1_a_span.setAttribute('class','value');

    fontvariant_options_1_a.appendChild(fontvariant_options_1_a_span);
    fontvariant_options_1.appendChild(fontvariant_options_1_a);

    fontvariant_options_1.addEventListener('click',function(){
        tb(element,'fv',fontvariant_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var fontvariant_options_2 = document.createElement('li');
    var fontvariant_options_2_a = document.createElement('a');
    fontvariant_options_2_a.innerText = 'Small-Caps';
    fontvariant_options_2_a.style.fontVariant = 'Small-Caps';
    fontvariant_options_2_a.classList.add('lastoption');

    var fontvariant_options_2_a_span = document.createElement('span');
    fontvariant_options_2_a_span.innerText = 'Small-Caps';
    fontvariant_options_2_a_span.setAttribute('class','value');

    fontvariant_options_2_a.appendChild(fontvariant_options_2_a_span);
    fontvariant_options_2.appendChild(fontvariant_options_2_a);

    fontvariant_options_2.addEventListener('click',function(){
        tb(element,'fv',fontvariant_options_2_a.innerText);
    });


    //---------------FontVariant Options End---------------------

    fontvariant_selected_a.appendChild(fontvariant_selected_a_span);
    fontvariant_selected.appendChild(fontvariant_selected_a);

    fontvariant_options_ul.appendChild(fontvariant_options_1);
    fontvariant_options_ul.appendChild(fontvariant_options_2);

    fontvariant_options.appendChild(fontvariant_options_ul);

    fontvariant.appendChild(fontvariant_selected);
    fontvariant.appendChild(fontvariant_options);

    //-----------------Event Handlers--------------------

    fontvariant_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(fontvariant_options.style.display == 'block'){

                fontvariant_options.style.display = 'none';
                fontvariant_options_ul.style.display = 'none';

            }else{

                fontvariant_options.style.display = 'block';
                fontvariant_options_ul.style.display = 'block';

            }

        }else{

        }

    });

    //-----End FontVariant------

    //------FontStretch-------

    var fontstretch = document.createElement('combobox');
    fontstretch.setAttribute('id','fontstretch');
    fontstretch.style.left = '10px';
    fontstretch.style.top = '70px';
    fontstretch.style.zIndex = '4';

    var fontstretch_selected = document.createElement('selected');
    var fontstretch_selected_a = document.createElement('a');
    var fontstretch_selected_a_span = document.createElement('span');
    fontstretch_selected_a_span.innerText = 'Font Stretch';

    var fontstretch_options = document.createElement('options');
    var fontstretch_options_ul = document.createElement('ul');

    //------------------FontStretch Options--------------------
    //-------------------------1----------------------------

    var fontstretch_options_1 = document.createElement('li');
    var fontstretch_options_1_a = document.createElement('a');
    fontstretch_options_1_a.innerText = 'Normal';
    fontstretch_options_1_a.style.fontStretch = 'Normal';

    var fontstretch_options_1_a_span = document.createElement('span');
    fontstretch_options_1_a_span.innerText = 'Normal';
    fontstretch_options_1_a_span.setAttribute('class','value');

    fontstretch_options_1_a.appendChild(fontstretch_options_1_a_span);
    fontstretch_options_1.appendChild(fontstretch_options_1_a);

    fontstretch_options_1.addEventListener('click',function(){
        tb(element,'fstr',fontstretch_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var fontstretch_options_2 = document.createElement('li');
    var fontstretch_options_2_a = document.createElement('a');
    fontstretch_options_2_a.innerText = 'Condensed';
    fontstretch_options_2_a.style.fontStretch = 'Condensed';

    var fontstretch_options_2_a_span = document.createElement('span');
    fontstretch_options_2_a_span.innerText = 'Condensed';
    fontstretch_options_2_a_span.setAttribute('class','value');

    fontstretch_options_2_a.appendChild(fontstretch_options_2_a_span);
    fontstretch_options_2.appendChild(fontstretch_options_2_a);

    fontstretch_options_2.addEventListener('click',function(){
        tb(element,'fstr',fontstretch_options_2_a.innerText);
    });

    //-------------------------3----------------------------

    var fontstretch_options_3 = document.createElement('li');
    var fontstretch_options_3_a = document.createElement('a');
    fontstretch_options_3_a.innerText = 'Expanded';
    fontstretch_options_3_a.style.fontStretch = 'Expanded';
    fontstretch_options_3_a.classList.add('lastoption');

    var fontstretch_options_3_a_span = document.createElement('span');
    fontstretch_options_3_a_span.innerText = 'Expanded';
    fontstretch_options_3_a_span.setAttribute('class','value');

    fontstretch_options_3_a.appendChild(fontstretch_options_3_a_span);
    fontstretch_options_3.appendChild(fontstretch_options_3_a);

    fontstretch_options_3.addEventListener('click',function(){
        tb(element,'fstr',fontstretch_options_3_a.innerText);
    });

    //---------------FontStretch Options End---------------------

    fontstretch_selected_a.appendChild(fontstretch_selected_a_span);
    fontstretch_selected.appendChild(fontstretch_selected_a);

    fontstretch_options_ul.appendChild(fontstretch_options_1);
    fontstretch_options_ul.appendChild(fontstretch_options_2);
    fontstretch_options_ul.appendChild(fontstretch_options_3);

    fontstretch_options.appendChild(fontstretch_options_ul);

    fontstretch.appendChild(fontstretch_selected);
    fontstretch.appendChild(fontstretch_options);

    //-----------------Event Handlers--------------------

    fontstretch_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(fontstretch_options.style.display == 'block'){

                fontstretch_options.style.display = 'none';
                fontstretch_options_ul.style.display = 'none';

            }else{

                fontstretch_options.style.display = 'block';
                fontstretch_options_ul.style.display = 'block';

            }

        }else{

        }

    });

    //-----End FontStretch------

    //------FontColor-------

    var fontcolor = document.createElement('combobox');
    fontcolor.setAttribute('id','fontcolor');
    fontcolor.style.left = '10px';
    fontcolor.style.top = '140px';
    fontcolor.style.zIndex = '3';

    var fontcolor_selected = document.createElement('selected');
    var fontcolor_selected_a = document.createElement('a');
    var fontcolor_selected_a_span = document.createElement('span');
    fontcolor_selected_a_span.innerText = 'Font Color';

    var fontcolor_colordisplay = document.createElement('colordisplay');
    fontcolor_colordisplay.setAttribute('id','fcd');
    fontcolor_colordisplay.style.display = 'none';
    fontcolor_colordisplay.addEventListener('click',function(){

        var colorpicker = document.getElementById('fcp');

        if(colorpicker.style.display == 'block'){

            colorpicker.style.display = 'none';

        }else{

            colorpicker.style.display = 'block';

        }

    });

    var fontcolor_colorpicker = document.createElement('div');
    fontcolor_colorpicker.setAttribute('class','colorpicker');
    fontcolor_colorpicker.setAttribute('id','fcp');

    var fontcolor_colorpicker_box = document.createElement('canvas');
    fontcolor_colorpicker_box.setAttribute('class','colorpickerbox');
    fontcolor_colorpicker_box.setAttribute('id','fcpb');

    var fontcolor_colorpicker_strip = document.createElement('canvas');
    fontcolor_colorpicker_strip.setAttribute('class','colorpickerstrip');
    fontcolor_colorpicker_strip.setAttribute('id','fcps');

    var fontcolor_colorpicker_input_rgba = document.createElement('input');
    fontcolor_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
    fontcolor_colorpicker_input_rgba.setAttribute('id','fcprgba');
    fontcolor_colorpicker_input_rgba.addEventListener('input',function(){
        textToColorPickerColor(this,'color',element);
    });

    var fontcolor_colorpicker_input_hex = document.createElement('input');
    fontcolor_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
    fontcolor_colorpicker_input_hex.setAttribute('id','fcphex');
    fontcolor_colorpicker_input_hex.addEventListener('input',function(){
        textToColorPickerColor(this,'color',element);
    });

    fontcolor_colorpicker.appendChild(fontcolor_colorpicker_box);
    fontcolor_colorpicker.appendChild(fontcolor_colorpicker_strip);
    fontcolor_colorpicker.appendChild(fontcolor_colorpicker_input_rgba);
    fontcolor_colorpicker.appendChild(fontcolor_colorpicker_input_hex);

    fontcolor_selected_a.appendChild(fontcolor_selected_a_span);
    fontcolor_selected.appendChild(fontcolor_selected_a);
    fontcolor_selected.appendChild(fontcolor_colordisplay);
    fontcolor_selected.appendChild(fontcolor_colorpicker);

    fontcolor.appendChild(fontcolor_selected);

    //-----------------Event Handlers--------------------

    fontcolor_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(fontcolor_colordisplay.style.display == 'block'){

                fontcolor_colordisplay.style.display = 'none';
                fontcolor.style.textAlign = '';

            }else{

                fontcolor_colordisplay.style.display = 'block';
                fontcolor.style.textAlign = 'left';

            }

        }else{

        }

    });

    //-----End FontColor------

    //------BackgroundColor-------

    var backgroundcolor = document.createElement('combobox');
    backgroundcolor.setAttribute('id','backgroundcolor');
    backgroundcolor.style.left = '200px';
    backgroundcolor.style.top = '140px';
    backgroundcolor.style.zIndex = '3';

    var backgroundcolor_selected = document.createElement('selected');
    var backgroundcolor_selected_a = document.createElement('a');
    var backgroundcolor_selected_a_span = document.createElement('span');
    backgroundcolor_selected_a_span.innerText = 'Background Color';
    backgroundcolor_selected_a_span.style.fontSize = '12px';

    var backgroundcolor_colordisplay = document.createElement('colordisplay');
    backgroundcolor_colordisplay.setAttribute('id','bgcd');
    backgroundcolor_colordisplay.style.display = 'none';
    backgroundcolor_colordisplay.addEventListener('click',function(){

        var colorpicker = document.getElementById('bgcp');

        if(colorpicker.style.display == 'block'){

            colorpicker.style.display = 'none';

        }else{

            colorpicker.style.display = 'block';

        }

    });

    var backgroundcolor_colorpicker = document.createElement('div');
    backgroundcolor_colorpicker.setAttribute('class','colorpicker');
    backgroundcolor_colorpicker.setAttribute('id','bgcp');

    var backgroundcolor_colorpicker_box = document.createElement('canvas');
    backgroundcolor_colorpicker_box.setAttribute('class','colorpickerbox');
    backgroundcolor_colorpicker_box.setAttribute('id','bgcpb');

    var backgroundcolor_colorpicker_strip = document.createElement('canvas');
    backgroundcolor_colorpicker_strip.setAttribute('class','colorpickerstrip');
    backgroundcolor_colorpicker_strip.setAttribute('id','bgcps');

    var backgroundcolor_colorpicker_input_rgba = document.createElement('input');
    backgroundcolor_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
    backgroundcolor_colorpicker_input_rgba.setAttribute('id','bgcprgba');
    backgroundcolor_colorpicker_input_rgba.addEventListener('input',function(){
        textToColorPickerColor(this,'background-color',element);
    });


    var backgroundcolor_colorpicker_input_hex = document.createElement('input');
    backgroundcolor_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
    backgroundcolor_colorpicker_input_hex.setAttribute('id','bgcphex');
    backgroundcolor_colorpicker_input_hex.addEventListener('input',function(){
        textToColorPickerColor(this,'background-color',element);
    });

    backgroundcolor_colorpicker.appendChild(backgroundcolor_colorpicker_box);
    backgroundcolor_colorpicker.appendChild(backgroundcolor_colorpicker_strip);
    backgroundcolor_colorpicker.appendChild(backgroundcolor_colorpicker_input_rgba);
    backgroundcolor_colorpicker.appendChild(backgroundcolor_colorpicker_input_hex);

    backgroundcolor_selected_a.appendChild(backgroundcolor_selected_a_span);
    backgroundcolor_selected.appendChild(backgroundcolor_selected_a);
    backgroundcolor_selected.appendChild(backgroundcolor_colordisplay);
    backgroundcolor_selected.appendChild(backgroundcolor_colorpicker);

    backgroundcolor.appendChild(backgroundcolor_selected);

    //-----------------Event Handlers--------------------

    backgroundcolor_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(backgroundcolor_colordisplay.style.display == 'block'){

                backgroundcolor_colordisplay.style.display = 'none';
                backgroundcolor.style.textAlign = '';

            }else{

                backgroundcolor_colordisplay.style.display = 'block';
                backgroundcolor.style.textAlign = 'left';

            }

        }else{

        }

    });

    //-----End BackgroundColor------

    //------BorderColor-------

    var bordercolor = document.createElement('combobox');
    bordercolor.setAttribute('id','bordercolor');
    bordercolor.style.left = '390px';
    bordercolor.style.top = '140px';
    bordercolor.style.zIndex = '3';

    var bordercolor_selected = document.createElement('selected');
    var bordercolor_selected_a = document.createElement('a');
    var bordercolor_selected_a_span = document.createElement('span');
    bordercolor_selected_a_span.innerText = 'Border Color';
    bordercolor_selected_a_span.style.fontSize = '12px';

    var bordercolor_colordisplay = document.createElement('colordisplay');
    bordercolor_colordisplay.setAttribute('id','bcd');
    bordercolor_colordisplay.style.display = 'none';
    bordercolor_colordisplay.addEventListener('click',function(){

        var colorpicker = document.getElementById('bcp');

        if(colorpicker.style.display == 'block'){

            colorpicker.style.display = 'none';

        }else{

            colorpicker.style.display = 'block';

        }

    });

    var bordercolor_colorpicker = document.createElement('div');
    bordercolor_colorpicker.setAttribute('class','colorpicker');
    bordercolor_colorpicker.setAttribute('id','bcp');

    var bordercolor_colorpicker_box = document.createElement('canvas');
    bordercolor_colorpicker_box.setAttribute('class','colorpickerbox');
    bordercolor_colorpicker_box.setAttribute('id','bcpb');

    var bordercolor_colorpicker_strip = document.createElement('canvas');
    bordercolor_colorpicker_strip.setAttribute('class','colorpickerstrip');
    bordercolor_colorpicker_strip.setAttribute('id','bcps');

    var bordercolor_colorpicker_input_rgba = document.createElement('input');
    bordercolor_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
    bordercolor_colorpicker_input_rgba.setAttribute('id','bcprgba');
    bordercolor_colorpicker_input_rgba.addEventListener('input',function(){
        textToColorPickerColor(this,'border-color',element);
    });

    var bordercolor_colorpicker_input_hex = document.createElement('input');
    bordercolor_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
    bordercolor_colorpicker_input_hex.setAttribute('id','bcphex');
    bordercolor_colorpicker_input_hex.addEventListener('input',function(){
        textToColorPickerColor(this,'border-color',element);
    });

    bordercolor_colorpicker.appendChild(bordercolor_colorpicker_box);
    bordercolor_colorpicker.appendChild(bordercolor_colorpicker_strip);
    bordercolor_colorpicker.appendChild(bordercolor_colorpicker_input_rgba);
    bordercolor_colorpicker.appendChild(bordercolor_colorpicker_input_hex);

    bordercolor_selected_a.appendChild(bordercolor_selected_a_span);
    bordercolor_selected.appendChild(bordercolor_selected_a);
    bordercolor_selected.appendChild(bordercolor_colordisplay);
    bordercolor_selected.appendChild(bordercolor_colorpicker);

    bordercolor.appendChild(bordercolor_selected);

    //-----------------Event Handlers--------------------

    bordercolor_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(bordercolor_colordisplay.style.display == 'block'){

                bordercolor_colordisplay.style.display = 'none';
                bordercolor.style.textAlign = '';

            }else{

                bordercolor_colordisplay.style.display = 'block';
                bordercolor.style.textAlign = 'left';

            }

        }else{

        }

    });

    //-----End BorderColor------

    //------TextAlign-------

    var textalign = document.createElement('combobox');
    textalign.setAttribute('id','textalign');
    textalign.style.left = '200px';
    textalign.style.top = '70px';
    textalign.style.zIndex = '4';

    var textalign_selected = document.createElement('selected');
    var textalign_selected_a = document.createElement('a');
    var textalign_selected_a_span = document.createElement('span');
    textalign_selected_a_span.innerText = 'Text Align';

    var textalign_options = document.createElement('options');
    var textalign_options_ul = document.createElement('ul');

    //------------------TextAlign Options--------------------
    //-------------------------1----------------------------

    var textalign_options_1 = document.createElement('li');
    var textalign_options_1_a = document.createElement('a');
    textalign_options_1_a.innerText = 'Center';
    textalign_options_1_a.style.textAlign = 'Center';

    var textalign_options_1_a_span = document.createElement('span');
    textalign_options_1_a_span.innerText = 'Center';
    textalign_options_1_a_span.setAttribute('class','value');

    textalign_options_1_a.appendChild(textalign_options_1_a_span);
    textalign_options_1.appendChild(textalign_options_1_a);

    textalign_options_1.addEventListener('click',function(){
        tb(element,'ta',textalign_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var textalign_options_2 = document.createElement('li');
    var textalign_options_2_a = document.createElement('a');
    textalign_options_2_a.innerText = 'Left';
    textalign_options_2_a.style.textAlign = 'Left';

    var textalign_options_2_a_span = document.createElement('span');
    textalign_options_2_a_span.innerText = 'Left';
    textalign_options_2_a_span.setAttribute('class','value');

    textalign_options_2_a.appendChild(textalign_options_2_a_span);
    textalign_options_2.appendChild(textalign_options_2_a);

    textalign_options_2.addEventListener('click',function(){
        tb(element,'ta',textalign_options_2_a.innerText);
    });

    //-------------------------3----------------------------

    var textalign_options_3 = document.createElement('li');
    var textalign_options_3_a = document.createElement('a');
    textalign_options_3_a.innerText = 'Right';
    textalign_options_3_a.style.textAlign = 'Right';
    textalign_options_3_a.classList.add('lastoption');

    var textalign_options_3_a_span = document.createElement('span');
    textalign_options_3_a_span.innerText = 'Right';
    textalign_options_3_a_span.setAttribute('class','value');

    textalign_options_3_a.appendChild(textalign_options_3_a_span);
    textalign_options_3.appendChild(textalign_options_3_a);

    textalign_options_3.addEventListener('click',function(){
        tb(element,'ta',textalign_options_3_a.innerText);
    });


    //---------------TextAlign Options End---------------------

    textalign_selected_a.appendChild(textalign_selected_a_span);
    textalign_selected.appendChild(textalign_selected_a);

    textalign_options_ul.appendChild(textalign_options_1);
    textalign_options_ul.appendChild(textalign_options_2);
    textalign_options_ul.appendChild(textalign_options_3);

    textalign_options.appendChild(textalign_options_ul);

    textalign.appendChild(textalign_selected);
    textalign.appendChild(textalign_options);

    //-----------------Event Handlers--------------------

    textalign_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(textalign_options.style.display == 'block'){

                textalign_options.style.display = 'none';
                textalign_options_ul.style.display = 'none';

            }else{

                textalign_options.style.display = 'block';
                textalign_options_ul.style.display = 'block';

            }

        }else{

        }

    });

    //-----End TextAlign------

    //------TextDecoration-------

    var textdecoration = document.createElement('combobox');
    textdecoration.setAttribute('id','textdecoration');
    textdecoration.style.left = '390px';
    textdecoration.style.top = '70px';
    textdecoration.style.zIndex = '4';

    var textdecoration_selected = document.createElement('selected');
    var textdecoration_selected_a = document.createElement('a');
    var textdecoration_selected_a_span = document.createElement('span');
    textdecoration_selected_a_span.innerText = 'Text Decoration';

    var textdecoration_options = document.createElement('options');
    var textdecoration_options_ul = document.createElement('ul');

    var textdecoration_colordisplay = document.createElement('colordisplay');
    textdecoration_colordisplay.setAttribute('id','tdcd');
    textdecoration_colordisplay.style.top = '15px';
    textdecoration_colordisplay.style.display = 'none';
    textdecoration_colordisplay.addEventListener('click',function(){

        var colorpicker = document.getElementById('tdcp');

        if(colorpicker.style.display == 'block'){

            colorpicker.style.display = 'none';

        }else{

            colorpicker.style.display = 'block';

        }

    });

    var textdecoration_colorpicker = document.createElement('div');
    textdecoration_colorpicker.setAttribute('class','colorpicker');
    textdecoration_colorpicker.setAttribute('id','tdcp');

    var textdecoration_colorpicker_box = document.createElement('canvas');
    textdecoration_colorpicker_box.setAttribute('class','colorpickerbox');
    textdecoration_colorpicker_box.setAttribute('id','tdcpb');

    var textdecoration_colorpicker_strip = document.createElement('canvas');
    textdecoration_colorpicker_strip.setAttribute('class','colorpickerstrip');
    textdecoration_colorpicker_strip.setAttribute('id','tdcps');

    var textdecoration_colorpicker_input_rgba = document.createElement('input');
    textdecoration_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
    textdecoration_colorpicker_input_rgba.setAttribute('id','tdcprgba');
    textdecoration_colorpicker_input_rgba.addEventListener('input',function(){
        textToColorPickerColor(this,'text-decoration-color',element);
    });

    var textdecoration_colorpicker_input_hex = document.createElement('input');
    textdecoration_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
    textdecoration_colorpicker_input_hex.setAttribute('id','tdcphex');
    textdecoration_colorpicker_input_hex.addEventListener('input',function(){
        textToColorPickerColor(this,'text-decoration-color',element);
    });

    textdecoration_colorpicker.appendChild(textdecoration_colorpicker_box);
    textdecoration_colorpicker.appendChild(textdecoration_colorpicker_strip);
    textdecoration_colorpicker.appendChild(textdecoration_colorpicker_input_rgba);
    textdecoration_colorpicker.appendChild(textdecoration_colorpicker_input_hex);

    //------------------TextDecoration Options--------------------
    //-------------------------1----------------------------

    var textdecoration_options_1 = document.createElement('li');
    var textdecoration_options_1_a = document.createElement('a');
    textdecoration_options_1_a.innerText = 'Overline';
    textdecoration_options_1_a.style.textDecoration = 'Overline';

    var textdecoration_options_1_a_span = document.createElement('span');
    textdecoration_options_1_a_span.innerText = 'Overline';
    textdecoration_options_1_a_span.setAttribute('class','value');

    textdecoration_options_1_a.appendChild(textdecoration_options_1_a_span);
    textdecoration_options_1.appendChild(textdecoration_options_1_a);

    textdecoration_options_1.addEventListener('click',function(){
        tb(element,'td',textdecoration_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var textdecoration_options_2 = document.createElement('li');
    var textdecoration_options_2_a = document.createElement('a');
    textdecoration_options_2_a.innerText = 'Line-Through';
    textdecoration_options_2_a.style.textDecoration = 'Line-Through';

    var textdecoration_options_2_a_span = document.createElement('span');
    textdecoration_options_2_a_span.innerText = 'Line-Through';
    textdecoration_options_2_a_span.setAttribute('class','value');

    textdecoration_options_2_a.appendChild(textdecoration_options_2_a_span);
    textdecoration_options_2.appendChild(textdecoration_options_2_a);

    textdecoration_options_2.addEventListener('click',function(){
        tb(element,'td',textdecoration_options_2_a.innerText);
    });

    //-------------------------3----------------------------

    var textdecoration_options_3 = document.createElement('li');
    var textdecoration_options_3_a = document.createElement('a');
    textdecoration_options_3_a.innerText = 'Underline';
    textdecoration_options_3_a.style.textDecoration = 'Underline';

    var textdecoration_options_3_a_span = document.createElement('span');
    textdecoration_options_3_a_span.innerText = 'Underline';
    textdecoration_options_3_a_span.setAttribute('class','value');

    textdecoration_options_3_a.appendChild(textdecoration_options_3_a_span);
    textdecoration_options_3.appendChild(textdecoration_options_3_a);

    textdecoration_options_3.addEventListener('click',function(){
        tb(element,'td',textdecoration_options_3_a.innerText);
    });

    //-------------------------4----------------------------

    var textdecoration_options_4 = document.createElement('li');
    var textdecoration_options_4_a = document.createElement('a');
    textdecoration_options_4_a.innerText = 'Underline Overline';
    textdecoration_options_4_a.style.textDecoration = 'Underline Overline';

    var textdecoration_options_4_a_span = document.createElement('span');
    textdecoration_options_4_a_span.innerText = 'Underline Overline';
    textdecoration_options_4_a_span.setAttribute('class','value');

    textdecoration_options_4_a.appendChild(textdecoration_options_4_a_span);
    textdecoration_options_4.appendChild(textdecoration_options_4_a);

    textdecoration_options_4.addEventListener('click',function(){
        tb(element,'td',textdecoration_options_4_a.innerText);
    });

    //-------------------------5----------------------------

    var textdecoration_options_5 = document.createElement('li');
    var textdecoration_options_5_a = document.createElement('a');
    textdecoration_options_5_a.innerText = 'None';
    textdecoration_options_5_a.style.textDecoration = 'None';
    textdecoration_options_5_a.classList.add('lastoption');

    var textdecoration_options_5_a_span = document.createElement('span');
    textdecoration_options_5_a_span.innerText = 'None';
    textdecoration_options_5_a_span.setAttribute('class','value');

    textdecoration_options_5_a.appendChild(textdecoration_options_5_a_span);
    textdecoration_options_5.appendChild(textdecoration_options_5_a);

    textdecoration_options_5.addEventListener('click',function(){
        tb(element,'td',textdecoration_options_5_a.innerText);
    });

    //---------------TextDecoration Options End---------------------

    textdecoration_selected_a.appendChild(textdecoration_selected_a_span);
    textdecoration_selected.appendChild(textdecoration_selected_a);
    textdecoration_selected.appendChild(textdecoration_colorpicker);
    textdecoration_selected.appendChild(textdecoration_colordisplay);

    textdecoration_options_ul.appendChild(textdecoration_options_1);
    textdecoration_options_ul.appendChild(textdecoration_options_2);
    textdecoration_options_ul.appendChild(textdecoration_options_3);
    textdecoration_options_ul.appendChild(textdecoration_options_4);
    textdecoration_options_ul.appendChild(textdecoration_options_5);

    textdecoration_options.appendChild(textdecoration_options_ul);

    textdecoration.appendChild(textdecoration_selected);
    textdecoration.appendChild(textdecoration_options);

    //-----------------Event Handlers--------------------

    textdecoration_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(textdecoration_options.style.display == 'block'){

                textdecoration_options.style.display = 'none';
                textdecoration_options_ul.style.display = 'none';
                textdecoration_colordisplay.style.display = 'none';

                textdecoration_selected_a_span.style.textAlign = '';
                textdecoration_selected_a_span.style.fontSize = '';
                textdecoration_selected_a_span.style.width = '';

            }else{

                textdecoration_options.style.display = 'block';
                textdecoration_options_ul.style.display = 'block';
                textdecoration_colordisplay.style.display = 'block';

                textdecoration_selected_a_span.style.textAlign = 'Left';
                textdecoration_selected_a_span.style.fontSize = '10px';
                textdecoration_selected_a_span.style.width = '100px';

            }

        }else{

        }

    });

    //-----End TextDecoration------

    //------TextDecorationStyle-------

    var textdecorationstyle = document.createElement('combobox');
    textdecorationstyle.setAttribute('id','textdecorationstyle');
    textdecorationstyle.style.left = '580px';
    textdecorationstyle.style.top = '70px';
    textdecorationstyle.style.zIndex = '4';

    var textdecorationstyle_selected = document.createElement('selected');
    var textdecorationstyle_selected_a = document.createElement('a');
    var textdecorationstyle_selected_a_span = document.createElement('span');
    textdecorationstyle_selected_a_span.innerText = 'Text Decoration Style';

    var textdecorationstyle_options = document.createElement('options');
    var textdecorationstyle_options_ul = document.createElement('ul');

    //------------------TextDecorationStyle Options--------------------
    //-------------------------1----------------------------

    var textdecorationstyle_options_1 = document.createElement('li');
    var textdecorationstyle_options_1_a = document.createElement('a');
    textdecorationstyle_options_1_a.innerText = 'Solid';

    textdecorationstyle_options_1_a.style.textDecoration = 'Underline Solid';

    var textdecorationstyle_options_1_a_span = document.createElement('span');
    textdecorationstyle_options_1_a_span.innerText = 'Solid';
    textdecorationstyle_options_1_a_span.setAttribute('class','value');

    textdecorationstyle_options_1_a.appendChild(textdecorationstyle_options_1_a_span);
    textdecorationstyle_options_1.appendChild(textdecorationstyle_options_1_a);

    textdecorationstyle_options_1.addEventListener('click',function(){
        tb(element,'tds',textdecorationstyle_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var textdecorationstyle_options_2 = document.createElement('li');
    var textdecorationstyle_options_2_a = document.createElement('a');
    textdecorationstyle_options_2_a.innerText = 'Double';

    textdecorationstyle_options_2_a.style.textDecoration = 'Underline Double';

    var textdecorationstyle_options_2_a_span = document.createElement('span');
    textdecorationstyle_options_2_a_span.innerText = 'Double';
    textdecorationstyle_options_2_a_span.setAttribute('class','value');

    textdecorationstyle_options_2_a.appendChild(textdecorationstyle_options_2_a_span);
    textdecorationstyle_options_2.appendChild(textdecorationstyle_options_2_a);

    textdecorationstyle_options_2.addEventListener('click',function(){
        tb(element,'tds',textdecorationstyle_options_2_a.innerText);
    });

    //-------------------------3----------------------------

    var textdecorationstyle_options_3 = document.createElement('li');
    var textdecorationstyle_options_3_a = document.createElement('a');
    textdecorationstyle_options_3_a.innerText = 'Dotted';

    textdecorationstyle_options_3_a.style.textDecoration = 'Underline Dotted';

    var textdecorationstyle_options_3_a_span = document.createElement('span');
    textdecorationstyle_options_3_a_span.innerText = 'Dotted';
    textdecorationstyle_options_3_a_span.setAttribute('class','value');

    textdecorationstyle_options_3_a.appendChild(textdecorationstyle_options_3_a_span);
    textdecorationstyle_options_3.appendChild(textdecorationstyle_options_3_a);

    textdecorationstyle_options_3.addEventListener('click',function(){
        tb(element,'tds',textdecorationstyle_options_3_a.innerText);
    });

    //-------------------------4----------------------------

    var textdecorationstyle_options_4 = document.createElement('li');
    var textdecorationstyle_options_4_a = document.createElement('a');
    textdecorationstyle_options_4_a.innerText = 'Dashed';

    textdecorationstyle_options_4_a.style.textDecoration = 'Underline Dashed';

    var textdecorationstyle_options_4_a_span = document.createElement('span');
    textdecorationstyle_options_4_a_span.innerText = 'Dashed';
    textdecorationstyle_options_4_a_span.setAttribute('class','value');

    textdecorationstyle_options_4_a.appendChild(textdecorationstyle_options_4_a_span);
    textdecorationstyle_options_4.appendChild(textdecorationstyle_options_4_a);

    textdecorationstyle_options_4.addEventListener('click',function(){
        tb(element,'tds',textdecorationstyle_options_4_a.innerText);
    });

    //-------------------------5----------------------------

    var textdecorationstyle_options_5 = document.createElement('li');
    var textdecorationstyle_options_5_a = document.createElement('a');
    textdecorationstyle_options_5_a.innerText = 'Wavy';

    textdecorationstyle_options_5_a.style.textDecoration = 'Underline Wavy';
    textdecorationstyle_options_5_a.classList.add('lastoption');

    var textdecorationstyle_options_5_a_span = document.createElement('span');
    textdecorationstyle_options_5_a_span.innerText = 'Wavy';
    textdecorationstyle_options_5_a_span.setAttribute('class','value');

    textdecorationstyle_options_5_a.appendChild(textdecorationstyle_options_5_a_span);
    textdecorationstyle_options_5.appendChild(textdecorationstyle_options_5_a);

    textdecorationstyle_options_5.addEventListener('click',function(){
        tb(element,'tds',textdecorationstyle_options_5_a.innerText);
    });

    //---------------TextDecorationStyle Options End---------------------

    textdecorationstyle_selected_a.appendChild(textdecorationstyle_selected_a_span);
    textdecorationstyle_selected.appendChild(textdecorationstyle_selected_a);

    textdecorationstyle_options_ul.appendChild(textdecorationstyle_options_1);
    textdecorationstyle_options_ul.appendChild(textdecorationstyle_options_2);
    textdecorationstyle_options_ul.appendChild(textdecorationstyle_options_3);
    textdecorationstyle_options_ul.appendChild(textdecorationstyle_options_4);
    textdecorationstyle_options_ul.appendChild(textdecorationstyle_options_5);

    textdecorationstyle_options.appendChild(textdecorationstyle_options_ul);

    textdecorationstyle.appendChild(textdecorationstyle_selected);
    textdecorationstyle.appendChild(textdecorationstyle_options);

    //-----------------Event Handlers--------------------

    textdecorationstyle_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(textdecorationstyle_options.style.display == 'block'){

                textdecorationstyle_options.style.display = 'none';
                textdecorationstyle_options_ul.style.display = 'none';

            }else{

                textdecorationstyle_options.style.display = 'block';
                textdecorationstyle_options_ul.style.display = 'block';

            }

        }else{

        }

    });

    //-----End TextDecorationStyle------

    //------BorderRadius-------

    var borderradius = document.createElement('combobox');
    borderradius.setAttribute('id','borderradius');
    borderradius.style.left = '770px';
    borderradius.style.top = '70px';
    borderradius.style.zIndex = '4';

    var borderradius_selected = document.createElement('selected');
    var borderradius_selected_a = document.createElement('a');
    var borderradius_selected_a_span = document.createElement('span');
    borderradius_selected_a_span.innerText = 'Border Radius';

    var borderradius_options = document.createElement('options');
    var borderradius_options_ul = document.createElement('ul');

    var borderradius_customedit = document.createElement('input');
    borderradius_customedit.classList.add('custom');

    //------------------BorderRadius Options--------------------
    //-------------------------1----------------------------

    var borderradius_options_1 = document.createElement('li');
    var borderradius_options_1_a = document.createElement('a');
    borderradius_options_1_a.innerText = '5px';

    var borderradius_options_1_a_span = document.createElement('span');
    borderradius_options_1_a_span.innerText = '5px';
    borderradius_options_1_a_span.setAttribute('class','value');

    borderradius_options_1_a.appendChild(borderradius_options_1_a_span);
    borderradius_options_1.appendChild(borderradius_options_1_a);

    borderradius_options_1.addEventListener('click',function(){
        tb(element,'br',borderradius_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var borderradius_options_2 = document.createElement('li');
    var borderradius_options_2_a = document.createElement('a');
    borderradius_options_2_a.innerText = '10px';

    var borderradius_options_2_a_span = document.createElement('span');
    borderradius_options_2_a_span.innerText = '10px';
    borderradius_options_2_a_span.setAttribute('class','value');

    borderradius_options_2_a.appendChild(borderradius_options_2_a_span);
    borderradius_options_2.appendChild(borderradius_options_2_a);

    borderradius_options_2.addEventListener('click',function(){
        tb(element,'br',borderradius_options_2_a.innerText);
    });

    //-------------------------3----------------------------

    var borderradius_options_3 = document.createElement('li');
    var borderradius_options_3_a = document.createElement('a');
    borderradius_options_3_a.innerText = '20px';
    borderradius_options_3_a.classList.add('lastoption');

    var borderradius_options_3_a_span = document.createElement('span');
    borderradius_options_3_a_span.innerText = '20px';
    borderradius_options_3_a_span.setAttribute('class','value');

    borderradius_options_3_a.appendChild(borderradius_options_3_a_span);
    borderradius_options_3.appendChild(borderradius_options_3_a);

    borderradius_options_3.addEventListener('click',function(){
        tb(element,'br',borderradius_options_3_a.innerText);
    });

    //---------------BorderRadius Options End---------------------

    borderradius_selected_a.appendChild(borderradius_selected_a_span);
    borderradius_selected.appendChild(borderradius_selected_a);
    borderradius_selected.appendChild(borderradius_customedit);

    borderradius_options_ul.appendChild(borderradius_options_1);
    borderradius_options_ul.appendChild(borderradius_options_2);
    borderradius_options_ul.appendChild(borderradius_options_3);

    borderradius_options.appendChild(borderradius_options_ul);

    borderradius.appendChild(borderradius_selected);
    borderradius.appendChild(borderradius_options);

    //-----------------Event Handlers--------------------

    borderradius_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(borderradius_options.style.display == 'block'){

                borderradius_options.style.display = 'none';
                borderradius_options_ul.style.display = 'none';
                borderradius_customedit.style.display = 'none';
                borderradius_selected_a_span.style.textAlign = '';

            }else{

                borderradius_options.style.display = 'block';
                borderradius_options_ul.style.display = 'block';
                borderradius_customedit.style.display = 'block';
                borderradius_selected_a_span.style.textAlign = 'left';

            }

        }else{

        }

    });

    borderradius_customedit.addEventListener('keyup',function(){
        borderradius_selected_a_span.innerText = 'Border Radius: ' + this.value+'px';
        updateElement(element,'borderradius',this.value+'px');
    });

    //-----End BorderRadius------

    //-------BorderSize--------

    var bordersize = document.createElement('combobox');
    bordersize.setAttribute('id','bordersize');
    bordersize.style.left = '580px';
    bordersize.style.top = '140px';
    bordersize.style.zIndex = '3';

    var bordersize_customedit = document.createElement('input');
    bordersize_customedit.classList.add('custom');

    var bordersize_selected = document.createElement('selected');
    var bordersize_selected_a = document.createElement('a');
    var bordersize_selected_a_span = document.createElement('span');
    bordersize_selected_a_span.innerText = 'Border Size';

    var bordersize_options = document.createElement('options');
    var bordersize_options_ul = document.createElement('ul');

    //------------------BorderSize Options--------------------
    //-------------------------1----------------------------

    var bordersize_options_1 = document.createElement('li');

    var bordersize_options_1_a = document.createElement('a');
    bordersize_options_1_a.innerText = '2px';

    var bordersize_options_1_a_span = document.createElement('span');
    bordersize_options_1_a_span.innerText = '2px';
    bordersize_options_1_a_span.setAttribute('class','value');

    bordersize_options_1_a.appendChild(bordersize_options_1_a_span);
    bordersize_options_1.appendChild(bordersize_options_1_a);

    bordersize_options_1.addEventListener('click',function(){
        tb(element,'bs',bordersize_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var bordersize_options_2 = document.createElement('li');

    var bordersize_options_2_a = document.createElement('a');
    bordersize_options_2_a.innerText = '4px';

    var bordersize_options_2_a_span = document.createElement('span');
    bordersize_options_2_a_span.innerText = '4px';
    bordersize_options_2_a_span.setAttribute('class','value');

    bordersize_options_2_a.appendChild(bordersize_options_2_a_span);
    bordersize_options_2.appendChild(bordersize_options_2_a);

    bordersize_options_2.addEventListener('click',function(){
        tb(element,'bs',bordersize_options_2_a.innerText);
    });

    //-------------------------3----------------------------

    var bordersize_options_3 = document.createElement('li');

    var bordersize_options_3_a = document.createElement('a');
    bordersize_options_3_a.innerText = '8px';
    bordersize_options_3_a.classList.add('lastoption');

    var bordersize_options_3_a_span = document.createElement('span');
    bordersize_options_3_a_span.innerText = '8px';
    bordersize_options_3_a_span.setAttribute('class','value');

    bordersize_options_3_a.appendChild(bordersize_options_3_a_span);
    bordersize_options_3.appendChild(bordersize_options_3_a);

    bordersize_options_3.addEventListener('click',function(){
        tb(element,'bs',bordersize_options_3_a.innerText);
    });

    //---------------BorderSize Options End---------------------

    bordersize_selected_a.appendChild(bordersize_selected_a_span);
    bordersize_selected.appendChild(bordersize_selected_a);
    bordersize_selected.appendChild(bordersize_customedit);

    bordersize_options_ul.appendChild(bordersize_options_1);
    bordersize_options_ul.appendChild(bordersize_options_2);
    bordersize_options_ul.appendChild(bordersize_options_3);

    bordersize_options.appendChild(bordersize_options_ul);

    bordersize.appendChild(bordersize_selected);
    bordersize.appendChild(bordersize_options);

    //-----------------Event Handlers--------------------

    bordersize_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(bordersize_options.style.display == 'block'){

                bordersize_options.style.display = 'none';
                bordersize_options_ul.style.display = 'none';
                bordersize_customedit.style.display = 'none';
                bordersize_selected_a_span.style.textAlign = '';

            }else{

                bordersize_options.style.display = 'block';
                bordersize_options_ul.style.display = 'block';
                bordersize_customedit.style.display = 'block';
                bordersize_selected_a_span.style.textAlign = 'left';

            }

        }else{

        }

    });

    bordersize_customedit.addEventListener('keyup',function(){
        bordersize_selected_a_span.innerText = 'Border Size: ' + this.value+'px';
        updateElement(element,'bordersize',this.value+'px');
    });

    //-------End BorderSize--------

    //-------BorderStyle--------

    var borderstyle = document.createElement('combobox');
    borderstyle.setAttribute('id','borderstyle');
    borderstyle.style.left = '770px';
    borderstyle.style.top = '140px';
    borderstyle.style.zIndex = '3';

    var borderstyle_selected = document.createElement('selected');
    var borderstyle_selected_a = document.createElement('a');
    var borderstyle_selected_a_span = document.createElement('span');
    borderstyle_selected_a_span.innerText = 'Border Style';

    var borderstyle_options = document.createElement('options');
    var borderstyle_options_ul = document.createElement('ul');

    //------------------BorderStyle Options--------------------
    //-------------------------1----------------------------

    var borderstyle_options_1 = document.createElement('li');

    var borderstyle_options_1_a = document.createElement('a');
    borderstyle_options_1_a.innerText = 'Solid';

    var borderstyle_options_1_a_span = document.createElement('span');
    borderstyle_options_1_a_span.innerText = 'Solid';
    borderstyle_options_1_a_span.setAttribute('class','value');

    borderstyle_options_1_a.appendChild(borderstyle_options_1_a_span);
    borderstyle_options_1.appendChild(borderstyle_options_1_a);

    borderstyle_options_1.addEventListener('click',function(){
        tb(element,'bsty',borderstyle_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var borderstyle_options_2 = document.createElement('li');

    var borderstyle_options_2_a = document.createElement('a');
    borderstyle_options_2_a.innerText = 'Dotted';

    var borderstyle_options_2_a_span = document.createElement('span');
    borderstyle_options_2_a_span.innerText = 'Dotted';
    borderstyle_options_2_a_span.setAttribute('class','value');

    borderstyle_options_2_a.appendChild(borderstyle_options_2_a_span);
    borderstyle_options_2.appendChild(borderstyle_options_2_a);

    borderstyle_options_2.addEventListener('click',function(){
        tb(element,'bsty',borderstyle_options_2_a.innerText);
    });

    //-------------------------3----------------------------

    var borderstyle_options_3 = document.createElement('li');

    var borderstyle_options_3_a = document.createElement('a');
    borderstyle_options_3_a.innerText = 'Double';

    var borderstyle_options_3_a_span = document.createElement('span');
    borderstyle_options_3_a_span.innerText = 'Double';
    borderstyle_options_3_a_span.setAttribute('class','value');

    borderstyle_options_3_a.appendChild(borderstyle_options_3_a_span);
    borderstyle_options_3.appendChild(borderstyle_options_3_a);

    borderstyle_options_3.addEventListener('click',function(){
        tb(element,'bsty',borderstyle_options_3_a.innerText);
    });

    //-------------------------4----------------------------

    var borderstyle_options_4 = document.createElement('li');

    var borderstyle_options_4_a = document.createElement('a');
    borderstyle_options_4_a.innerText = 'Dashed';

    var borderstyle_options_4_a_span = document.createElement('span');
    borderstyle_options_4_a_span.innerText = 'Dashed';
    borderstyle_options_4_a_span.setAttribute('class','value');

    borderstyle_options_4_a.appendChild(borderstyle_options_4_a_span);
    borderstyle_options_4.appendChild(borderstyle_options_4_a);

    borderstyle_options_4.addEventListener('click',function(){
        tb(element,'bsty',borderstyle_options_4_a.innerText);
    });

    //-------------------------5----------------------------

    var borderstyle_options_5 = document.createElement('li');

    var borderstyle_options_5_a = document.createElement('a');
    borderstyle_options_5_a.innerText = 'Groove';

    var borderstyle_options_5_a_span = document.createElement('span');
    borderstyle_options_5_a_span.innerText = 'Groove';
    borderstyle_options_5_a_span.setAttribute('class','value');

    borderstyle_options_5_a.appendChild(borderstyle_options_5_a_span);
    borderstyle_options_5.appendChild(borderstyle_options_5_a);

    borderstyle_options_5.addEventListener('click',function(){
        tb(element,'bsty',borderstyle_options_5_a.innerText);
    });

    //-------------------------6----------------------------

    var borderstyle_options_6 = document.createElement('li');

    var borderstyle_options_6_a = document.createElement('a');
    borderstyle_options_6_a.innerText = 'Ridge';

    var borderstyle_options_6_a_span = document.createElement('span');
    borderstyle_options_6_a_span.innerText = 'Ridge';
    borderstyle_options_6_a_span.setAttribute('class','value');

    borderstyle_options_6_a.appendChild(borderstyle_options_6_a_span);
    borderstyle_options_6.appendChild(borderstyle_options_6_a);

    borderstyle_options_6.addEventListener('click',function(){
        tb(element,'bsty',borderstyle_options_6_a.innerText);
    });

    //-------------------------7----------------------------

    var borderstyle_options_7 = document.createElement('li');

    var borderstyle_options_7_a = document.createElement('a');
    borderstyle_options_7_a.innerText = 'Dotted Solid';

    var borderstyle_options_7_a_span = document.createElement('span');
    borderstyle_options_7_a_span.innerText = 'Dotted Solid';
    borderstyle_options_7_a_span.setAttribute('class','value');

    borderstyle_options_7_a.appendChild(borderstyle_options_7_a_span);
    borderstyle_options_7.appendChild(borderstyle_options_7_a);

    borderstyle_options_7.addEventListener('click',function(){
        tb(element,'bsty',borderstyle_options_7_a.innerText);
    });

    //-------------------------8----------------------------

    var borderstyle_options_8 = document.createElement('li');

    var borderstyle_options_8_a = document.createElement('a');
    borderstyle_options_8_a.innerText = 'Dotted Solid Double Dashed';
    borderstyle_options_8_a.style.fontSize = '11px';

    var borderstyle_options_8_a_span = document.createElement('span');
    borderstyle_options_8_a_span.innerText = 'Dotted Solid Double Dashed';
    borderstyle_options_8_a_span.setAttribute('class','value');

    borderstyle_options_8_a.appendChild(borderstyle_options_8_a_span);
    borderstyle_options_8.appendChild(borderstyle_options_8_a);

    borderstyle_options_8.addEventListener('click',function(){
        tb(element,'bsty',borderstyle_options_8_a.innerText);
    });

    //-------------------------9----------------------------

    var borderstyle_options_9 = document.createElement('li');

    var borderstyle_options_9_a = document.createElement('a');
    borderstyle_options_9_a.innerText = 'Outset';

    var borderstyle_options_9_a_span = document.createElement('span');
    borderstyle_options_9_a_span.innerText = 'Outset';
    borderstyle_options_9_a_span.setAttribute('class','value');

    borderstyle_options_9_a.appendChild(borderstyle_options_9_a_span);
    borderstyle_options_9.appendChild(borderstyle_options_9_a);

    borderstyle_options_9.addEventListener('click',function(){
        tb(element,'bsty',borderstyle_options_9_a.innerText);
    });

    //-------------------------10----------------------------

    var borderstyle_options_10 = document.createElement('li');

    var borderstyle_options_10_a = document.createElement('a');
    borderstyle_options_10_a.innerText = 'Inset';
    borderstyle_options_10_a.classList.add('lastoption');

    var borderstyle_options_10_a_span = document.createElement('span');
    borderstyle_options_10_a_span.innerText = 'Inset';
    borderstyle_options_10_a_span.setAttribute('class','value');

    borderstyle_options_10_a.appendChild(borderstyle_options_10_a_span);
    borderstyle_options_10.appendChild(borderstyle_options_10_a);

    borderstyle_options_10.addEventListener('click',function(){
        tb(element,'bsty',borderstyle_options_10_a.innerText);
    });

    //---------------BorderStyle Options End---------------------

    borderstyle_selected_a.appendChild(borderstyle_selected_a_span);
    borderstyle_selected.appendChild(borderstyle_selected_a);

    borderstyle_options_ul.appendChild(borderstyle_options_1);
    borderstyle_options_ul.appendChild(borderstyle_options_2);
    borderstyle_options_ul.appendChild(borderstyle_options_3);
    borderstyle_options_ul.appendChild(borderstyle_options_4);
    borderstyle_options_ul.appendChild(borderstyle_options_5);
    borderstyle_options_ul.appendChild(borderstyle_options_6);
    borderstyle_options_ul.appendChild(borderstyle_options_7);
    borderstyle_options_ul.appendChild(borderstyle_options_8);
    borderstyle_options_ul.appendChild(borderstyle_options_9);
    borderstyle_options_ul.appendChild(borderstyle_options_10);

    borderstyle_options.appendChild(borderstyle_options_ul);

    borderstyle.appendChild(borderstyle_selected);
    borderstyle.appendChild(borderstyle_options);

    //-----------------Event Handlers--------------------
    borderstyle_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(borderstyle_options.style.display == 'block'){

                borderstyle_options.style.display = 'none';
                borderstyle_options_ul.style.display = 'none';

            }else{

                borderstyle_options.style.display = 'block';
                borderstyle_options_ul.style.display = 'block';

            }

        }else{

        }

    });

    //-------End BorderStyle--------

    //-------BoxShadow--------

    var boxshadow = document.createElement('combobox');
    boxshadow.setAttribute('id','boxshadow');
    boxshadow.style.left = '10px';
    boxshadow.style.top = '210px';
    boxshadow.style.zIndex = '2';

    var boxshadow_customedit = document.createElement('input');
    boxshadow_customedit.classList.add('customlarge');
    boxshadow_customedit.setAttribute('placeholder','0px 0px 0px');

    var boxshadow_selected = document.createElement('selected');
    var boxshadow_selected_a = document.createElement('a');
    var boxshadow_selected_a_span = document.createElement('span');
    boxshadow_selected_a_span.innerText = 'Box Shadow';
    boxshadow_selected_a.style.width = '250px';

    var boxshadow_colordisplay = document.createElement('colordisplay');
    boxshadow_colordisplay.setAttribute('id','boxscd');
    boxshadow_colordisplay.style.top = '17.5px';
    boxshadow_colordisplay.style.display = 'none';
    boxshadow_colordisplay.addEventListener('click',function(){

        var colorpicker = document.getElementById('boxscp');

        if(colorpicker.style.display == 'block'){

            colorpicker.style.display = 'none';

        }else{

            colorpicker.style.display = 'block';

        }

    });

    var boxshadow_colorpicker = document.createElement('div');
    boxshadow_colorpicker.setAttribute('class','colorpicker');
    boxshadow_colorpicker.setAttribute('id','boxscp');

    var boxshadow_colorpicker_box = document.createElement('canvas');
    boxshadow_colorpicker_box.setAttribute('class','colorpickerbox');
    boxshadow_colorpicker_box.setAttribute('id','boxscpb');

    var boxshadow_colorpicker_strip = document.createElement('canvas');
    boxshadow_colorpicker_strip.setAttribute('class','colorpickerstrip');
    boxshadow_colorpicker_strip.setAttribute('id','boxscps');

    var boxshadow_colorpicker_input_rgba = document.createElement('input');
    boxshadow_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
    boxshadow_colorpicker_input_rgba.setAttribute('id','boxscprgba');
    boxshadow_colorpicker_input_rgba.addEventListener('input',function(){
        textToColorPickerColor(this,'box-shadow-color',element);
    });

    var boxshadow_colorpicker_input_hex = document.createElement('input');
    boxshadow_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
    boxshadow_colorpicker_input_hex.setAttribute('id','boxscphex');
    boxshadow_colorpicker_input_hex.addEventListener('input',function(){
        textToColorPickerColor(this,'box-shadow-color',element);
    });

    boxshadow_colorpicker.appendChild(boxshadow_colorpicker_box);
    boxshadow_colorpicker.appendChild(boxshadow_colorpicker_strip);
    boxshadow_colorpicker.appendChild(boxshadow_colorpicker_input_rgba);
    boxshadow_colorpicker.appendChild(boxshadow_colorpicker_input_hex);

    //---------------BoxShadow Options End---------------------

    boxshadow_selected_a.appendChild(boxshadow_selected_a_span);
    boxshadow_selected.appendChild(boxshadow_selected_a);
    boxshadow_selected.appendChild(boxshadow_customedit);
    boxshadow_selected.appendChild(boxshadow_colorpicker);
    boxshadow_selected.appendChild(boxshadow_colordisplay);

    boxshadow.appendChild(boxshadow_selected);

    //-----------------Event Handlers--------------------

    boxshadow_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(boxshadow_customedit.style.display == 'block'){

                boxshadow_customedit.style.display = 'none';
                boxshadow_selected_a_span.style.opacity = '1';
                boxshadow_colordisplay.style.display = 'none';

            }else{

                boxshadow_customedit.style.display = 'block';
                boxshadow_selected_a_span.style.opacity = '0';
                boxshadow_colordisplay.style.display = 'block';

            }

        }else{

        }

    });

    boxshadow_customedit.addEventListener('keyup',function(){
        boxshadow_selected_a_span.innerText = 'Box Shadow: ' + this.value;
        updateElement(element,'boxshadow',this.value);

    });

    //-------End BoxShadow--------

    //-------Display--------

    var display = document.createElement('combobox');
    display.setAttribute('id','display');
    display.style.left = '300px';
    display.style.top = '210px';
    display.style.zIndex = '2';

    var display_selected = document.createElement('selected');
    var display_selected_a = document.createElement('a');
    var display_selected_a_span = document.createElement('span');
    display_selected_a_span.innerText = 'Display';

    var display_options = document.createElement('options');
    var display_options_ul = document.createElement('ul');
    display_options_ul.style.overflowX = 'scroll';
    display_options_ul.style.height = '300px';
    display_options_ul.style.maxHeight = '300px';
    display_options_ul.style.minHeight = '300px';

    //------------------Display Options--------------------
    //-------------------------1----------------------------

    var display_options_1 = document.createElement('li');

    var display_options_1_a = document.createElement('a');
    display_options_1_a.innerText = 'Block';

    var display_options_1_a_span = document.createElement('span');
    display_options_1_a_span.innerText = 'Block';
    display_options_1_a_span.setAttribute('class','value');

    display_options_1_a.appendChild(display_options_1_a_span);
    display_options_1.appendChild(display_options_1_a);

    display_options_1.addEventListener('click',function(){
        tb(element,'d',display_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var display_options_2 = document.createElement('li');

    var display_options_2_a = document.createElement('a');
    display_options_2_a.innerText = 'Inline';

    var display_options_2_a_span = document.createElement('span');
    display_options_2_a_span.innerText = 'Inline';
    display_options_2_a_span.setAttribute('class','value');

    display_options_2_a.appendChild(display_options_2_a_span);
    display_options_2.appendChild(display_options_2_a);

    display_options_2.addEventListener('click',function(){
        tb(element,'d',display_options_2_a.innerText);
    });

    //-------------------------3----------------------------

    var display_options_3 = document.createElement('li');

    var display_options_3_a = document.createElement('a');
    display_options_3_a.innerText = 'Contents';

    var display_options_3_a_span = document.createElement('span');
    display_options_3_a_span.innerText = 'Contents';
    display_options_3_a_span.setAttribute('class','value');

    display_options_3_a.appendChild(display_options_3_a_span);
    display_options_3.appendChild(display_options_3_a);

    display_options_3.addEventListener('click',function(){
        tb(element,'d',display_options_3_a.innerText);
    });

    //-------------------------4----------------------------

    var display_options_4 = document.createElement('li');

    var display_options_4_a = document.createElement('a');
    display_options_4_a.innerText = 'Flex';

    var display_options_4_a_span = document.createElement('span');
    display_options_4_a_span.innerText = 'Flex';
    display_options_4_a_span.setAttribute('class','value');

    display_options_4_a.appendChild(display_options_4_a_span);
    display_options_4.appendChild(display_options_4_a);

    display_options_4.addEventListener('click',function(){
        tb(element,'d',display_options_4_a.innerText);
    });

    //-------------------------5----------------------------

    var display_options_5 = document.createElement('li');

    var display_options_5_a = document.createElement('a');
    display_options_5_a.innerText = 'Grid';

    var display_options_5_a_span = document.createElement('span');
    display_options_5_a_span.innerText = 'Grid';
    display_options_5_a_span.setAttribute('class','value');

    display_options_5_a.appendChild(display_options_5_a_span);
    display_options_5.appendChild(display_options_5_a);

    display_options_5.addEventListener('click',function(){
        tb(element,'d',display_options_5_a.innerText);
    });

    //-------------------------6----------------------------

    var display_options_6 = document.createElement('li');

    var display_options_6_a = document.createElement('a');
    display_options_6_a.innerText = 'Inline-Block';

    var display_options_6_a_span = document.createElement('span');
    display_options_6_a_span.innerText = 'Inline-Block';
    display_options_6_a_span.setAttribute('class','value');

    display_options_6_a.appendChild(display_options_6_a_span);
    display_options_6.appendChild(display_options_6_a);

    display_options_6.addEventListener('click',function(){
        tb(element,'d',display_options_6_a.innerText);
    });

    //-------------------------7----------------------------

    var display_options_7 = document.createElement('li');

    var display_options_7_a = document.createElement('a');
    display_options_7_a.innerText = 'Inline-Flex';

    var display_options_7_a_span = document.createElement('span');
    display_options_7_a_span.innerText = 'Inline-Flex';
    display_options_7_a_span.setAttribute('class','value');

    display_options_7_a.appendChild(display_options_7_a_span);
    display_options_7.appendChild(display_options_7_a);

    display_options_7.addEventListener('click',function(){
        tb(element,'d',display_options_7_a.innerText);
    });

    //-------------------------8----------------------------

    var display_options_8 = document.createElement('li');

    var display_options_8_a = document.createElement('a');
    display_options_8_a.innerText = 'Inline-Grid';

    var display_options_8_a_span = document.createElement('span');
    display_options_8_a_span.innerText = 'Inline-Grid';
    display_options_8_a_span.setAttribute('class','value');

    display_options_8_a.appendChild(display_options_8_a_span);
    display_options_8.appendChild(display_options_8_a);

    display_options_8.addEventListener('click',function(){
        tb(element,'d',display_options_8_a.innerText);
    });

    //-------------------------9----------------------------

    var display_options_9 = document.createElement('li');

    var display_options_9_a = document.createElement('a');
    display_options_9_a.innerText = 'Inline-Table';

    var display_options_9_a_span = document.createElement('span');
    display_options_9_a_span.innerText = 'Inline-Table';
    display_options_9_a_span.setAttribute('class','value');

    display_options_9_a.appendChild(display_options_9_a_span);
    display_options_9.appendChild(display_options_9_a);

    display_options_9.addEventListener('click',function(){
        tb(element,'d',display_options_9_a.innerText);
    });

    //-------------------------10----------------------------

    var display_options_10 = document.createElement('li');

    var display_options_10_a = document.createElement('a');
    display_options_10_a.innerText = 'List-Item';

    var display_options_10_a_span = document.createElement('span');
    display_options_10_a_span.innerText = 'List-Item';
    display_options_10_a_span.setAttribute('class','value');

    display_options_10_a.appendChild(display_options_10_a_span);
    display_options_10.appendChild(display_options_10_a);

    display_options_10.addEventListener('click',function(){
        tb(element,'d',display_options_10_a.innerText);
    });

    //-------------------------11----------------------------

    var display_options_11 = document.createElement('li');

    var display_options_11_a = document.createElement('a');
    display_options_11_a.innerText = 'Run-In';

    var display_options_11_a_span = document.createElement('span');
    display_options_11_a_span.innerText = 'Run-In';
    display_options_11_a_span.setAttribute('class','value');

    display_options_11_a.appendChild(display_options_11_a_span);
    display_options_11.appendChild(display_options_11_a);

    display_options_11.addEventListener('click',function(){
        tb(element,'d',display_options_11_a.innerText);
    });

    //-------------------------12----------------------------

    var display_options_12 = document.createElement('li');

    var display_options_12_a = document.createElement('a');
    display_options_12_a.innerText = 'Table';

    var display_options_12_a_span = document.createElement('span');
    display_options_12_a_span.innerText = 'Table';
    display_options_12_a_span.setAttribute('class','value');

    display_options_12_a.appendChild(display_options_12_a_span);
    display_options_12.appendChild(display_options_12_a);

    display_options_12.addEventListener('click',function(){
        tb(element,'d',display_options_12_a.innerText);
    });

    //-------------------------13----------------------------

    var display_options_13 = document.createElement('li');

    var display_options_13_a = document.createElement('a');
    display_options_13_a.innerText = 'Table-Caption';

    var display_options_13_a_span = document.createElement('span');
    display_options_13_a_span.innerText = 'Table-Caption';
    display_options_13_a_span.setAttribute('class','value');

    display_options_13_a.appendChild(display_options_13_a_span);
    display_options_13.appendChild(display_options_13_a);

    display_options_13.addEventListener('click',function(){
        tb(element,'d',display_options_13_a.innerText);
    });

    //-------------------------14----------------------------

    var display_options_14 = document.createElement('li');

    var display_options_14_a = document.createElement('a');
    display_options_14_a.innerText = 'Table-Column-Group';

    var display_options_14_a_span = document.createElement('span');
    display_options_14_a_span.innerText = 'Table-Column-Group';
    display_options_14_a_span.setAttribute('class','value');

    display_options_14_a.appendChild(display_options_14_a_span);
    display_options_14.appendChild(display_options_14_a);

    display_options_14.addEventListener('click',function(){
        tb(element,'d',display_options_14_a.innerText);
    });

    //-------------------------15----------------------------

    var display_options_15 = document.createElement('li');

    var display_options_15_a = document.createElement('a');
    display_options_15_a.innerText = 'Table-Header-Group';

    var display_options_15_a_span = document.createElement('span');
    display_options_15_a_span.innerText = 'Table-Header-Group';
    display_options_15_a_span.setAttribute('class','value');

    display_options_15_a.appendChild(display_options_15_a_span);
    display_options_15.appendChild(display_options_15_a);

    display_options_15.addEventListener('click',function(){
        tb(element,'d',display_options_15_a.innerText);
    });

    //-------------------------16----------------------------

    var display_options_16 = document.createElement('li');

    var display_options_16_a = document.createElement('a');
    display_options_16_a.innerText = 'Table-Footer-Group';

    var display_options_16_a_span = document.createElement('span');
    display_options_16_a_span.innerText = 'Table-Footer-Group';
    display_options_16_a_span.setAttribute('class','value');

    display_options_16_a.appendChild(display_options_16_a_span);
    display_options_16.appendChild(display_options_16_a);

    display_options_16.addEventListener('click',function(){
        tb(element,'d',display_options_16_a.innerText);
    });

    //-------------------------17----------------------------

    var display_options_17 = document.createElement('li');

    var display_options_17_a = document.createElement('a');
    display_options_17_a.innerText = 'Table-Row-Group';

    var display_options_17_a_span = document.createElement('span');
    display_options_17_a_span.innerText = 'Table-Row-Group';
    display_options_17_a_span.setAttribute('class','value');

    display_options_17_a.appendChild(display_options_17_a_span);
    display_options_17.appendChild(display_options_17_a);

    display_options_17.addEventListener('click',function(){
        tb(element,'d',display_options_17_a.innerText);
    });

    //-------------------------18----------------------------

    var display_options_18 = document.createElement('li');

    var display_options_18_a = document.createElement('a');
    display_options_18_a.innerText = 'Table-Cell';

    var display_options_18_a_span = document.createElement('span');
    display_options_18_a_span.innerText = 'Table-Cell';
    display_options_18_a_span.setAttribute('class','value');

    display_options_18_a.appendChild(display_options_18_a_span);
    display_options_18.appendChild(display_options_18_a);

    display_options_18.addEventListener('click',function(){
        tb(element,'d',display_options_18_a.innerText);
    });

    //-------------------------19----------------------------

    var display_options_19 = document.createElement('li');

    var display_options_19_a = document.createElement('a');
    display_options_19_a.innerText = 'Table-Column';

    var display_options_19_a_span = document.createElement('span');
    display_options_19_a_span.innerText = 'Table-Column';
    display_options_19_a_span.setAttribute('class','value');

    display_options_19_a.appendChild(display_options_19_a_span);
    display_options_19.appendChild(display_options_19_a);

    display_options_19.addEventListener('click',function(){
        tb(element,'d',display_options_19_a.innerText);
    });

    //-------------------------20----------------------------

    var display_options_20 = document.createElement('li');

    var display_options_20_a = document.createElement('a');
    display_options_20_a.innerText = 'Table-Row';

    var display_options_20_a_span = document.createElement('span');
    display_options_20_a_span.innerText = 'Table-Row';
    display_options_20_a_span.setAttribute('class','value');

    display_options_20_a.appendChild(display_options_20_a_span);
    display_options_20.appendChild(display_options_20_a);

    display_options_20.addEventListener('click',function(){
        tb(element,'d',display_options_20_a.innerText);
    });

    //-------------------------21----------------------------

    var display_options_21 = document.createElement('li');

    var display_options_21_a = document.createElement('a');
    display_options_21_a.innerText = 'None';
    display_options_21_a.classList.add('lastoption');

    var display_options_21_a_span = document.createElement('span');
    display_options_21_a_span.innerText = 'None';
    display_options_21_a_span.setAttribute('class','value');

    display_options_21_a.appendChild(display_options_21_a_span);
    display_options_21.appendChild(display_options_21_a);

    display_options_21.addEventListener('click',function(){
        tb(element,'d',display_options_21_a.innerText);
    });

    //---------------Display Options End---------------------

    display_selected_a.appendChild(display_selected_a_span);
    display_selected.appendChild(display_selected_a);

    display_options_ul.appendChild(display_options_1);
    display_options_ul.appendChild(display_options_2);
    display_options_ul.appendChild(display_options_3);
    display_options_ul.appendChild(display_options_4);
    display_options_ul.appendChild(display_options_5);
    display_options_ul.appendChild(display_options_6);
    display_options_ul.appendChild(display_options_7);
    display_options_ul.appendChild(display_options_8);
    display_options_ul.appendChild(display_options_9);
    display_options_ul.appendChild(display_options_10);
    display_options_ul.appendChild(display_options_11);
    display_options_ul.appendChild(display_options_12);
    display_options_ul.appendChild(display_options_13);
    display_options_ul.appendChild(display_options_14);
    display_options_ul.appendChild(display_options_15);
    display_options_ul.appendChild(display_options_16);
    display_options_ul.appendChild(display_options_17);
    display_options_ul.appendChild(display_options_18);
    display_options_ul.appendChild(display_options_19);
    display_options_ul.appendChild(display_options_20);
    display_options_ul.appendChild(display_options_21);

    display_options.appendChild(display_options_ul);

    display.appendChild(display_selected);
    display.appendChild(display_options);

    //-----------------Event Handlers--------------------

    display_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(display_options.style.display == 'block'){

                display_options.style.display = 'none';
                display_options_ul.style.display = 'none';

            }else{

                display_options.style.display = 'block';
                display_options_ul.style.display = 'block';

            }

        }else{

        }

    });


    //-------End Display--------

    //-------Opacity--------

    var opacity = document.createElement('combobox');
    opacity.setAttribute('id','opacity');
    opacity.style.left = '490px';
    opacity.style.top = '210px';
    opacity.style.zIndex = '2';

    var opacity_customedit = document.createElement('input');
    opacity_customedit.classList.add('custom');
    opacity_customedit.setAttribute('min','0.1');
    opacity_customedit.setAttribute('max','1');

    var opacity_selected = document.createElement('selected');
    var opacity_selected_a = document.createElement('a');
    var opacity_selected_a_span = document.createElement('span');
    opacity_selected_a_span.innerText = 'Opacity';


    //---------------Opacity Options End---------------------

    opacity_selected_a.appendChild(opacity_selected_a_span);
    opacity_selected.appendChild(opacity_selected_a);
    opacity_selected.appendChild(opacity_customedit);

    opacity.appendChild(opacity_selected);

    //-----------------Event Handlers--------------------

    opacity_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(opacity_customedit.style.display == 'block'){

                opacity_customedit.style.display = 'none';
                opacity_selected_a_span.style.textAlign = '';

            }else{

                opacity_customedit.style.display = 'block';
                opacity_selected_a_span.style.textAlign = 'left';

            }

        }else{

        }

    });

    opacity_customedit.addEventListener('keyup',function(){
        opacity_selected_a_span.innerText = 'Opacity: ' + this.value;
        updateElement(element,'opacity',this.value);

    });

    //-------End Opacity--------

    //------WhiteSpace-------

    var whitespace = document.createElement('combobox');
    whitespace.setAttribute('id','whitespace');
    whitespace.style.left = '680px';
    whitespace.style.top = '210px';
    whitespace.style.zIndex = '2';

    var whitespace_selected = document.createElement('selected');
    var whitespace_selected_a = document.createElement('a');
    whitespace_selected_a.style.width = '240px';

    var whitespace_selected_a_span = document.createElement('span');
    whitespace_selected_a_span.innerText = 'White Space';

    var whitespace_options = document.createElement('options');
    var whitespace_options_ul = document.createElement('ul');

    var whitespace_customedit = document.createElement('input');
    whitespace_customedit.classList.add('custom');

    //------------------WhiteSpace Options--------------------
    //-------------------------1----------------------------

    var whitespace_options_1 = document.createElement('li');
    var whitespace_options_1_a = document.createElement('a');
    whitespace_options_1_a.innerText = 'Normal';

    var whitespace_options_1_a_span = document.createElement('span');
    whitespace_options_1_a_span.innerText = 'Normal';
    whitespace_options_1_a_span.setAttribute('class','value');

    whitespace_options_1_a.appendChild(whitespace_options_1_a_span);
    whitespace_options_1.appendChild(whitespace_options_1_a);

    whitespace_options_1.addEventListener('click',function(){
        tb(element,'ws',whitespace_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var whitespace_options_2 = document.createElement('li');
    var whitespace_options_2_a = document.createElement('a');
    whitespace_options_2_a.innerText = 'NoWrap';

    var whitespace_options_2_a_span = document.createElement('span');
    whitespace_options_2_a_span.innerText = 'NoWrap';
    whitespace_options_2_a_span.setAttribute('class','value');

    whitespace_options_2_a.appendChild(whitespace_options_2_a_span);
    whitespace_options_2.appendChild(whitespace_options_2_a);

    whitespace_options_2.addEventListener('click',function(){
        tb(element,'ws',whitespace_options_2_a.innerText);
    });

    //-------------------------3----------------------------

    var whitespace_options_3 = document.createElement('li');
    var whitespace_options_3_a = document.createElement('a');
    whitespace_options_3_a.innerText = 'Pre';

    var whitespace_options_3_a_span = document.createElement('span');
    whitespace_options_3_a_span.innerText = 'Pre';
    whitespace_options_3_a_span.setAttribute('class','value');

    whitespace_options_3_a.appendChild(whitespace_options_3_a_span);
    whitespace_options_3.appendChild(whitespace_options_3_a);

    whitespace_options_3.addEventListener('click',function(){
        tb(element,'ws',whitespace_options_3_a.innerText);
    });

    //-------------------------4----------------------------

    var whitespace_options_4 = document.createElement('li');
    var whitespace_options_4_a = document.createElement('a');
    whitespace_options_4_a.innerText = 'Pre-Line';

    var whitespace_options_4_a_span = document.createElement('span');
    whitespace_options_4_a_span.innerText = 'Pre-Line';
    whitespace_options_4_a_span.setAttribute('class','value');

    whitespace_options_4_a.appendChild(whitespace_options_4_a_span);
    whitespace_options_4.appendChild(whitespace_options_4_a);

    whitespace_options_4.addEventListener('click',function(){
        tb(element,'ws',whitespace_options_4_a.innerText);
    });

    //-------------------------5----------------------------

    var whitespace_options_5 = document.createElement('li');
    var whitespace_options_5_a = document.createElement('a');
    whitespace_options_5_a.innerText = 'Pre-Wrap';
    whitespace_options_5_a.classList.add('lastoption');

    var whitespace_options_5_a_span = document.createElement('span');
    whitespace_options_5_a_span.innerText = 'Pre-Wrap';
    whitespace_options_5_a_span.setAttribute('class','value');

    whitespace_options_5_a.appendChild(whitespace_options_5_a_span);
    whitespace_options_5.appendChild(whitespace_options_5_a);

    whitespace_options_5.addEventListener('click',function(){
        tb(element,'ws',whitespace_options_5_a.innerText);
    });

    //---------------WhiteSpace Options End---------------------

    whitespace_selected_a.appendChild(whitespace_selected_a_span);
    whitespace_selected.appendChild(whitespace_selected_a);
    whitespace_selected.appendChild(whitespace_customedit);

    whitespace_options_ul.appendChild(whitespace_options_1);
    whitespace_options_ul.appendChild(whitespace_options_2);
    whitespace_options_ul.appendChild(whitespace_options_3);
    whitespace_options_ul.appendChild(whitespace_options_4);
    whitespace_options_ul.appendChild(whitespace_options_5);

    //width increased due to free space in last right corner.

    whitespace_options_1.style.width = '260px';
    whitespace_options_2.style.width = '260px';
    whitespace_options_3.style.width = '260px';
    whitespace_options_4.style.width = '260px';
    whitespace_options_5.style.width = '260px';

    //---------------

    whitespace_options.appendChild(whitespace_options_ul);

    whitespace.appendChild(whitespace_selected);
    whitespace.appendChild(whitespace_options);

    //-----------------Event Handlers--------------------

    whitespace_selected_a_span.addEventListener('click',function(e){

        if(e.target == this){

            if(whitespace_options.style.display == 'block'){

                whitespace_options.style.display = 'none';
                whitespace_options_ul.style.display = 'none';

            }else{

                whitespace_options.style.display = 'block';
                whitespace_options_ul.style.display = 'block';

            }

        }else{

        }

    });

    //-----End WhiteSpace------


    basicdiv.appendChild(fontsize);
    basicdiv.appendChild(fontfamily);
    basicdiv.appendChild(fontweight);
    basicdiv.appendChild(fontstyle);
    basicdiv.appendChild(fontvariant);
    basicdiv.appendChild(fontstretch);
    basicdiv.appendChild(textalign);
    basicdiv.appendChild(textdecoration);
    basicdiv.appendChild(textdecorationstyle);
    basicdiv.appendChild(borderradius);
    basicdiv.appendChild(fontcolor);
    basicdiv.appendChild(backgroundcolor);
    basicdiv.appendChild(bordercolor);
    basicdiv.appendChild(bordersize);
    basicdiv.appendChild(borderstyle);
    basicdiv.appendChild(boxshadow);
    basicdiv.appendChild(display);
    basicdiv.appendChild(opacity);
    basicdiv.appendChild(whitespace);

    $('#panel').append(basicdiv);
    setupRotate(element);
    setupSkew(element);
    setupScale(element);
    setupSteps(element);
    previewbox.appendChild(editbuttons);

    setTimeout(function(){

        setupColorPicker('fcpb','fcps','preview'+element,'font','fcd','fcprgba','fcphex');
        setupColorPicker('bgcpb','bgcps','preview'+element,'background','bgcd','bgcprgba','bgcphex');
        setupColorPicker('bcpb','bcps','preview'+element,'border','bcd','bcprgba','bcphex');
        setupColorPicker('tdcpb','tdcps','preview'+element,'textdecorationcolor','tdcd','tdcprgba','tdcphex');
        setupColorPicker('boxscpb','boxscps','preview'+element,'boxshadowcolor','boxscd','boxscprgba','boxscphex');

    },1000);
}
