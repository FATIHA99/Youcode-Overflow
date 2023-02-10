import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { TagsInput } from 'react-tag-input-component'
import './Question.css'

function Question() {
    return (
        <div className='add-question'>
            <div className='add-question-container'>
                <div className='head-title'>
                    <h1>Ask a public question</h1>
                </div>
                <div className='question-container'>
                    <div className='question-options'>

                    <div className='question-option'>
                            <div className='title'>
                                <h3>Title</h3>
                                <small>
                                    Be specific and imagine you’re asking a question to another person.

                                </small>
                                <input type='text' placeholder='e.g Is there an R function the index of an element in a vector?' />
                            </div>
                        </div>

                        <div className='question-option'>
                            <div className='title'>
                                <h3>Title</h3>
                                <small>
                                    Be specific and imagine you’re asking a question to another person.

                                </small>
                                <ReactQuill className='react-quill' theme='snow' />
                                {/* <input type='text' placeholder='e.g Is there an R function the index of an element in a vector?' /> */}
                            </div>
                        </div>

                        <div className='question-option'>
                            <div className='title'>
                                <h3>Tags</h3>
                                <small>
                                    Add up to tags to describe what your question is about
                                </small>
                                <TagsInput name='tags' placeHolder='pres enter to add new tag' />
                            </div>
                        </div>


                    </div>
                </div>
                <button className='button'> Add your Question</button>
            </div>
        </div>
    )
}


export default Question