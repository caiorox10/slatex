// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App

// import React, { useState } from 'react';
// import 'katex/dist/katex.min.css';
// import { BlockMath, InlineMath } from 'react-katex';

// function App() {
//   // Initial demo content
//   const [text, setText] = useState("# Welcome to LaTeX Slides\nThis is a simple slide.\n\n$$\\sum_{i=0}^n i^2 = \\frac{(n^2+n)(2n+1)}{6}$$\n---\n# Slide 2\nHere is some inline math: $a^2 + b^2 = c^2$. \n\nAnd a block equation:\n\n$$\\mu = \\frac{1}{n} \\sum_{i=1}^n x_i$$");

//   // Split content into slides using "---"
//   const slides = text.split('---');

//   return (
//     <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#1e1e1e' }}>
      
//       {/* LEFT SIDE: THE EDITOR */}
//       <div style={{ flex: 1, borderRight: '2px solid #333', display: 'flex', flexDirection: 'column' }}>
//         <div style={{ padding: '10px', color: '#888', fontSize: '12px', background: '#252525' }}>EDITOR (Use --- for new slide)</div>
//         <textarea 
//           style={{ 
//             flex: 1, padding: '20px', fontSize: '16px', border: 'none', 
//             backgroundColor: '#1e1e1e', color: '#d4d4d4', outline: 'none', 
//             fontFamily: '"Fira Code", monospace', lineHeight: '1.5', resize: 'none' 
//           }}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           spellCheck="false"
//         />
//       </div>

//       {/* RIGHT SIDE: THE SLIDE PREVIEW */}
//       <div style={{ flex: 1, padding: '40px', overflowY: 'auto', backgroundColor: '#333' }}>
//         <div style={{ color: '#888', fontSize: '12px', marginBottom: '10px' }}>PREVIEW</div>
//         {slides.map((content, i) => (
//           <div key={i} style={{ 
//             aspectRatio: '16/9', background: 'white', marginBottom: '30px', 
//             padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
//             display: 'flex', flexDirection: 'column', color: '#333', position: 'relative'
//           }}>
//             <div style={{ fontSize: '12px', position: 'absolute', top: '10px', right: '15px', color: '#ccc' }}>{i + 1}</div>
            
//             {/* Simple Parsing for the preview */}
//             <div style={{ fontSize: '18px', lineHeight: '1.6' }}>
//               {content.split('\n').map((line, index) => {
//                 if (line.startsWith('# ')) return <h1 key={index} style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>{line.replace('# ', '')}</h1>;
//                 if (line.startsWith('$$')) return <BlockMath key={index} math={line.replaceAll('$$', '')} />;
                
//                 // Basic check for inline math (very simple regex for the prototype)
//                 const parts = line.split('$');
//                 return (
//                   <p key={index}>
//                     {parts.map((part, pIdx) => pIdx % 2 === 1 ? <InlineMath key={pIdx} math={part} /> : part)}
//                   </p>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useRef } from 'react';
// import 'katex/dist/katex.min.css';
// import { BlockMath, InlineMath } from 'react-katex';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// function App() {
//   const [text, setText] = useState("# Slide 1\nClick the button to upload an image!\n---\n# Slide 2\n<color red>This text is red</color>\n$$\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\epsilon_0}$$");
//   const [images, setImages] = useState({}); // Stores {imageId: base64Data}
//   const slideRefs = useRef([]);

//   // 1. IMAGE UPLOAD HANDLER
//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const id = `img_${Date.now()}`;
//       setImages(prev => ({ ...prev, [id]: reader.result }));
//       setText(prev => prev + `\n!![${id}]`); // Custom syntax for images
//     };
//     if (file) reader.readAsDataURL(file);
//   };

//   // 2. EXPORT TO PDF
//   const exportPDF = async () => {
//     const pdf = new jsPDF('l', 'pt', 'a4'); // Landscape, points, A4
//     for (let i = 0; i < slideRefs.current.length; i++) {
//       const canvas = await html2canvas(slideRefs.current[i], { scale: 2 });
//       const imgData = canvas.toDataURL('image/png');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       if (i < slideRefs.current.length - 1) pdf.addPage();
//     }
//     pdf.save("presentation.pdf");
//   };

