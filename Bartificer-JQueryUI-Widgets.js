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

/*jshint jquery: true*/

//
// === Image Checkbox Widget ===================================================
//

$.widget("bartificer.checkboxImage", {
    // default values
    options: {
        width: '16px',
        height: '16px',
        img_checked: '',
        img_unchecked: '',
        mode: 'dim' // 'dim' or 'swap'
    },
      
    // initialise the element
    _create: function(){
        // ensure we are being called on a compatible form element
        if(!this.element.is('input[type="checkbox"], input[type="radio"]')){
            throw "checkboxImage can only be applied to input tags of type checkbox or radio";
        }
        
        // ensure the element has an ID
        if(!this.element.attr('id')){
            this.element.attr('id', 'bartificer-checkbox-image-' + Math.floor((Math.random() * 1000000) + 1));
        }
        
        // add a CSS class
        this.element.addClass('bartificer-checkbox-image');
        
        // add a label directly after this element
        this.labelElement = $('<label />').attr('for', this.element.attr('id'));
        this.labelElement.addClass('bartificer-checkbox-image');
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
                this.labelElement.css('background-image', 'url(' + this.options.img_checked + ')');
            }else{
                this.labelElement.css('background-image', 'url(' + this.options.img_unchecked + ')');
            }
        }else{
            // in dim mode the background image is always the same
            this.labelElement.css('background-image', 'url(' + this.options.img_checked + ')');
            
            // set the opacity depending on the checkbox state
            if(this.element.prop('checked')){
                this.labelElement.css('opacity', 1);
            }else{
                this.labelElement.css('opacity', "0.25");
            }
        }
    }  
});