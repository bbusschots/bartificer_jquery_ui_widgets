# Bartificer JQuery UI Widget Library
A Collection of JQuery UI Widgets

## WARNING
This is very much a work in progress, and absolutely not ready for prime-time - check back in a few months.

## Included Widgets

### checkboxImage

This widget turns an `input` of type `checkbox` or `radio` into a clickable icon which changes to indicate the state of the `input`.

The widget can operate in one of two modes:
* `dim` mode (the default) - the image is shown at full opacity when the checkbox is checked, and one quarter opacity when it is not.
* `swap` mode - a different image is shown depending on whether or not the checkbox is checked.

By default the widget assumes the images are 16px squares, but custom widths and heights can be set using the `width` and `height` options.

The widget works by generating a `label` tag with a set width and height, setting it's background image, and tying it to the checkbox/radio button. For this to work the checkbox/radio button must have an ID. If one is present it will not be altered in any way, but if none is present an unique one will be auto-generated and assigned to the checkbox/radio button. Changing the ID of the checkbox/radio button after the widget has been initialised will break the widget.

Sample Code:

    <!-- The HTML for the checkboxes -->
    <input type="checkbox" value="favourite" id="fav_cb" />
    <input type="checkbox" value="add_vat" id="vat_cb" />
    
    // the JavaScript to configure the checkboxes
    // (you would usually do this in JQuery's document ready event handler)
    $('#fav_cb').checkboxImage({
        mode: 'dim',
        img_checked: 'fav_icon.png'
    });
    $('#vat_cb').checkboxImage({
        mode: 'swap',
        img_checked: 'yes_icon.png',
        img_unchecked: 'no_icon.png'
    });