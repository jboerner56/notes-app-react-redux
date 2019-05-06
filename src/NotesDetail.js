import React from 'react';


function NotesEditor({text, handleChange}) {
    return(
        <textarea value={text} onChange={(e) => {
            handleChange(e.target.value);
        }} />
    );
}
export default class NotesDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            draftText : props.note.text,
            id: props.note.id
        };
    }
    static getDerivedStateFromProps(props, state) {
        // there is no 'this',
        // so we receive props and state as arguments


        // must return an object that describes any modifications to state.
        if(props.note.id !== state.id) {
            return {
                id: props.note.id,
                draftText : props.note.text
            };
        } else {
            return null;
        }
    }
    render() {
        // declares the className and note variables, and assigns them to the properties from this.props where the name matches
        const {className, note} = this.props;
        const {isEditing, draftText} = this.state;

        return (
            <div className={className}>
                {
                    isEditing ? <NotesEditor 
                                    handleChange={this._changeDraftText} 
                                    text={draftText}/> 
                            : draftText
                }
                <br />
                <button onClick={this._toggleEdit}>Toggle Edit</button>
            </div>
        );
    }
    _toggleEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }
    _changeDraftText = (newText) => {
        this.setState({
            draftText: newText
        });
    }
}