//   const slides = text.split('---');

//   return (
//     <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#1e1e1e' }}>
//       {/* TOOLBAR & EDITOR */}
//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '2px solid #333' }}>
//         <div style={{ padding: '10px', background: '#252525', display: 'flex', gap: '10px' }}>
//           <input type="file" id="imgInput" hidden onChange={handleImage} />
//           <button onClick={() => document.getElementById('imgInput').click()} style={btnStyle}>Add Image</button>
//           <button onClick={exportPDF} style={{ ...btnStyle, backgroundColor: '#2e7d32' }}>Export PDF</button>
//         </div>
//         <textarea 
//           style={{ flex: 1, padding: '20px', backgroundColor: '#1e1e1e', color: '#d4d4d4', border: 'none', outline: 'none', fontFamily: 'monospace' }}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//       </div>

//       {/* PREVIEW */}
//       <div style={{ flex: 1, padding: '40px', overflowY: 'auto', backgroundColor: '#333' }}>
//         {slides.map((content, i) => (
//           <div key={i} ref={el => slideRefs.current[i] = el} style={slideStyle}>
//             {content.split('\n').map((line, idx) => {
//               // Parse Images
//               if (line.startsWith('!![')) {
//                 const id = line.match(/\[(.*?)\]/)[1];
//                 return <img key={idx} src={images[id]} style={{ maxHeight: '200px', objectFit: 'contain' }} />;
//               }
//               // Parse Colors (Simple tag: <color hex>text</color>)
//               if (line.includes('<color')) {
//                 const color = line.match(/<color (.*?)>/)[1];
//                 const content = line.match(/>(.*?)<\/color>/)[1];
//                 return <p key={idx} style={{ color }}>{content}</p>;
//               }
//               // Render Math
//               if (line.startsWith('$$')) return <BlockMath key={idx} math={line.replaceAll('$$', '')} />;
//               return <p key={idx}>{line}</p>;
//             })}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const btnStyle = { padding: '5px 12px', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: '#444', color: 'white' };
// const slideStyle = { aspectRatio: '16/9', background: 'white', marginBottom: '30px', padding: '40px', display: 'flex', flexDirection: 'column', color: '#333', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' };

// export default App;


// import React, { useState, useRef } from 'react';
// import Draggable from 'react-draggable';
// import { BlockMath } from 'react-katex';
// import 'katex/dist/katex.min.css';

// // 1. We create a small sub-component to handle the 'nodeRef' internally
// // This prevents the findDOMNode error in React 19
// const DraggableElement = ({ el, isSelected, onStop, onSelect, children }) => {
//   const nodeRef = useRef(null);

//   return (
//     <Draggable 
//       nodeRef={nodeRef}
//       bounds="parent" 
//       position={{ x: el.x, y: el.y }}
//       onStop={(e, data) => onStop(el.id, data)}
//       onMouseDown={() => onSelect(el.id)}
//     >
//       <div 
//         ref={nodeRef} 
//         style={{ 
//           position: 'absolute', cursor: 'move', padding: '5px',
//           border: isSelected ? '2px solid #007bff' : '1px transparent solid',
//           color: '#333', userSelect: 'none', background: isSelected ? 'rgba(0,123,255,0.05)' : 'transparent'
//         }}
//       >
//         {children}
//       </div>
//     </Draggable>
//   );
// };

// function App() {
//   const [slides, setSlides] = useState([
//     { id: 's1', elements: [{ id: 1, type: 'math', content: '\\text{Drag me! } e=mc^2', x: 50, y: 50 }] }
//   ]);
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//   const [selectedId, setSelectedId] = useState(null);

//   const currentSlide = slides[currentSlideIndex];

//   const handleStop = (id, data) => {
//     const updatedSlides = [...slides];
//     updatedSlides[currentSlideIndex].elements = currentSlide.elements.map(el => 
//       el.id === id ? { ...el, x: data.x, y: data.y } : el
//     );
//     setSlides(updatedSlides);
//   };

