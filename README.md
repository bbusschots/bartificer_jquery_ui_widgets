# Bartificer JQuery UI Widget Library
A Collection of JQuery UI Widgets

## WARNING
This is very much a work in progress, and absolutely not ready for prime-time - check back in a few months.

## Included Widgets

### checkboxIcon

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
    $('#fav_cb').checkboxIcon({
        mode: 'dim',
        checkedImg: 'fav_icon.png'
    });
    $('#vat_cb').checkboxIcon({
        mode: 'swap',
        checkedImg: 'yes_icon.png',
        uncheckedImg: 'no_icon.png'
    });
    
### Yes/No Icon Toggle

This widget turns an input of type `hidden` or `text` into a clickable icon with yes and no icons stacked next to it. Clicking on the main icon cycles through all permitted states, and clicking the yes or no icons sets those to on.

The widget always allows `yes` and `no` to be selected, but it can also allow none and/or both to be selected.

Sample Code:

    <!-- The HTML for the yes/no icon toggle -->
    <input type="hidden" value="yes" id="icontoggle" />
    
    // the JavaScript to configure the yes/no icon toggle
    // (you would usually do this in JQuery's document ready event handler)
    $('#icontoggle').checkboxIcon({
        iconImg: 'main_icon.png',
        yesImg: 'yes.png',
        noImg: 'no.png',
        allowNone: true,
        allowBoth: true
    });

### starRating

This widget turns an input of type `hidden` or `text` into a series of n clickable stars, allowing users to select a value between 1 and the number of stars.

The widget can operate in two modes:
* `swap` mode (the default) - different images are used for the stars that are selected, and not selected.
* `dim` mode - the same image is used for stars that are selected and not selected, but the un-selected stars are shown with an opacity of 0.25.

The widget works by adding a span containing the appropriate number of images to the DOM directly after the input the widget is applied to. If the input is of type `text`, the input's display is set to `none`.

Sample Code:

    <!-- The HTML for the star ratings -->
    <input type="hidden" value="3" id="rating1" />
    <input type="hidden" value="3" id="rating2" />
    
    // the JavaScript to configure the inputs
    // (you would usually do this in JQuery's document ready event handler)
    $('#rating1').checkboxImage({
        mode: 'swap',
        starImg: 'star_icon.png',
        blankImg: 'dot_icon.png'
    });
    $('#rating2').checkboxImage({
        mode: 'dim',
        starImg: 'star_icon.png'
    });