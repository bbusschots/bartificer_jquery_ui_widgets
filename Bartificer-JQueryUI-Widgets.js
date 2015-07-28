/*jshint jquery: true*/
// Bartifcer JQuery UI Widget Library
//
// This code requires JQuery Core & JQuery UI
// * http://jquery.com (Core)
// * http://jqueryui.com (UI)
//
// This Code is released under the 2-clause 'Simplified' BSD License:
//
// Copyright (c) 2015 and on, Bart Busschots T/A Bartificer Web Solutions
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above copyright notice, this
//  list of conditions and the following disclaimer.
//
// * Redistributions in binary form must reproduce the above copyright notice,
//  this list of conditions and the following disclaimer in the documentation
//  and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// use a self-executing function to create a closure
(function(){

    // a counter to facilitate auto-generated IDs when needed
    var WIDGET_SEQUENCE = 1000;
    
    
    //
    // === Checkbox Icon Widget ===============================================
    //
    $.widget("bartificer.checkboxIcon", {
        // default values
        options: {
            width: '16px',
            height: '16px',
            checkedImg: '',
            uncheckedImg: '',
            mode: 'dim' // 'dim' or 'swap'
        },

        // initialise the element
        _create: function(){
            WIDGET_SEQUENCE++;

            // ensure we are being called on a compatible form element
            if(!this.element.is('input[type="checkbox"], input[type="radio"]')){
                throw "checkboxImage can only be applied to input tags of type checkbox or radio";
            }

            // ensure the element has an ID
            if(!this.element.attr('id')){
                this.element.attr('id', 'bartificer-checkbox-icon-' + WIDGET_SEQUENCE);
            }

            // add a CSS class
            this.element.addClass('bartificer-checkbox-icon');

            // add a label directly after this element
            this.labelElement = $('<label />').attr('for', this.element.attr('id'));
            this.labelElement.addClass('bartificer-checkbox-icon');
            this.labelElement.css({
                display: 'inline-block',
                cursor: 'pointer',
                'vertical-align' : 'middle'
            });
            this.element.after(this.labelElement);

            // set the CSS properties of the checkbox
            this.element.css({
                display: 'none'
            });

            // attach needed event handlers
            this._on({
                change: function(){
                    this.refresh();
                }
            });

            // render the widget so it reflects the state of the checkbox/radio button
            this.refresh();
        },

        // option change handler
        _setOption: function(key, value){
            // normalise mode, defaulting unexpected values to dim
            if(key === "mode"){
                value = value.toLowerCase();
                if(value != 'swap'){
                    value = 'dim';
                }
            }
            // pass on to the parent class for processing
            this._super(key, value);
        },
        _setOptions: function(options){
            this._super(options);
            this.refresh();
        },

        // function to render the widget
        refresh: function(){
            // deal with the width and height
            this.labelElement.css({
                width: this.options.width,
                height: this.options.height,
            });

            // set the background image and opacity as appropriate
            if(this.options.mode == 'swap'){
                // in swap mode the opacity is always 1
                this.labelElement.css('opacity', 1);

                // set the background image depending on the checkbox state
                if(this.element.prop('checked')){
                    this.labelElement.css('background-image', 'url(' + this.options.checkedImg + ')');
                }else{
                    this.labelElement.css('background-image', 'url(' + this.options.uncheckedImg + ')');
                }
            }else{
                // in dim mode the background image is always the same
                this.labelElement.css('background-image', 'url(' + this.options.checkedImg + ')');

                // set the opacity depending on the checkbox state
                if(this.element.prop('checked')){
                    this.labelElement.css('opacity', 1);
                }else{
                    this.labelElement.css('opacity', "0.25");
                }
            }
        }  
    });
    
    //
    // === Star Rating Widget ==================================================
    //
    $.widget("bartificer.starRating", {
        // default values
        options: {
            numStars: 5,
            starWidth: '16px',
            starHeight: '16px',
            starImg: '',
            blankImg: '',
            mode: 'swap' // 'swap' or 'dim'
        },

        // initialise the element
        _create: function(){
            WIDGET_SEQUENCE++;

            // ensure we are being called on a compatible form element
            if(!this.element.is('input[type="hidden"], input[type="text"]')){
                throw "StarRating can only be applied to input tags of type hidden or text";
            }

            // add a CSS class
            this.element.addClass('bartificer-star-rating');

            // add a span directly after this element for holding the stars
            this.spanElement = $('<span />').addClass('bartificer-star-rating');
            this.spanElement.css({
                display: 'inline-block',
                'vertical-align' : 'middle'
            });
            this.element.after(this.spanElement);
            this.starElements = [];

            // set the CSS properties of the input
            if(this.element.is('input[type="text"]')){
                this.element.css('display', 'none');
            }
            

            // attach needed event handlers
            this._on({
                change: function(){
                    this.refresh();
                }
            });

            // render the widget so it reflects the state of the checkbox/radio button
            this.refresh();
        },

        // option change handler
        _setOption: function(key, value){
            // normalise mode, defaulting unexpected values to dim
            if(key === "mode"){
                value = value.toLowerCase();
                if(value != 'dim'){
                    value = 'swap';
                }
            }
            // pass on to the parent class for processing
            this._super(key, value);
        },
        _setOptions: function(options){
            this._super(options);
            this.refresh();
        },

        // function to render the widget
        refresh: function(){
            // make sure the value is valid
            this._coerceValue();
            
            // encapsulate 'this' for use in callbacks
            var widgetObj = this;
            
            // remove any extraneous star elements
            while(this.starElements.length > this.options.numStars){
                this.starElements.pop().remove();
            }
            
            // add any extra star elements needed
            while(this.starElements.length < this.options.numStars){
                // create the lowest missing star
                var starNum = this.starElements.length + 1;
                var newStar = $('<img />').data('star-num', starNum).addClass('bartificer-star-rating');
                newStar.attr('title', starNum + ' star' + (starNum == 1 ? '' : 's'));
                newStar.css('cursor', 'pointer');
                newStar.click(function(){
                    widgetObj.element.val($(this).data('star-num')).change();
                });
                
                // add it to the DOM
                this.spanElement.append(newStar);
                
                // add it to the array of stars
                this.starElements.push(newStar);
            }
            
            // deal with the width and height of each star element
            $('img', this.spanElement).css({
                width: this.options.starWidth,
                height: this.options.starHeight
            });
            
            // set the rendering of each star as appropriate
            this.starElements.forEach(function(s){
                if(s.data('star-num') <= widgetObj.element.val()){
                    // render as an active star
                    s.attr('alt', '*');
                    s.attr('src', widgetObj.options.starImg);
                    s.css('opacity', 1);
                }else{
                    // render as an inactive star
                    s.attr('alt', '-');
                    if(widgetObj.options.mode == 'dim'){
                        s.attr('src', widgetObj.options.starImg);
                        s.css('opacity', '0.25');
                    }else{
                        s.attr('src', widgetObj.options.blankImg);
                        s.css('opacity', 1);
                    }
                }
            });
        },
        
        // a private helper function to coerce a value held in the input into the valid range
        _coerceValue: function(){
            // parse the value to an int
            var intVal = parseInt(this.element.val());
            
            // if the value is less than 0, set it to zero and return
            if(intVal < 0){
                this.element.val(0);
                return;
            }
            
            //if the value is greater than the numer of stars, set it to the number of stars
            if(intVal > this.options.numStars){
                this.element.val(this.options.numStars);
                return;
            }
            
            // otherwise, write the intified value back
            this.element.val(intVal);
        }
    });
    
})(); // end the self-executing function (and hence the closure)