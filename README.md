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

This widget works best if the checkbox has an ID. If no ID is present the widget will randomly generate one.

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