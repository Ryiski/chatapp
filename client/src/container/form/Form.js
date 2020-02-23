import React from 'react';
import './style.css';

function Form({ errors, children, _onSubmit }) {
    const errorMessages = errors.map((error, i) => <p key={i}>{error}</p>)
    return (
        <form onSubmit={_onSubmit}>
            <div className="container">
                <div className="form-errors">
                    {errorMessages}
                </div>
                {children}
            </div>

        </form>
    )
}

export default Form
