const resizable = document.getElementById('resizable');
        const resizer = resizable.querySelector('.resizer');

        // Aspect ratio
        const aspectRatio = resizable.offsetWidth / resizable.offsetHeight;

        // Minimum dimensions
        const minWidth = 200;
        const minHeight = 300;

        // Dragging functionality
        let isDragging = false;
        resizable.addEventListener('mousedown', (e) => {
            if (e.target !== resizer) {
                isDragging = true;
                const offsetX = e.clientX - resizable.getBoundingClientRect().left;
                const offsetY = e.clientY - resizable.getBoundingClientRect().top;

                const onMouseMove = (e) => {
                    if (!isDragging) return;
                    resizable.style.left = `${e.clientX - offsetX}px`;
                    resizable.style.top = `${e.clientY - offsetY}px`;
                };

                const onMouseUp = () => {
                    isDragging = false;
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            }
        });

        // Resizing functionality
        let isResizing = false;
        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isResizing = true;

            const startWidth = resizable.offsetWidth;
            const startHeight = resizable.offsetHeight;
            const startX = e.clientX;
            const startY = e.clientY;

            const startLeft = resizable.offsetLeft;
            const startTop = resizable.offsetTop;

            const onMouseMove = (e) => {
                if (!isResizing) return;

                let newWidth = startWidth - (e.clientX - startX);
                let newHeight = startHeight - (e.clientY - startY);

                // Maintain aspect ratio
                newHeight = newWidth / aspectRatio;

                // Apply minimum constraints
                if (newWidth < minWidth) {
                    newWidth = minWidth;
                    newHeight = newWidth / aspectRatio;
                }
                if (newHeight < minHeight) {
                    newHeight = minHeight;
                    newWidth = newHeight * aspectRatio;
                }

                // Update dimensions
                resizable.style.width = `${newWidth}px`;
                resizable.style.height = `${newHeight}px`;

                // Keep top-right corner fixed; adjust bottom and left accordingly
                resizable.style.left = `${startLeft + (startWidth - newWidth)}px`;
                resizable.style.bottom = `${-(startHeight - newHeight)}px`;
            };

            const onMouseUp = () => {
                isResizing = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });