import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bookmark } from '@mui/icons-material';
import { History } from '@mui/icons-material';
import { Avatar } from '@mui/material';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'
import './index.css'

function MainQuestion() {
    const [show, setShow] = useState(false);
    return (
        <>
        </>
        // <div className='main'>
        //     <div className='main-container'>

        //         <div className='main-top'>
        //             <h2 className='main-question'>Question title</h2>
        //             <Link to='/add-question'>
        //                 <button>Ask Question</button>
        //             </Link>

        //         </div>

        //         <div className='main-desc'>
        //             <div className='info'>
        //                 <p>Timestamp</p>
        //                 <p>Active <span>today</span></p>
        //                 <p>Viewed <span>43 times</span></p>
        //             </div>
        //         </div>

        //         <div className='all-questions'>
        //             <div className='all-questions-container'>
        //                 <div className='all-questions-left'>
        //                     <div className='all-options'>
        //                         <p className="arrow">▲</p>
        //                         <p className="arrow">0</p>
        //                         <p className="arrow">▼</p>
        //                         <Bookmark />
        //                         <History />
        //                     </div>
        //                 </div>
        //                 <div className='question-answer'>
        //                     <p> this is question body </p>
        //                     <div className='author'>

        //                         <small> asked "Timestamp"</small>
        //                         <div className='auth-details'>
        //                             <Avatar />
        //                             <p>Fatiha saht</p>
        //                         </div>
        //                     </div>
        //                     {/* comment  */}
        //                     <div className='comments'>
        //                         <div className='comment'>
        //                             <p> This is comment  -
        //                                 <span>User name </span>
        //                                 <small>Timestamp</small>
        //                             </p>
        //                         </div>
        //                         <p onClick={() => setShow(!show)}>Add a comment</p>
        //                         {
        //                             show && (<div className='title'>
        //                                 <textarea type='text'
        //                                     placeholder='add comment'
        //                                     rows={5}
        //                                     style={{

        //                                     }}
        //                                 ></textarea>

        //                                 <button> Add Comment </button>

        //                             </div>)
        //                         }
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         {/* all comment  */}
        //         {/* <div className='all-questions'>
        //             <p> No answer</p>
        //             <div className='all-questions-container'>
        //                 <div className='all-questions-left'>
        //                     <div className='all-options'>
        //                         <p className="arrow">▲</p>
        //                         <p className="arrow">0</p>
        //                         <p className="arrow">▼</p>
        //                         <Bookmark />
        //                         <History />
        //                     </div>
        //                 </div>


        //                 <div className='question-answer'>
        //                     <p> this is question body </p>
        //                     <div className='author'>

        //                         <small> asked "Timestamp"</small>
        //                         <div className='auth-details'>
        //                             <Avatar />
        //                             <p>Fatiha saht</p>
        //                         </div>
        //                     </div>
                         
        //                     <div className='comments'>
        //                         <div className='comment'>
        //                             <p> This is comment  -
        //                                 <span>User name </span>
        //                                 <small>Timestamp</small>
        //                             </p>
        //                         </div>
        //                         <p onClick={() => setShow(!show)}>Add a comment</p>
        //                         {
        //                             show && (
        //                                 <div className='title'>
        //                                     <textarea type='text'
        //                                         placeholder='add comment'
        //                                         rows={5}
        //                                         style={{

        //                                         }}
        //                                     />

        //                                     <button> Add Comment </button>
        //                                 </div>
        //                             )}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div> */}
        //     </div>


        //     <div className='main-answer'>
        //         <h3 style={{
        //             fontSize: '22px',
        //             margin: "10px 0",
        //             fontWeight: '400'
        //         }}> Your Answer </h3>
        //         <ReactQuill className='react-quill' theme='snow'
        //             style={{
        //                 height: '200px'
        //             }} />
        //     </div>
        //     <button style={{
        //         marginTop: "80px",
        //         maxWidth: "fit-content",
        //     }}> Post your answer</button>
        // </div>
    )
}


export default MainQuestion