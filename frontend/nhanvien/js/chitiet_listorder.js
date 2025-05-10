// Increase/Decrease order item 
$(document).ready(function () {
    // jQuery for quantity form
    $('.quantity-right-plus').click(function (e) {
        // Stop acting like a button
        e.preventDefault();

        // Get the field name
        let quantity = parseInt($('#quantity').val());

        // If is not undefined
        $('#quantity').val(quantity + 1);
    });

    $('.quantity-left-minus').click(function (e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        let quantity = parseInt($('#quantity').val());

        // Increment
        if (quantity > 1) {
            $('#quantity').val(quantity - 1);
        }
    });
});