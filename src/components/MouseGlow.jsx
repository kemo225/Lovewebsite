import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseGlow() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);
  
  // Motion values for smooth trailing spring cursor
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect mobile/tablet screen sizes to automatically disable custom cursor
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Check if user is hovering over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'A' ||
        target.closest('button') || 
        target.closest('.interactive-card');
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, mouseX, mouseY]);

  // Canvas particle trail logic for high performance (60 FPS)
  useEffect(() => {
    if (isMobile || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    let activeMouseX = mouseX.get();
    let activeMouseY = mouseY.get();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = Math.random() > 0.6 
          ? 'rgba(255, 107, 157, ' // pink
          : Math.random() > 0.3 
            ? 'rgba(201, 168, 76, ' // gold
            : 'rgba(255, 23, 68, '; // red
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color.includes('201') ? '#c9a84c' : '#ff6b9d';
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0; // reset shadow
      
      const currentX = mouseX.get();
      const currentY = mouseY.get();
      
      // Emit particles if cursor is moving
      const dist = Math.hypot(currentX - activeMouseX, currentY - activeMouseY);
      if (dist > 1.5 && particles.length < 60) {
        particles.push(new Particle(currentX, currentY));
        activeMouseX = currentX;
        activeMouseY = currentY;
      }

      particles.forEach((p, idx) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) {
          particles.splice(idx, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* High-performance canvas for particle trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-50 mix-blend-screen"
      />

      {/* Main Luxury Glow cursor pointer */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? 'rgba(255, 107, 157, 0.2)' : 'rgba(255, 23, 68, 0.1)',
          border: isHovered ? '2px solid #c9a84c' : '1px dashed #ff6b9d',
          boxShadow: isHovered 
            ? '0 0 25px rgba(201, 168, 76, 0.8), 0 0 10px rgba(255, 107, 157, 0.4)' 
            : '0 0 15px rgba(255, 107, 157, 0.5)',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      />
      
      {/* Small central pinpoint dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 8px #fff',
        }}
      />
    </>
  );
}
