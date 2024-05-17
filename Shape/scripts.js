$(document).ready(function() {
    let shapeContainer = $('.shapeContainer');
    let shapeType = $('#shapeType');
    let shapeColor = $('#shapeColor');
    let isAnimating = false;

    $('#addShape').click(function() {
        if (isAnimating) return;

        isAnimating = true;
        let shape = $('<div></div>').addClass('shape').addClass(shapeType.val()).css('background-color', shapeColor.val());
        shapeContainer.append(shape);
        shape.css({ left: 0, top: 0 }).slideDown(500, function() {
            arrangeShapes();
            isAnimating = false;
        });
    });

    $('#removeShape').click(function() {
        if (isAnimating) return;

        let lastShape = shapeContainer.find('.shape').last();
        if (lastShape.length) {
            isAnimating = true;
            lastShape.fadeOut(500, function() {
                lastShape.remove();
                arrangeShapes();
                isAnimating = false;
            });
        }
    });

    // Event handler untuk tombol "Remove All Shapes"
    $('#removeAllShapes').click(function() {
        if (isAnimating) return;

        isAnimating = true;
        shapeContainer.find('.shape').fadeOut(500, function() {
            $(this).remove();
            arrangeShapes();
            isAnimating = false;
        });
    });

    function arrangeShapes() {
        let shapes = shapeContainer.find('.shape');
        let containerWidth = shapeContainer.width();
        let margin = parseInt(shapes.css('margin-left')); // Mengambil margin dari CSS
        let shapeSize = shapes.outerWidth(); // Mengambil ukuran shape
        let x = margin,
            y = margin,
            maxHeight = 0;

        shapes.each(function() {
            let shape = $(this);
            let shapeWidth = shape.outerWidth(true); // termasuk margin
            let shapeHeight = shape.outerHeight(true); // termasuk margin

            if (x + shapeWidth > containerWidth) {
                x = margin; // reset ke margin untuk baris baru
                y += maxHeight + margin; // pindah ke baris berikutnya
                maxHeight = 0;
            }

            shape.css({ left: x, top: y });
            x += shapeWidth;
            if (shapeHeight > maxHeight) {
                maxHeight = shapeHeight;
            }
        });
    }
});