//   const updateContent = (val) => {
//     const updatedSlides = [...slides];
//     updatedSlides[currentSlideIndex].elements = currentSlide.elements.map(el => 
//       el.id === selectedId ? { ...el, content: val } : el
//     );
//     setSlides(updatedSlides);
//   };

//   const addElement = (type, content = '') => {
//     const newEl = {
//       id: Date.now(),
//       type,
//       content: content || (type === 'math' ? 'f(x) = y' : 'New Text'),
//       x: 50, y: 50
//     };
//     const updatedSlides = [...slides];
//     updatedSlides[currentSlideIndex].elements.push(newEl);
//     setSlides(updatedSlides);
//     setSelectedId(newEl.id);
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => addElement('image', reader.result);
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#1e1e1e', color: 'white', fontFamily: 'sans-serif' }}>
      
//       {/* LEFT: Slides list */}
//       <div style={{ width: '160px', backgroundColor: '#252525', borderRight: '1px solid #333', padding: '10px' }}>
//         {slides.map((s, i) => (
//           <div key={s.id} onClick={() => setCurrentSlideIndex(i)} style={{ ...thumbStyle, border: currentSlideIndex === i ? '2px solid #007bff' : '1px solid #444' }}>
//             Slide {i + 1}
//           </div>
//         ))}
//         <button onClick={() => setSlides([...slides, { id: Date.now(), elements: [] }])} style={btnStyle}>+ New Slide</button>
//       </div>

//       {/* MIDDLE: Toolbar */}
//       <div style={{ width: '260px', borderRight: '1px solid #333', padding: '20px' }}>
//         <h3>Controls</h3>
//         <button onClick={() => addElement('math')} style={btnStyle}>+ Add LaTeX</button>
//         <button onClick={() => addElement('text')} style={btnStyle}>+ Add Text Block</button>
//         <input type="file" onChange={handleImage} style={{ marginTop: '10px', fontSize: '11px' }} />
        
//         {selectedId && (
//           <div style={{ marginTop: '30px', borderTop: '1px solid #444', paddingTop: '20px' }}>
//             <label style={{ color: '#888', fontSize: '12px' }}>Edit Content:</label>
//             <textarea 
//               style={inputStyle}
//               value={currentSlide.elements.find(el => el.id === selectedId)?.content}
//               onChange={(e) => updateContent(e.target.value)}
//             />
//             <button onClick={() => {
//               const updated = [...slides];
//               updated[currentSlideIndex].elements = currentSlide.elements.filter(el => el.id !== selectedId);
//               setSlides(updated);
//               setSelectedId(null);
//             }} style={{ ...btnStyle, backgroundColor: '#b00' }}>Delete Element</button>
//           </div>
//         )}
//       </div>

//       {/* RIGHT: Canvas */}
//       <div style={{ flex: 1, backgroundColor: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <div style={{ width: '800px', height: '450px', backgroundColor: 'white', position: 'relative' }}>
//           {currentSlide.elements.map((el) => (
//             <DraggableElement 
//               key={el.id} 
//               el={el} 
//               isSelected={selectedId === el.id}
//               onStop={handleStop}
//               onSelect={setSelectedId}
//             >
//               {el.type === 'math' && <BlockMath math={el.content} />}
//               {el.type === 'text' && <div style={{ fontSize: '24px' }}>{el.content}</div>}
//               {el.type === 'image' && <img src={el.content} alt="" style={{ maxWidth: '250px', pointerEvents: 'none' }} />}
//             </DraggableElement>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const btnStyle = { width: '100%', padding: '10px', cursor: 'pointer', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '8px' };
// const thumbStyle = { width: '100%', aspectRatio: '16/9', backgroundColor: '#111', marginBottom: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px' };
// const inputStyle = { width: '100%', height: '120px', background: '#333', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', marginTop: '5px', marginBottom: '10px' };

// export default App;

import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { BlockMath } from 'react-katex';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Styles
import 'katex/dist/katex.min.css';
import 'react-resizable/css/styles.css';

