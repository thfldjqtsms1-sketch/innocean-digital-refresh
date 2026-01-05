import { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [cursorText, setCursorText] = useState('');

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Detect hoverable elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for special cursor text
            const cursorAttr = target.closest('[data-cursor]');
            if (cursorAttr) {
                setCursorText(cursorAttr.getAttribute('data-cursor') || '');
                setIsHovering(true);
                return;
            }

            // Check for links, buttons, images
            if (
                target.closest('a') ||
                target.closest('button') ||
                target.closest('.hover-target') ||
                target.closest('img') ||
                target.closest('.card') ||
                target.closest('.amenity-card') ||
                target.closest('.nav-item')
            ) {
                setIsHovering(true);
                setCursorText('');
            } else {
                setIsHovering(false);
                setCursorText('');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Main cursor dot */}
            <div
                className={`cursor-dot ${isClicking ? 'clicking' : ''}`}
                style={{ left: position.x, top: position.y }}
            />

            {/* Cursor follower ring */}
            <div
                className={`cursor-ring ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
                style={{ left: position.x, top: position.y }}
            >
                {cursorText && <span className="cursor-text">{cursorText}</span>}
            </div>
        </>
    );
};

export default CustomCursor;
