function dataAttributeBalancer(property, value){
    var sSlide = document.getElementsByClassName('slideSelected')[0];
    var attributesAvailable = $(sSlide).attr('data-attr-avail');
    var propertySplited = property.split('slide')[1];

    if(value == '' || property == ''){

    }else{
        if(value == '0' || value == '0px' || value == '0%' || value != ' %' || value != ' px' || value != ''){
            //checks for first action availability.
            if($(sSlide).attr('data-action-one') == propertySplited){
                sSlide.setAttribute('data-action-one-value',value);
            }else{
                //checks for second action availability.
                if($(sSlide).attr('data-action-two') == propertySplited){
                    sSlide.setAttribute('data-action-two-value',value);
                }else{
                    //checks for third action availability.
                    if($(sSlide).attr('data-action-three') == propertySplited){
                        sSlide.setAttribute('data-action-three-value',value);
                    }else{
                        //checks for fourth action availability.
                        if($(sSlide).attr('data-action-four') == propertySplited){
                            sSlide.setAttribute('data-action-four-value',value);
                        }else{
                            //if no action's property is matched with the property , create a new action.
                            if(attributesAvailable == '1'){
                                sSlide.setAttribute('data-action-four',propertySplited);
                                sSlide.setAttribute('data-action-four-value',value);
                                sSlide.setAttribute('data-attr-avail','0');
                            }

                            if(attributesAvailable == '2'){
                                sSlide.setAttribute('data-action-three',propertySplited);
                                sSlide.setAttribute('data-action-three-value',value);
                                sSlide.setAttribute('data-attr-avail','1');
                            }

                            if(attributesAvailable == '3'){
                                sSlide.setAttribute('data-action-two',propertySplited);
                                sSlide.setAttribute('data-action-two-value',value);
                                sSlide.setAttribute('data-attr-avail','2');
                            }

                            if(attributesAvailable == '4'){
                                sSlide.setAttribute('data-action-one',propertySplited);
                                sSlide.setAttribute('data-action-one-value',value);
                                sSlide.setAttribute('data-attr-avail','3');
                            }

                            if(attributesAvailable == '0'){
                                Globals.notificationHandler.new('Error , No more actions can be assigned to this slide.');
                            }
                        }
                    }
                }
            }
        }
    }
}