/**
 * DraggableElement: Handles Scaling for Math/Text and Free-Stretch for Images
 */
const DraggableElement = ({ el, isSelected, onStop, onSelect, onResize, children }) => {
  const nodeRef = useRef(null);
  const isProportional = el.type === 'math' || el.type === 'text';
  
  // Base height for scaling math is 40px
  const scale = (el.height || 60) / 40;

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      position={{ x: el.x, y: el.y }}
      onStop={(e, data) => onStop(el.id, data)}
      onMouseDown={() => onSelect(el.id)}
      cancel=".react-resizable-handle"
    >
      <div
        ref={nodeRef}
        style={{
          position: 'absolute',
          padding: '5px',
          border: isSelected ? '2px solid #1a73e8' : '1px transparent solid',
          zIndex: el.zIndex || 1,
          cursor: 'move',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: el.color || '#000000', // Inherited by KaTeX
        }}
      >
        <ResizableBox
          width={el.width || 200}
          height={el.height || 60}
          onResizeStop={(e, data) => onResize(el.id, data.size)}
          lockAspectRatio={isProportional}
          handle={
            <span className="react-resizable-handle react-resizable-handle-se" 
                  style={{ cursor: 'nwse-resize', opacity: isSelected ? 1 : 0 }} />
          }
        >
          <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            overflow: 'visible',
            transform: isProportional ? `scale(${scale})` : 'none',
            transformOrigin: 'center'
          }}>
            {children}
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default function App() {
  const [slides, setSlides] = useState([
    { id: 's1', elements: [{ id: 1, type: 'math', content: 'f(x) = \\int_{-\\infty}^{\\infty} e^{-x^2} dx', x: 200, y: 150, width: 350, height: 100, zIndex: 1, color: '#000000' }] }
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const canvasRef = useRef(null);
  const currentSlide = slides[currentSlideIndex];

  // Global CSS to strip KaTeX defaults
  const globalStyles = `
    .katex-display { margin: 0 !important; padding: 0 !important; }
    .katex { color: inherit !important; font-size: 1em !important; }
  `;

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('slatex-session');
    if (saved) setSlides(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('slatex-session', JSON.stringify(slides));
  }, [slides]);

  // --- PDF DOWNLOAD ---
  const exportPDF = async () => {
    const pdf = new jsPDF('l', 'px', [800, 450]);
    const originalIndex = currentSlideIndex;
    setSelectedId(null); // Hide UI borders

    for (let i = 0; i < slides.length; i++) {
      setCurrentSlideIndex(i);
      // Wait for React to render symbols
      await new Promise(r => setTimeout(r, 700)); 
      
      const canvas = await html2canvas(canvasRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 800, 450);
      
      if (i < slides.length - 1) pdf.addPage();
    }
    
    pdf.save("slatex-presentation.pdf");
    setCurrentSlideIndex(originalIndex);
  };

  // --- ACTIONS ---
  const updateElements = (newEls) => {
    const updated = [...slides];
    updated[currentSlideIndex].elements = newEls;
    setSlides(updated);
  };

  const handleResize = (id, size) => {
    updateElements(currentSlide.elements.map(el => el.id === id ? { ...el, width: size.width, height: size.height } : el));
  };

  const handleStop = (id, data) => {
    updateElements(currentSlide.elements.map(el => el.id === id ? { ...el, x: data.x, y: data.y } : el));
  };

  const updateAttr = (attr, val) => {
    updateElements(currentSlide.elements.map(el => el.id === selectedId ? { ...el, [attr]: val } : el));
  };

  const addElement = (type, content = '') => {
    const newEl = {
      id: Date.now(),
      type,
      content: content || (type === 'math' ? 'a^2 + b^2 = c^2' : 'Double click to edit'),
      x: 100, y: 100, width: 200, height: 80, zIndex: 10, color: '#000000'
    };
    const updated = [...slides];
    updated[currentSlideIndex].elements.push(newEl);
    setSlides(updated);
    setSelectedId(newEl.id);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => addElement('image', reader.result);
    reader.readAsDataURL(file);
  };

  const bringToFront = () => {
    const maxZ = Math.max(...currentSlide.elements.map(el => el.zIndex || 1), 0);
    updateAttr('zIndex', maxZ + 1);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#111', color: 'white', fontFamily: 'sans-serif' }}>
      <style>{globalStyles}</style>

      {/* LEFT: SLIDE LIST */}
      <div style={{ width: '180px', backgroundColor: '#1a1a1a', borderRight: '1px solid #333', padding: '15px', overflowY: 'auto' }}>
        <button onClick={exportPDF} style={btnPrimary}>DOWNLOAD PDF</button>
        <div style={{ height: '1px', background: '#333', margin: '15px 0' }} />
        {slides.map((s, i) => (
          <div key={s.id} onClick={() => setCurrentSlideIndex(i)} style={{ ...thumbStyle, border: currentSlideIndex === i ? '2px solid #1a73e8' : '1px solid #333' }}>
            Slide {i + 1}
          </div>
        ))}
        <button onClick={() => setSlides([...slides, { id: Date.now(), elements: [] }])} style={btnStyle}>+ New Slide</button>
      </div>

      {/* MIDDLE: TOOLBAR */}
      <div style={{ width: '280px', backgroundColor: '#1a1a1a', borderRight: '1px solid #333', padding: '20px' }}>
        <h3>Toolbar</h3>
        <button onClick={() => addElement('math')} style={btnStyle}>+ Math Block</button>
        <button onClick={() => addElement('text')} style={btnStyle}>+ Text Block</button>
        <label style={{ ...btnStyle, display: 'block', textAlign: 'center', backgroundColor: '#333', cursor: 'pointer' }}>
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </label>

        {selectedId && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#222', borderRadius: '8px' }}>
            <button onClick={bringToFront} style={btnStyle}>Bring to Front</button>
            <label style={labelStyle}>Color:</label>
            <input type="color" value={currentSlide.elements.find(el => el.id === selectedId)?.color || '#000000'} onChange={(e) => updateAttr('color', e.target.value)} style={{ width: '100%', marginBottom: '10px' }} />
            <label style={labelStyle}>Content:</label>
            <textarea style={inputStyle} value={currentSlide.elements.find(el => el.id === selectedId)?.content} onChange={(e) => updateAttr('content', e.target.value)} />
            <button onClick={() => {
               updateElements(currentSlide.elements.filter(el => el.id !== selectedId));
               setSelectedId(null);
            }} style={{ ...btnStyle, backgroundColor: '#a00' }}>Delete</button>
          </div>
        )}
      </div>

      {/* RIGHT: CANVAS */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <div ref={canvasRef} style={{ width: '800px', height: '450px', backgroundColor: 'white', position: 'relative', overflow: 'hidden' }}>
          {currentSlide.elements.map((el) => (
            <DraggableElement key={el.id} el={el} isSelected={selectedId === el.id} onStop={handleStop} onSelect={setSelectedId} onResize={handleResize}>
              {el.type === 'math' ? <BlockMath math={el.content} /> : 
               el.type === 'image' ? <img src={el.content} alt="" style={{ width: '100%', height: '100%', objectFit: 'fill', pointerEvents: 'none' }} /> : 
               <div style={{ textAlign: 'center', userSelect: 'none' }}>{el.content}</div>}
            </DraggableElement>
          ))}
        </div>
      </div>
    </div>
  );
}

// STYLES
const btnStyle = { width: '100%', padding: '10px', cursor: 'pointer', background: '#444', color: '#fff', border: 'none', borderRadius: '4px', marginBottom: '10px' };
const btnPrimary = { ...btnStyle, background: '#1a73e8', fontWeight: 'bold' };
const thumbStyle = { width: '100%', aspectRatio: '16/9', background: '#000', marginBottom: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', borderRadius: '4px' };
const inputStyle = { width: '100%', height: '80px', background: '#111', color: '#fff', padding: '10px', border: '1px solid #444', borderRadius: '4px', resize: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', color: '#888', marginBottom: '5px' };